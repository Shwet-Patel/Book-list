import React from 'react';
import Link from 'react-router-dom';
import { BiSolidArrowToLeft } from 'react-icons/bi';

function BackButton( {destination = '/'} ) {
  return (
    <Link to={destination} className = 'bg-sky-700 text-white rounded-md p-2'>
      <BiSolidArrowToLeft className='text-xl text-sky-400'/>
    </Link>
  )
}

export default BackButton;