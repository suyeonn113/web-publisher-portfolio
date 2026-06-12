const PreviewStepNavigation = ({ steps, selectedStepId, onChange }) => {
  return (
    <nav className="preview-step-navigation" aria-label="리뷰 포인트">
      {steps.map((step, index) => (
        <button
          key={step.id}
          type="button"
          aria-pressed={selectedStepId === step.id}
          onClick={() => onChange(step.id)}
        >
          {index + 1}. {step.title}
        </button>
      ))}
    </nav>
  );
};

export default PreviewStepNavigation;
