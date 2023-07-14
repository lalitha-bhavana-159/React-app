import React,{useState,useEffect} from 'react'
import './Users.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";

function Users(){

  let [users,setUsers]=useState([])
  let[err,setErr]=useState("")
  let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm()
  let [show,setShow]=useState(false)

  let [userToEdit,setUserToEdit]=useState({})

  let showModal=()=>setShow(true)
  let closeModal=()=>setShow(false)

  let editUser=(userObj)=>{
    showModal();
    setUserToEdit(userObj)
    setValue("name",userObj.name)
    setValue("email",userObj.email)
    setValue("dob",userObj.dob)
    setValue("image",userObj.image)
  }

  let deleteUser=(userObj)=>{
    // add to removed users
    axios.post(`http://localhost:4000/removedusers`,userObj)
    .then(res=>{
      if(res.status===200){
        //setUsers(res.data)
        //getUsers()
        setErr("")
        //console.log("Added to removed users");
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
    //delete from users
    axios.delete(`http://localhost:4000/users/${userObj.id}`,userObj)
    .then(res=>{
      if(res.status===200){
        getUsers()
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

  let saveUser=()=>{
    closeModal()
    let modifiedUser = getValues()
    //console.log(modifiedUser);
    modifiedUser.id=userToEdit.id
    axios.put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
    .then(res=>{
      if(res.status===200){
        //setUsers(res.data)
        getUsers()
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

  let getUsers=()=>{
    axios.get("http://localhost:4000/users")
    .then(res=>{
      //console.log(res);
      if(res.status===200){
        setUsers(res.data)
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

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <div className='users mt-5'>
      {/* <p>User data</p> */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {
        users.map((userObj)=>
          <div className="col text-center mx-auto" key={userObj.id}>
          <div className="card">
            <img src={userObj.image} className='mx-auto profile-image mt-2' alt="user-image" />
            <div className="card-body">
              <p className="display-5 name">{userObj.name}</p>
              <p className="lead fs-4">{userObj.email}</p>
              <p className="lead">{userObj.dob}</p>
              {/* edit button */}
              <button className="btn btn-warning float-start" onClick={()=>editUser(userObj)}>Edit</button>
              {/* delete button */}
              <button className="btn btn-danger float-end" onClick={()=>deleteUser(userObj)}>Delete</button>
            </div>
          </div>
        </div> 
        )
        }
      </div>
      {/* modal to edit user  */}
        <Modal show={show} onHide={closeModal} backdrop="static" centered className='modal'>
          <Modal.Header>
            <Modal.Title>Edit profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form >
            {/* name */}
            <div className=" mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" id="name"  className='form-control' {...register ("name")} />
            </div>
            {/* email */}
            <div className=" mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" id="email"  className='form-control' {...register ("email")} />
            </div>
            {/* dob */}
            <div className=" mb-3">
              <label htmlFor="dob">DOB</label>
              <input type="date" id="dob"  className='form-control' {...register ("dob")} />
            </div>
            {/* image url */}
            <div className=" mb-3">
              <label htmlFor="image">User Image</label>
              <input type="text" id="image" className='form-control' {...register ("image")} disabled />
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={saveUser}>Save</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Users