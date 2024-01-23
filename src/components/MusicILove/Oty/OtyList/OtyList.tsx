import RankedMusicTile from "@/components/RankedMusicTile/RankedMusicTile";
import { RANK_TOTAL } from "@/constants/general";
import { MusicUnit } from "@/models/musicUnit";
import css from "./OtyList.module.scss";

interface OtyListProps {
  year: string;
  otys: any;
}

const OtyList = ({ year, otys }: OtyListProps) => {
  const musicPieces = otys[year];

  return (
    <div className={css.wrapper}>
      {musicPieces && (
        <>
          {musicPieces.map((oty: MusicUnit, idx: number) => (
            <div key={oty.id}>
              <RankedMusicTile album={oty} rank={RANK_TOTAL - idx} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OtyList;
