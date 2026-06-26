import { useState } from "react";
import { songs } from "../../data/songs";
import SongCard from "../SongCard/SongCard";
import styles from "./MoodWheel.module.css";

const CX = 120, CY = 120, R = 110, INNER_R = 48;

function polarToXY(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildSlicePath(cx, cy, r, innerR, start, end) {
  const s  = polarToXY(cx, cy, r, start);
  const e  = polarToXY(cx, cy, r, end);
  const si = polarToXY(cx, cy, innerR, end);
  const ei = polarToXY(cx, cy, innerR, start);
  const large = end - start > 180 ? 1 : 0;
  return [
    `M ${s.x} ${s.y}`,
    `A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`,
    `L ${si.x} ${si.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${ei.x} ${ei.y}`,
    "Z",
  ].join(" ");
}

export default function MoodWheel({ moodData }) {
  const [activeMood, setActiveMood]   = useState(null);
  const [hoveredMood, setHoveredMood] = useState(null);

  // Constrói fatias com ângulos calculados
  let cursor = 0;
  const slices = moodData.map((item) => {
    const angle = (item.percentage / 100) * 360;
    const slice = { ...item, path: buildSlicePath(CX, CY, R, INNER_R, cursor, cursor + angle) };
    cursor += angle;
    return slice;
  });

  const displayMood = hoveredMood ?? activeMood;
  const displayData = displayMood ? moodData.find((m) => m.mood === displayMood) : null;

  const toggle = (mood) => setActiveMood((prev) => (prev === mood ? null : mood));

  const filteredSongs = activeMood
    ? songs.filter((s) => s.mood === activeMood)
    : [];
  const maxPlays = filteredSongs.length > 0
    ? Math.max(...filteredSongs.map((s) => s.plays.lastMonth))
    : 1;

  return (
    <div className={styles.root}>
      <p className={styles.heading}>
        Clique em uma fatia para filtrar músicas por humor
      </p>

      {/* Roda SVG */}
      <div className={styles.svgWrapper}>
        <svg width="240" height="240" viewBox="0 0 240 240" aria-hidden="true">
          {slices.map((slice) => (
            <path
              key={slice.mood}
              d={slice.path}
              fill={slice.color}
              fillOpacity={activeMood && activeMood !== slice.mood ? 0.2 : 0.9}
              stroke="#111"
              strokeWidth="1.5"
              className={`${styles.slice} ${
                activeMood && activeMood !== slice.mood ? styles.dimmed : ""
              }`}
              onClick={() => toggle(slice.mood)}
              onMouseEnter={() => setHoveredMood(slice.mood)}
              onMouseLeave={() => setHoveredMood(null)}
              role="button"
              aria-label={`${slice.mood}: ${slice.percentage}%`}
            />
          ))}
          <circle cx={CX} cy={CY} r={INNER_R - 3} fill="#111" />
        </svg>

        <div className={styles.center}>
          {displayData ? (
            <>
              <span className={styles.centerPct} style={{ color: displayData.color }}>
                {displayData.percentage}%
              </span>
              <span className={styles.centerMood}>{displayData.mood}</span>
            </>
          ) : (
            <span className={styles.centerMood}>humor</span>
          )}
        </div>
      </div>

      {/* Tooltip com descrição */}
      {displayData && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipMood} style={{ color: displayData.color }}>
            {displayData.mood}
          </div>
          <div className={styles.tooltipDesc}>{displayData.description}</div>
        </div>
      )}

      {/* Legenda */}
      <div className={styles.legend}>
        {moodData.map((item) => (
          <button
            key={item.mood}
            className={`${styles.legendItem} ${activeMood === item.mood ? styles.active : ""}`}
            onClick={() => toggle(item.mood)}
            aria-pressed={activeMood === item.mood}
          >
            <span className={styles.legendDot} style={{ background: item.color }} />
            {item.mood}
          </button>
        ))}
      </div>

      {/* Músicas filtradas — renderização condicional */}
      {activeMood && filteredSongs.length > 0 && (
        <div className={styles.filteredSection}>
          <div className={styles.filteredLabel}>
            {activeMood} · {filteredSongs.length}{" "}
            {filteredSongs.length === 1 ? "música" : "músicas"}
          </div>
          <div className={styles.filteredList}>
            {filteredSongs.map((song, i) => (
              <SongCard
                key={song.id}
                song={song}
                rank={i + 1}
                maxPlays={maxPlays}
                period="lastMonth"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
