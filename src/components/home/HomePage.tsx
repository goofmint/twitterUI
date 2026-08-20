import { TweetItem } from "../feed/TweetItem";
import { useAppState } from "../../state/app-state";
import { HomeSidebar } from "./HomeSidebar";
import { WhatsHappening } from "./WhatsHappening";

export function HomePage() {
  const { state } = useAppState();
  const now = Date.now();
  const tweets = state.tweets.filter((tweet) => !tweet.onProfile);

  return (
    <div className="page">
      <div className="home-layout">
        <div className="home-main">
          <WhatsHappening />
          {tweets.map((tweet) => (
            <TweetItem key={tweet.id} tweet={tweet} now={now} variant="home" />
          ))}
        </div>
        <HomeSidebar />
      </div>
    </div>
  );
}
