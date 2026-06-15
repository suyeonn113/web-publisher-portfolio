const arrowPaths = {
  right: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  left: (
    <>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </>
  ),
  upRight: (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  up: (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
  down: (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
};

const ArrowIcon = ({
  direction = "right",
  className = "",
  title,
}) => {
  const paths = arrowPaths[direction] ?? arrowPaths.right;
  const accessibleProps = title
    ? { "aria-label": title, role: "img" }
    : { "aria-hidden": "true" };

  return (
    <svg
      className={["arrow-icon", className].filter(Boolean).join(" ")}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...accessibleProps}
    >
      {title ? <title>{title}</title> : null}
      {paths}
    </svg>
  );
};

export default ArrowIcon;
