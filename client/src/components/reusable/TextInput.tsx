import React, { CSSProperties } from 'react'
import { useEffect } from 'react'

export default function TextInput(
  {
    style,inputStyle,labelStyle,label,placeholder,  // Style
    value,setValue,                                 // Value
    error,setErrorMessage,                          // Error
    minLength,maxLength,regex,                      // Validation
    password=false                                  // Is this filed a password?
  }:{
    style:CSSProperties,inputStyle:CSSProperties,labelStyle?:CSSProperties,label?:string,placeholder?:string,
    value:string,setValue:React.Dispatch<React.SetStateAction<string>>,
    error:string,setErrorMessage:(message: string) => void,
    minLength?:number,maxLength?:number,regex?:string,
    password?:boolean
  }) {

  const validation=regex?new RegExp(regex):null;
  
  
  useEffect(()=>{
    if(value.length===0){ return; }
    if(minLength&&value.length<minLength){
      setErrorMessage("This field must be at least 8 chars long");
    }
    else if(maxLength&&value.length>maxLength){
      setErrorMessage("This field must be at least 15 chars long");
    }
    else{
      setErrorMessage("");
    }
    if(regex&&validation){
      if(!validation.exec(value)){
        setErrorMessage("This field is not in correct format");
      }
      else{
        setErrorMessage("");
      }
    }
  },[value]);
  return (
    <div style={style}>
      <label style={labelStyle&&labelStyle}>{label&&label}</label>
      <input type={password?"password":"text"} onChange={(e)=>setValue(e.target.value)} value={value} style={inputStyle} placeholder={placeholder&&placeholder}/>      
      <p style={{fontSize:"0.8rem",color:"red"}}>{error!==""&&error}</p>
    </div>
  )
}
