import { MouseEvent } from "react";

export interface SearchItems {
  name: string;
  image: string;
  info: string;
}

export interface SavedItems {
  name: string;
  image: string;
  info: string;
  index: number;
  type: string;
}

export interface Click {
  target: {
    name: string;
    value: string;
    parentNode: {
      name: string;
      value: string;
    };
  };
}
