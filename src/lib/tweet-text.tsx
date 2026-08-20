import type { ReactNode } from "react";

const TOKEN_PATTERN = /https?:\/\/[^\s]+|@[A-Za-z0-9_]+|#[A-Za-z0-9_]+/g;

function linkify(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  const matches = text.matchAll(TOKEN_PATTERN);

  for (const match of matches) {
    const value = match[0];
    const index = match.index;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }
    nodes.push(
      <a
        key={`${value}-${index.toString()}`}
        href="#/"
        className="tweet-link"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        {value}
      </a>,
    );
    lastIndex = index + value.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function TweetText({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return <p className={className}>{linkify(text)}</p>;
}

export function TweetTextInline({ text }: { text: string }) {
  return <>{linkify(text)}</>;
}
