import { Search } from "lucide-react";
import { requireUser, suggestedUserIds, trends } from "../../data/mock";
import { formatCompactCount } from "../../lib/format";
import { useAppState } from "../../state/app-state";
import { Avatar } from "../Avatar";

export function RightSidebar() {
  const { state, dispatch } = useAppState();

  return (
    <aside className="sticky top-0 hidden h-screen w-[350px] shrink-0 overflow-y-auto pb-16 pl-7 right:block">
      <div className="sticky top-0 z-10 bg-app-bg py-1">
        <label className="flex h-[42px] items-center gap-3 rounded-full bg-app-search px-4 text-app-muted focus-within:bg-app-bg focus-within:ring-1 focus-within:ring-app-accent">
          <Search size={18.75} strokeWidth={2} />
          <input
            type="search"
            placeholder="キーワード検索"
            className="h-full w-full bg-transparent text-[15px] text-app-text outline-none placeholder:text-app-muted"
          />
        </label>
      </div>

      <section className="mt-3 overflow-hidden rounded-2xl bg-app-card">
        <h2 className="px-4 py-3 text-xl font-extrabold leading-6">
          いま起きていること
        </h2>
        {trends.map((trend) => (
          <button
            key={trend.id}
            type="button"
            className="flex w-full flex-col px-4 py-3 text-left hover:bg-app-hover"
          >
            <span className="text-[13px] leading-4 text-app-muted">
              {trend.category}
            </span>
            <span className="mt-0.5 text-[15px] font-bold leading-5">
              {trend.name}
            </span>
            <span className="mt-0.5 text-[13px] leading-4 text-app-muted">
              {formatCompactCount(trend.tweetCount)}件のツイート
            </span>
          </button>
        ))}
        <button
          type="button"
          className="w-full px-4 py-3 text-left text-[15px] text-app-accent hover:bg-app-hover"
        >
          さらに表示
        </button>
      </section>

      <section className="mt-4 overflow-hidden rounded-2xl bg-app-card">
        <h2 className="px-4 py-3 text-xl font-extrabold leading-6">
          おすすめユーザー
        </h2>
        {suggestedUserIds.map((userId) => {
          const user = requireUser(userId);
          const following = state.followedIds.includes(userId);
          return (
            <div
              key={user.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-app-hover"
            >
              <Avatar user={user} size={40} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-bold leading-5">
                  {user.name}
                </div>
                <div className="truncate text-[15px] leading-5 text-app-muted">
                  @{user.handle}
                </div>
              </div>
              <FollowButton
                following={following}
                onClick={() => {
                  dispatch({ type: "toggle-follow", userId });
                }}
              />
            </div>
          );
        })}
        <button
          type="button"
          className="w-full px-4 py-3 text-left text-[15px] text-app-accent hover:bg-app-hover"
        >
          さらに表示
        </button>
      </section>

      <nav className="mt-3 flex flex-wrap gap-x-3 gap-y-1 px-4 text-[13px] leading-5 text-app-muted">
        <a href="#terms" className="hover:underline">
          利用規約
        </a>
        <a href="#privacy" className="hover:underline">
          プライバシーポリシー
        </a>
        <a href="#cookies" className="hover:underline">
          Cookie
        </a>
        <a href="#ads" className="hover:underline">
          広告情報
        </a>
        <span>もっと見る</span>
        <span>© 2023 Twitter, Inc.</span>
      </nav>
    </aside>
  );
}

function FollowButton({
  following,
  onClick,
}: {
  following: boolean;
  onClick: () => void;
}) {
  if (following) {
    return (
      <button
        type="button"
        className="group h-8 min-w-[104px] rounded-full border border-app-border px-4 text-[14px] font-bold hover:border-[#f4212e] hover:bg-[#f4212e1a] hover:text-[#f4212e]"
        onClick={onClick}
      >
        <span className="group-hover:hidden">フォロー中</span>
        <span className="hidden group-hover:inline">フォロー解除</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      className="h-8 rounded-full bg-app-follow-bg px-4 text-[14px] font-bold text-app-follow-text hover:bg-app-follow-hover"
      onClick={onClick}
    >
      フォロー
    </button>
  );
}
