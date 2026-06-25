const cvData = require('../../data/cv-data.json');

const MAX_JOB_AD_LENGTH = 6000;
const MIN_JOB_AD_LENGTH = 20;
const MODEL = 'claude-haiku-4-5-20251001';

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return json(405, { error: 'Method not allowed' });
    }

    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch {
        return json(400, { error: 'Invalid request body.' });
    }

    const { passphrase, jobAd } = payload;

    if (!process.env.TAILOR_PASSPHRASE || passphrase !== process.env.TAILOR_PASSPHRASE) {
        return json(401, { error: 'Incorrect passphrase.' });
    }

    if (typeof jobAd !== 'string' || jobAd.trim().length < MIN_JOB_AD_LENGTH) {
        return json(400, { error: 'Please paste the full job advert text.' });
    }

    if (jobAd.length > MAX_JOB_AD_LENGTH) {
        return json(400, { error: `Job advert text is too long (max ${MAX_JOB_AD_LENGTH} characters).` });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        return json(500, { error: 'Server misconfigured: missing API key.' });
    }

    const roleIds = cvData.experience.map(r => r.roleId);
    const skillKeys = cvData.skills.map(s => s.key);
    const projectIds = cvData.projects.map(p => p.id);

    const systemPrompt = `You tailor a real CV to a job advert. You may ONLY:
- Rewrite the professional summary: stay strictly truthful to the facts in the source data below, but echo the job ad's language and priorities.
- For each existing role (identified by roleId), select and reorder a subset of its existing bullets. You may lightly rephrase wording for clarity, but must NEVER introduce new employers, dates, numbers, technologies, or achievements that are not present in the source bullets for that role.
- Reorder the skill categories and the project list to foreground what's most relevant to this job ad.

You must NEVER invent new experience, numbers, employers, or claims that are not already present in the source data. If the job ad is unrelated to the candidate's background, still only use truthful reordering/selection — do not fabricate matching experience.

Respond with ONLY a single valid JSON object, no surrounding text, no markdown code fences, matching exactly this schema:
{
  "summary": "string",
  "experience": [ { "roleId": "string", "bullets": ["string", "..."] } ],
  "skillsOrder": ["string", "..."],
  "projectsOrder": ["string", "..."]
}

Constraints:
- "experience" must include one entry per roleId in this exact set: ${JSON.stringify(roleIds)}.
- Each role's "bullets" must be a subset (same wording or lightly rephrased) of that role's original bullets, never longer than the original list, never empty.
- "skillsOrder" must be a reordering of exactly these keys (no additions/removals): ${JSON.stringify(skillKeys)}.
- "projectsOrder" must be a reordering of exactly these ids (no additions/removals): ${JSON.stringify(projectIds)}.`;

    const userPrompt = `SOURCE CV DATA (ground truth — do not deviate from these facts):
${JSON.stringify(cvData, null, 2)}

JOB ADVERT TO TAILOR FOR:
"""
${jobAd}
"""

Return only the JSON object described in the system prompt.`;

    let raw;
    try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: MODEL,
                max_tokens: 2500,
                system: systemPrompt,
                messages: [{ role: 'user', content: userPrompt }],
            }),
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error('Anthropic API error', res.status, errText);
            return json(502, { error: "Couldn't reach the AI service. Try again." });
        }

        const data = await res.json();
        raw = data.content && data.content[0] && data.content[0].text;
    } catch (err) {
        console.error('Tailoring request failed', err);
        return json(502, { error: "Couldn't tailor the CV. Try again." });
    }

    let aiResponse;
    try {
        aiResponse = JSON.parse(extractJson(raw || ''));
    } catch (err) {
        console.error('Failed to parse AI response', err, raw);
        return json(502, { error: 'AI response was malformed. Try again.' });
    }

    const tailored = buildTailoredCv(cvData, aiResponse, { roleIds, skillKeys, projectIds });
    if (!tailored) {
        return json(502, { error: 'AI response referenced unknown data. Try again.' });
    }

    return json(200, { cv: tailored });
};

function buildTailoredCv(base, ai, known) {
    if (!ai || typeof ai.summary !== 'string' || !ai.summary.trim() || !Array.isArray(ai.experience)) {
        return null;
    }

    const tailored = JSON.parse(JSON.stringify(base));
    tailored.summary = ai.summary.trim();

    const roleById = Object.fromEntries(tailored.experience.map(r => [r.roleId, r]));
    const seenRoleIds = new Set();

    for (const entry of ai.experience) {
        if (!entry || !known.roleIds.includes(entry.roleId) || !Array.isArray(entry.bullets)) {
            return null;
        }
        const role = roleById[entry.roleId];
        const originalCount = role.bullets.length;
        const bullets = entry.bullets.filter(b => typeof b === 'string' && b.trim().length > 0);
        if (bullets.length === 0 || bullets.length > originalCount) {
            return null;
        }
        role.bullets = bullets;
        seenRoleIds.add(entry.roleId);
    }

    if (seenRoleIds.size !== known.roleIds.length) {
        return null;
    }

    if (Array.isArray(ai.skillsOrder) && sameSet(ai.skillsOrder, known.skillKeys)) {
        tailored.skillsOrder = ai.skillsOrder;
    }

    if (Array.isArray(ai.projectsOrder) && sameSet(ai.projectsOrder, known.projectIds)) {
        tailored.projectsOrder = ai.projectsOrder;
    }

    return tailored;
}

function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const setA = new Set(a);
    return b.every(item => setA.has(item));
}

function extractJson(text) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1 || end < start) {
        throw new Error('No JSON object found in AI response');
    }
    return text.slice(start, end + 1);
}

function json(statusCode, body) {
    return {
        statusCode,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    };
}
