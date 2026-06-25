// Renders the .cv-body inner markup from a cv-data.json-shaped object.
// Used by both cv.html (static data) and tailor.html (AI-tailored data).
function renderCV(data) {
    const skillsOrder = data.skillsOrder && data.skillsOrder.length ? data.skillsOrder : data.skills.map(s => s.key);
    const skillsByKey = Object.fromEntries(data.skills.map(s => [s.key, s]));

    const projectsOrder = data.projectsOrder && data.projectsOrder.length ? data.projectsOrder : data.projects.map(p => p.id);
    const projectsById = Object.fromEntries(data.projects.map(p => [p.id, p]));

    return `
        <section class="cv-section">
            <div class="cv-section-title">Professional Summary</div>
            <p style="font-size:9.5pt; color:#334155; line-height:1.6;">${escapeHtml(data.summary)}</p>
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Core Competencies</div>
            <div class="competencies-grid">
                ${skillsOrder.map(key => skillsByKey[key] ? `<span class="comp-chip"><strong>${escapeHtml(skillsByKey[key].label)}</strong> ${escapeHtml(skillsByKey[key].value)}</span>` : '').join('')}
            </div>
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Professional Experience</div>
            ${data.experience.map(role => `
                <div class="exp-entry">
                    <div class="exp-header">
                        <div class="exp-title">${escapeHtml(role.title)}</div>
                        <div class="exp-meta">
                            <div class="exp-date">${escapeHtml(role.dateRange)}</div>
                            <div class="exp-location">${escapeHtml(role.location)}</div>
                        </div>
                    </div>
                    <div class="exp-company">${escapeHtml(role.company)}</div>
                    <ul class="exp-bullets">
                        ${role.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Education</div>
            ${data.education.map(edu => `
                <div class="exp-entry">
                    <div class="exp-header">
                        <div class="exp-title">${escapeHtml(edu.degree)}</div>
                        <div class="exp-meta">
                            <div class="exp-date">${escapeHtml(edu.dateRange)}</div>
                            <div class="exp-location">${escapeHtml(edu.location)}</div>
                        </div>
                    </div>
                    <div class="exp-company">${escapeHtml(edu.institution)}</div>
                    ${edu.note ? `<p class="edu-note">${edu.note}</p>` : ''}
                </div>
            `).join('')}
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Key Projects</div>
            ${projectsOrder.map(id => projectsById[id]).filter(Boolean).map(project => `
                <div class="exp-entry">
                    <div class="exp-header">
                        <div class="exp-title">${escapeHtml(project.title)}</div>
                        <div class="exp-meta">
                            <div class="project-links">
                                ${project.links.map((l, i) => `${i > 0 ? '<span style="color:#94a3b8;">|</span>' : ''}<a href="${l.url}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`).join('')}
                            </div>
                        </div>
                    </div>
                    <ul class="exp-bullets">
                        ${project.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Publication &amp; Awards</div>
            ${data.awards.map(a => `<div class="award-item"><span class="award-dot"></span><span>${a}</span></div>`).join('')}
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Professional Certifications</div>
            ${data.certifications.map(c => `
                <div class="cert-row">
                    <span><strong>${escapeHtml(c.name)}</strong>${c.detail ? ' – ' + escapeHtml(c.detail) : ''}${c.verifyUrl ? ` &nbsp;<a href="${c.verifyUrl}" target="_blank" rel="noopener">Verify</a>` : ''}</span>
                    <span class="cert-date">${escapeHtml(c.date)}</span>
                </div>
            `).join('')}
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Conferences &amp; Events</div>
            ${data.conferences.map(c => `
                <div class="cert-row">
                    <span><strong>${escapeHtml(c.name)}</strong> – ${escapeHtml(c.detail)}</span>
                    <span class="cert-date">${escapeHtml(c.date)}</span>
                </div>
            `).join('')}
        </section>

        <section class="cv-section">
            <div class="cv-section-title">Leadership &amp; Languages</div>
            <p class="inline-list">${data.leadershipLanguages}</p>
        </section>

        <section class="cv-section">
            <div class="cv-section-title">References</div>
            ${data.references.map(r => `
                <div class="ref-item">
                    <div class="ref-name">${escapeHtml(r.name)}</div>
                    ${escapeHtml(r.role)}<br>
                    <a href="mailto:${r.email}">${escapeHtml(r.email)}</a><br>
                    ${escapeHtml(r.phone)}
                </div>
            `).join('')}
        </section>
    `;
}

function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
