import { useState } from "react";
import { songs, periodLabels } from "../../data/songs";
import SongCard from "../../components/SongCard/SongCard";
import styles from "./TopTracks.module.css";

/*
  Lift State Up: `activePeriod` é gerenciado aqui (pai) e
  passado via prop `period` para cada SongCard filho.
*/

const PERIODS = ["lastMonth", "sixMonths", "lastYear"];

const PERIOD_CONTEXT = {
  lastMonth: (
    <>Exibindo reproduções do <strong>último mês</strong>.</>
  ),
  sixMonths: (
    <>Exibindo reproduções dos <strong>últimos 6 meses</strong>.</>
  ),
  lastYear: (
    <>Exibindo reproduções do <strong>último ano</strong>.</>
  ),
};

export default function TopTracks() {
  const [activePeriod, setActivePeriod] = useState("lastMonth");

  const ranked = [...songs].sort(
    (a, b) => b.plays[activePeriod] - a.plays[activePeriod]
  );
  const maxPlays = ranked[0]?.plays[activePeriod] ?? 1;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-heading">Top Músicas</h1>
        <p className="page-subheading">
          {songs.length} faixas mais reproduzidas por período
        </p>

        {/* Filtro de período — estado gerenciado no pai */}
        <div className={styles.periodTabs} role="tablist" aria-label="Período">
          {PERIODS.map((period) => (
            <button
              key={period}
              id={`tab-${period}`}
              role="tab"
              aria-selected={activePeriod === period}
              className={`${styles.tab} ${activePeriod === period ? styles.active : ""}`}
              onClick={() => setActivePeriod(period)}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>

        {/* Renderização condicional: contexto textual por período */}
        <p className={styles.periodContext}>
          {PERIOD_CONTEXT[activePeriod]}
        </p>

        {/* Lista — SongCard recebe `period` como prop */}
        <div className={styles.trackList} role="tabpanel">
          {ranked.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              rank={i + 1}
              maxPlays={maxPlays}
              period={activePeriod}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
