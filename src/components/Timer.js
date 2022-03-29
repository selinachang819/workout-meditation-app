import React from 'react';
//------------Components-------------
import Theme from './Theme';
import PlayerContext from './PlayerContext';
//------------React functions--------
import { useState, useRef,useContext,useEffect } from 'react';
//-------------Packages-----------------------
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';
import {HiSwitchHorizontal} from 'react-icons/hi';
import {BsArrowLeftShort} from  'react-icons/bs';

function Timer() {

    const settingsInfo = useContext(PlayerContext);
    const audioPlayer= useRef() //referencing our audio component
    const colors = {
      primary:"#bfaaa3",
      secondary: "#ffffff",
      primaryDark: "#aa8e85",
      primaryLight: "#d4c6c1",
      accentOne: "#F7DCD2",
      accentTwo: "#B2BB9E"
    };


    const totalSeconds = settingsInfo.duration * 60;
    const [secondsLeft, setSecondsLeft]= useState(totalSeconds);
    const secondsLeftRef = useRef(secondsLeft);
    const [percentage, setPercentage]= useState(100);

    const isEnglish = settingsInfo.isEnglish;
    const isPlaying = settingsInfo.isPlaying;

  useEffect(()=>{

    const interval = setInterval(() => {
      if(isPlaying&&secondsLeft>0){
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
        setPercentage((secondsLeftRef.current/totalSeconds)*100);
      }
      
      else{
        return(secondsLeftRef,percentage)
      }
    }, 1000);
    
    if (secondsLeft === 0){
        settingsInfo.setPlayerStatus('finish');
        settingsInfo.setIsPlaying(false);
    }
    return ()=> clearInterval(interval);

  },[secondsLeft, isPlaying])

  
  const calculateTime = (secs)=>{
    const minutes = Math.floor(secs/60);
    const returnMinutes = minutes< 10? `0${minutes}`: `${minutes}`;
    const seconds = Math.floor(secs % 60);// the modulus
    const returnSeconds = seconds< 10? `0${seconds}`: `${seconds}`;
    return ` ${returnMinutes}:${returnSeconds}`;
  };

  const togglePlayPaused = () =>{
    //toggle switch for each one of the clicks
    
    settingsInfo.setIsPlaying(!isPlaying);
    if(isPlaying===false){
      audioPlayer.current.play();
    } else{
      audioPlayer.current.pause();
    }
  }

  const back = () =>{
    settingsInfo.setPlayerStatus('setting');
    settingsInfo.setIsPlaying(false);
  }
  return (
    <div className='c-setting'>
      <div className='languageToggle' id='languageText'>
          {isEnglish? "ENG":"中文"}<span><HiSwitchHorizontal/></span>
        </div>
      <p id='title'>{isEnglish? "Walking":"行走冥想"}</p>
      <BsArrowLeftShort className='backArrow' onClick={back}/>
          <audio ref={audioPlayer}  preload="metadata" loop autoPlay>
              {isEnglish? <source src='./audio/Meditation_EN.mp3' type='audio/mpeg'></source>
              : <source src='./audio/Meditation_CN.mp3' type='audio/mpeg'></source>}
          </audio>
      <div className='c-timer'>
        <CircularProgressbar 
            value={percentage}
            text={calculateTime(secondsLeftRef.current)}
            strokeWidth="5"
            styles={buildStyles({
                textColor: colors.secondary,
                pathColor: colors.primaryDark,
                trailColor: colors.primaryLight,
        })} />
    </div>
        <Toggle onClickFunction={togglePlayPaused} playStatus={isPlaying}/>
        
  {/* <Theme/> */}
    
</div>
  )

}


function Toggle(props){

  const isPlaying = props.playStatus;

  return(
    <div onClick={props.onClickFunction} className='toggleButton'>
      {isPlaying?<FaPause/>:<FaPlay className='play'/>}
    </div>
  )
}
export default Timer;
