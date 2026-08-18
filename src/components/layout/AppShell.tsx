import { Feather } from "lucide-react";
import { useState } from "react";
import { useAppState } from "../../state/app-state";
import { ComposeModal } from "../compose/ComposeModal";
import { ComposeBox } from "../feed/ComposeBox";
import { HomeHeader } from "../feed/HomeHeader";
import { Timeline } from "../feed/Timeline";
import { DisplayDialog } from "../theme/DisplayDialog";
import { LeftSidebar } from "./LeftSidebar";
import { MobileNav } from "./MobileNav";
import { RightSidebar } from "./RightSidebar";

export function AppShell() {
  const { dispatch } = useAppState();
  const [displayOpen, setDisplayOpen] = useState(false);

  function openDisplay() {
    setDisplayOpen(true);
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <div className="mx-auto flex min-h-screen max-w-[1265px] justify-center">
        <LeftSidebar onOpenDisplay={openDisplay} />
        <main className="w-full min-w-0 max-w-[600px] border-x border-app-border pb-[60px] nav:pb-0">
          <HomeHeader onOpenDisplay={openDisplay} />
          <div className="hidden border-b border-app-border nav:block">
            <ComposeBox variant="inline" />
          </div>
          <Timeline />
        </main>
        <RightSidebar />
      </div>
      <button
        type="button"
        aria-label="ツイートする"
        className="fixed bottom-[72px] right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-app-accent text-white shadow-[0_0_8px_rgba(0,0,0,0.2)] nav:hidden"
        onClick={() => {
          dispatch({ type: "open-compose" });
        }}
      >
        <Feather size={24} strokeWidth={2} />
      </button>
      <MobileNav />
      <ComposeModal />
      <DisplayDialog
        open={displayOpen}
        onClose={() => {
          setDisplayOpen(false);
        }}
      />
    </div>
  );
}
