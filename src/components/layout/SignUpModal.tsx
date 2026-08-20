import { useState } from "react";
import { useAppState } from "../../state/app-state";

export function SignUpModal() {
  const { state, dispatch } = useAppState();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!state.signUpOpen) {
    return null;
  }

  function submit() {
    if (
      fullName.trim() === "" ||
      username.trim() === "" ||
      email.trim() === "" ||
      password === ""
    ) {
      setError("Please complete every field to create an account.");
      return;
    }
    dispatch({ type: "sign-in" });
  }

  return (
    <div
      className="overlay"
      onClick={() => {
        dispatch({ type: "close-sign-up" });
      }}
    >
      <form
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <h2>Join Twitter today.</h2>
        {error !== null ? <p className="menu-error">{error}</p> : null}
        <label htmlFor="signup-name">Full name</label>
        <input
          id="signup-name"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
          }}
        />
        <label htmlFor="signup-username">Username</label>
        <input
          id="signup-username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" className="btn-signup">
          Create my account
        </button>
      </form>
    </div>
  );
}
