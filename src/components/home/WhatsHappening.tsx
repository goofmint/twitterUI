import { useState } from "react";
import { useAppState } from "../../state/app-state";

export function WhatsHappening() {
  const { tweetMax, dispatch } = useAppState();
  const [text, setText] = useState("");
  const remaining = tweetMax - [...text].length;
  const disabled = text.trim() === "" || remaining < 0;

  return (
    <form
      className="compose"
      onSubmit={(event) => {
        event.preventDefault();
        if (disabled) {
          return;
        }
        dispatch({ type: "add-tweet", text: text.trim() });
        setText("");
      }}
    >
      <h1>What&apos;s happening?</h1>
      <textarea
        value={text}
        maxLength={tweetMax + 20}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <div className="compose-bar">
        <span className={`counter${remaining < 0 ? " over" : ""}`}>
          {remaining}
        </span>
        <button type="submit" className="btn-tweet" disabled={disabled}>
          Tweet
        </button>
      </div>
    </form>
  );
}
