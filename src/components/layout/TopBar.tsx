import { useEffect, useRef } from "react";
import { requireUser } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import { Avatar } from "../Avatar";
import { BirdSilhouette } from "../icons";
import { SignInMenu } from "./SignInMenu";

export function TopBar() {
  const { state, currentUserId, dispatch } = useAppState();
  const wrapRef = useRef<HTMLDivElement>(null);
  const me = requireUser(currentUserId);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      const node = wrapRef.current;
      if (node === null) {
        return;
      }
      if (event.target instanceof Node && !node.contains(event.target)) {
        dispatch({ type: "close-sign-in" });
        dispatch({ type: "close-account" });
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [dispatch]);

  if (!state.signedIn) {
    return (
      <header className="topbar">
        <div className="topbar-inner" ref={wrapRef}>
          <button
            type="button"
            aria-label="Twitter"
            onClick={() => {
              dispatch({ type: "open-profile", userId: "jack" });
            }}
          >
            <img src="/img/twitter-wordmark.png" alt="twitter" className="wordmark" />
          </button>
          <div className="relative">
            <button
              type="button"
              className="signin-btn"
              onClick={() => {
                if (state.signInOpen) {
                  dispatch({ type: "close-sign-in" });
                } else {
                  dispatch({ type: "open-sign-in" });
                }
              }}
            >
              Have an account? <b>Sign in</b>
              <span className="caret">▾</span>
            </button>
            {state.signInOpen ? <SignInMenu /> : null}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="topbar">
      <div className="topbar-inner" ref={wrapRef}>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Home"
            className="px-1 text-white"
            style={{ color: "#fff" }}
            onClick={() => {
              dispatch({ type: "set-view", view: "home" });
            }}
          >
            <BirdSilhouette size={22} />
          </button>
          <nav className="nav-links">
            <NavButton
              label="Home"
              active={state.view === "home"}
              onClick={() => {
                dispatch({ type: "set-view", view: "home" });
              }}
            />
            <NavButton
              label="Profile"
              active={state.view === "profile" && state.profileUserId === currentUserId}
              onClick={() => {
                dispatch({ type: "open-profile", userId: currentUserId });
              }}
            />
            <NavButton
              label="Messages"
              active={state.view === "messages"}
              onClick={() => {
                dispatch({ type: "set-view", view: "messages" });
              }}
            />
            <NavButton
              label="Who To Follow"
              active={state.view === "discover"}
              onClick={() => {
                dispatch({ type: "set-view", view: "discover" });
              }}
            />
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <input className="search" type="search" placeholder="Search" />
          <div className="relative">
            <button
              type="button"
              className="account-btn"
              onClick={() => {
                dispatch({ type: "toggle-account" });
              }}
            >
              <Avatar src={me.avatar} alt="" size={22} />
              {me.name}
              <span className="caret">▾</span>
            </button>
            {state.accountOpen ? (
              <div className="menu w-[180px]">
                <button
                  type="button"
                  className="action"
                  onClick={() => {
                    dispatch({ type: "open-profile", userId: currentUserId });
                  }}
                >
                  View profile
                </button>
                <div className="mt-2">
                  <button
                    type="button"
                    className="action"
                    onClick={() => {
                      dispatch({ type: "sign-out" });
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`nav-link${active ? " active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
