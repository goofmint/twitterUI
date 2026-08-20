import { Rss } from "lucide-react";
import { formatCount } from "../../lib/format";
import { useAppState } from "../../state/app-state";
import type { User } from "../../types";

export function ProfileSidebar({
  user,
  tab,
  onTab,
}: {
  user: User;
  tab: "tweets" | "favorites";
  onTab: (tab: "tweets" | "favorites") => void;
}) {
  const { state, currentUserId, dispatch } = useAppState();
  const following = state.followedIds.includes(user.id);
  const isSelf = user.id === currentUserId;

  return (
    <aside className="dash">
      <div className="dash-dl">
        <div className="dash-row">
          <span className="dash-k">Name</span>
          <span className="dash-v">{user.name}</span>
        </div>
        {user.location !== "" ? (
          <div className="dash-row">
            <span className="dash-k">Location</span>
            <span className="dash-v">{user.location}</span>
          </div>
        ) : null}
        {user.bio !== "" ? (
          <div className="dash-row">
            <span className="dash-k">Bio</span>
            <span className="dash-v">{user.bio}</span>
          </div>
        ) : null}
      </div>

      {state.signedIn && !isSelf ? (
        <button
          type="button"
          className={`btn-follow mb-3${following ? " on" : ""}`}
          onClick={() => {
            dispatch({ type: "toggle-follow", userId: user.id });
          }}
        >
          {following ? "Following" : "Follow"}
        </button>
      ) : null}

      <div className="stats">
        <button type="button" className="stat">
          <span className="stat-n">{formatCount(user.followingCount)}</span>
          <span className="stat-l">following</span>
        </button>
        <button type="button" className="stat">
          <span className="stat-n">{formatCount(user.followerCount)}</span>
          <span className="stat-l">followers</span>
        </button>
        <button type="button" className="stat">
          <span className="stat-n">{formatCount(user.listedCount)}</span>
          <span className="stat-l">listed</span>
        </button>
      </div>

      <button
        type="button"
        className={`nav-row w-full${tab === "tweets" ? " active" : ""}`}
        aria-current={tab === "tweets" ? "page" : undefined}
        onClick={() => {
          onTab("tweets");
        }}
      >
        <span>Tweets</span>
        <span className="count">{formatCount(user.tweetCount)}</span>
      </button>
      <button
        type="button"
        className={`nav-row w-full text-left${tab === "favorites" ? " active" : ""}`}
        aria-current={tab === "favorites" ? "page" : undefined}
        onClick={() => {
          onTab("favorites");
        }}
      >
        Favorites
      </button>

      <div className="section-label">Following</div>
      <div className="follow-list">
        {user.followingPeople.map((person) => (
          <div key={`${person.name}-${person.avatar}`} className="follow-row">
            <img src={person.avatar} alt="" />
            <span>{person.name}</span>
          </div>
        ))}
      </div>
      <a
        href="#/"
        className="view-all"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        View all...
      </a>

      <a
        href="#/"
        className="rss"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <span className="rss-icon">
          <Rss size={11} strokeWidth={2.5} />
        </span>
        RSS feed of {user.handle}&apos;s tweets
      </a>
    </aside>
  );
}
