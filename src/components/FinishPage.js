import React, { useContext } from 'react';
import PlayerContext from './PlayerContext';

function FinishPage() {

  const settingsInfo= useContext(PlayerContext);
  const isEnglish = settingsInfo.isEnglish;

  const returnBack= ()=>{
    settingsInfo.setPlayerStatus('setting');
  }
  return (
    <div className='c-setting'>
      <div className='c-finishtext'>
        <p id='finishText'>恭喜你</p> 
        <p> 您已完成此次练习。</p>
        <button onClick={returnBack} className='returnButton'>返回</button>
      </div>
    </div>
  )
}

export default FinishPage;
