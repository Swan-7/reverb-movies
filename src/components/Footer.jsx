import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='bg-slate-800 h-20 flex justify-center items-center text-slate-100 flex-col'>
      <div>Reverb Movies</div>
      <div>
         &copy; {currentYear}, Reverb, Inc. All rights reserved.</div>
    </div>
  )
}

export default Footer
