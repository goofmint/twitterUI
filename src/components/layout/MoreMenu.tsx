import { useEffect, useRef } from "react";

const ITEMS = [
  { id: "communities", label: "コミュニティ", action: "none" },
  { id: "blue", label: "Twitter Blue", action: "none" },
  { id: "settings", label: "設定とプライバシー", action: "none" },
  { id: "display", label: "表示", action: "display" },
  { id: "shortcuts", label: "キーボードショートカット", action: "none" },
] as const;

export function MoreMenu({
  open,
  onClose,
  onOpenDisplay,
}: {
  open: boolean;
  onClose: () => void;
  onOpenDisplay: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (ref.current !== null && !ref.current.contains(target)) {
        onClose();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="absolute bottom-14 left-0 z-30 w-[318px] overflow-hidden rounded-2xl bg-app-bg py-1 shadow-[0_0_15px_rgba(101,119,134,0.2),0_0_3px_1px_rgba(101,119,134,0.15)]"
      role="menu"
    >
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className="flex w-full px-4 py-3 text-left text-[15px] font-bold hover:bg-app-hover"
          onClick={() => {
            if (item.action === "display") {
              onOpenDisplay();
            }
            onClose();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
