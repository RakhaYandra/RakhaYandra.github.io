import { useState } from "react";
import styles from "./ZoneContent.module.css";
import history from "../../data/history.json";
import skillsData from "../../data/skills.json";
import projectsData from "../../data/projects.json";
import certificates from "../../data/certificates.json";
import organizations from "../../data/organizations.json";
import publications from "../../data/publications.json";
import posts from "../../data/posts.json";
import faqs from "../../data/faq.json";
import educationContent from "../../data/education.json";
import { getImageUrl } from "../../utils";

const TABS = {
  about: [
    { id: "profile", label: "Profile" },
    { id: "faq", label: "FAQ" },
  ],
  projects: [
    { id: "work", label: "Projects" },
    { id: "certificates", label: "Certificates" },
  ],
  other: [
    { id: "education", label: "Education" },
    { id: "organizations", label: "Organizations" },
    { id: "publications", label: "Publications" },
    { id: "writing", label: "Writing" },
    { id: "contact", label: "Contact" },
  ],
};

const ALL_PROJECTS = Object.entries(projectsData.categories)
  .flatMap(([category, items]) =>
    items
      .filter((item) => !item.hidden)
      .map((item) => ({ ...item, category }))
  )
  .sort((a, b) => Number(b.featured) - Number(a.featured));

const SORTED_CERTIFICATES = [...certificates].sort(
  (a, b) => Number(b.featured) - Number(a.featured)
);

const { education: educationEntries, achievements } = educationContent;

const SKILL_CATEGORIES = Object.entries(skillsData.categories);

function Chips({ items, limit }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;
  return (
    <ul className={styles.chips}>
      {shown.map((item) => (
        <li key={item} className={styles.chip}>
          {item}
        </li>
      ))}
      {rest > 0 && <li className={styles.chip}>+{rest}</li>}
    </ul>
  );
}

