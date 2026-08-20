import { FEATURED_PROFILE_ID } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import { HomePage } from "../home/HomePage";
import { ProfilePage } from "../profile/ProfilePage";
import { DiscoverPage, MessagesPage, SimplePageView } from "./SimplePages";
import { SignUpModal } from "./SignUpModal";
import { SiteFooter } from "./SiteFooter";
import { TopBar } from "./TopBar";

export function AppShell() {
  const { state } = useAppState();
  const profileSkin =
    state.view === "profile" && state.profileUserId === FEATURED_PROFILE_ID;
  const skin = profileSkin || (!state.signedIn && state.view === "simple")
    ? "skin-profile"
    : "skin-home";

  return (
    <div className={skin}>
      <TopBar />
      {state.view === "profile" ? (
        <ProfilePage key={`${state.profileUserId}-${state.signedIn ? "in" : "out"}`} />
      ) : null}
      {state.view === "home" ? <HomePage /> : null}
      {state.view === "messages" ? <MessagesPage /> : null}
      {state.view === "discover" ? <DiscoverPage /> : null}
      {state.view === "simple" ? <SimplePageView /> : null}
      <SiteFooter />
      <SignUpModal />
    </div>
  );
}
