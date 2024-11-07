import { atom, selector } from "recoil";
import { toast } from "react-hot-toast";

export interface Director {
  id: number;
  name: string;
  type: string;
  selected: boolean;
}

export interface CasaProductora {
  id: number;
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

export const isValidSelectionState = selector({
  key: "isValidSelectionState",
  get: ({ get }) => {
    const casasProductoras = get(casasProductorasState);
    const selectedCasas = casasProductoras.filter(casa => casa.selected);
    if (selectedCasas.length === 0) {
      toast.error("Debe seleccionar al menos una casa productora.");
      return false;
    }
    for (const casa of selectedCasas) {
      if (!casa.directors || casa.directors.length === 0) {
        toast.error("No se puede seleccionar una casa productora sin un director.");
        return false;
      }
    }
    return true;
  },
});