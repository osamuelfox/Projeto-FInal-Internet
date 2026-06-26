import { useNavigate } from "react-router-dom";
import { userProfile, overallStats } from "../../data/stats";
import { songs } from "../../data/songs";
import styles from "./Home.module.css";

const STAT_ITEMS = [
  { value: overallStats.hoursListened.toLocaleString("pt-BR"), label: "Horas ouvidas" },
  { value: overallStats.savedSongs.toLocaleString("pt-BR"),    label: "Músicas salvas" },
  { value: overallStats.followedArtists,                       label: "Artistas seguidos" },
  { value: overallStats.playlistsCreated,                      label: "Playlists criadas" },
];

const topSong = songs[0];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="container">

        {/* ── Perfil ───────────────────────────────── */}
        <section className={styles.profile}>
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              <img
                src={userProfile.avatar}
                alt={`Foto de perfil de ${userProfile.name}`}
                className={styles.avatar}
              />
              <span className={styles.statusDot} aria-label="Online" />
            </div>

            <div className={styles.profileInfo}>
              <div className={styles.nameRow}>
                <h1 className={styles.userName}>{userProfile.name}</h1>
                {userProfile.isPremium && (
                  <span className="badge badge--muted">Premium</span>
                )}
              </div>
              <p className={styles.userHandle}>{userProfile.username}</p>
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <strong>{userProfile.followers}</strong> seguidores
                </span>
                <span className={styles.metaItem}>
                  <strong>{userProfile.following}</strong> seguindo
                </span>
                <span className={styles.metaItem}>{userProfile.country}</span>
                <span className={styles.metaItem}>
                  Membro desde {userProfile.memberSince}
                </span>
              </div>
              <div className={styles.streakNote}>
                {overallStats.streakDays} dias seguidos de escuta
              </div>
            </div>

            <button
              id="btn-ver-top-tracks"
              className={styles.viewTracksBtn}
              onClick={() => navigate("/top-tracks")}
            >
              Ver Top Músicas
            </button>
          </div>

          {/* ── Números rápidos ───────────────────── */}
          <div className={styles.statsGrid}>
            {STAT_ITEMS.map(({ value, label }) => (
              <div key={label} className={styles.statCard}>
                <div className={styles.statNumber}>{value}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>

          {/* ── Destaque do mês ───────────────────── */}
          <div className={styles.featuredSection}>
            <p className="section-label">Mais tocada este mês</p>
            <div className={styles.featuredCard}>
              <img
                src={topSong.cover}
                alt={`Capa do álbum ${topSong.album}`}
                className={styles.featuredCover}
                onError={(e) => { e.target.src = "https://via.placeholder.com/140/1a1a1a/555?text=Cover"; }}
              />
              <div className={styles.featuredContent}>
                <div className={styles.featuredTrack}>{topSong.title}</div>
                <div className={styles.featuredArtist}>
                  {topSong.artist} · {topSong.album}
                </div>
                <div className={styles.featuredNumbers}>
                  <div className={styles.featuredStat}>
                    <strong>{topSong.plays.lastMonth}</strong>
                    plays este mês
                  </div>
                  <div className={styles.featuredStat}>
                    <strong>{topSong.plays.lastYear}</strong>
                    plays no ano
                  </div>
                  <div className={styles.featuredStat}>
                    <strong>{topSong.duration}</strong>
                    duração
                  </div>
                </div>
                <span className="badge badge--brand" style={{ marginTop: "4px", width: "fit-content" }}>
                  {overallStats.topGenre}
                </span>
              </div>
            </div>
          </div>

          {/* ── Insight de horário ────────────────── */}
          <div className={styles.insightBanner}>
            <div className={styles.insightText}>
              Seu horário de pico é entre{" "}
              <strong>{overallStats.favoriteTime}</strong> — você ouviu{" "}
              <span className={styles.insightHighlight}>
                {overallStats.minutesThisMonth.toLocaleString("pt-BR")} minutos
              </span>{" "}
              de música neste mês.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
