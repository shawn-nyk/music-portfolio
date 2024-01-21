import { PLAYLISTS } from "@/constants/playlists";
import css from "./Playlists.module.scss";

const Playlists = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.title}>Playlists</div>
      <div className={css.playlists}>
        {PLAYLISTS.map((playlist, idx) => (
          <div
            key={playlist.id}
            className={`${css.playlist} ${
              idx === PLAYLISTS.length - 1 ? css.last : ""
            }`}
          >
            <div className={css.playlistLabel}>{playlist.label}</div>
            <iframe
              style={{ borderRadius: "12px", border: "none" }}
              src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
