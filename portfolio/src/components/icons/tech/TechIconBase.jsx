import { iconSize } from '../../../constants/iconSizes';

export function TechIconBase({
  size = iconSize.md,
  className,
  viewBox,
  title,
  children,
  ...svgProps
}) {
  const ariaHidden = title ? undefined : true;

  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox={viewBox}
      role={title ? 'img' : undefined}
      aria-hidden={ariaHidden}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}
