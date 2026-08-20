import { useState } from "react";
import { requireUser } from "../../data/mock";
import { TweetText } from "../../lib/tweet-text";
import { formatRelativeTime } from "../../lib/format";
import { useAppState } from "../../state/app-state";
import { TweetItem } from "../feed/TweetItem";
import { PromoBanner } from "./PromoBanner";
import { ProfileSidebar } from "./ProfileSidebar";

const INITIAL_COUNT = 19;

export function ProfilePage() {
  const { state, currentUserId } = useAppState();
  const user = requireUser(state.profileUserId);
  const now = Date.now();
  const [tab, setTab] = useState<"tweets" | "favorites">("tweets");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const tweets = state.tweets.filter((tweet) => {
    if (tweet.onProfile) {
      return tweet.authorId === user.id || tweet.retweetedByName === user.handle;
    }
    return (
      tweet.authorId === user.id &&
      tweet.time.kind === "relative" &&
      user.id === currentUserId
    );
  });
  const featured = tweets.find((tweet) => tweet.featured) ?? tweets[0];
  const rest = tweets.filter((tweet) => tweet.id !== featured?.id);
  const visibleRest = rest.slice(0, visibleCount);
  const hasMore = rest.length > visibleCount;

  const favoriteTweets = state.tweets.filter((tweet) =>
    state.favoriteIds.includes(tweet.id),
  );

  return (
    <div className="page">
      {state.signedIn ? null : <PromoBanner user={user} />}
      <div className={`profile-card${state.signedIn ? "" : " has-promo"}`}>
        <div className="profile-wrap">
          <div className="stream">
            <header className="profile-head">
              <img
                src={user.avatar}
                alt=""
                width={48}
                height={48}
                className="avatar avatar-sq"
              />
              <h1 className="profile-handle">{user.handle}</h1>
            </header>
            {tab === "favorites" ? (
              favoriteTweets.length === 0 ? (
                <p className="empty">No favorites yet.</p>
              ) : (
                favoriteTweets.map((tweet) => (
                  <TweetItem
                    key={tweet.id}
                    tweet={tweet}
                    now={now}
                    variant="profile"
                  />
                ))
              )
            ) : (
              <>
                {featured !== undefined ? (
                  <div className="featured">
                    <TweetText text={featured.text} className="featured-text" />
                    <p className="meta">
                      {featured.time.kind === "fixed"
                        ? featured.time.label
                        : formatRelativeTime(featured.time.createdAt, now)}{" "}
                      via {featured.source}
                    </p>
                  </div>
                ) : null}
                {visibleRest.map((tweet) => (
                  <TweetItem
                    key={tweet.id}
                    tweet={tweet}
                    now={now}
                    variant="profile"
                  />
                ))}
                {hasMore ? (
                  <button
                    type="button"
                    className="more-btn"
                    onClick={() => {
                      setVisibleCount((count) => count + 10);
                    }}
                  >
                    more
                  </button>
                ) : null}
              </>
            )}
          </div>
          <ProfileSidebar user={user} tab={tab} onTab={setTab} />
        </div>
      </div>
    </div>
  );
}
