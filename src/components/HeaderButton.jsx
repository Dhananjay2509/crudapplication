import React from 'react'
import {useNavigate} from 'react-router-dom'

const HeaderButton = () => {
  const navigate = useNavigate()
  const handleCreateUser =()=>{
    navigate("/createUser");
  }
  return (
    <>
      <button type="button" className="btn btn-primary m-3" onClick={()=>handleCreateUser()}>Create a User</button>
    </>
  )
}

export default HeaderButton
