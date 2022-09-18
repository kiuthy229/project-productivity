import React, { useEffect, useRef, useState } from "react";
const MusicPlayer = () => {
  const PLAYLIST_DATA = [
    {
      title: 'Autumn Coffee',
      artist: 'Bosnow',
      src: '/song/autumn-coffee-bosnow.mp3'
    }, 
    {
      title: 'Glow',
      artist: 'Sensho',
      src: '/song/glow-sensho.mp3'
    }, 
    {
      title: 'Lazy Love',
      artist: 'Kem',
      src: '/song/lazy-love-kem.mp3'
    }, 
    {
      title: 'Moonshine',
      artist: 'Prigida',
      src: '/song/moonshine-prigida.mp3'
    }, 
    {
      title: 'Study and Relax',
      artist: 'Kevin Macleon',
      src: '/song/study-and-relax-kevin-macleod.mp3'
    }, 
  ]
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
    console.log(currentSongIndex)
  }, [isPlaying, currentSongIndex])
  const skip = (forward = true) => {
    if (forward){
      let tmpSongIndex = currentSongIndex + 1
      if (tmpSongIndex === PLAYLIST_DATA.length){
        tmpSongIndex = 0
      }
      setCurrentSongIndex(tmpSongIndex)
    }
    else {
      let tmpSongIndex = currentSongIndex - 1
      if (tmpSongIndex === -1){
        tmpSongIndex = PLAYLIST_DATA.length - 1
      }
      setCurrentSongIndex(tmpSongIndex)
    }
  }
  return(
    <div
      style={{
        background: "#FED6D7",
        padding: "5vh",
        height: "25vh",
        borderRadius: "10px",
        margin: "1vw"
      }}
    >
      <h3>Music Player</h3>
      <div>
        <h3>{PLAYLIST_DATA[currentSongIndex].title}</h3>
        <div>{PLAYLIST_DATA[currentSongIndex].artist}</div>
      </div>
      <audio
        src={PLAYLIST_DATA[currentSongIndex].src}
        ref={audioElement}
      ></audio>
      <button
        style={{
          padding: "2vh 1vw",
          margin: " 0.5vh auto",
          border: "none", 
          borderRadius: "10px",
          background: "#EB6CAC",
          color: "white", 
          fontWeight: "bolder",
          marginRight: "0.5vh"
        }}
        onClick={() => skip(false)}
      >Prev</button>
      <button
        style={{
          padding: "2vh 1vw",
          margin: " 0.5vh auto",
          border: "none", 
          borderRadius: "10px",
          background: "#EB6CAC",
          color: "white", 
          fontWeight: "bolder",
          marginRight: "0.5vh"
        }}
        onClick={() => {
          setIsPlaying(!isPlaying)
        }}
      >Play</button>
      <button
        style={{
          padding: "2vh 1vw",
          margin: " 0.5vh auto",
          border: "none", 
          borderRadius: "10px",
          background: "#EB6CAC",
          color: "white", 
          fontWeight: "bolder",
          marginRight: "0.5vh"
        }}
        onClick={() => skip()}
      >Next</button>
    </div>
  )
}
export default MusicPlayer;