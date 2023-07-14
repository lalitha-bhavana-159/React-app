import React,{useState,useEffect} from 'react'
import './RemovedUsers.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function RemovedUsers() {

  let [users,setUsers]=useState([])
  let [err,setErr]=useState("")

  let getRemUsers=()=>{
    axios.get("http://localhost:4000/removedusers")
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
    getRemUsers()
  },[])

  let deletePermanently=(userObj)=>{
    axios.delete(`http://localhost:4000/removedusers/${userObj.id}`,userObj)
    .then(res=>{
      if(res.status===200){
        getRemUsers()
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
    <div className='removedUsers mt-5'>
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
              {/* restore button */}
              {/* <button className="btn btn-warning float-start" onClick={()=>restoreUser(userObj)}>Restore</button> */}
              {/* delete button */}
              <Button className="btn btn-danger float-end" onClick={()=>deletePermanently(userObj)}>Delete Permanently</Button>
            </div>
          </div>
        </div> 
        )
        }
      </div>
    </div>
  )
}

export default RemovedUsers