import styles from "./SongCard.module.css";

/* Mapeamento semântico de humor para cor
   Paleta deliberada: cores que evocam o estado emocional */
const MOOD_COLORS = {
  Energetic:  { bg: "rgba(239, 68, 68, 0.12)",  text: "#ef4444" },
  Happy:      { bg: "rgba(234, 179, 8, 0.12)",   text: "#ca8a04" },
  Chill:      { bg: "rgba(139, 92, 246, 0.12)",  text: "#8b5cf6" },
  Melancholic:{ bg: "rgba(59, 130, 246, 0.12)",  text: "#60a5fa" },
  Focus:      { bg: "rgba(29, 185, 84, 0.12)",   text: "#1DB954" },
};

export default function SongCard({ song, rank, maxPlays, period = "lastMonth" }) {
  const { title, artist, cover, duration, plays, mood } = song;
  const currentPlays = plays[period];
  const fillPct = maxPlays > 0 ? (currentPlays / maxPlays) * 100 : 0;
  const moodStyle = MOOD_COLORS[mood] ?? MOOD_COLORS.Focus;
  const isTopThree = rank <= 3;

  return (
    <article className={styles.item}>
      <span className={`${styles.rank} ${isTopThree ? styles.topThree : ""}`}>
        {rank}
      </span>

      <img
        src={cover}
        alt={`Capa de ${title}`}
        className={styles.cover}
        loading="lazy"
        onError={(e) => { e.target.src = "https://via.placeholder.com/44/222/555?text=?"; }}
      />

      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.artist}>{artist}</div>
        <div className={styles.meta}>
          <span
            className={styles.moodTag}
            style={{ background: moodStyle.bg, color: moodStyle.text }}
          >
            {mood}
          </span>
          <span className={styles.playCount}>{currentPlays} plays</span>
        </div>
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${fillPct}%` }} />
        </div>
      </div>

      <span className={styles.duration}>{duration}</span>
    </article>
  );
}
