import { homeSuggestions, requireUser } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import { Avatar } from "../Avatar";

export function MessagesPage() {
  return (
    <div className="page">
      <div className="home-layout">
        <div className="home-main empty">
          <h1 className="mb-2 text-lg font-bold">Direct messages</h1>
          <p>You have no messages. In 2011 they arrived here, one conversation at a time.</p>
        </div>
      </div>
    </div>
  );
}

export function DiscoverPage() {
  const { state, dispatch } = useAppState();

  return (
    <div className="page">
      <div className="home-layout">
        <div className="home-main p-5">
          <h1 className="mb-3 text-lg font-bold">Who to follow</h1>
          {homeSuggestions.concat(["jack", "biz"]).map((id) => {
            const user = requireUser(id);
            const following = state.followedIds.includes(id);
            return (
              <div
                key={id}
                className="mb-3 flex items-center gap-3 border-b border-[#eee] pb-3"
              >
                <Avatar src={user.avatar} alt="" size={48} />
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    className="font-bold"
                    onClick={() => {
                      dispatch({ type: "open-profile", userId: id });
                    }}
                  >
                    {user.name}
                  </button>
                  <div className="meta">@{user.handle}</div>
                  <div className="text-[12px] text-[#666]">{user.bio}</div>
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
      </div>
    </div>
  );
}
