export interface Album {
  id: string;
  name: string;
  coverArtUrl: string;
  url: string;
  artists: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: any[];
  external_urls: any;
  artists: any[];
  error?: Error;
}

interface Error {
  message: string;
}
