import type { ReactNode } from "react";

const TOKEN_PATTERN =
  /https?:\/\/[^\s]+|@[A-Za-z0-9_]+|#[\w\u3040-\u30ff\u3400-\u9fff]+/g;

export function TweetText({ text }: { text: string }) {
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
      <span key={`${value}-${index.toString()}`} className="text-app-accent">
        {value}
      </span>,
    );
    lastIndex = index + value.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <p className="whitespace-pre-wrap break-words text-[15px] leading-5">{nodes}</p>;
}
