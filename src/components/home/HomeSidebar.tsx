import { homeSuggestions, requireUser, trends } from "../../data/mock";
import { formatCount } from "../../lib/format";
import { useAppState } from "../../state/app-state";
import { Avatar } from "../Avatar";

export function HomeSidebar() {
  const { currentUserId, state, dispatch } = useAppState();
  const me = requireUser(currentUserId);

  return (
    <aside className="dash">
      <div className="module flex gap-2">
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "open-profile", userId: me.id });
          }}
        >
          <Avatar src={me.avatar} alt="" size={48} />
        </button>
        <div>
          <button
            type="button"
            className="font-bold"
            onClick={() => {
              dispatch({ type: "open-profile", userId: me.id });
            }}
          >
            {me.name}
          </button>
          <div className="text-[#888]">@{me.handle}</div>
          <div className="stats mt-2 mb-0 border-0 p-0">
            <span className="stat">
              <span className="stat-n">{formatCount(me.tweetCount)}</span>
              <span className="stat-l">tweets</span>
            </span>
            <span className="stat">
              <span className="stat-n">{formatCount(me.followingCount)}</span>
              <span className="stat-l">following</span>
            </span>
            <span className="stat">
              <span className="stat-n">{formatCount(me.followerCount)}</span>
              <span className="stat-l">followers</span>
            </span>
          </div>
        </div>
      </div>

      <div className="module">
        <h3>Trends</h3>
        {trends.map((trend) => (
          <div key={trend.name} className="mb-1">
            <a
              href="#/"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              {trend.name}
            </a>
            <div className="meta">{trend.countLabel}</div>
          </div>
        ))}
      </div>

      <div className="module">
        <h3>Who to follow</h3>
        {homeSuggestions.map((id) => {
          const user = requireUser(id);
          const following = state.followedIds.includes(id);
          return (
            <div key={id} className="who-row">
              <Avatar src={user.avatar} alt="" size={32} />
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  className="block truncate font-bold"
                  onClick={() => {
                    dispatch({ type: "open-profile", userId: id });
                  }}
                >
                  {user.name}
                </button>
                <div className="meta truncate">@{user.handle}</div>
              </div>
              <button
                type="button"
                className={`btn-follow${following ? " on" : ""}`}
                onClick={() => {
                  dispatch({ type: "toggle-follow", userId: id });
                }}
              >
                {following ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
