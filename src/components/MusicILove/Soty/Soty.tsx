import { SOTYS } from "@/constants/soty";
import { useState } from "react";
import css from "./Soty.module.scss";
import SotyList from "./SotyList/SotyList";

const Soty = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");

  return (
    <div className={css.wrapper}>
      <div className={css.title}>SOTY</div>
      <div className={css.selectors}>
        {SOTYS.map((soty: any[]) => {
          const year = soty[0] as string;
          return (
            <div key={year}>
              <div
                className={`${css.year} ${
                  selectedYear === year ? css.selected : ""
                }`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </div>
            </div>
          );
        })}
      </div>
      <SotyList year={selectedYear} />
    </div>
  );
};

export default Soty;
