import { navIndexAtom } from "@/atoms/pageAtom";
import { Album } from "@/models/album";
import { useAtomValue } from "jotai";
import css from "./MusicTile.module.scss";

interface MusicTileProps {
  album: Album;
}

const MusicTile = (props: MusicTileProps) => {
  const { name, coverArtUrl, url, artists } = props.album;
  const navIndex = useAtomValue(navIndexAtom);

  return (
    <div className={css.wrapper}>
      <a
        href={url}
        target="_blank"
        className={`${css.link} ${
          navIndex === 0 ? css.bokehFields : css.lilacSpring
        }`}
      >
        <div className={css.album}>
          <img src={coverArtUrl} alt="Cover Art" width="160" height="160"></img>
          <div className={css.albumDetails}>
            <div className={css.albumTitle}>{name}</div>
            <div className={css.artistName}>{artists}</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MusicTile;
