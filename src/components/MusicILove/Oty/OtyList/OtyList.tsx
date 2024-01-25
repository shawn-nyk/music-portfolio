import MiniMusicTile from "@/components/MiniMusicTile/MiniMusicTile";
import { MusicUnit } from "@/models/musicUnit";
import css from "./OtyList.module.scss";

interface OtyListProps {
  musicPieces: any;
  isRanked?: boolean;
}

const OtyList = ({ musicPieces, isRanked = true }: OtyListProps) => {
  return (
    <div className={css.wrapper}>
      {musicPieces && (
        <>
          {musicPieces.map((oty: MusicUnit, idx: number) => (
            <div key={oty.id}>
              <MiniMusicTile
                album={oty}
                rank={musicPieces.length - idx}
                isRanked={isRanked}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OtyList;
