export type ThemeId = "default" | "dim" | "lights-out";

export type FeedTab = "for-you" | "following";

export type User = {
  id: string;
  name: string;
  handle: string;
  verified: boolean;
  avatarColor: string;
  avatarInitials: string;
};

export type TweetImage = {
  from: string;
  to: string;
  label: string;
};

export type QuoteTweet = {
  authorId: string;
  text: string;
};

export type Tweet = {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  viewCount: number;
  image?: TweetImage;
  quote?: QuoteTweet;
  feeds: FeedTab[];
};

export type Trend = {
  id: string;
  category: string;
  name: string;
  tweetCount: number;
};

export type PersistedState = {
  theme: ThemeId;
  tweets: Tweet[];
  likedIds: string[];
  repostedIds: string[];
  followedIds: string[];
};
