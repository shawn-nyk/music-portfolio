import { Album } from "@/models/album";
import MusicTile from "../MusicTile/MusicTile";
import css from "./Discog.module.scss";

interface DiscogProps {
  albums: Album[];
  isHidden: boolean;
}

const Discog = ({ albums, isHidden }: DiscogProps) => {
  return (
    <div className={`${css.musicTiles} ${isHidden ? css.hidden : ""}`}>
      {albums.length > 0 && (
        <>
          {albums.map((album) => (
            <div key={album.id}>
              <MusicTile album={album} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Discog;
