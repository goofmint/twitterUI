import { requireUser } from "../../data/mock";
import { TweetText } from "../../lib/tweet-text";
import { formatRelativeTime } from "../../lib/format";
import { useAppState } from "../../state/app-state";
import { TweetItem } from "../feed/TweetItem";
import { PromoBanner } from "./PromoBanner";
import { ProfileSidebar } from "./ProfileSidebar";

export function ProfilePage() {
  const { state, currentUserId } = useAppState();
  const user = requireUser(state.profileUserId);
  const now = Date.now();
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

  return (
    <div className="page">
      {state.signedIn ? null : <PromoBanner user={user} />}
      <div className={`profile-wrap${state.signedIn ? "" : " has-promo"}`}>
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
          {rest.map((tweet) => (
            <TweetItem key={tweet.id} tweet={tweet} now={now} variant="profile" />
          ))}
        </div>
        <ProfileSidebar user={user} />
      </div>
    </div>
  );
}
