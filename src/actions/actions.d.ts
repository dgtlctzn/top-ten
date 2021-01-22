import { FoundItems } from "../containers/Interfaces/Interfaces";

interface Book {
  book: string;
  index: number;
}

interface Movie {
  movie: string;
  index: number;
}

interface Album {
  album: string;
  index: number;
}

export interface Action {
  type: string;
  payload: string;
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

export interface FoundAction {
  type: string;
  payload: Array<FoundItems>;
}
