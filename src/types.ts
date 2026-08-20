export type ViewId = "profile" | "home" | "messages" | "discover";

export type UserList = {
  slug: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  location: string;
  followingCount: number;
  followerCount: number;
  listedCount: number;
  tweetCount: number;
  lists: UserList[];
  followingAvatars: string[];
};

export type TweetTime =
  | { kind: "fixed"; label: string }
  | { kind: "relative"; createdAt: string };

export type Tweet = {
  id: string;
  authorId: string;
  text: string;
  time: TweetTime;
  source: string;
  favoriteCount: number;
  retweetCount: number;
  replyCount: number;
  retweetedByName: string | null;
  retweetedExtra: number;
  featured: boolean;
  onProfile: boolean;
};

export type PersistedState = {
  signedIn: boolean;
  tweets: Tweet[];
  favoriteIds: string[];
  retweetIds: string[];
  followedIds: string[];
};
