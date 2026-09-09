import { useState } from "react";
import styles from "./Writing.module.css";
import posts from "../../data/posts.json";

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`${styles.postCard} ${expanded ? styles.postCardOpen : ""}`}
    >
      <div className={styles.postHeader}>
        <div className={styles.postMeta}>
          <time className={styles.postDate} dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span className={styles.postDot}>·</span>
          <span className={styles.postReadTime}>
            {Math.max(2, Math.ceil(post.points.join(" ").split(/\s+/).length / 200))} min read
          </span>
        </div>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.postTags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.postTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className={styles.postSummary}>{post.summary}</p>

      {expanded && (
        <ul className={styles.postPoints}>
          {post.points.map((point, id) => (
            <li key={id} className={styles.postPoint}>
              {point}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.postActions}>
        <button
          className={styles.expandButton}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read notes"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${styles.expandArrow} ${expanded ? styles.expandArrowUp : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {post.links?.repo && (
          <a
            href={post.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.postLink}
          >
            Related repo
          </a>
        )}
        {post.links?.docs && (
          <a
            href={post.links.docs}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.postLink}
          >
            Related paper
          </a>
        )}
      </div>
    </article>
  );
};

export const Writing = () => (
  <section className={styles.container} id="writing">
    <div className={styles.content}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Writing</h2>
        <p className={styles.subtitle}>
          Notes from real work: testing, data validation, and backend
          architecture
        </p>
      </div>
      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  </section>
);
