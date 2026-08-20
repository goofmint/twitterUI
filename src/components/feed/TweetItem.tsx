import { MessageCircle, Repeat2, Star } from "lucide-react";
import { formatRelativeTime } from "../../lib/format";
import { TweetText, TweetTextInline } from "../../lib/tweet-text";
import { requireUser } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import type { Tweet } from "../../types";

export function TweetItem({
  tweet,
  now,
  variant,
}: {
  tweet: Tweet;
  now: number;
  variant: "profile" | "home";
}) {
  const { state, dispatch } = useAppState();
  const author = requireUser(tweet.authorId);
  const favorited = state.favoriteIds.includes(tweet.id);
  const retweeted = state.retweetIds.includes(tweet.id);
  const timeLabel =
    tweet.time.kind === "fixed"
      ? tweet.time.label
      : formatRelativeTime(tweet.time.createdAt, now);

  const meta = (
    <p className="meta mt-1">
      {timeLabel} via {tweet.source}
      {tweet.replyToHandle !== null ? (
        <>
          {" "}
          in reply to{" "}
          <a
            href="#/"
            className="tweet-link"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            {tweet.replyToHandle}
          </a>
        </>
      ) : null}
    </p>
  );

  const body = (
    <>
      {tweet.retweetedByName !== null ? (
        <div className="rt-row">
          <span className="mt-[2px] text-[#bbb]">
            <Repeat2 size={14} strokeWidth={2} />
          </span>
          <div>
            <p className="tweet-text">
              <a
                href="#/"
                className="rt-name tweet-link"
                onClick={(event) => {
                  event.preventDefault();
                  dispatch({ type: "open-profile", userId: tweet.authorId });
                }}
              >
                {author.handle}
              </a>{" "}
              <TweetTextInline text={tweet.text} />
            </p>
            {meta}
            <p className="meta">
              Retweeted by{" "}
              <a
                href="#/"
                className="tweet-link"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                {tweet.retweetedByName}
              </a>{" "}
              and {tweet.retweetedExtra.toString()} others
            </p>
            {state.signedIn ? (
              <Actions
                favorited={favorited}
                retweeted={retweeted}
                onRetweet={() => {
                  dispatch({ type: "toggle-retweet", tweetId: tweet.id });
                }}
                onFavorite={() => {
                  dispatch({ type: "toggle-favorite", tweetId: tweet.id });
                }}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <>
          {variant === "home" ? (
            <div className="mb-0.5">
              <button
                type="button"
                className="home-name"
                onClick={() => {
                  dispatch({ type: "open-profile", userId: author.id });
                }}
              >
                {author.name}
              </button>
              <span className="home-handle">@{author.handle}</span>
            </div>
          ) : null}
          <TweetText text={tweet.text} className="tweet-text" />
          {meta}
          {state.signedIn ? (
            <Actions
              favorited={favorited}
              retweeted={retweeted}
              onRetweet={() => {
                dispatch({ type: "toggle-retweet", tweetId: tweet.id });
              }}
              onFavorite={() => {
                dispatch({ type: "toggle-favorite", tweetId: tweet.id });
              }}
            />
          ) : null}
        </>
      )}
    </>
  );

  if (variant === "home") {
    return (
      <article className="home-tweet">
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "open-profile", userId: author.id });
          }}
        >
          <img
            src={author.avatar}
            alt=""
            width={48}
            height={48}
            className="avatar avatar-sq"
          />
        </button>
        <div className="min-w-0 flex-1">{body}</div>
      </article>
    );
  }

  return <article className="tweet">{body}</article>;
}

function Actions({
  favorited,
  retweeted,
  onRetweet,
  onFavorite,
}: {
  favorited: boolean;
  retweeted: boolean;
  onRetweet: () => void;
  onFavorite: () => void;
}) {
  return (
    <div className="actions">
      <button type="button" className="action">
        <MessageCircle size={13} strokeWidth={2} /> Reply
      </button>
      <button
        type="button"
        className={`action${retweeted ? " on" : ""}`}
        onClick={onRetweet}
      >
        <Repeat2 size={14} strokeWidth={2} /> {retweeted ? "Retweeted" : "Retweet"}
      </button>
      <button
        type="button"
        className={`action${favorited ? " on" : ""}`}
        onClick={onFavorite}
      >
        <Star
          size={13}
          strokeWidth={2}
          fill={favorited ? "currentColor" : "none"}
        />{" "}
        {favorited ? "Favorited" : "Favorite"}
      </button>
    </div>
  );
}
