import { Error } from "./error";

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: any[];
  external_urls: any;
  artists: any[];
  error?: Error;
}

export type Aoty = string[];
export type AotyList = (string | Aoty[])[];

export interface GetAlbumsResponse {
  albums: SpotifyAlbum[];
}
