import { SOTYS } from "@/constants/soty";
import { MusicUnit } from "@/models/musicUnit";
import { atom } from "jotai";

const getInitObj = () => {
  const initObj: Record<string, MusicUnit[]> = {};
  SOTYS.forEach((soty) => (initObj[soty[0] as string] = []));
  return initObj;
};

export const sotysAtom = atom<Record<string, MusicUnit[]>>(getInitObj());
