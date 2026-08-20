export function Avatar({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: number;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="avatar avatar-sq"
      style={{ width: size, height: size }}
    />
  );
}
