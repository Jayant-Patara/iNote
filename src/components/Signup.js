import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const [account,setAccount]=useState({"name":"","email":"","password":"","cpassword":""});
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(account.cpassword===account.password){
      const {name,email,password}=account;
      const url="http://localhost:5000/api/auth/createuser";
          
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        
        body: JSON.stringify({name,email,password})
      });
      const json=await response.json();
      if(json.success===true){
        navigate('/login');
        props.showalert("User created successfully ","success")
      }
      else{
        props.showalert(json.error,"danger");
      }
    }
    else{
      props.showalert("Both password must be same","danger");
    }
  }
  const onChange=(e)=>{
    setAccount({...account,[e.target.name]:e.target.value});
}
  return (
    <div className="container my-4" style={{"width": "40%"}}>
      <h3>SignUp to InoteBook</h3>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label"><b>User name</b></label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="User name" />
  
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label"><b>Email address</b></label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Email"/>

  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" placeholder="Password"><b>Password</b></label>
    <input type="password" className="form-control" onChange={onChange} minLength={5} required name="password" id="password" placeholder="password" />
    </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label"><b>Confirm</b></label>
    <input type="password" className="form-control" onChange={onChange} minLength={5} required name="cpassword" id="cpassword" placeholder="confirm password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
export default Signup
