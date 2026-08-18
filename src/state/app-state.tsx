import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { CURRENT_USER_ID, initialTweets } from "../data/mock";
import type { FeedTab, PersistedState, ThemeId, Tweet } from "../types";

const STORAGE_KEY = "twitterui-state-v1";

type AppState = {
  theme: ThemeId;
  tab: FeedTab;
  tweets: Tweet[];
  likedIds: string[];
  repostedIds: string[];
  followedIds: string[];
  composeOpen: boolean;
};

type Action =
  | { type: "set-theme"; theme: ThemeId }
  | { type: "set-tab"; tab: FeedTab }
  | { type: "toggle-like"; tweetId: string }
  | { type: "toggle-repost"; tweetId: string }
  | { type: "toggle-follow"; userId: string }
  | { type: "add-tweet"; text: string; imageSrc: string | null }
  | { type: "open-compose" }
  | { type: "close-compose" };

type AppContextValue = {
  state: AppState;
  currentUserId: string;
  dispatch: (action: Action) => void;
};

const AppStateContext = createContext<AppContextValue | null>(null);

function isThemeId(value: string): value is ThemeId {
  return value === "default" || value === "dim" || value === "lights-out";
}

function isPersistedState(value: PersistedState): boolean {
  return (
    isThemeId(value.theme) &&
    Array.isArray(value.tweets) &&
    Array.isArray(value.likedIds) &&
    Array.isArray(value.repostedIds) &&
    Array.isArray(value.followedIds)
  );
}

function loadPersisted(): PersistedState | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return null;
  }
  const parsed = JSON.parse(raw) as PersistedState;
  if (!isPersistedState(parsed)) {
    throw new Error("保存された状態の形式が不正です");
  }
  return parsed;
}

function createInitialState(): AppState {
  const persisted = loadPersisted();
  if (persisted === null) {
    return {
      theme: "default",
      tab: "for-you",
      tweets: initialTweets,
      likedIds: [],
      repostedIds: [],
      followedIds: [],
      composeOpen: false,
    };
  }
  return {
    theme: persisted.theme,
    tab: "for-you",
    tweets: persisted.tweets,
    likedIds: persisted.likedIds,
    repostedIds: persisted.repostedIds,
    followedIds: persisted.followedIds,
    composeOpen: false,
  };
}

function updateTweetCount(
  tweets: Tweet[],
  tweetId: string,
  key: "likeCount" | "repostCount",
  delta: number,
): Tweet[] {
  return tweets.map((tweet) => {
    if (tweet.id !== tweetId) {
      return tweet;
    }
    return {
      ...tweet,
      [key]: tweet[key] + delta,
    };
  });
}

function toggleId(ids: string[], id: string): string[] {
  if (ids.includes(id)) {
    return ids.filter((item) => item !== id);
  }
  return [...ids, id];
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "set-theme":
      return { ...state, theme: action.theme };
    case "set-tab":
      return { ...state, tab: action.tab };
    case "toggle-like": {
      const liked = state.likedIds.includes(action.tweetId);
      return {
        ...state,
        likedIds: toggleId(state.likedIds, action.tweetId),
        tweets: updateTweetCount(
          state.tweets,
          action.tweetId,
          "likeCount",
          liked ? -1 : 1,
        ),
      };
    }
    case "toggle-repost": {
      const reposted = state.repostedIds.includes(action.tweetId);
      return {
        ...state,
        repostedIds: toggleId(state.repostedIds, action.tweetId),
        tweets: updateTweetCount(
          state.tweets,
          action.tweetId,
          "repostCount",
          reposted ? -1 : 1,
        ),
      };
    }
    case "toggle-follow":
      return {
        ...state,
        followedIds: toggleId(state.followedIds, action.userId),
      };
    case "add-tweet": {
      const tweet: Tweet = {
        id: crypto.randomUUID(),
        authorId: CURRENT_USER_ID,
        text: action.text,
        createdAt: new Date().toISOString(),
        replyCount: 0,
        repostCount: 0,
        likeCount: 0,
        viewCount: 0,
        feeds: ["for-you", "following"],
      };
      if (action.imageSrc !== null) {
        tweet.image = {
          from: "#1D9BF0",
          to: "#0F1419",
          label: action.imageSrc,
        };
      }
      return {
        ...state,
        tweets: [tweet, ...state.tweets],
        composeOpen: false,
      };
    }
    case "open-compose":
      return { ...state, composeOpen: true };
    case "close-compose":
      return { ...state, composeOpen: false };
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);

  useEffect(() => {
    const persisted: PersistedState = {
      theme: state.theme,
      tweets: state.tweets,
      likedIds: state.likedIds,
      repostedIds: state.repostedIds,
      followedIds: state.followedIds,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [
    state.theme,
    state.tweets,
    state.likedIds,
    state.repostedIds,
    state.followedIds,
  ]);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      currentUserId: CURRENT_USER_ID,
      dispatch,
    }),
    [state],
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState(): AppContextValue {
  const value = useContext(AppStateContext);
  if (value === null) {
    throw new Error("AppStateProvider の外で useAppState が呼ばれました");
  }
  return value;
}
