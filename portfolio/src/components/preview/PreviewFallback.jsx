const PreviewFallback = ({ message }) => {
  return (
    <section className="preview-fallback" role="status">
      <p>{message}</p>
    </section>
  );
};

export default PreviewFallback;
