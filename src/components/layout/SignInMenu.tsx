import { useState } from "react";
import { useAppState } from "../../state/app-state";

export function SignInMenu() {
  const { dispatch } = useAppState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    if (username.trim() === "" || password === "") {
      setError("The username and password you entered did not match our records. Please double-check and try again.");
      return;
    }
    dispatch({ type: "sign-in" });
  }

  return (
    <form
      className="menu"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      {error !== null ? <p className="menu-error">{error}</p> : null}
      <label htmlFor="signin-username">Username</label>
      <input
        id="signin-username"
        type="text"
        autoComplete="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label htmlFor="signin-password">Password</label>
      <input
        id="signin-password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <a
        href="#/"
        className="forgot"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        Forgot password?
      </a>
      <div className="menu-row">
        <label className="remember">
          <input type="checkbox" />
          Remember me
        </label>
        <button type="submit" className="btn-small">
          Sign in
        </button>
      </div>
    </form>
  );
}
