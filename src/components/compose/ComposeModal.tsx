import { X } from "lucide-react";
import { useAppState } from "../../state/app-state";
import { ComposeBox } from "../feed/ComposeBox";

export function ComposeModal() {
  const { state, dispatch } = useAppState();

  if (!state.composeOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-app-overlay pt-0 nav:pt-10">
      <div
        role="dialog"
        aria-label="ツイートする"
        className="h-full w-full bg-app-bg nav:h-auto nav:max-w-[600px] nav:rounded-2xl"
      >
        <div className="flex items-center px-2 pt-2">
          <button
            type="button"
            aria-label="閉じる"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-app-hover"
            onClick={() => {
              dispatch({ type: "close-compose" });
            }}
          >
            <X size={20} />
          </button>
        </div>
        <ComposeBox
          variant="modal"
          onPosted={() => {
            dispatch({ type: "close-compose" });
          }}
        />
      </div>
    </div>
  );
}
