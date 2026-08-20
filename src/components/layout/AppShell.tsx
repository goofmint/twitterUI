import { useAppState } from "../../state/app-state";
import { HomePage } from "../home/HomePage";
import { ProfilePage } from "../profile/ProfilePage";
import { DiscoverPage, MessagesPage } from "./SimplePages";
import { SignUpModal } from "./SignUpModal";
import { GeeseFlock } from "./GeeseFlock";
import { TopBar } from "./TopBar";

export function AppShell() {
  const { state } = useAppState();
  const jackProfile = state.view === "profile" && state.profileUserId === "jack";
  const skin = jackProfile ? "skin-jack" : "skin-home";

  return (
    <div className={skin}>
      {jackProfile ? <GeeseFlock /> : null}
      <TopBar />
      {state.view === "profile" ? <ProfilePage /> : null}
      {state.view === "home" ? <HomePage /> : null}
      {state.view === "messages" ? <MessagesPage /> : null}
      {state.view === "discover" ? <DiscoverPage /> : null}
      <SignUpModal />
    </div>
  );
}
