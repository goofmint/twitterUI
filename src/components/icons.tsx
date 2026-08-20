export function BirdSilhouette({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M23.2 5.2c-.8.4-1.7.6-2.6.7a4.4 4.4 0 0 0 1.9-2.4 8.7 8.7 0 0 1-2.8 1.1 4.4 4.4 0 0 0-7.5 4 12.5 12.5 0 0 1-9.1-4.6 4.4 4.4 0 0 0 1.4 5.9 4.3 4.3 0 0 1-2-.5v.1a4.4 4.4 0 0 0 3.5 4.3 4.4 4.4 0 0 1-2 .1 4.4 4.4 0 0 0 4.1 3.1 8.8 8.8 0 0 1-6.5 1.8A12.4 12.4 0 0 0 8.1 21c8.1 0 12.5-6.7 12.5-12.5v-.6c.9-.6 1.6-1.4 2.6-2.7z" />
    </svg>
  );
}

export function RetweetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 3 2 6h2v5h3V6h2L5 3zm6 10 3-3h-2V5H9v5H7l4 3z" />
    </svg>
  );
}

export function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.6 9.9 6h4.6l-3.7 2.8 1.4 4.6L8 10.8 3.8 13.4l1.4-4.6L1.5 6H6.1L8 1.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function ReplyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 8c0-3.3 2.7-5.5 6-5.5 3.2 0 6 2.1 6 5.5 0 2.2-1.4 3.9-3.4 4.8L12 15l-3.2-1.5C4.6 13.3 2 11 2 8z" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" aria-hidden="true">
      <rect x="0.6" y="0.6" width="9.8" height="12.8" rx="1.4" stroke="currentColor" />
      <circle cx="5.5" cy="11.2" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function RssIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <rect width="16" height="16" rx="2" fill="#f90" />
      <circle cx="4.2" cy="11.8" r="1.3" fill="#fff" />
      <path
        d="M3 7.2a5.6 5.6 0 0 1 5.8 5.8h2A7.6 7.6 0 0 0 3 5.2v2zm0-3.6A9.2 9.2 0 0 1 12.4 13h2A11.2 11.2 0 0 0 3 1.6v2z"
        fill="#fff"
      />
    </svg>
  );
}
