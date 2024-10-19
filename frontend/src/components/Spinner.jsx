import React from 'react'

function Spinner() {
  return (
    <div className='min-h-[65vh] flex items-center justify-center'>
        <div className=' animate-ping w-16 h-16 rounded-full bg-sky-400'></div>
    </div>
  )
}

export default Spinner;