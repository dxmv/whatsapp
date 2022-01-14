import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userServices from '../../services/userServices';
import "../../styles/login.css"
import TextInput from '../reusable/TextInput'
import { useNavigate  } from "react-router-dom";

interface IError{
  fullname:string,
  email:string,
  password:string,
  confirm:string,
  form:string
}

export default function Register() {
  const [fullName,setFullName]=useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [confirm,setConfirm]=useState<string>("");
  const [error,setError]=useState<IError>({fullname:"",email:"",password:"",confirm:"",form:""});
  const navigate=useNavigate ();

  const emptyValidation=async():Promise<boolean>=>{
    let empty=false;
    if(fullName===""){
      await setError(prev=>{return {...prev,fullname:"This field is required"}});
      empty=true;
    }
    else{
      await setError(prev=>{return {...prev,fullname:""}});
      empty=false;
    }
    if(email===""){
      await setError(prev=>{return {...prev,email:"This field is required"}});
      empty=true;
    }
    else{
      await setError(prev=>{return {...prev,email:""}});
      empty=false;
    }
    if(password===""){
      await setError(prev=>{return {...prev,password:"This field is required"}});
      empty=true;
    }
    else{
      await setError(prev=>{return {...prev,password:""}});
      empty=false;
    }
    if(confirm===""){
      await setError(prev=>{return {...prev,confirm:"This field is required"}});
      empty=true;
    }
    else{
      await setError(prev=>{return {...prev,confirm:""}});
      empty=false;
    }
    return empty;
  }

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const empty=await emptyValidation();
    if(empty) { return; }
    try{
      const res=await userServices.register({fullName,email,password});
      navigate('/login');
    }
    catch(e:any){
      if(e.response){
        const msg=e.response.data.msg;
        if(e.response.status===409){
          await setError(prev=>{return {...prev,email:msg}});
        }
        else{
          await setError(prev=>{return {...prev,form:msg}});
        }
      }
    }
  }

  useEffect(()=>{
    if(password!==confirm){
      setError(prev=>{return {...prev,form:"The passwords must match"}});
    }
    else if(error.form==="The passwords must match"){
      setError(prev=>{return {...prev,form:""}});
    }
  },[confirm])


  return (
    <div className='main'>
      <div className='form'>
        <h1 className='form-header'>Register Form</h1>
        <form style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"}} onSubmit={handleSubmit}>
          <p className='error-form'>{error.form&&error.form}</p>
          <TextInput 
            label='Full Name:' 
            labelStyle={{fontSize:"1.2rem"}} 
            style={{marginTop:"2rem",width:"80%"}} 
            inputStyle={{width:"100%",fontSize:"1.2rem",padding:"0.3rem 0.5rem",marginTop:"0.2rem",borderRadius:"0.5rem",border:"1px solid #415a77",outline:"none",borderColor:error.fullname&&"red"}}
            value={fullName}
            setValue={setFullName}
            error={error.fullname}
            setErrorMessage={(message:string)=>setError(prev=>{return {...prev,fullname:message}})}
            regex='^[\w]+ [\w]+'
          />
          <TextInput 
            label='Email:' 
            labelStyle={{fontSize:"1.2rem"}} 
            style={{marginTop:"2rem",width:"80%"}} 
            inputStyle={{width:"100%",fontSize:"1.2rem",padding:"0.3rem 0.5rem",marginTop:"0.2rem",borderRadius:"0.5rem",border:"1px solid #415a77",outline:"none",borderColor:error.email&&"red"}}
            value={email}
            setValue={setEmail}
            error={error.email}
            setErrorMessage={(message:string)=>setError(prev=>{return {...prev,email:message}})}
            regex='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
           />
          <TextInput 
            label='Password:' 
            labelStyle={{fontSize:"1.2rem"}} 
            style={{marginTop:"2rem",width:"80%"}} 
            inputStyle={{width:"100%",fontSize:"1.2rem",padding:"0.3rem 0.5rem",marginTop:"0.2rem",borderRadius:"0.5rem",border:"1px solid #415a77",outline:"none",borderColor:error.password&&"red"}}
            value={password}
            setValue={setPassword}
            error={error.password}
            setErrorMessage={(message:string)=>setError(prev=>{return {...prev,password:message}})}
            minLength={8}
            maxLength={15}
           />
          <TextInput 
            label='Confirm Password:' 
            labelStyle={{fontSize:"1.2rem"}} 
            style={{marginTop:"2rem",width:"80%"}} 
            inputStyle={{width:"100%",fontSize:"1.2rem",padding:"0.3rem 0.5rem",marginTop:"0.2rem",borderRadius:"0.5rem",border:"1px solid #415a77",outline:"none",borderColor:error.confirm&&"red"}}
            value={confirm}
            setValue={setConfirm}
            error={error.confirm}
            setErrorMessage={(message:string)=>setError(prev=>{return {...prev,confirm:message}})}
            minLength={8}
            maxLength={15}
          />
          <button type="submit" className='btn-submit-form' disabled={error.fullname!==""||error.confirm!==""||error.password!==""||error.email!==""}>
            <span className='btn-text'>Register</span>
          </button>
          <p className='form-para-bottom'>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  )
}
