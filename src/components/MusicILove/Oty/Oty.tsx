import { useState } from "react";
import css from "./Oty.module.scss";
import OtyList from "./OtyList/OtyList";

interface OtyProps {
  title: string;
  otyList: any;
  otys: any;
}

const Oty = ({ title, otyList, otys }: OtyProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("");

  return (
    <div className={css.wrapper}>
      <div className={css.title}>{title}</div>
      <div className={css.selectors}>
        {otyList.map((oty: any[]) => {
          const year = oty[0] as string;
          return (
            <div key={year}>
              <div
                className={`${css.year} ${
                  selectedYear === year ? css.selected : ""
                }`}
                onClick={() => {
                  if (year === selectedYear) {
                    setSelectedYear("");
                  } else {
                    setSelectedYear(year);
                  }
                }}
              >
                {year}
              </div>
            </div>
          );
        })}
      </div>
      <OtyList musicPieces={otys[selectedYear]} />
    </div>
  );
};

export default Oty;
