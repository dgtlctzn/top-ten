import { SearchItems, SavedItems } from "../containers/Interfaces/Interfaces";

interface Book {
  book: SavedItems;
  index: number;
}

interface Movie {
  movie: SavedItems;
  index: number;
}

interface Album {
  album: SavedItems;
  index: number;
}

export interface Action {
  type: string;
  payload: string;
}

export interface SaveAction {
    type: string;
    payload: any
}

export interface ModAction {
  type: string;
  payload: Book | Movie | Album;
}

export interface Alert {
  type: string;
  payload: {
    category: string;
    enabled: boolean;
  };
}

export interface SearchStatus {
  type: string;
  payload: boolean;
}

export interface SearchAction {
  type: string;
  payload: Array<SearchItems>;
}
