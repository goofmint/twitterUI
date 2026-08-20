import { simplePages } from "../../data/mock";
import { useAppState } from "../../state/app-state";

export function SiteFooter() {
  const { dispatch } = useAppState();

  return (
    <footer className="site-footer">
      <span>© 2010 Twitter</span>
      {simplePages.map((page) => (
        <button
          key={page.id}
          type="button"
          onClick={() => {
            dispatch({ type: "open-simple", pageId: page.id });
          }}
        >
          {page.title}
        </button>
      ))}
    </footer>
  );
}
