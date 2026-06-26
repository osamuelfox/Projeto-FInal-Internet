import { genreStats, listeningHours, moodData, overallStats } from "../../data/stats";
import StatBar from "../../components/StatBar/StatBar";
import MoodWheel from "../../components/MoodWheel/MoodWheel";
import styles from "./Insights.module.css";

const METRICS = [
  { value: `${overallStats.streakDays} dias`,   label: "Streak atual"    },
  { value: overallStats.favoriteTime,            label: "Horário favorito" },
  { value: overallStats.topGenre,                label: "Gênero principal" },
  { value: `${Math.round(overallStats.minutesThisMonth / 60)}h`, label: "Neste mês" },
];

const maxHour = Math.max(...listeningHours.map((h) => h.value));

export default function Insights() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-heading">Insights</h1>
        <p className="page-subheading">
          Padrões de escuta baseados no seu histórico
        </p>

        <div className={styles.layout}>

          {/* ── Gêneros ────────────────────────────── */}
          <div className={styles.panel}>
            <h2 className={styles.panelHeading}>Gêneros favoritos</h2>
            {genreStats.map(({ name, percentage, color }) => (
              <StatBar
                key={name}
                label={name}
                percentage={percentage}
                color={color}
              />
            ))}
          </div>

          {/* ── Métricas + Horário ─────────────────── */}
          <div className={styles.panel}>
            <h2 className={styles.panelHeading}>Seus números</h2>
            <div className={styles.metricsGrid}>
              {METRICS.map(({ value, label }) => (
                <div key={label} className={styles.metricCard}>
                  <div className={styles.metricValue}>{value}</div>
                  <div className={styles.metricLabel}>{label}</div>
                </div>
              ))}
            </div>

            {/* Gráfico de horário de escuta */}
            <div className={styles.hourChart}>
              <div className={styles.hourChartLabel}>Atividade por hora</div>
              <div className={styles.barGroup}>
                {listeningHours.map(({ hour, value }) => (
                  <div
                    key={hour}
                    className={`${styles.hourBar} ${value >= 70 ? styles.peak : ""}`}
                    title={`${hour}: ${value} min`}
                    style={{ height: `${(value / maxHour) * 100}%` }}
                  />
                ))}
              </div>
              <div className={styles.xLabels}>
                {listeningHours.map(({ hour }) => (
                  <span key={hour} className={styles.xLabel}>{hour}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── MoodWheel ──────────────────────────── */}
          <div className={styles.moodPanel}>
            <div className={styles.moodPanelHeader}>
              <h2 className={styles.moodPanelHeading}>Análise de humor musical</h2>
              <span className="badge badge--brand">Componente criativo</span>
            </div>
            <p className={styles.moodPanelSub}>
              Distribuição dos humores entre suas{" "}
              <strong>{overallStats.savedSongs}</strong> músicas salvas.
              Clique em uma fatia para ver as músicas.
            </p>
            <MoodWheel moodData={moodData} />
          </div>

        </div>
      </div>
    </div>
  );
}
