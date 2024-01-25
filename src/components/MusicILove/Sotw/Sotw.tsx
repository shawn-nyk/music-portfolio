import { sotwsAtom } from "@/atoms/sotwAtom";
import MiniMusicTile from "@/components/MiniMusicTile/MiniMusicTile";
import { CURRENT_SOTW } from "@/constants/sotw";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useAtomValue } from "jotai";
import css from "./Sotw.module.scss";

const Sotw = () => {
  const sotws = useAtomValue(sotwsAtom);

  function getWeekRangeString(): string {
    const now = dayjs();
    const startOfWeek = now.startOf("week");
    const endOfWeek = startOfWeek.endOf("week");

    dayjs.extend(weekOfYear);
    const weekNumber = now.week();

    const formattedStartDate = startOfWeek.format("DD MMM");
    const formattedEndDate = endOfWeek.format("DD MMM");

    return `Week ${weekNumber}: ${formattedStartDate} - ${formattedEndDate}`;
  }

  return (
    <div className={css.wrapper}>
      <div className={css.current}>
        <div className={css.title}>SOTW</div>
        <iframe
          style={{ borderRadius: "12px", border: "none" }}
          src={`https://open.spotify.com/embed/track/${CURRENT_SOTW}?utm_source=generator`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <div className={css.currWeek}>{getWeekRangeString()}</div>
      </div>
      <div className={css.archives}>
        <div className={`${css.title} ${css.light}`}>Archives</div>
        <div className={css.musicTiles}>
          {sotws.length > 0 && (
            <>
              {sotws.map((sotw) => (
                <div key={sotw.id}>
                  <MiniMusicTile album={sotw} isRanked={false} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sotw;