function Profile() {
  const stats = [
    { value: "3.81", label: "GPA · Cum Laude" },
    { value: String(history.length), label: "Roles shipped" },
    { value: String(ALL_PROJECTS.length), label: "Projects" },
    { value: String(certificates.length), label: "Certificates" },
  ];

  return (
    <div className={styles.stack}>
      <p className={styles.lead}>
        Information Systems graduate (Cum Laude, Telkom University) working
        across backend engineering, systems analysis, and QA automation.
      </p>
      <p>
        I build with Go/Gin, ASP.NET Core, Blazor, and Laravel, then verify the
        result with Newman, Cypress, and Playwright harnesses before it reaches
        production. Experience spans Telkomsel, Technova Integrasi Solusi, Arna
        Teknologi Peduli, and Sagara Technology.
      </p>
      <p>
        Based in Medan (UTC+7). Open to remote, hybrid, on-site, or relocation
        roles in software engineering, systems analysis, QA, and IT consulting.
      </p>
      <dl className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.statValue}>{stat.value}</dt>
            <dd className={styles.statLabel}>{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Faq() {
  return (
    <div className={styles.stack}>
      {faqs.map((item) => (
        <details key={item.q} className={styles.faq}>
          <summary className={styles.faqQuestion}>{item.q}</summary>
          <p className={styles.faqAnswer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <ol className={styles.timeline}>
      {history.map((entry) => (
        <li key={`${entry.organisation}-${entry.startDate}`} className={styles.entry}>
          <div className={styles.entryHead}>
            {entry.imageSrc && (
              <img
                className={styles.logo}
                src={getImageUrl(entry.imageSrc)}
                alt=""
                loading="lazy"
              />
            )}
            <div>
              <h3 className={styles.entryTitle}>{entry.role}</h3>
              <p className={styles.meta}>
                {entry.organisation} · {entry.startDate} – {entry.endDate}
              </p>
            </div>
          </div>
          <ul className={styles.bullets}>
            {entry.experiences.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <Chips items={entry.techStack} />
        </li>
      ))}
    </ol>
  );
}

function Skills() {
  return (
    <div className={styles.stack}>
      <section>
        <h3 className={styles.sectionTitle}>Proficiency overview</h3>
        {skillsData.proficiencyOverview.map((item) => (
          <div key={item.category} className={styles.barRow}>
            <div className={styles.barHead}>
              <span>{item.category}</span>
              <span className={`${styles.meta} mono`}>{item.percentage}%</span>
            </div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${item.percentage}%` }} />
            </div>
            <p className={styles.meta}>{item.description}</p>
          </div>
        ))}
      </section>

      {SKILL_CATEGORIES.map(([category, items]) => (
        <section key={category}>
          <h3 className={styles.sectionTitle}>{category}</h3>
          <Chips items={items.map((item) => item.title)} />
        </section>
      ))}

      <section>
        <h3 className={styles.sectionTitle}>Currently learning</h3>
        {skillsData.currentlyLearning.map((item) => (
          <div key={item.title} className={styles.note}>
            <p className={styles.noteTitle}>
              {item.title} <span className={styles.meta}>· {item.status}</span>
            </p>
            <p className={styles.meta}>{item.description}</p>
            <Chips items={item.focusAreas} />
          </div>
        ))}
      </section>
    </div>
  );
}

function Projects() {
  return (
    <div className={styles.stack}>
      {ALL_PROJECTS.map((project) => {
        const links = Object.entries(project.links || {}).filter(([, url]) => url);
        return (
          <article key={`${project.category}-${project.title}`} className={styles.card}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={`${styles.meta} mono`}>
              {[
                project.category.toUpperCase(),
                project.workType && project.workType !== project.category
                  ? project.workType
                  : null,
                project.duration,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {project.myRole && <p className={styles.role}>{project.myRole}</p>}
            {project.outcome?.length > 0 && (
              <ul className={styles.bullets}>
                {project.outcome.slice(0, 2).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
            {project.skills?.length > 0 && <Chips items={project.skills} limit={5} />}
            {links.length > 0 && (
              <p className={styles.links}>
                {links.map(([kind, url]) => (
                  <a key={kind} href={url} target="_blank" rel="noopener noreferrer">
                    {kind} →
                  </a>
                ))}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

function Certificates() {
  return (
    <div className={styles.stack}>
      {SORTED_CERTIFICATES.map((item, index) => (
        <article key={`${item.title}-${index}`} className={styles.card}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={`${styles.meta} mono`}>
            {item.issuingOrganization.toUpperCase()} · {item.date}
          </p>
          {item.skills?.length > 0 && <Chips items={item.skills} limit={3} />}
          {item.verificationUrl && (
            <p className={styles.links}>
              <a href={item.verificationUrl} target="_blank" rel="noopener noreferrer">
                Verify credential →
              </a>
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function Education() {
  return (
    <div className={styles.stack}>
      {educationEntries.map((entry) => (
        <article key={entry.id} className={styles.card}>
          <h3 className={styles.cardTitle}>{entry.institution}</h3>
          <p className={`${styles.meta} mono`}>
            {entry.period} · {entry.location}
            {entry.gpa ? ` · GPA ${entry.gpa}` : ""}
          </p>
          <p className={styles.role}>
            {entry.degree} — {entry.major}
          </p>
          <p>{entry.description}</p>
          <Chips items={entry.highlights} />
        </article>
      ))}
      <section>
        <h3 className={styles.sectionTitle}>Achievements</h3>
        {achievements.map((item) => (
          <div key={item.title} className={styles.note}>
            <p className={styles.noteTitle}>
              <span className={styles.meta}>{item.label}</span> · {item.title}
            </p>
            <p className={styles.meta}>{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function Organizations() {
  return (
    <div className={styles.stack}>
      {organizations.map((item) => (
        <article key={item.name} className={styles.card}>
          <h3 className={styles.cardTitle}>{item.name}</h3>
          <p className={`${styles.meta} mono`}>
            {item.role} · {item.startDate} – {item.endDate}
          </p>
          <p>{item.description}</p>
          {item.achievements?.length > 0 && (
            <ul className={styles.bullets}>
              {item.achievements.slice(0, 2).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
          {item.website && (
            <p className={styles.links}>
              <a href={item.website} target="_blank" rel="noopener noreferrer">
                Organization →
              </a>
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function Publications() {
  return (
    <div className={styles.stack}>
      {publications.map((item) => (
        <article key={item.title} className={styles.card}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={`${styles.meta} mono`}>
            {item.type.toUpperCase()} · {item.publicationDate} · {item.status}
          </p>
          <p className={styles.role}>{item.venue}</p>
          <p>{item.takeaway}</p>
          <Chips items={item.keywords} />
          <p className={styles.links}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              DOI →
            </a>
          </p>
        </article>
      ))}
    </div>
  );
}

function Writing() {
  return (
    <div className={styles.stack}>
      {posts.map((post) => (
        <article key={post.slug} className={styles.card}>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          <p className={`${styles.meta} mono`}>{post.date}</p>
          <p>{post.summary}</p>
          <Chips items={post.tags} />
          {(post.links?.repo || post.links?.docs) && (
            <p className={styles.links}>
              {post.links.repo && (
                <a href={post.links.repo} target="_blank" rel="noopener noreferrer">
                  repo →
                </a>
              )}
              {post.links.docs && (
                <a href={post.links.docs} target="_blank" rel="noopener noreferrer">
                  docs →
                </a>
              )}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <div className={styles.stack}>
      <p className={styles.lead}>
        Open to full-time roles and contract work across software engineering,
        systems analysis, QA, and IT consulting.
      </p>
      <ul className={styles.channelList}>
        <li>
          <span className={styles.meta}>EMAIL</span>
          <a href="mailto:rakhaputrapebriyandra272@gmail.com">
            rakhaputrapebriyandra272@gmail.com
          </a>
        </li>
        <li>
          <span className={styles.meta}>LINKEDIN</span>
          <a
            href="https://www.linkedin.com/in/rakhaputrapebriyandra"
            target="_blank"
            rel="noopener noreferrer"
          >
            /in/rakhaputrapebriyandra
          </a>
        </li>
        <li>
          <span className={styles.meta}>GITHUB</span>
          <a
            href="https://github.com/RakhaYandra"
            target="_blank"
            rel="noopener noreferrer"
          >
            @RakhaYandra
          </a>
        </li>
      </ul>
      <p className={styles.meta}>
        Based in Medan, Indonesia (UTC+7) · remote, hybrid, on-site, or relocation.
      </p>
    </div>
  );
}

const PANELS = {
  profile: Profile,
  faq: Faq,
  experience: Experience,
  skills: Skills,
  work: Projects,
  certificates: Certificates,
  education: Education,
  organizations: Organizations,
  publications: Publications,
  writing: Writing,
  contact: Contact,
};

export function ZoneContent({ zoneKey }) {
  const tabs = TABS[zoneKey];
  const [active, setActive] = useState(tabs ? tabs[0].id : zoneKey);
  const Panel = PANELS[active] || PANELS[zoneKey];

  return (
    <>
      {tabs && (
        <div className={styles.tabs} role="tablist" aria-label="Zone details">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={`${styles.tab} ${active === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div className={styles.body}>
        <Panel />
      </div>
    </>
  );
}
