"use client";
import { aotysAtom } from "@/atoms/aotyAtom";
import { navIndexAtom } from "@/atoms/pageAtom";
import { sotwsAtom } from "@/atoms/sotwAtom";
import { sotysAtom } from "@/atoms/sotyAtom";
import Header from "@/components/Header/Header";
import NavBar from "@/components/NavBar/NavBar";
import { AOTYS } from "@/constants/aoty";
import { BOKEH_FIELDS_ALBUMS } from "@/constants/bokehFields";
import { LILAC_SPRING_ALBUMS } from "@/constants/lilacSpring";
import { SOTWS } from "@/constants/sotw";
import { SOTYS } from "@/constants/soty";
import {
  Aoty,
  AotyList,
  GetAlbumsResponse,
  SpotifyAlbum,
} from "@/models/album";
import { MusicUnit } from "@/models/musicUnit";
import { GetTracksResponse, Soty, SotyList } from "@/models/track";
import { SetStateAction, useAtomValue, useSetAtom } from "jotai";
import { Dispatch, useEffect, useState } from "react";
import Discog from "../Discog/Discog";
import MusicILove from "../MusicILove/MusicILove";
import css from "./Main.module.scss";
import { ALL_TIME_FAVES } from "@/constants/allTimeFaves";
import { atfsAtom } from "@/atoms/atfAtom";

