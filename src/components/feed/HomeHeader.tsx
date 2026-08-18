import { Settings, Sparkles } from "lucide-react";
import { requireUser } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import { Avatar } from "../Avatar";
import { TwitterBird } from "../TwitterBird";

export function HomeHeader({
  onOpenDisplay,
}: {
  onOpenDisplay: () => void;
}) {
  const { state, currentUserId, dispatch } = useAppState();
  const me = requireUser(currentUserId);

  return (
    <div className="sticky top-0 z-20 bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-xl">
      <div className="grid h-[53px] grid-cols-3 items-center px-4 nav:hidden">
        <Avatar user={me} size={32} />
        <TwitterBird className="justify-self-center text-app-accent" size={22} />
        <button
          type="button"
          aria-label="表示"
          className="justify-self-end rounded-full p-2 hover:bg-app-hover"
          onClick={onOpenDisplay}
        >
          <Settings size={20} strokeWidth={2} />
        </button>
      </div>
      <div className="hidden h-[53px] items-center justify-between px-4 nav:flex">
        <h1 className="text-xl font-bold">ホーム</h1>
        <button
          type="button"
          aria-label="タイムラインの設定"
          className="rounded-full p-2 hover:bg-app-hover"
          onClick={onOpenDisplay}
        >
          <Sparkles size={20} strokeWidth={2} />
        </button>
      </div>
      <div className="flex border-b border-app-border">
        <TabButton
          label="おすすめ"
          active={state.tab === "for-you"}
          onClick={() => {
            dispatch({ type: "set-tab", tab: "for-you" });
          }}
        />
        <TabButton
          label="フォロー中"
          active={state.tab === "following"}
          onClick={() => {
            dispatch({ type: "set-tab", tab: "following" });
          }}
        />
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative flex h-[53px] flex-1 items-center justify-center text-[15px] hover:bg-app-hover"
      onClick={onClick}
    >
      <span className={active ? "font-bold" : "font-medium text-app-muted"}>
        {label}
      </span>
      {active ? (
        <span className="absolute bottom-0 h-1 w-14 rounded-full bg-app-accent" />
      ) : null}
    </button>
  );
}
