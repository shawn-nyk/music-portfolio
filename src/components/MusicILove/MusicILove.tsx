import { useAtomValue } from "jotai";
import css from "./MusicILove.module.scss";
import Playlists from "./Playlists/Playlists";
import Sotw from "./Sotw/Sotw";
import Soty from "./Soty/Soty";
import { navIndexAtom } from "@/atoms/pageAtom";

const MusicILove = () => {
  const navIndex = useAtomValue(navIndexAtom);

  return (
    <div className={`${css.wrapper} ${navIndex !== 2 ? css.hidden : ""}`}>
      <Playlists />
      <Sotw />
      <Soty />
    </div>
  );
};

export default MusicILove;
