import { formatRelativeTime } from "../../lib/format";
import { TweetText, TweetTextInline } from "../../lib/tweet-text";
import { requireUser } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import type { Tweet } from "../../types";
import { ReplyIcon, RetweetIcon, StarIcon } from "../icons";

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

  const body = (
    <>
      {tweet.retweetedByName !== null ? (
        <div className="rt-row">
          <span className="mt-[2px] text-[#bbb]">
            <RetweetIcon />
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
            <p className="meta mt-1">
              {timeLabel} via {tweet.source}
            </p>
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
            <Actions
              favorited={favorited}
              retweeted={retweeted}
              onReply={() => undefined}
              onRetweet={() => {
                dispatch({ type: "toggle-retweet", tweetId: tweet.id });
              }}
              onFavorite={() => {
                dispatch({ type: "toggle-favorite", tweetId: tweet.id });
              }}
            />
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
          <p className="meta mt-1">
            {timeLabel} via {tweet.source}
          </p>
          <Actions
            favorited={favorited}
            retweeted={retweeted}
            onReply={() => undefined}
            onRetweet={() => {
              dispatch({ type: "toggle-retweet", tweetId: tweet.id });
            }}
            onFavorite={() => {
              dispatch({ type: "toggle-favorite", tweetId: tweet.id });
            }}
          />
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
  onReply,
  onRetweet,
  onFavorite,
}: {
  favorited: boolean;
  retweeted: boolean;
  onReply: () => void;
  onRetweet: () => void;
  onFavorite: () => void;
}) {
  return (
    <div className="actions">
      <button type="button" className="action" onClick={onReply}>
        <ReplyIcon /> Reply
      </button>
      <button
        type="button"
        className={`action${retweeted ? " on" : ""}`}
        onClick={onRetweet}
      >
        <RetweetIcon /> {retweeted ? "Retweeted" : "Retweet"}
      </button>
      <button
        type="button"
        className={`action${favorited ? " on" : ""}`}
        onClick={onFavorite}
      >
        <StarIcon filled={favorited} /> {favorited ? "Favorited" : "Favorite"}
      </button>
    </div>
  );
}
