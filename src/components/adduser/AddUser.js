import React,{useState} from 'react'
import './AddUser.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AddUser() {

  let {register,handleSubmit,formState:{errors}}=useForm()

  let[err,setErr]=useState("")

  let navigate=useNavigate()

  let addNewUser=(newUser)=>{
    //console.log(newUser);
    axios.post("http://localhost:4000/users",newUser)
    .then(res=>{
      if(res.status===201){
        setErr("")
        // navigate to users component
        navigate("/users")
      }
    })
    .catch(err=>{
      console.log(err)
      if(err.response){
        setErr(err.message)
      }
      else if(err.request){
        setErr(err.message)
      }
      else{
        setErr(err.message)
      }
    })
  }
  
  return (
    <div className='add-user'>
      <p className="display-3 text-center mt-5">Add New User</p>
      {/* HTTP error msg */}
      {err.length!==0 && <p className="display-4 text-center text-danger">{err}</p> }
      {/* responsive form */}
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(addNewUser)}>
            {/* name */}
            <div className=" form-floating mb-3">
              <input type="text" id="name" placeholder="Name" className='form-control' {...register("name",{required:true})}/>
              <label htmlFor="name">Name</label>
              {/* validation */}
              <div className="valid">
                {errors.name?.type==="required" && <p className="text-danger fs-5">*Name is required</p> }
              </div>
            </div>
            {/* email */}
            <div className=" form-floating mb-3">
              <input type="email" id="email" placeholder="Email" className='form-control' {...register("email",{required:true})}/>
              <label htmlFor="email">Email</label>
              {/* validation */}
              <div className="valid">
                {errors.email?.type==="required" && <p className="text-danger fs-5">*Email is required</p> }
              </div>
            </div>
            {/* dob */}
            <div className=" form-floating mb-3">
              <input type="date" id="dob" placeholder="Date Of Birth" className='form-control' {...register("dob",{required:true})}/>
              <label htmlFor="dob">DOB</label>
              {/* validation */}
              <div className="valid">
                {errors.dob?.type==="required" && <p className="text-danger fs-5">*DOB is required</p> }
              </div>
            </div>
            {/* image url */}
            <div className=" form-floating mb-3">
              <input type="text" id="image" placeholder="Image Url" className='form-control' {...register("image")}/>
              <label htmlFor="image">User Image</label>
            </div>
            {/* submit button */}
              <button type="submit" className="btn add-user-btn">Create New User</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUser