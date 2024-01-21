import { SOTYS } from "@/constants/soty";
import { atom } from "jotai";

const getInitObj = () => {
  const initObj: any = {};
  SOTYS.forEach((soty) => (initObj[soty[0] as string] = []));
  return initObj;
};

export const sotysAtom = atom<any>(getInitObj());
