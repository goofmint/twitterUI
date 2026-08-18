import { BadgeCheck, MoreHorizontal } from "lucide-react";
import { requireUser } from "../../data/mock";
import { formatRelativeTime } from "../../lib/format";
import { TweetText } from "../../lib/tweet-text";
import type { Tweet } from "../../types";
import { Avatar } from "../Avatar";
import { TweetActions } from "./TweetActions";

export function TweetCard({ tweet, now }: { tweet: Tweet; now: number }) {
  const author = requireUser(tweet.authorId);

  return (
    <article className="flex gap-3 border-b border-app-border px-4 py-3 hover:bg-app-hover">
      <Avatar user={author} size={40} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-[15px] leading-5">
          <span className="truncate font-bold">{author.name}</span>
          {author.verified ? (
            <BadgeCheck
              size={18.75}
              className="shrink-0 text-app-accent"
              fill="currentColor"
              stroke="var(--bg)"
              strokeWidth={2}
            />
          ) : null}
          <span className="truncate text-app-muted">@{author.handle}</span>
          <span className="text-app-muted">·</span>
          <time className="shrink-0 text-app-muted" dateTime={tweet.createdAt}>
            {formatRelativeTime(tweet.createdAt, now)}
          </time>
          <button
            type="button"
            aria-label="その他"
            className="-mr-2 ml-auto rounded-full p-1 text-app-muted hover:bg-[#1d9bf01a] hover:text-app-accent"
          >
            <MoreHorizontal size={18.75} />
          </button>
        </div>
        <TweetText text={tweet.text} />
        {tweet.image !== undefined ? <TweetMedia image={tweet.image} /> : null}
        {tweet.quote !== undefined ? <QuoteCard quote={tweet.quote} /> : null}
        <TweetActions tweet={tweet} />
      </div>
    </article>
  );
}

function TweetMedia({
  image,
}: {
  image: { from: string; to: string; label: string };
}) {
  const isDataUrl = image.label.startsWith("data:");
  if (isDataUrl) {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border border-app-border">
        <img src={image.label} alt="" className="max-h-[510px] w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="mt-3 flex aspect-[16/9] items-end overflow-hidden rounded-2xl border border-app-border p-4 text-[15px] font-bold text-white"
      style={{
        backgroundImage: `linear-gradient(135deg, ${image.from}, ${image.to})`,
      }}
    >
      {image.label}
    </div>
  );
}

function QuoteCard({ quote }: { quote: { authorId: string; text: string } }) {
  const author = requireUser(quote.authorId);
  return (
    <div className="mt-3 rounded-2xl border border-app-border px-3 py-2">
      <div className="mb-1 flex items-center gap-1 text-[13px]">
        <Avatar user={author} size={20} />
        <span className="font-bold">{author.name}</span>
        <span className="text-app-muted">@{author.handle}</span>
      </div>
      <p className="text-[15px] leading-5">{quote.text}</p>
    </div>
  );
}
