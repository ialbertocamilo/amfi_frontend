import { atom } from "recoil";

export const agencyIdState = atom<string | null>({
    key: "agencyIdState",
    default: null,
});

export const advertiserIdState = atom<string | null>({
    key: "advertiserIdState",
    default: null,
});