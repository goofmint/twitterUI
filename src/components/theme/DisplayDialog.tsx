import { X } from "lucide-react";
import { useAppState } from "../../state/app-state";
import type { ThemeId } from "../../types";

const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: "default", label: "デフォルト", swatch: "#FFFFFF" },
  { id: "dim", label: "ダークブルー", swatch: "#15202B" },
  { id: "lights-out", label: "ライトアウト", swatch: "#000000" },
];

export function DisplayDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, dispatch } = useAppState();

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-app-overlay pt-[5vh] nav:items-center nav:pt-0"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-labelledby="display-title"
        className="w-full max-w-[600px] rounded-2xl bg-app-bg px-6 pb-6 pt-3 shadow-xl nav:mx-4"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="mb-4 flex items-center gap-6">
          <button
            type="button"
            aria-label="閉じる"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-app-hover"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 id="display-title" className="text-xl font-bold">
            表示をカスタマイズ
          </h2>
        </div>
        <p className="mb-3 text-[13px] font-bold text-app-muted">背景</p>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-app-card p-3">
          {THEMES.map((theme) => {
            const selected = state.theme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                className={`flex h-[62px] items-center justify-center gap-2 rounded-md border-2 text-[13px] font-bold ${
                  selected
                    ? "border-app-accent"
                    : "border-transparent"
                }`}
                style={{
                  backgroundColor: theme.swatch,
                  color: theme.id === "default" ? "#0F1419" : "#E7E9EA",
                }}
                onClick={() => {
                  dispatch({ type: "set-theme", theme: theme.id });
                }}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    selected
                      ? "border-app-accent bg-app-accent text-white"
                      : "border-app-muted"
                  }`}
                >
                  {selected ? "✓" : ""}
                </span>
                {theme.label}
              </button>
            );
          })}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="h-[36px] rounded-full bg-app-accent px-4 text-[15px] font-bold text-white hover:bg-[#1a8cd8]"
            onClick={onClose}
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
}
