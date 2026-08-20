import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  CURRENT_USER_ID,
  FEATURED_PROFILE_ID,
  initialTweets,
} from "../data/mock";
import type { PersistedState, Tweet, ViewId } from "../types";

const STORAGE_KEY = "twitterui-state-2010-v1";
const TWEET_MAX = 140;

type AppState = {
  signedIn: boolean;
  view: ViewId;
  profileUserId: string;
  tweets: Tweet[];
  favoriteIds: string[];
  retweetIds: string[];
  followedIds: string[];
  signInOpen: boolean;
  signUpOpen: boolean;
  accountOpen: boolean;
};

type Action =
  | { type: "open-sign-in" }
  | { type: "close-sign-in" }
  | { type: "open-sign-up" }
  | { type: "close-sign-up" }
  | { type: "toggle-account" }
  | { type: "close-account" }
  | { type: "sign-in" }
  | { type: "sign-out" }
  | { type: "set-view"; view: ViewId }
  | { type: "open-profile"; userId: string }
  | { type: "toggle-favorite"; tweetId: string }
  | { type: "toggle-retweet"; tweetId: string }
  | { type: "toggle-follow"; userId: string }
  | { type: "add-tweet"; text: string };

type AppContextValue = {
  state: AppState;
  currentUserId: string;
  tweetMax: number;
  dispatch: (action: Action) => void;
};

const AppStateContext = createContext<AppContextValue | null>(null);

function isPersistedState(value: PersistedState): boolean {
  return (
    typeof value.signedIn === "boolean" &&
    Array.isArray(value.tweets) &&
    Array.isArray(value.favoriteIds) &&
    Array.isArray(value.retweetIds) &&
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
      signedIn: false,
      view: "profile",
      profileUserId: FEATURED_PROFILE_ID,
      tweets: initialTweets,
      favoriteIds: [],
      retweetIds: [],
      followedIds: [],
      signInOpen: false,
      signUpOpen: false,
      accountOpen: false,
    };
  }
  return {
    signedIn: persisted.signedIn,
    view: persisted.signedIn ? "home" : "profile",
    profileUserId: FEATURED_PROFILE_ID,
    tweets: persisted.tweets,
    favoriteIds: persisted.favoriteIds,
    retweetIds: persisted.retweetIds,
    followedIds: persisted.followedIds,
    signInOpen: false,
    signUpOpen: false,
    accountOpen: false,
  };
}

function toggleId(ids: string[], id: string): string[] {
  if (ids.includes(id)) {
    return ids.filter((item) => item !== id);
  }
  return [...ids, id];
}

function updateCount(
  tweets: Tweet[],
  tweetId: string,
  key: "favoriteCount" | "retweetCount",
  delta: number,
): Tweet[] {
  return tweets.map((tweet) => {
    if (tweet.id !== tweetId) {
      return tweet;
    }
    return { ...tweet, [key]: tweet[key] + delta };
  });
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "open-sign-in":
      return { ...state, signInOpen: true, signUpOpen: false, accountOpen: false };
    case "close-sign-in":
      return { ...state, signInOpen: false };
    case "open-sign-up":
      return { ...state, signUpOpen: true, signInOpen: false };
    case "close-sign-up":
      return { ...state, signUpOpen: false };
    case "toggle-account":
      return { ...state, accountOpen: !state.accountOpen };
    case "close-account":
      return { ...state, accountOpen: false };
    case "sign-in":
      return {
        ...state,
        signedIn: true,
        view: "home",
        signInOpen: false,
        signUpOpen: false,
        accountOpen: false,
      };
    case "sign-out":
      return {
        ...state,
        signedIn: false,
        view: "profile",
        profileUserId: FEATURED_PROFILE_ID,
        signInOpen: false,
        accountOpen: false,
      };
    case "set-view":
      return { ...state, view: action.view, accountOpen: false, signInOpen: false };
    case "open-profile":
      return {
        ...state,
        view: "profile",
        profileUserId: action.userId,
        accountOpen: false,
        signInOpen: false,
      };
    case "toggle-favorite": {
      const on = state.favoriteIds.includes(action.tweetId);
      return {
        ...state,
        favoriteIds: toggleId(state.favoriteIds, action.tweetId),
        tweets: updateCount(state.tweets, action.tweetId, "favoriteCount", on ? -1 : 1),
      };
    }
    case "toggle-retweet": {
      const on = state.retweetIds.includes(action.tweetId);
      return {
        ...state,
        retweetIds: toggleId(state.retweetIds, action.tweetId),
        tweets: updateCount(state.tweets, action.tweetId, "retweetCount", on ? -1 : 1),
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
        time: { kind: "relative", createdAt: new Date().toISOString() },
        source: "web",
        favoriteCount: 0,
        retweetCount: 0,
        replyCount: 0,
        retweetedByName: null,
        retweetedExtra: 0,
        featured: false,
        onProfile: false,
      };
      return {
        ...state,
        tweets: [tweet, ...state.tweets],
      };
    }
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  useEffect(() => {
    const persisted: PersistedState = {
      signedIn: state.signedIn,
      tweets: state.tweets,
      favoriteIds: state.favoriteIds,
      retweetIds: state.retweetIds,
      followedIds: state.followedIds,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [
    state.signedIn,
    state.tweets,
    state.favoriteIds,
    state.retweetIds,
    state.followedIds,
  ]);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      currentUserId: CURRENT_USER_ID,
      tweetMax: TWEET_MAX,
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
