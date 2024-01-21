import { sotysAtom } from "@/atoms/sotyAtom";
import RankedMusicTile from "@/components/RankedMusicTile/RankedMusicTile";
import { Album } from "@/models/album";
import { useAtomValue } from "jotai";
import css from "./SotyList.module.scss";
import { RANK_TOTAL } from "@/constants/general";

interface SotyListProps {
  year: string;
}

const SotyList = ({ year }: SotyListProps) => {
  const sotys = useAtomValue(sotysAtom);
  const songs = sotys[year];

  return (
    <div className={css.wrapper}>
      {songs && (
        <>
          {songs.map((soty: Album, idx: number) => (
            <div key={soty.id}>
              <RankedMusicTile album={soty} rank={RANK_TOTAL - idx} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SotyList;
