import { aotysAtom } from "@/atoms/aotyAtom";
import { sotysAtom } from "@/atoms/sotyAtom";
import { AOTYS } from "@/constants/aoty";
import { SOTYS } from "@/constants/soty";
import { useAtomValue } from "jotai";
import css from "./MusicILove.module.scss";
import Oty from "./Oty/Oty";
import Playlists from "./Playlists/Playlists";
import Sotw from "./Sotw/Sotw";

interface MusicILoveProps {
  isHidden: boolean;
}

const MusicILove = ({ isHidden }: MusicILoveProps) => {
  const sotys = useAtomValue(sotysAtom);
  const aotys = useAtomValue(aotysAtom);

  return (
    <div className={`${css.wrapper} ${isHidden ? css.hidden : ""}`}>
      <Playlists />
      <Sotw />
      <Oty title="SOTY" otyList={SOTYS} otys={sotys} />
      <Oty title="AOTY" otyList={AOTYS} otys={aotys} />
    </div>
  );
};

export default MusicILove;
