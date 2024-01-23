import { Error } from "./error";

export interface SpotifyTrack {
  id: string;
  name: string;
  album: any;
  external_urls: any;
  artists: any[];
  error?: Error;
}

export type Soty = string[];
export type SotyList = (string | Soty[])[];

export interface GetTracksResponse {
  tracks: SpotifyTrack[];
}
