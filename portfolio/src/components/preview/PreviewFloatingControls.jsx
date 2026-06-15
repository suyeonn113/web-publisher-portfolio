const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 17v5" />
    <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
  </svg>
);

const PinOffIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 17v5" />
    <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" />
    <path d="m2 2 20 20" />
    <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" />
  </svg>
);

const PreviewFloatingControls = ({
  isPageScrollLocked,
  onTogglePageScrollLock,
}) => {
  const label = isPageScrollLocked
    ? "Unlock page scroll"
    : "Lock page scroll";

  return (
    <div className="preview-floating-controls no-print">
      <button
        type="button"
        className={isPageScrollLocked ? "is-active" : ""}
        aria-label={label}
        aria-pressed={isPageScrollLocked}
        title={label}
        onClick={onTogglePageScrollLock}
      >
        {isPageScrollLocked ? <PinOffIcon /> : <PinIcon />}
      </button>
    </div>
  );
};

export default PreviewFloatingControls;
