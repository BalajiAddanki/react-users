import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import firebaseDB from './firebase';
const Edit = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })
  const { firstName, lastName, email } = { ...data }
  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    setData({
      ...data,
      firstName: query.get('firstName'),
      lastName: query.get('lastName'),
      email: query.get('email')
    })
  }, [])
  const submitHanlder = e => {
    e.preventDefault();
    firebaseDB.child(`register/${query.get('key')}`).set(
      data,
      err => {
        if (err) {
          console.log(err);
        }
        else{
          alert('User details updated')
        }
      }
    )
  }
  let query = new URLSearchParams(useLocation().search);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 m-auto'>
          <form onSubmit={submitHanlder} autoComplete='off'>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" name="firstName" value={firstName} onChange={changeHandler} />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" name="lastName" value={lastName} onChange={changeHandler} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" name="email" value={email} onChange={changeHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
