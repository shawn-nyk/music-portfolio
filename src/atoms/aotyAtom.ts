import { AOTYS } from "@/constants/aoty";
import { MusicUnit } from "@/models/musicUnit";
import { atom } from "jotai";

const getInitObj = () => {
  const initObj: Record<string, MusicUnit[]> = {};
  AOTYS.forEach((aoty) => (initObj[aoty[0] as string] = []));
  return initObj;
};

export const aotysAtom = atom<Record<string, MusicUnit[]>>(getInitObj());
