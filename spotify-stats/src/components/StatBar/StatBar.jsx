import styles from "./StatBar.module.css";

export default function StatBar({ label, percentage, color = "#1DB954" }) {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{percentage}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%`, background: color }}
        />
      </div>
    </div>
  );
}
