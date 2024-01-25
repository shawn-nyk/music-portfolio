import { atfsAtom } from "@/atoms/atfAtom";
import { useAtomValue } from "jotai";
import OtyList from "../Oty/OtyList/OtyList";
import css from "./AllTimeFaves.module.scss";

const AllTimeFaves = () => {
  const atfs = useAtomValue(atfsAtom);

  return (
    <div className={css.wrapper}>
      <div className={css.title}>All-Time Faves</div>
      <OtyList musicPieces={atfs} isRanked={false} />
    </div>
  );
};

export default AllTimeFaves;
