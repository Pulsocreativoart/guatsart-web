type ArrowIconProps = {
  direction?: "left" | "right" | "down" | "up";
  className?: string;
};

const rotations = {
  right: 0,
  down: 90,
  left: 180,
  up: -90,
};

export function ArrowIcon({ direction = "right", className = "" }: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}
