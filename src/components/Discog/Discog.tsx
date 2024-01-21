import { Album } from "@/models/album";
import MusicTile from "../MusicTile/MusicTile";
import css from "./Discog.module.scss";

interface DiscogProps {
  albums: Album[];
}

const Discog = ({ albums }: DiscogProps) => {
  return (
    <div className={css.musicTiles}>
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
