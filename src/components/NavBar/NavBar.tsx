import { useSetAtom } from "jotai";
import css from "./NavBar.module.scss";
import { navIndexAtom } from "@/atoms/pageAtom";

const NavBar = () => {
  const setNavIndex = useSetAtom(navIndexAtom);

  const handleOnClick = (index: number) => {
    setNavIndex(index);
  };

  return (
    <ul className={css.navBar}>
      <li
        className={`${css.navItem} ${css.bokehFields}`}
        onClick={() => handleOnClick(0)}
      >
        Bokeh Fields
      </li>
      <li
        className={`${css.navItem} ${css.lilacSpring}`}
        onClick={() => handleOnClick(1)}
      >
        Lilac Spring
      </li>
      <li
        className={`${css.navItem} ${css.musicILove} ${css.last}`}
        onClick={() => handleOnClick(2)}
      >
        Music I Love
      </li>
    </ul>
  );
};

export default NavBar;
