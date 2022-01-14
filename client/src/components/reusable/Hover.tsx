import React, {  useState } from 'react'
import "../../styles/reusable.css"

/*
  Components for text on hover
*/

export default function HoverComponent({text,Icon,...rest}:{text:string,Icon:React.ReactNode}) {
  const [isHovering,setHover]=useState<boolean>(false);

  const handleHover=async()=>{
    await setHover(true);
  }

  const handleLeave=async()=>{
    await setHover(false);
  }

  return (
    <div className='hover-component' onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      {Icon}
      {isHovering&&<HoverText text={text}/>}
    </div>
  )
}

function HoverText({text}:{text:string}){
  return(
    <div className='hover-text'>
      {text}
    </div>
  )
}
