import {
  CalendarClock,
  Clapperboard,
  Image,
  ListChecks,
  Smile,
  X,
} from "lucide-react";
import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { requireUser } from "../../data/mock";
import { useAppState } from "../../state/app-state";
import { Avatar } from "../Avatar";

const MAX_LENGTH = 280;
const WARN_REMAINING = 20;

export function ComposeBox({
  variant,
  onPosted,
}: {
  variant: "inline" | "modal";
  onPosted?: () => void;
}) {
  const { currentUserId, dispatch } = useAppState();
  const me = requireUser(currentUserId);
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [focused, setFocused] = useState(variant === "modal");
  const fileRef = useRef<HTMLInputElement>(null);

  const remaining = MAX_LENGTH - text.length;
  const canPost = text.trim().length > 0 && remaining >= 0;

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file === undefined) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        throw new Error("画像の読み込みに失敗しました");
      }
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function submit() {
    if (!canPost) {
      return;
    }
    dispatch({ type: "add-tweet", text: text.trim(), imageSrc });
    setText("");
    setImageSrc(null);
    if (onPosted !== undefined) {
      onPosted();
    }
  }

  return (
    <div
      className={`flex gap-3 px-4 ${
        variant === "inline" ? "py-3" : "py-1"
      }`}
    >
      <Avatar user={me} size={40} />
      <div className="min-w-0 flex-1">
        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          placeholder="いまどうしてる？"
          rows={variant === "modal" ? 4 : focused ? 3 : 1}
          className="w-full resize-none bg-transparent text-xl leading-6 outline-none placeholder:text-app-muted"
        />
        {imageSrc !== null ? (
          <div className="relative mt-2 overflow-hidden rounded-2xl border border-app-border">
            <img src={imageSrc} alt="添付画像" className="max-h-80 w-full object-cover" />
            <button
              type="button"
              aria-label="画像を削除"
              className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"
              onClick={() => {
                setImageSrc(null);
                if (fileRef.current !== null) {
                  fileRef.current.value = "";
                }
              }}
            >
              <X size={16} />
            </button>
          </div>
        ) : null}
        {focused ? (
          <p className="mt-2 text-[13px] font-bold text-app-accent">
            全員が返信できます
          </p>
        ) : null}
        <div className="mt-3 flex items-center justify-between border-t border-app-border pt-3">
          <div className="flex text-app-accent">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
            <IconButton
              label="画像を追加"
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              <Image size={18.75} strokeWidth={2} />
            </IconButton>
            <IconButton label="GIF">
              <Clapperboard size={18.75} strokeWidth={2} />
            </IconButton>
            <IconButton label="投票">
              <ListChecks size={18.75} strokeWidth={2} />
            </IconButton>
            <IconButton label="絵文字">
              <Smile size={18.75} strokeWidth={2} />
            </IconButton>
            <IconButton label="予約投稿">
              <CalendarClock size={18.75} strokeWidth={2} />
            </IconButton>
          </div>
          <div className="flex items-center gap-3">
            {text.length > 0 ? (
              <CharacterRing remaining={remaining} length={text.length} />
            ) : null}
            <button
              type="button"
              disabled={!canPost}
              className="h-9 rounded-full bg-app-accent px-4 text-[15px] font-bold text-white disabled:opacity-50"
              onClick={submit}
            >
              ツイートする
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#1d9bf01a]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function CharacterRing({
  remaining,
  length,
}: {
  remaining: number;
  length: number;
}) {
  const warn = remaining <= WARN_REMAINING;
  const radius = warn ? 12 : 10;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(length / MAX_LENGTH, 1);
  const color =
    remaining < 0 ? "#F4212E" : remaining <= WARN_REMAINING ? "#FFD400" : "#1D9BF0";

  return (
    <div className="flex items-center gap-1">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <circle
          cx="14"
          cy="14"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <circle
          cx="14"
          cy="14"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          transform="rotate(-90 14 14)"
        />
      </svg>
      {warn ? (
        <span
          className="min-w-5 text-center text-[13px]"
          style={{ color }}
        >
          {remaining}
        </span>
      ) : null}
    </div>
  );
}
