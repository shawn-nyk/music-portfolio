import { MusicUnit } from "@/models/musicUnit";
import css from "./MiniMusicTile.module.scss";

interface MiniMusicTileProps {
  album: MusicUnit;
  isRanked: boolean;
  rank?: number;
}

const MiniMusicTile = ({ album, rank, isRanked }: MiniMusicTileProps) => {
  const { name, coverArtUrl, url, artists } = album;

  return (
    <div className={`${css.wrapper} ${!isRanked ? css.unranked : ""}`}>
      <a href={url} target="_blank" className={css.link}>
        <div className={css.album}>
          {isRanked && <div className={css.rank}>{rank}</div>}
          <img src={coverArtUrl} alt="Cover Art" width="100" height="100"></img>
          <div className={css.albumDetails}>
            <div className={css.albumTitle}>{name}</div>
            <div className={css.artistName}>{artists}</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MiniMusicTile;
