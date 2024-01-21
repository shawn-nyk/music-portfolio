"use client";
import { navIndexAtom } from "@/atoms/pageAtom";
import { sotwsAtom } from "@/atoms/sotwAtom";
import Header from "@/components/Header/Header";
import NavBar from "@/components/NavBar/NavBar";
import { BOKEH_FIELDS_ALBUMS } from "@/constants/bokehFields";
import { LILAC_SPRING_ALBUMS } from "@/constants/lilacSpring";
import { SOTWS } from "@/constants/sotw";
import { Album, SpotifyAlbum } from "@/models/album";
import { SetStateAction, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Dispatch, useEffect, useState } from "react";
import Discog from "../Discog/Discog";
import MusicILove from "../MusicILove/MusicILove";
import css from "./Main.module.scss";
import { sotysAtom } from "@/atoms/sotyAtom";
import { SOTYS } from "@/constants/soty";

const Main = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const navIndex = useAtomValue(navIndexAtom);
  const [lilacSpringAlbums, setLilacSpringAlbums] = useState<Album[]>([]);
  const [bokehFieldsAlbums, setBokehFieldsAlbums] = useState<Album[]>([]);
  const setSotws = useSetAtom(sotwsAtom);
  const setSotys = useSetAtom(sotysAtom);

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
    setAlbums: Dispatch<SetStateAction<Album[]>>
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
    const fetchSotysForOneYear = async (soty: any) => {
      try {
        const year = soty[0];
        const sotyList = soty[1];
        const responses = await Promise.all(
          sotyList.map((sotyArr: any) => {
            const sotyId = sotyArr[1];
            return fetch(`https://api.spotify.com/v1/tracks/${sotyId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          })
        );
        const sotys: any[] = await Promise.all(
          responses.map((res) => res.json())
        );

        if (sotys.find((soty) => soty.error)) {
          alert("Error: " + sotys.find((soty) => soty.error)!.error!.message);
        } else {
          sotys.forEach((soty) => {
            setSotys((prev: { [x: string]: any }) => ({
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
        }
      } catch (error) {
        console.error("Error fetching SOTY data:", error);
      }
    };

    await Promise.all(SOTYS.map((soty) => fetchSotysForOneYear(soty)));
  };

  useEffect(() => {
    if (accessToken) {
      fetchAlbumData(LILAC_SPRING_ALBUMS, setLilacSpringAlbums);
      fetchAlbumData(BOKEH_FIELDS_ALBUMS, setBokehFieldsAlbums);
      fetchSotws();
      fetchSotys();
    }
  }, [accessToken]);

  return (
    <main>
      <div className={`${css.header} ${css.floating}`}>
        <Header />
        <NavBar />
      </div>
      <div className={css.header}></div>
      {navIndex === 0 && <Discog albums={bokehFieldsAlbums} />}
      {navIndex === 1 && <Discog albums={lilacSpringAlbums} />}
      <MusicILove />
    </main>
  );
};

export default Main;