const Main = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const navIndex = useAtomValue(navIndexAtom);
  const [lilacSpringAlbums, setLilacSpringAlbums] = useState<MusicUnit[]>([]);
  const [bokehFieldsAlbums, setBokehFieldsAlbums] = useState<MusicUnit[]>([]);
  const setSotws = useSetAtom(sotwsAtom);
  const setSotys = useSetAtom(sotysAtom);
  const setAotys = useSetAtom(aotysAtom);
  const setAtfs = useSetAtom(atfsAtom);

  // Fetch Spotify API access token
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("/api/getToken");
        const data = await response.json();

        if (data.access_token) {
          setAccessToken(data.access_token);
        } else {
          console.error("Error retrieving access token:", data.error);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    fetchAccessToken();
  }, []);

  const fetchAlbumData = async (
    albumIds: string[],
    setAlbums: Dispatch<SetStateAction<MusicUnit[]>>
  ) => {
    try {
      const responses = await Promise.all(
        albumIds.map((albumId) =>
          fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        )
      );
      const albums: SpotifyAlbum[] = await Promise.all(
        responses.map((res) => res.json())
      );

      if (albums.find((album) => album.error)) {
        alert("Error: " + albums.find((album) => album.error)!.error!.message);
      } else {
        albums.forEach((album) => {
          setAlbums((prev) => [
            ...prev,
            {
              id: album.id,
              name: album.name,
              coverArtUrl: album.images[0].url,
              url: album.external_urls.spotify,
              artists: album.artists.map((artist) => artist.name).join(", "),
            },
          ]);
        });
      }
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  };

  // TODO: use get multiple tracks API call instead
  const fetchSotws = async () => {
    try {
      const responses = await Promise.all(
        SOTWS.map((sotwId) =>
          fetch(`https://api.spotify.com/v1/tracks/${sotwId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        )
      );
      const sotws: any[] = await Promise.all(
        responses.map((res) => res.json())
      );

      if (sotws.find((sotw) => sotw.error)) {
        alert("Error: " + sotws.find((sotw) => sotw.error)!.error!.message);
      } else {
        sotws.forEach((sotw) => {
          setSotws((prev) => [
            ...prev,
            {
              id: sotw.id,
              name: sotw.name,
              coverArtUrl: sotw.album.images[0].url,
              url: sotw.external_urls.spotify,
              artists: sotw.artists
                .map((artist: { name: string }) => artist.name)
                .join(", "),
            },
          ]);
        });
      }
    } catch (error) {
      console.error("Error fetching SOTW data:", error);
    }
  };

  const fetchSotys = async () => {
    const fetchSotysForOneYear = async (soty: SotyList) => {
      try {
        const year = soty[0] as string;
        const sotyList = (soty[1] as Soty[]).map((e) => e[1]);

        const aggSotyList = [];
        for (let i = 0; i < sotyList.length; i += 20) {
          aggSotyList.push(sotyList.slice(i, i + 20).join("%2C"));
        }

        const responses = await Promise.all(
          aggSotyList.map((sotyIds) => {
            return fetch(`https://api.spotify.com/v1/tracks?ids=${sotyIds}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          })
        );
        const sotyArrs: GetTracksResponse[] = await Promise.all(
          responses.map((res) => res.json())
        );

        if (
          !sotyArrs.find((sotyArr) => sotyArr.tracks.find((soty) => soty.error))
        ) {
          sotyArrs.forEach((sotyArr) => {
            sotyArr.tracks.forEach((soty) => {
              setSotys((prev) => ({
                ...prev,
                [year]: [
                  ...prev[year],
                  {
                    id: soty.id,
                    name: soty.name,
                    coverArtUrl: soty.album.images[0].url,
                    url: soty.external_urls.spotify,
                    artists: soty.artists
                      .map((artist: { name: string }) => artist.name)
                      .join(", "),
                  },
                ],
              }));
            });
          });
        }
      } catch (error) {
        console.error("Error fetching SOTY data:", error);
      }
    };

    await Promise.all(SOTYS.map((soty) => fetchSotysForOneYear(soty)));
  };

  const fetchAotys = async () => {
    const fetchAotysForOneYear = async (aoty: AotyList) => {
      try {
        const year = aoty[0] as string;
        const aotyList = (aoty[1] as Aoty[]).map((e) => e[1]);

        const aggAotyList = [];
        for (let i = 0; i < aotyList.length; i += 20) {
          aggAotyList.push(aotyList.slice(i, i + 20).join("%2C"));
        }

        const responses = await Promise.all(
          aggAotyList.map((aotyIds) => {
            return fetch(`https://api.spotify.com/v1/albums?ids=${aotyIds}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          })
        );
        const aotyArrs: GetAlbumsResponse[] = await Promise.all(
          responses.map((res) => res.json())
        );

        if (
          !aotyArrs.find((aotyArr) => aotyArr.albums.find((aoty) => aoty.error))
        ) {
          aotyArrs.forEach((aotyArr) => {
            aotyArr.albums.forEach((aoty) => {
              setAotys((prev) => ({
                ...prev,
                [year]: [
                  ...prev[year],
                  {
                    id: aoty.id,
                    name: aoty.name,
                    coverArtUrl: aoty.images[0].url,
                    url: aoty.external_urls.spotify,
                    artists: aoty.artists
                      .map((artist: { name: string }) => artist.name)
                      .join(", "),
                  },
                ],
              }));
            });
          });
        }
      } catch (error) {
        console.error("Error fetching AOTY data:", error);
      }
    };

    await Promise.all(AOTYS.map((aoty) => fetchAotysForOneYear(aoty)));
  };

  const fetchAtfs = async () => {
    try {
      const aggAtfsList = [];
      for (let i = 0; i < ALL_TIME_FAVES.length; i += 20) {
        aggAtfsList.push(ALL_TIME_FAVES.slice(i, i + 20).join("%2C"));
      }

      const responses = await Promise.all(
        aggAtfsList.map((ids) => {
          return fetch(`https://api.spotify.com/v1/albums?ids=${ids}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
      );
      const atfArrs: GetAlbumsResponse[] = await Promise.all(
        responses.map((res) => res.json())
      );

      if (!atfArrs.find((arr) => arr.albums.find((album) => album.error))) {
        atfArrs.forEach((arr) => {
          arr.albums.forEach((album) => {
            setAtfs((prev) => [
              ...prev,
              {
                id: album.id,
                name: album.name,
                coverArtUrl: album.images[0].url,
                url: album.external_urls.spotify,
                artists: album.artists
                  .map((artist: { name: string }) => artist.name)
                  .join(", "),
              },
            ]);
          });
        });
      }
    } catch (error) {
      console.error("Error fetching AOTY data:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchAlbumData(LILAC_SPRING_ALBUMS, setLilacSpringAlbums);
      fetchAlbumData(BOKEH_FIELDS_ALBUMS, setBokehFieldsAlbums);
      fetchSotws();
      fetchSotys();
      fetchAotys();
      fetchAtfs();
    }
  }, [accessToken]);

  return (
    <main>
      <div className={`${css.header} ${css.floating}`}>
        <Header />
        <NavBar />
      </div>
      <div className={css.header}></div>
      <div className={css.contentWrapper}>
        <div className={css.content}>
          {/* TODO: add remixes/colabs segment to bokeh fields */}
          <Discog albums={bokehFieldsAlbums} isHidden={navIndex !== 0} />
          <Discog albums={lilacSpringAlbums} isHidden={navIndex !== 1} />
          <MusicILove isHidden={navIndex !== 2} />
        </div>
      </div>
    </main>
  );
};

export default Main;
