import { atom, selector } from "recoil";

export interface Director {
  id: string;
  name: string;
  type: string;
  selected: boolean;
}

export interface CasaProductora {
  id: string;
  name: string;
  selected: boolean;
  details: boolean;
  directors: Director[];
}

export const casasProductorasState = atom<CasaProductora[]>({
  key: "casasProductorasState",
  default: [],
});

export const selectedCasasProductorasState = selector({
  key: "selectedCasasProductorasState",
  get: ({ get }) => {
    const casasProductoras = get(casasProductorasState);
    return casasProductoras.filter(casa => casa.selected && casa.directors.some(director => director.selected));
  },
});

export const casasProductorasSelected= atom<string[]>({
  key: "casasProductorasSelected",
  default: [],
});