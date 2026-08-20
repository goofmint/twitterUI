import { formatCount } from "../../lib/format";
import { useAppState } from "../../state/app-state";
import type { User } from "../../types";
import { RssIcon } from "../icons";

export function ProfileSidebar({ user }: { user: User }) {
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

      <div className="nav-row active">
        <span>Tweets</span>
        <span className="count">{formatCount(user.tweetCount)}</span>
      </div>
      <button type="button" className="nav-row w-full text-left">
        Favorites
      </button>
      <div className="section-label">Lists</div>
      {user.lists.map((list) => (
        <a
          key={list.slug}
          href="#/"
          className="block"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          @{user.handle}/{list.name}
        </a>
      ))}
      <a
        href="#/"
        className="view-all"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        View all
      </a>

      <div className="section-label">Following</div>
      <div className="follow-grid">
        {user.followingAvatars.map((src, index) => (
          <img key={`${src}-${index.toString()}`} src={src} alt="" />
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
        <RssIcon /> RSS feed of {user.handle}&apos;s tweets
      </a>
    </aside>
  );
}
