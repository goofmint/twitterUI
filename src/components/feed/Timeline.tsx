import { useAppState } from "../../state/app-state";
import { TweetCard } from "./TweetCard";

export function Timeline() {
  const { state } = useAppState();
  const now = Date.now();
  const tweets = state.tweets.filter((tweet) => tweet.feeds.includes(state.tab));

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} now={now} />
      ))}
    </div>
  );
}
