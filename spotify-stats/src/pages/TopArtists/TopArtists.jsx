import { useState } from "react";
import { artists } from "../../data/artists";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import styles from "./TopArtists.module.css";

const ALL_GENRES = ["Todos", ...new Set(artists.flatMap((a) => a.genres))];

export default function TopArtists() {
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  const visible =
    selectedGenre === "Todos"
      ? artists
      : artists.filter((a) => a.genres.includes(selectedGenre));

  const handleGenreToggle = (genre) => {
    setSelectedGenre((prev) => (prev === genre ? "Todos" : genre));
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-heading">Artistas</h1>
        <p className="page-subheading">
          Os artistas que mais tocaram nas suas sessões
        </p>

        {/* Filtro por gênero */}
        <div className={styles.filterRow} role="group" aria-label="Filtrar por gênero">
          {ALL_GENRES.map((genre) => (
            <button
              key={genre}
              id={`genre-${genre.toLowerCase().replace(/\W/g, "-")}`}
              className={`${styles.filterChip} ${selectedGenre === genre ? styles.selected : ""}`}
              onClick={() => handleGenreToggle(genre)}
              aria-pressed={selectedGenre === genre}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Grid — renderização condicional */}
        <div className={styles.grid}>
          {visible.length > 0 ? (
            visible.map((artist, i) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                rank={i + 1}
                activeGenre={selectedGenre}
                onGenreClick={handleGenreToggle}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              Nenhum artista encontrado para &ldquo;{selectedGenre}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
