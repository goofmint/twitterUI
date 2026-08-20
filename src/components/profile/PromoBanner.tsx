import { useAppState } from "../../state/app-state";
import { BirdSilhouette, PhoneIcon } from "../icons";
import type { User } from "../../types";

export function PromoBanner({ user }: { user: User }) {
  const { dispatch } = useAppState();

  return (
    <section className="promo">
      <div className="promo-bird">
        <BirdSilhouette size={36} />
      </div>
      <h1 className="promo-title">
        Get short, timely messages from {user.name}.
      </h1>
      <p className="promo-body">
        Twitter is a rich source of instantly updated information. It&apos;s easy
        to stay updated on an incredibly wide variety of topics.{" "}
        <button
          type="button"
          className="tweet-link font-bold"
          onClick={() => {
            dispatch({ type: "open-sign-up" });
          }}
        >
          Join today
        </button>{" "}
        and follow @{user.handle}.
      </p>
      <div className="promo-row">
        <button
          type="button"
          className="btn-signup"
          onClick={() => {
            dispatch({ type: "open-sign-up" });
          }}
        >
          Sign Up ›
        </button>
        <p className="sms">
          <span className="mr-1 inline-block align-middle text-[#aaa]">
            <PhoneIcon />
          </span>
          Get updates via SMS by texting <strong>follow {user.handle}</strong> to{" "}
          <strong>40404</strong> in the United States
          <br />
          <a
            href="#/"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Codes for other countries
          </a>
        </p>
      </div>
    </section>
  );
}
