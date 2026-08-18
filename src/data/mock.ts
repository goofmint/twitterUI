import type { FeedTab, Trend, Tweet, User } from "../types";

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

export const CURRENT_USER_ID = "me";

export const users: User[] = [
  {
    id: "me",
    name: "kanna",
    handle: "kanna_dev",
    verified: false,
    avatarColor: "#1D9BF0",
    avatarInitials: "ka",
  },
  {
    id: "hikari",
    name: "ひかり",
    handle: "hikari_note",
    verified: true,
    avatarColor: "#FF7A00",
    avatarInitials: "ひ",
  },
  {
    id: "kenji",
    name: "Kenji Sato",
    handle: "kenji_s",
    verified: false,
    avatarColor: "#7856FF",
    avatarInitials: "Ks",
  },
  {
    id: "umi",
    name: "海",
    handle: "umi_photo",
    verified: true,
    avatarColor: "#00BA7C",
    avatarInitials: "海",
  },
  {
    id: "mocha",
    name: "mocha",
    handle: "mocha_lab",
    verified: false,
    avatarColor: "#F91880",
    avatarInitials: "mo",
  },
  {
    id: "ryo",
    name: "りょう",
    handle: "ryo_build",
    verified: false,
    avatarColor: "#FFAD1F",
    avatarInitials: "り",
  },
  {
    id: "flash",
    name: "開発速報",
    handle: "dev_flash",
    verified: true,
    avatarColor: "#1D9BF0",
    avatarInitials: "速",
  },
  {
    id: "sora",
    name: "Sora",
    handle: "sora_design",
    verified: true,
    avatarColor: "#794BC4",
    avatarInitials: "So",
  },
  {
    id: "nori",
    name: "のり",
    handle: "nori_log",
    verified: false,
    avatarColor: "#00A8B3",
    avatarInitials: "の",
  },
];

export const usersById: Record<string, User> = Object.fromEntries(
  users.map((user) => [user.id, user]),
);

export function requireUser(userId: string): User {
  const user = usersById[userId];
  if (user === undefined) {
    throw new Error(`ユーザーが見つかりません: ${userId}`);
  }
  return user;
}

const both: FeedTab[] = ["for-you", "following"];
const forYou: FeedTab[] = ["for-you"];
const following: FeedTab[] = ["following"];

