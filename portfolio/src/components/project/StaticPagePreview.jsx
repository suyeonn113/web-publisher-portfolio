import StaticPageDocument from './StaticPageDocument';

function StaticPagePreview({ page, registerNode }) {
  return (
    <div
      className="project-preview"
      data-project-preview={page}
      ref={(node) => registerNode(page, node)}
    >
      <div className="project-preview__scale">
        <StaticPageDocument page={page} variant="preview" />
      </div>
    </div>
  );
}

export default StaticPagePreview;
