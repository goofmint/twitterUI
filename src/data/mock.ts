import type { FollowPerson, SimplePage, Tweet, User } from "../types";

const followingPeople: FollowPerson[] = [
  { name: "satoruk", avatar: "/img/follow-01.png" },
  { name: "YOICHIRO SHIBA", avatar: "/img/follow-02.png" },
  { name: "phy  金子 貴洋", avatar: "/img/follow-03.png" },
  { name: "OKAZAKI Hiroki", avatar: "/img/follow-04.png" },
  { name: "Takahiko Tamura", avatar: "/img/follow-05.png" },
  { name: "藤枝 哲哉", avatar: "/img/follow-06.png" },
  { name: "Wataru_HASHIMOTO", avatar: "/img/follow-07.png" },
  { name: "Hajime Tsunoo", avatar: "/img/follow-08.png" },
  { name: "阪子泰三", avatar: "/img/follow-09.png" },
  { name: "Antonio Kamiya", avatar: "/img/follow-10.png" },
  { name: "Lin Kobayashi 神近 まり", avatar: "/img/follow-11.png" },
  { name: "kei_ef_2000", avatar: "/img/follow-12.png" },
  { name: "富木伸一 @横浜のホームページコンサル", avatar: "/img/follow-13.png" },
  { name: "noopable りゅう", avatar: "/img/follow-14.png" },
  { name: "あかさん(いよう)", avatar: "/img/follow-15.png" },
  { name: "akulog.com", avatar: "/img/follow-16.png" },
  { name: "Kumazawh", avatar: "/img/follow-17.png" },
  { name: "津村 カツシ こーすけ", avatar: "/img/follow-18.png" },
  { name: "Eiko undermooountain", avatar: "/img/follow-19.png" },
  { name: "nakazi 大崎 光一", avatar: "/img/follow-20.png" },
  { name: "rolling_star", avatar: "/img/follow-21.png" },
  { name: "luca di occhi", avatar: "/img/follow-22.png" },
];

export const CURRENT_USER_ID = "me";
export const FEATURED_PROFILE_ID = "moongift";

