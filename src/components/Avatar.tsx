import type { User } from "../types";

export function Avatar({
  user,
  size,
}: {
  user: User;
  size: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold text-white select-none"
      style={{
        width: size,
        height: size,
        backgroundColor: user.avatarColor,
        fontSize: size * 0.34,
      }}
      aria-hidden="true"
    >
      {user.avatarInitials}
    </div>
  );
}
