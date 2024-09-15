import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
    const {
        track,
        seekBar, seekBg, seekSong,
        playStatus, play, pause,
        time, previous, next, audioRef
    } = useContext(PlayerContext);

    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);  // Range from 0 to 1

    // Format time as MM:SS (e.g., 01:02)
    const formatTime = (minutes, seconds) => {
        const paddedMinutes = String(minutes).padStart(2, "0");
        const paddedSeconds = String(seconds).padStart(2, "0");
        return `${paddedMinutes}:${paddedSeconds}`;
    };

    // Toggle mute/unmute
    const toggleMute = () => {
        if (audioRef.current.muted) {
            audioRef.current.muted = false;
            setIsMuted(false);
        } else {
            audioRef.current.muted = true;
            setIsMuted(true);
        }
    };

    // Adjust volume
    const changeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;  // Update audio volume
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return track ? (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4">
                <img src={track.image} alt="None" className="w-12" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img src={assets.shuffle_icon} alt="None" className="w-4 cursor-pointer" />
                    <img onClick={previous} src={assets.prev_icon} alt="None" className="w-4 cursor-pointer" />
                    {playStatus 
                        ? <img onClick={pause} src={assets.pause_icon} alt="None" className="w-4 cursor-pointer" />
                        : <img onClick={play} src={assets.play_icon} alt="None" className="w-4 cursor-pointer" />
                    }
                    <img onClick={next} src={assets.next_icon} alt="None" className="w-4 cursor-pointer" />
                    <img src={assets.loop_icon} alt="None" className="w-4 cursor-pointer" />
                </div>
                <div className="flex items-center gap-5">
                    <p>{formatTime(time.currentTime.minute, time.currentTime.second)}</p>
                    <div onClick={seekSong} ref={seekBg} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
                    </div>
                    <p>{formatTime(time.totalTime.minute, time.totalTime.second)}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 opacity-75">
                <img src={assets.plays_icon} alt="" className="w-4" />
                <img src={assets.mic_icon} alt="" className="w-4" />
                <img src={assets.queue_icon} alt="" className="w-4" />
                <img src={assets.speaker_icon} alt="" className="w-4" />
                
                {/* Mute/Unmute button */}
                <img 
                    src={ assets.volume_icon} 
                    alt="volume" 
                    className="w-4 cursor-pointer" 
                    onClick={toggleMute} 
                />
                
                {/* Volume control slider */}
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={changeVolume} 
                    className="w-20 bg-slate-50 h-1 rounded" 
                />
                
                {/* Fullscreen button */}
                <img 
                    src={assets.zoom_icon} 
                    alt="fullscreen" 
                    className="w-4 cursor-pointer" 
                    onClick={toggleFullscreen} 
                />
            </div>
        </div>
    ) : null;
};

export default Player;
