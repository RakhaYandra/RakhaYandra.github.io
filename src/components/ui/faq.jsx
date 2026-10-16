// Adapted from Rare UI — https://rareui.com
// MIT + Commons Clause + Attribution. Original component: "FAQ".
import { Fragment, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

const SEND = { type: "spring", visualDuration: 0.42, bounce: 0.28 };
const SHIFT = { type: "spring", visualDuration: 0.4, bounce: 0.1 };
const LEAVE = { duration: 0.16, ease: [0.4, 0, 1, 1] };
const INSTANT = { duration: 0 };

const QUESTION = '[data-slot="faq-question"]';
const KEY_STEPS = {
  ArrowDown: (index) => index + 1,
  ArrowUp: (index) => index - 1,
  Home: () => 0,
  End: (_, last) => last,
};

function RareMark() {
  return (
    <svg viewBox="0 0 263 252" fill="currentColor" className="size-5">
      <path d="M155.726 142.646C146.149 139.871 142.461 128.258 148.681 120.466L187.804 71.4521C197.894 58.8118 216.188 56.4448 229.162 66.1009L255.614 85.7874C261.744 90.3494 264.325 98.2844 262.053 105.58L251.408 139.759C246.55 155.357 230.105 164.2 214.415 159.653L155.726 142.646Z" />
      <path d="M143.404 115.886C137.806 124.137 125.622 124.056 120.132 115.732L85.6075 63.3779C76.7038 49.876 80.1057 31.7465 93.2985 22.3909L120.196 3.31712C126.428 -1.1029 134.773 -1.10601 141.009 3.30938L170.226 23.9958C183.559 33.4357 186.888 51.808 177.715 65.3256L143.404 115.886Z" />
      <path d="M115.051 118.12C121.167 125.995 117.326 137.557 107.713 140.206L47.2524 156.862C31.6599 161.158 15.4689 152.32 10.648 136.882L0.819439 105.408C-1.45817 98.1138 1.11742 90.1769 7.2438 85.6103L35.9463 64.2156C49.0442 54.4526 67.546 56.964 77.5674 69.8653L115.051 118.12Z" />
      <path d="M109.654 146.532C119.096 143.328 128.766 150.741 128.123 160.691L124.084 223.274C123.043 239.413 109.394 251.822 93.2286 251.327L60.2704 250.318C52.6329 250.085 45.9754 245.054 43.6643 237.771L32.8367 203.649C27.8957 188.078 36.3217 171.416 51.7915 166.166L109.654 146.532Z" />
      <path d="M133.079 159.806C132.95 149.836 142.988 142.93 152.253 146.616L210.525 169.796C225.553 175.774 233.137 192.589 227.67 207.811L216.526 238.844C213.944 246.035 207.102 250.813 199.461 250.76L163.663 250.513C147.327 250.401 134.085 237.238 133.872 220.903L133.079 159.806Z" />
    </svg>
  );
}

function Question({ item, ids, open, openId, reduced, onToggle }) {
  return (
    <motion.button
      id={ids.question}
      type="button"
      data-slot="faq-question"
      aria-expanded={open}
      aria-controls={open ? ids.answer : undefined}
      onClick={onToggle}
      layout="position"
      layoutDependency={openId}
      transition={reduced ? INSTANT : SHIFT}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className={cn(
        "max-w-[85%] cursor-pointer self-start rounded-[18px] rounded-bl-[6px] border border-(--color-border) px-4 py-2.5 text-left text-[15px] leading-[1.4] tracking-[-0.01em] text-(--color-text-primary) transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)",
        open
          ? "bg-(--color-bg-secondary)"
          : "bg-(--color-bg-tertiary) hover:bg-(--color-bg-quaternary)"
      )}
    >
      {item.question}
    </motion.button>
  );
}

function Answer({ item, ids, open, openId, reduced, avatar }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {open && (
        <motion.div
          key="answer"
          data-slot="faq-answer"
          layout="position"
          layoutDependency={openId}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, transition: reduced ? INSTANT : LEAVE }}
          transition={reduced ? INSTANT : SEND}
          style={{ originX: 1, originY: 1 }}
          className="flex items-end justify-end gap-2"
        >
          <div
            id={ids.answer}
            role="region"
            aria-labelledby={ids.question}
            className="max-w-[85%] rounded-[18px] rounded-br-[6px] bg-(--faq-accent) px-4 py-2.5 text-[15px] leading-[1.45] tracking-[-0.01em] text-white"
          >
            {item.answer}
          </div>
          {avatar != null && (
            <span
              aria-hidden
              className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--color-bg-tertiary) text-(--faq-accent) [&>img]:size-full [&>img]:object-cover"
            >
              {avatar}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Faq({
  items,
  value,
  defaultValue = null,
  onValueChange,
  accent = "var(--color-accent)",
  avatar = <RareMark />,
  className,
  style,
  ...props
}) {
  const reduced = useReducedMotion() ?? false;
  const uid = useId();
  const [own, setOwn] = useState(defaultValue);
  const openId = value === undefined ? own : value;

  const toggle = (id) => {
    const next = openId === id ? null : id;
    if (value === undefined) setOwn(next);
    onValueChange?.(next);
  };

  const onKeyDown = (event) => {
    const step = KEY_STEPS[event.key];
    const target = event.target;
    if (!step || !target.matches(QUESTION)) return;

    const questions = [
      ...event.currentTarget.querySelectorAll(QUESTION),
    ];
    const next = step(questions.indexOf(target), questions.length - 1);
    event.preventDefault();
    questions[(next + questions.length) % questions.length]?.focus();
  };

  return (
    <div
      data-slot="faq"
      onKeyDown={onKeyDown}
      style={{ "--faq-accent": accent, ...style }}
      className={cn("relative flex w-full max-w-xl flex-col gap-3", className)}
      {...props}
    >
      {items.map((item) => {
        const bubble = {
          item,
          ids: {
            question: `${uid}-${item.id}-question`,
            answer: `${uid}-${item.id}-answer`,
          },
          open: openId === item.id,
          openId,
          reduced,
        };

        return (
          <Fragment key={item.id}>
            <Question {...bubble} onToggle={() => toggle(item.id)} />
            <Answer {...bubble} avatar={avatar} />
          </Fragment>
        );
      })}
    </div>
  );
}

export default Faq;
