import { useState } from "react";
import { playlists } from "../../data/stats";
import { songs } from "../../data/songs";
import SongCard from "../../components/SongCard/SongCard";
import styles from "./Playlists.module.css";

const MOOD_STYLES = {
  Energetic:  { bg: "rgba(239,68,68,0.75)",   color: "#fff" },
  Happy:      { bg: "rgba(202,138,4,0.85)",    color: "#fff" },
  Chill:      { bg: "rgba(109,40,217,0.75)",   color: "#fff" },
  Melancholic:{ bg: "rgba(37,99,235,0.75)",    color: "#fff" },
  Focus:      { bg: "rgba(21,128,61,0.85)",    color: "#fff" },
};

export default function Playlists() {
  // Renderização condicional: qual playlist está expandida
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-heading">Playlists</h1>
        <p className="page-subheading">
          {playlists.length} playlists — clique para ver as músicas em destaque
        </p>

        <div className={styles.grid}>
          {playlists.map((playlist) => {
            const isOpen = expandedId === playlist.id;
            const moodStyle = MOOD_STYLES[playlist.mood] ?? MOOD_STYLES.Focus;

            // Renderização condicional: só busca músicas se expandido
            const tracklist = isOpen
              ? songs.filter((s) => playlist.songList.includes(s.id))
              : [];
            const maxPlays = tracklist.length > 0
              ? Math.max(...tracklist.map((s) => s.plays.lastMonth))
              : 1;

            return (
              <article
                key={playlist.id}
                id={`playlist-${playlist.id}`}
                className={`${styles.card} ${isOpen ? styles.expanded : ""}`}
                onClick={() => toggle(playlist.id)}
                aria-expanded={isOpen}
              >
                <div className={styles.coverWrapper}>
                  <img
                    src={playlist.cover}
                    alt={`Capa da playlist ${playlist.name}`}
                    className={styles.cover}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(playlist.name)}&background=1a1a1a&color=555&size=300`;
                    }}
                  />
                  <span
                    className={styles.moodLabel}
                    style={{ background: moodStyle.bg, color: moodStyle.color }}
                  >
                    {playlist.mood}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.playlistName}>{playlist.name}</div>
                  <div className={styles.playlistMeta}>
                    <span>{playlist.songs} músicas</span>
                    <span>{playlist.duration}</span>
                    <span>{playlist.lastUpdated}</span>
                  </div>
                  <p className={styles.playlistDesc}>{playlist.description}</p>
                  <span className={styles.toggleHint}>
                    {isOpen ? "Fechar" : "Ver músicas"}
                  </span>
                </div>

                {/* Renderização condicional: detalhe expandido */}
                {isOpen && (
                  <div
                    className={styles.detail}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={styles.detailHeading}>Em destaque</div>
                    <div className={styles.detailSongs}>
                      {tracklist.map((song, i) => (
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
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
