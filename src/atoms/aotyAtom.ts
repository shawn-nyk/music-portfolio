import { AOTYS } from "@/constants/aoty";
import { atom } from "jotai";

const getInitObj = () => {
  const initObj: any = {};
  AOTYS.forEach((aoty) => (initObj[aoty[0] as string] = []));
  return initObj;
};

export const aotysAtom = atom<any>(getInitObj());
