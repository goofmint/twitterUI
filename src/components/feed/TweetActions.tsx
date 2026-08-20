import {
  BarChart3,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
} from "lucide-react";
import type { ReactNode } from "react";
import { formatCompactCount } from "../../lib/format";
import { useAppState } from "../../state/app-state";
import type { Tweet } from "../../types";

export function TweetActions({ tweet }: { tweet: Tweet }) {
  const { state, dispatch } = useAppState();
  const liked = state.likedIds.includes(tweet.id);
  const reposted = state.repostedIds.includes(tweet.id);

  return (
    <div className="mt-3 flex w-full max-w-[425px] justify-between text-app-muted">
      <ActionButton
        label="返信"
        count={tweet.replyCount}
        iconHover="group-hover:bg-[#1d9bf01a] group-hover:text-app-accent"
        countHover="group-hover:text-app-accent"
        onClick={() => {
          dispatch({ type: "open-compose" });
        }}
      >
        <MessageCircle size={18.75} strokeWidth={2} />
      </ActionButton>
      <ActionButton
        label="リツイート"
        count={tweet.repostCount}
        active={reposted}
        activeClass="text-app-repost"
        iconHover="group-hover:bg-[#00ba7c1a] group-hover:text-app-repost"
        countHover="group-hover:text-app-repost"
        onClick={() => {
          dispatch({ type: "toggle-repost", tweetId: tweet.id });
        }}
      >
        <Repeat2 size={18.75} strokeWidth={2} />
      </ActionButton>
      <ActionButton
        label="いいね"
        count={tweet.likeCount}
        active={liked}
        activeClass="text-app-like"
        iconHover="group-hover:bg-[#f918801a] group-hover:text-app-like"
        countHover="group-hover:text-app-like"
        onClick={() => {
          dispatch({ type: "toggle-like", tweetId: tweet.id });
        }}
      >
        <Heart
          size={18.75}
          strokeWidth={2}
          fill={liked ? "currentColor" : "none"}
        />
      </ActionButton>
      <ActionButton
        label="表示回数"
        count={tweet.viewCount}
        iconHover="group-hover:bg-[#1d9bf01a] group-hover:text-app-accent"
        countHover="group-hover:text-app-accent"
      >
        <BarChart3 size={18.75} strokeWidth={2} />
      </ActionButton>
      <ActionButton
        label="共有"
        iconHover="group-hover:bg-[#1d9bf01a] group-hover:text-app-accent"
        countHover="group-hover:text-app-accent"
        onClick={() => {
          void navigator.clipboard.writeText(
            `https://twitter.com/${tweet.authorId}/status/${tweet.id}`,
          );
        }}
      >
        <Share size={18.75} strokeWidth={2} />
      </ActionButton>
    </div>
  );
}

function ActionButton({
  label,
  count,
  active,
  activeClass,
  iconHover,
  countHover,
  onClick,
  children,
}: {
  label: string;
  count?: number;
  active?: boolean;
  activeClass?: string;
  iconHover: string;
  countHover: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const showCount = count !== undefined && count > 0;
  return (
    <button
      type="button"
      aria-label={label}
      className={`group flex items-center whitespace-nowrap text-[13px] ${
        active === true && activeClass !== undefined ? activeClass : ""
      }`}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick !== undefined) {
          onClick();
        }
      }}
    >
      <span className={`rounded-full p-1.5 transition-colors ${iconHover}`}>
        {children}
      </span>
      {showCount ? (
        <span className={`px-1 ${countHover}`}>{formatCompactCount(count)}</span>
      ) : (
        <span className="w-3" />
      )}
    </button>
  );
}
