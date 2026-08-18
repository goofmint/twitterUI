import {
  Bell,
  Bookmark,
  CircleEllipsis,
  Feather,
  Hash,
  House,
  Mail,
  MoreHorizontal,
  ScrollText,
  User,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { requireUser } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import { Avatar } from "../Avatar";
import { TwitterBird } from "../TwitterBird";
import { MoreMenu } from "./MoreMenu";

type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  badge?: number;
};

export function LeftSidebar({
  onOpenDisplay,
}: {
  onOpenDisplay: () => void;
}) {
  const { currentUserId, dispatch } = useAppState();
  const me = requireUser(currentUserId);
  const [moreOpen, setMoreOpen] = useState(false);

  const items: NavItem[] = [
    {
      id: "home",
      label: "ホーム",
      icon: <House size={26.25} strokeWidth={2} fill="currentColor" />,
      active: true,
    },
    {
      id: "explore",
      label: "話題を検索",
      icon: <Hash size={26.25} strokeWidth={2} />,
    },
    {
      id: "notifications",
      label: "通知",
      icon: <Bell size={26.25} strokeWidth={2} />,
      badge: 3,
    },
    {
      id: "messages",
      label: "メッセージ",
      icon: <Mail size={26.25} strokeWidth={2} />,
    },
    {
      id: "bookmarks",
      label: "ブックマーク",
      icon: <Bookmark size={26.25} strokeWidth={2} />,
    },
    {
      id: "lists",
      label: "リスト",
      icon: <ScrollText size={26.25} strokeWidth={2} />,
    },
    {
      id: "profile",
      label: "プロフィール",
      icon: <User size={26.25} strokeWidth={2} />,
    },
  ];

  return (
    <header className="sticky top-0 hidden h-screen w-[88px] shrink-0 flex-col justify-between px-2 py-1 nav:flex wide:w-[275px] wide:px-3">
      <div>
        <button
          type="button"
          aria-label="ホームへ"
          className="mb-0.5 flex h-[50px] w-[50px] items-center justify-center rounded-full text-app-accent hover:bg-[#1d9bf01a]"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <TwitterBird size={28} />
        </button>
        <nav className="flex flex-col">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group flex items-center"
              onClick={() => {
                if (item.id === "home") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <span className="relative flex items-center gap-5 rounded-full p-3 group-hover:bg-app-hover">
                <span className="relative">
                  {item.icon}
                  {item.badge !== undefined ? (
                    <span className="absolute -right-1.5 -top-1.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-app-accent px-1 text-[11px] font-bold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span
                  className={`hidden text-[20px] leading-6 wide:inline ${
                    item.active === true ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </span>
            </button>
          ))}
          <div className="relative">
            <button
              type="button"
              className="group flex items-center"
              onClick={() => {
                setMoreOpen((open) => !open);
              }}
            >
              <span className="flex items-center gap-5 rounded-full p-3 group-hover:bg-app-hover">
                <CircleEllipsis size={26.25} strokeWidth={2} />
                <span className="hidden text-[20px] leading-6 wide:inline">
                  もっと見る
                </span>
              </span>
            </button>
            <MoreMenu
              open={moreOpen}
              onClose={() => {
                setMoreOpen(false);
              }}
              onOpenDisplay={onOpenDisplay}
            />
          </div>
        </nav>
        <button
          type="button"
          className="mt-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-app-accent text-[17px] font-bold text-white hover:bg-[#1a8cd8] wide:w-[233px]"
          onClick={() => {
            dispatch({ type: "open-compose" });
          }}
        >
          <span className="wide:hidden">
            <Feather size={24} strokeWidth={2} />
          </span>
          <span className="hidden wide:inline">ツイートする</span>
        </button>
      </div>
      <button
        type="button"
        className="mb-3 flex items-center gap-3 rounded-full p-3 hover:bg-app-hover"
      >
        <Avatar user={me} size={40} />
        <span className="hidden min-w-0 flex-1 text-left wide:block">
          <span className="block truncate text-[15px] font-bold leading-5">
            {me.name}
          </span>
          <span className="block truncate text-[15px] leading-5 text-app-muted">
            @{me.handle}
          </span>
        </span>
        <MoreHorizontal
          size={18.75}
          className="hidden text-app-muted wide:block"
        />
      </button>
    </header>
  );
}