export const initialTweets: Tweet[] = [
  {
    id: "t1",
    authorId: "hikari",
    text: "朝の電車で Chirp のことを思い出した。文字が大きくて、青が少なくて、タイムラインが妙に静かに見えたあの頃。",
    createdAt: minutesAgo(4),
    replyCount: 18,
    repostCount: 42,
    likeCount: 318,
    viewCount: 12840,
    feeds: both,
  },
  {
    id: "t2",
    authorId: "flash",
    text: "【話題】フロントエンドの話が止まらない一日。#TypeScript の型で落とすか、見た目で落とすか。",
    createdAt: minutesAgo(18),
    replyCount: 56,
    repostCount: 210,
    likeCount: 1402,
    viewCount: 98210,
    feeds: forYou,
  },
  {
    id: "t3",
    authorId: "umi",
    text: "湾岸の風が強くて、カメラを出す指が冷たい。それでもこの光は逃せない。",
    createdAt: minutesAgo(37),
    replyCount: 24,
    repostCount: 88,
    likeCount: 964,
    viewCount: 22150,
    image: {
      from: "#1D9BF0",
      to: "#15202B",
      label: "湾岸の青い光",
    },
    feeds: both,
  },
  {
    id: "t4",
    authorId: "kenji",
    text: "3カラムは贅沢だ。左に居場所、中央に本文、右に世界のざわめき。スマホだと全部が一つの川になる。",
    createdAt: minutesAgo(72),
    replyCount: 9,
    repostCount: 31,
    likeCount: 256,
    viewCount: 8430,
    quote: {
      authorId: "sora",
      text: "余白は装飾じゃない。視線の休憩所。",
    },
    feeds: following,
  },
  {
    id: "t5",
    authorId: "mocha",
    text: "実験ノート: いいねのピンクは #F91880。リツイートの緑は #00BA7C。覚えたら、タイムラインの感情が色で読める。",
    createdAt: minutesAgo(110),
    replyCount: 14,
    repostCount: 67,
    likeCount: 501,
    viewCount: 15602,
    feeds: forYou,
  },
  {
    id: "t6",
    authorId: "sora",
    text: "ボタンはピル、境界はヘアライン、影はほぼ捨てる。2023年の twitter.com は、それだけで成立していた。",
    createdAt: minutesAgo(180),
    replyCount: 41,
    repostCount: 190,
    likeCount: 2104,
    viewCount: 64012,
    feeds: both,
  },
  {
    id: "t7",
    authorId: "ryo",
    text: "「いまどうしてる？」に何も書けない日がある。空白のまま、280のリングだけが回っている感じ。",
    createdAt: minutesAgo(260),
    replyCount: 33,
    repostCount: 12,
    likeCount: 428,
    viewCount: 9904,
    feeds: following,
  },
  {
    id: "t8",
    authorId: "nori",
    text: "フォロー中タブは日記。おすすめタブは広場。同じアプリなのに、開くタブで街の音が変わる。",
    createdAt: minutesAgo(400),
    replyCount: 7,
    repostCount: 22,
    likeCount: 173,
    viewCount: 5408,
    feeds: both,
  },
  {
    id: "t9",
    authorId: "flash",
    text: "表示回数の数字がタイムラインに乗ったのは、もう「見る」ことが反応の一種だと認めたからだろう。",
    createdAt: minutesAgo(540),
    replyCount: 88,
    repostCount: 304,
    likeCount: 3560,
    viewCount: 210445,
    feeds: forYou,
  },
  {
    id: "t10",
    authorId: "hikari",
    text: "カフェのWi-Fiが細い。それでもタイムラインは先に絵を出す。テキストは後から追いつく。",
    createdAt: minutesAgo(700),
    replyCount: 5,
    repostCount: 9,
    likeCount: 86,
    viewCount: 3210,
    image: {
      from: "#FFAD1F",
      to: "#F91880",
      label: "午後の窓",
    },
    feeds: following,
  },
  {
    id: "t11",
    authorId: "kenji",
    text: "Shipping a small UI recreation tonight. No backend, just the feeling of opening twitter.com in 2023.",
    createdAt: minutesAgo(900),
    replyCount: 11,
    repostCount: 18,
    likeCount: 142,
    viewCount: 6120,
    feeds: both,
  },
  {
    id: "t12",
    authorId: "umi",
    text: "写真より、誰かが写真の下に書いた一文のほうが残ることがある。",
    createdAt: minutesAgo(1400),
    replyCount: 19,
    repostCount: 44,
    likeCount: 733,
    viewCount: 18770,
    feeds: forYou,
  },
  {
    id: "t13",
    authorId: "sora",
    text: "ライトアウトは OLED のための黒。ダークブルーは夜の部屋のための紺。デフォルトは昼の紙。",
    createdAt: minutesAgo(1800),
    replyCount: 27,
    repostCount: 76,
    likeCount: 890,
    viewCount: 27440,
    feeds: both,
  },
  {
    id: "t14",
    authorId: "mocha",
    text: "検証バッジが青いままの時期が好きだった。意味が揺れる前の、ただの小さな確認。",
    createdAt: minutesAgo(2400),
    replyCount: 63,
    repostCount: 151,
    likeCount: 1208,
    viewCount: 43002,
    feeds: forYou,
  },
];

export const trends: Trend[] = [
  {
    id: "tr1",
    category: "テクノロジー · トレンド",
    name: "#TypeScript",
    tweetCount: 48210,
  },
  {
    id: "tr2",
    category: "日本のトレンド",
    name: "桜",
    tweetCount: 128403,
  },
  {
    id: "tr3",
    category: "プログラミング · トレンド",
    name: "Vite",
    tweetCount: 19604,
  },
  {
    id: "tr4",
    category: "デザイン · トレンド",
    name: "3カラム",
    tweetCount: 8422,
  },
  {
    id: "tr5",
    category: "エンターテインメント · トレンド",
    name: "深夜ラジオ",
    tweetCount: 22150,
  },
];

export const suggestedUserIds = ["sora", "flash", "umi"];
