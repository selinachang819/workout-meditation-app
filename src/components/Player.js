import React from 'react';
//------------Components-------------
import Setting from './Setting';
import Timer from './Timer';
import FinishPage from './FinishPage';
import PlayerContext from './PlayerContext';
//------------React functions--------
import {useState} from 'react';




function Player() {


  const [playerStatus, setPlayerStatus]= useState('setting');
  const [isPlaying, setIsPlaying]= useState(false);

  return (
    <div className="c-player">
    <PlayerContext.Provider
    value={{
      playerStatus,
      setPlayerStatus,
      duration: 15,
      isPlaying,
      setIsPlaying
    }}
    >
    <PlayerSwitch status={playerStatus}/>  
   </PlayerContext.Provider>
  </div>
  )
}


function PlayerSwitch(props){
  
  const playerStatus=props.status;
  if (playerStatus==='setting'){
    return <Setting/>
  }
  else if (playerStatus==='timer'){
    return <Timer/>
  }
  else if (playerStatus==='finish'){
    return <FinishPage/>
  }
}
export default Player;
