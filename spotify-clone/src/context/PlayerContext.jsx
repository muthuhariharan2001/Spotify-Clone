import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'https://spotify-clone-backend-3zg1.onrender.com';

    const [songsData, setSongsData] = useState([]); // Initialize as an empty array
    const [albumsData, setAlbumsData] = useState([]);

    const [track, setTrack] = useState(null); // Initialize track as null
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (item._id === id) {
                setTrack(item);
            }
        });

        await audioRef.current.play();
        setPlayStatus(true);
    };

    const previous = async () => {
        songsData.map(async (item, index) => {
            
            if (item._id === track._id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }

        })
    };

    const next = async () => {
        songsData.map(async (item, index) => {
            
            if (item._id === track._id && index < songsData.length) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }

        })
    };

    const seekSong = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        }
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
        } catch (error) {
            console.error("Error fetching songs data:", error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.error("Error fetching albums data:", error);
        }
    };

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    useEffect(() => {
        if (songsData.length > 0) {
            setTrack(songsData[0]);
        }
    }, [songsData]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }
    }, [audioRef]);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