export const users: User[] = [
  {
    id: "me",
    name: "kanna",
    handle: "kanna",
    avatar: "/img/me.png",
    bio: "Making little interfaces.",
    location: "Tokyo",
    followingCount: 86,
    followerCount: 142,
    listedCount: 3,
    tweetCount: 19,
    followingPeople: followingPeople.slice(0, 8),
  },
  {
    id: "moongift",
    name: "Atsushi Nakatsugawa",
    handle: "moongift",
    avatar: "/img/moongift.png",
    bio: "",
    location: "Yokohama, Japan",
    followingCount: 1372,
    followerCount: 3598,
    listedCount: 338,
    tweetCount: 10974,
    followingPeople,
  },
  {
    id: "ev",
    name: "Ev Williams",
    handle: "ev",
    avatar: "/img/ev.png",
    bio: "Co-founder of Twitter.",
    location: "San Francisco",
    followingCount: 980,
    followerCount: 1400000,
    listedCount: 8000,
    tweetCount: 4200,
    followingPeople: followingPeople.slice(2, 12),
  },
  {
    id: "biz",
    name: "Biz Stone",
    handle: "biz",
    avatar: "/img/biz.png",
    bio: "Co-founder of Twitter.",
    location: "San Francisco",
    followingCount: 760,
    followerCount: 900000,
    listedCount: 5100,
    tweetCount: 3100,
    followingPeople: followingPeople.slice(1, 11),
  },
  {
    id: "hikari",
    name: "Hikari",
    handle: "hikari",
    avatar: "/img/hikari.png",
    bio: "Notes from the train.",
    location: "Osaka",
    followingCount: 210,
    followerCount: 980,
    listedCount: 8,
    tweetCount: 640,
    followingPeople: followingPeople.slice(3, 13),
  },
  {
    id: "sora",
    name: "Sora",
    handle: "sora",
    avatar: "/img/sora.png",
    bio: "Designer.",
    location: "Kyoto",
    followingCount: 155,
    followerCount: 720,
    listedCount: 5,
    tweetCount: 301,
    followingPeople: followingPeople.slice(6, 16),
  },
  {
    id: "mocha",
    name: "mocha",
    handle: "mocha",
    avatar: "/img/mocha.png",
    bio: "Small experiments.",
    location: "Fukuoka",
    followingCount: 98,
    followerCount: 410,
    listedCount: 1,
    tweetCount: 177,
    followingPeople: followingPeople.slice(5, 15),
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

function tweet(partial: {
  id: string;
  authorId: string;
  text: string;
  time: Tweet["time"];
  source: string;
  replyToHandle?: string | null;
  featured?: boolean;
  onProfile?: boolean;
}): Tweet {
  return {
    favoriteCount: 0,
    retweetCount: 0,
    replyCount: 0,
    retweetedByName: null,
    retweetedExtra: 0,
    featured: false,
    onProfile: true,
    replyToHandle: null,
    ...partial,
  };
}

export const initialTweets: Tweet[] = [
  tweet({
    id: "t1",
    authorId: "moongift",
    text: "買い物中 (@ セブンイレブン 相模原津久井青野原店)\nhttp://4sq.com/c4lxnx",
    time: { kind: "fixed", label: "about 5 hours ago" },
    source: "foursquare",
    featured: true,
  }),
  tweet({
    id: "t2",
    authorId: "moongift",
    text: "意外とハマる？Egg Chess for iPhone「Fnurgletoe」: FnurgletoeはiPhone用のオープンソース・ソフトウェア。暇つぶしになるゲームが手元にあるととても便利だ。ちょっと時間の空いた時に楽しめ... http://bit.ly/aV922d",
    time: { kind: "fixed", label: "about 6 hours ago" },
    source: "twitterfeed",
  }),
  tweet({
    id: "t3",
    authorId: "moongift",
    text: "@megumeru ネットを使えば大して難しくないかと。既に日本に依存しないサービスは多数ありますからね。",
    time: { kind: "fixed", label: "about 8 hours ago" },
    source: "Echofon",
    replyToHandle: "megumeru",
  }),
  tweet({
    id: "t4",
    authorId: "moongift",
    text: "@megumeru 生活圏としてはやはり慣れている分、楽なんですよね。特に言語の壁は大きい。でも経済圏で一つの国に固執するのはリスキーになっているんじゃないかと感じる事があります。",
    time: { kind: "fixed", label: "about 9 hours ago" },
    source: "Echofon",
    replyToHandle: "megumeru",
  }),
  tweet({
    id: "t5",
    authorId: "moongift",
    text: "@nailixat Thank you for your msg! Good job! I'm managing my site for English too. My post translate to English soon :-)\nhttp://bit.ly/9hAa6z",
    time: { kind: "fixed", label: "about 9 hours ago" },
    source: "Echofon",
    replyToHandle: "nailixat",
  }),
  tweet({
    id: "t6",
    authorId: "moongift",
    text: "おお、転職サービスの中の人にも言及されている。これは嬉しい。\nhttp://bit.ly/drs1Z8",
    time: { kind: "fixed", label: "about 9 hours ago" },
    source: "Echofon",
  }),
  tweet({
    id: "t7",
    authorId: "moongift",
    text: "@FDmountwill 個人的には閉塞とは捉えていません。ただやり方が変わったのだと。その変化についていけない企業、個人が従来の方法でうまくいかない所を閉塞的に感じているのかな、と。ハローワークの時代でもないでしょうし。",
    time: { kind: "fixed", label: "about 9 hours ago" },
    source: "Echofon",
    replyToHandle: "FDmountwill",
  }),
  tweet({
    id: "t8",
    authorId: "moongift",
    text: "@megumeru 選択肢の一つではないでしょうか。後は経済圏だけ世界に求めるとか。ただ少なくとも国と個人は有事の際でもない限り、一蓮托生という訳ではないと思います。",
    time: { kind: "fixed", label: "about 9 hours ago" },
    source: "Echofon",
    replyToHandle: "megumeru",
  }),
  tweet({
    id: "t9",
    authorId: "moongift",
    text: "各種ブラウザの機能拡張を共通化「FireBreath」: FireBreathはFirefox/Google Chrome/Safari用のオープンソース・ソフトウェア。ITの世界ではメタ化と分散化が絶えず繰り返されている。類似... http://bit.ly/cR0rkp",
    time: { kind: "fixed", label: "about 18 hours ago" },
    source: "twitterfeed",
  }),
  tweet({
    id: "t10",
    authorId: "moongift",
    text: "@yuji_sk いや無理でしょ。はじめから胡散くさいし、今はさらに酷くなっているww",
    time: { kind: "fixed", label: "about 18 hours ago" },
    source: "Echofon",
    replyToHandle: "yuji_sk",
  }),
  tweet({
    id: "t11",
    authorId: "moongift",
    text: "@yuji_sk はじめから期待していないし、本気で日本を駄目にしようとしていると思っているよw とは言え、自民→真綿で死ぬ、民主→銃で死ぬ、くらいの違いだとは思ったけど",
    time: { kind: "fixed", label: "about 18 hours ago" },
    source: "Echofon",
    replyToHandle: "yuji_sk",
  }),
  tweet({
    id: "t12",
    authorId: "moongift",
    text: "とりあえず完了。10189バイト。5000文字くらいか。週明けの火曜日に流す予定。",
    time: { kind: "fixed", label: "about 18 hours ago" },
    source: "Echofon",
  }),
  tweet({
    id: "t13",
    authorId: "moongift",
    text: "@yuji_sk www さすがにこのまま終わらず、年内で何か反応があると思うけどね。あれだけ注目を集めつつ、無能ぶりで国民に飽きさせるという戦略はとても凄いと思ったw",
    time: { kind: "fixed", label: "about 19 hours ago" },
    source: "Echofon",
    replyToHandle: "yuji_sk",
  }),
  tweet({
    id: "t14",
    authorId: "moongift",
    text: "@yuji_sk なななんで？w 早く分裂しては思うけどw",
    time: { kind: "fixed", label: "about 19 hours ago" },
    source: "Echofon",
    replyToHandle: "yuji_sk",
  }),
  tweet({
    id: "t15",
    authorId: "moongift",
    text: "次のTwicusを書きためていたら、46ツイート、8617 byte（全角にして4300文字）までいってしまったww",
    time: { kind: "fixed", label: "about 19 hours ago" },
    source: "Echofon",
  }),
  tweet({
    id: "t16",
    authorId: "moongift",
    text: "@kimukou_26 ぬぬ？会社の話はあくまでも笑い話です。",
    time: { kind: "fixed", label: "about 20 hours ago" },
    source: "Echofon",
    replyToHandle: "kimukou_26",
  }),
  tweet({
    id: "t17",
    authorId: "moongift",
    text: "@yositosi デコった後などでTwitterへ投稿にチェックが入っていると、ツイートが成功した後でTogetterに保存されるようになっているようで、ツイートのレスポンスが遅いとエラーになってしまうことが。逆だととりあえず保存はされるので嬉しいです（あくまでも要望として）",
    time: { kind: "fixed", label: "about 20 hours ago" },
    source: "Echofon",
  }),
  tweet({
    id: "t18",
    authorId: "moongift",
    text: "@yositosi 要望としてなのですがまとめたツイートのつぶやきのRe押したとき 直下に返信フォームが出てほしいがあると嬉しいです。TwitterのWebサイトに飛んで入力するのが煩わしくて（元ツイートが読めなかったり）",
    time: { kind: "fixed", label: "about 20 hours ago" },
    source: "Echofon",
  }),
  tweet({
    id: "t19",
    authorId: "moongift",
    text: "@kimukou_26 ありがとうございますー。そうですね。要望として出してみたいと思います！",
    time: { kind: "fixed", label: "about 20 hours ago" },
    source: "Echofon",
    replyToHandle: "kimukou_26",
  }),
  tweet({
    id: "t20",
    authorId: "moongift",
    text: "@kimukou_26 Reで返すとWebのリンクなので、元のツイートが見られないという欠点が。iPadとかiPhoneからだとき書きづらいんですよね。RTだと繋がりがきれるので後で追うのが大変になるという問題が。できればツイート直下に返信フォームが出てほしい。",
    time: { kind: "fixed", label: "about 20 hours ago" },
    source: "Echofon",
    replyToHandle: "kimukou_26",
  }),
  tweet({
    id: "t21",
    authorId: "moongift",
    text: "今日のエントリはこれで一旦閉じ。あとは昼休みに校正して公開する。",
    time: { kind: "fixed", label: "about 21 hours ago" },
    source: "Echofon",
    onProfile: true,
  }),
  tweet({
    id: "t22",
    authorId: "moongift",
    text: "オープンソースの紹介を続けて10年近くになるけど、まだ「これ知らなかった」が毎日ある。",
    time: { kind: "fixed", label: "about 22 hours ago" },
    source: "Echofon",
  }),
  tweet({
    id: "t23",
    authorId: "moongift",
    text: "Twicus の下書きフォルダがまた溢れてきた。140字ずつ積む作業は、意外と日記に近い。",
    time: { kind: "fixed", label: "yesterday" },
    source: "Echofon",
  }),
  tweet({
    id: "h1",
    authorId: "hikari",
    text: "The 140-character box is a little room. You have to decide what belongs inside.",
    time: {
      kind: "relative",
      createdAt: new Date(Date.now() - 4 * 60_000).toISOString(),
    },
    source: "web",
    onProfile: false,
  }),
  tweet({
    id: "h2",
    authorId: "ev",
    text: "What's happening? is still the most interesting question on the internet.",
    time: {
      kind: "relative",
      createdAt: new Date(Date.now() - 22 * 60_000).toISOString(),
    },
    source: "Twitter for iPhone",
    onProfile: false,
  }),
  tweet({
    id: "h3",
    authorId: "sora",
    text: "Helvetica, a yellow button, and a brown wall. That's a homepage.",
    time: {
      kind: "relative",
      createdAt: new Date(Date.now() - 58 * 60_000).toISOString(),
    },
    source: "web",
    onProfile: false,
  }),
  tweet({
    id: "h4",
    authorId: "mocha",
    text: "Favorite is still a star. Keep it that way.",
    time: {
      kind: "relative",
      createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
    },
    source: "Twitter for iPhone",
    onProfile: false,
  }),
  tweet({
    id: "h5",
    authorId: "biz",
    text: "A short message can travel farther than a long one. That's the whole idea.",
    time: {
      kind: "relative",
      createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
    },
    source: "web",
    onProfile: false,
  }),
  tweet({
    id: "h6",
    authorId: "moongift",
    text: "オープンソース紹介を書いていたら、いつの間にか夜。 http://bit.ly/moongift",
    time: {
      kind: "relative",
      createdAt: new Date(Date.now() - 8 * 3600_000).toISOString(),
    },
    source: "Echofon",
    onProfile: false,
  }),
];

export const homeSuggestions = ["ev", "hikari", "sora"];

export const trends: { name: string; countLabel: string }[] = [
  { name: "#opensource", countLabel: "12,408 tweets" },
  { name: "iPhone", countLabel: "8,102 tweets" },
  { name: "Echofon", countLabel: "4,551 tweets" },
  { name: "Twitter", countLabel: "21,004 tweets" },
  { name: "Yokohama", countLabel: "912 tweets" },
];

export const simplePages: SimplePage[] = [
  {
    id: "about",
    title: "About Us",
    body: "Twitter is a real-time information network that connects you to the latest stories, ideas, opinions and news about what you find interesting.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Questions about this 2010 recreation can stay on this page. The original Contact form lived at twitter.com/about#contact.",
  },
  {
    id: "blog",
    title: "Blog",
    body: "The Twitter blog in 2010 covered product changes, the new homepage, and short notes from the team in San Francisco.",
  },
  {
    id: "status",
    title: "Status",
    body: "All systems are up. In 2010 this page was status.twitter.com.",
  },
  {
    id: "goodies",
    title: "Goodies",
    body: "Buttons, widgets, and the old Twitter badge. Copy a snippet, paste it on a blog, watch the bird show up.",
  },
  {
    id: "api",
    title: "API",
    body: "The Twitter API let desktop clients like Echofon and twitterfeed post 140-character updates.",
  },
  {
    id: "business",
    title: "Business",
    body: "Promoted Tweets were just around the corner. This page is a stand-in for the 2010 business site.",
  },
  {
    id: "help",
    title: "Help",
    body: "Forgot your password? Need SMS codes? The 2010 help center answered those from a small set of articles.",
  },
  {
    id: "jobs",
    title: "Jobs",
    body: "Twitter is hiring. In 2010 that meant engineers, designers, and people who liked short sentences.",
  },
  {
    id: "terms",
    title: "Terms",
    body: "These terms govern your use of this recreation. Don't spam, don't impersonate, keep it to 140 characters.",
  },
  {
    id: "privacy",
    title: "Privacy",
    body: "Tweets you post are public unless you protect your account. This page does not send data to Twitter.",
  },
];

export function requireSimplePage(pageId: string): SimplePage {
  const page = simplePages.find((item) => item.id === pageId);
  if (page === undefined) {
    throw new Error(`ページが見つかりません: ${pageId}`);
  }
  return page;
}
