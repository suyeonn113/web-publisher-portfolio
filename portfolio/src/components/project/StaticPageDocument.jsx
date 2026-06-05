const INTRO_LINES = [
  'I build responsive web pages with attention to structure, rhythm, and detail.',
  'My work connects planning, interface layout, and front-end implementation.',
  'Each project is shaped to feel clear, usable, and intentional across screens.',
];

function StaticPageDocument({ page = 'introduction', variant = 'full' }) {
  const isIntro = page === 'introduction';
  const title = isIntro ? 'Introduction' : 'Resume';

  return (
    <article className={`project-doc project-doc--${variant} project-doc--static`}>
      <section
        className={`project-doc__section ${isIntro ? 'project-doc__section--intro' : ''}`}
      >
        <p className="project-doc__eyebrow">{title}</p>
        {isIntro && (
          <div className="project-doc__static-copy">
            {INTRO_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}

export default StaticPageDocument;
