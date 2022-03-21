import React from 'react';
import {FaLeaf} from 'react-icons/fa';
import {FiHeadphones} from 'react-icons/fi';

function Theme() {
  return (
    <div className='c-theme'>
        <div className='theme'>
          <FaLeaf/>
          <p>Body Scan</p>
        </div>
        <div className='theme'>
          <FiHeadphones/>
          <p>Breezing</p>
        </div>  
      </div>
  )
}

export default Theme;
