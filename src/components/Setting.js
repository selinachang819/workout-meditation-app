import React from 'react';
//------------Components-------------
import PlayerContext from './PlayerContext';
//------------React functions--------
import {useContext } from 'react';
//-------------Packages-----------------------
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {FaPlay} from 'react-icons/fa';
import {HiSwitchHorizontal} from 'react-icons/hi';

function Setting(props) {

    const settingsInfo= useContext(PlayerContext);
    const percentage = 100;
    const colors = {
      primary:"#bfaaa3",
      secondary: "#ffffff",
      primaryDark: "#aa8e85",
      primaryLight: "#d4c6c1",
      accentOne: "#F7DCD2",
      accentTwo: "#B2BB9E"
    };

    const totalSeconds=settingsInfo.duration*60;

    const calculateTime = (secs)=>{
      const minutes = Math.floor(secs/60);
      const returnMinutes = minutes< 10? `0${minutes}`: `${minutes}`;
      const seconds = Math.floor(secs % 60);// the modulus
      const returnSeconds = seconds< 10? `0${seconds}`: `${seconds}`;
      return ` ${returnMinutes}:${returnSeconds}`;
    };


    const initiator = ()=>{
      settingsInfo.setPlayerStatus('timer');
      settingsInfo.setIsPlaying(true);
    }

    const isEnglish = settingsInfo.isEnglish;
    const languageSwitch = ()=>{
        settingsInfo.setIsEnglish(!isEnglish);
    }
  return (
    
    <div className='c-setting'>

      {/* Setting */}
      <div className='languageToggle'onClick={languageSwitch}>
          {isEnglish? "ENG":"中文"}<span><HiSwitchHorizontal/></span>
        </div>
        <p id='title'>{isEnglish? "Walking":"行走冥想"}</p>
          <div className='c-timer'>
        <CircularProgressbar 
        value={percentage}
        text={ calculateTime(totalSeconds)}
        strokeWidth="5"
        styles={buildStyles({
            textColor: colors.secondary,
            pathColor: colors.primaryDark,
            trailColor: colors.primaryLight,
        })} />
    </div>
      <button onClick={initiator} className="toggleButton">
        <FaPlay className="play"/>
      </button>
      {/* <Theme/> */}
        
    </div>
  )
}

export default Setting;
