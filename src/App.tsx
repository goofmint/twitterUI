import { AppShell } from "./components/layout/AppShell";
import { AppStateProvider } from "./state/app-state";

function App() {
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  );
}

export default App;
