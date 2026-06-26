import styles from "./ArtistCard.module.css";

export default function ArtistCard({ artist, rank, onGenreClick, activeGenre }) {
  const { name, image, genres, plays, topSong, bio, monthlyListeners } = artist;
  const isFeatured = rank <= 3;
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=222&color=888&size=300&font-size=0.33`;

  return (
    <article className={styles.card}>
      {/* Foto */}
      <div className={styles.photoWrapper}>
        <img
          src={image}
          alt={`Foto de ${name}`}
          className={styles.photo}
          loading="lazy"
          onError={(e) => { e.target.src = fallbackSrc; }}
        />
        <div className={styles.imageOverlay}>
          <p className={styles.bio}>{bio}</p>
        </div>
        <span className={`${styles.rankBadge} ${isFeatured ? styles.featured : ""}`}>
          #{rank}
        </span>
      </div>

      {/* Corpo */}
      <div className={styles.body}>
        <div className={styles.artistName}>{name}</div>
        <div className={styles.topTrack}>{topSong}</div>

        <div className={styles.genres}>
          {genres.map((genre) => (
            <button
              key={genre}
              className={`${styles.genreTag} ${activeGenre === genre ? styles.selected : ""}`}
              onClick={() => onGenreClick?.(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className={styles.footer}>
          <div>
            <span className={styles.playsValue}>{plays.toLocaleString("pt-BR")}</span>
            <span className={styles.playsLabel}>plays</span>
          </div>
          <div className={styles.listenersCount}>
            {monthlyListeners} ouvintes/mês
          </div>
        </div>
      </div>
    </article>
  );
}
