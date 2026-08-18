import { Bell, Hash, House, Mail } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[53px] items-center justify-around border-t border-app-border bg-app-bg nav:hidden">
      <button type="button" aria-label="ホーム" className="p-3">
        <House size={26.25} strokeWidth={2} fill="currentColor" />
      </button>
      <button type="button" aria-label="話題を検索" className="p-3 text-app-muted">
        <Hash size={26.25} strokeWidth={2} />
      </button>
      <button type="button" aria-label="通知" className="relative p-3 text-app-muted">
        <Bell size={26.25} strokeWidth={2} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-app-accent" />
      </button>
      <button type="button" aria-label="メッセージ" className="p-3 text-app-muted">
        <Mail size={26.25} strokeWidth={2} />
      </button>
    </nav>
  );
}
