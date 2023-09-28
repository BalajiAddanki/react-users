import React, { useEffect, useState } from 'react';
import firebaseDB from './firebase';
import { Navigate, useNavigate } from 'react-router';



const Home = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const [getData, setGetData] = useState({});
    useEffect(() => {
        firebaseDB.child('register').on('value', details => {
            console.log(details.val());
            setGetData(details.val());
        })
    }, [])
    const { firstName, lastName, email } = { ...data }
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        var dataAdded = await firebaseDB.child('register').push(
            data,
            err => {
                if (err) {
                    console.log(err);
                }
                else {
                    alert('Data Added');
                }
            }
        );
        setData = ({
            firstName: "",
            lastName: "",
            email: ""
        })
    }
    const deleteHandler = key => {
        firebaseDB.child(`register/${key}`).remove(
            err => {
                if(err) {
                    console(err);
                }
                else {
                    alert('User Deleted Sucessfully')
                }
            }
        );
    } 
    return (
        <div className='container'>
            <div className='row my-3'>
                <div className='col-6 m-auto'>
                    <form autoComplete='off' onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" name='firstName' placeholder="Enter first name" onChange={changeHandler} value={firstName} />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name='lastName' placeholder="Enter last name" onChange={changeHandler} value={lastName} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name='email' placeholder="Enter email" onChange={changeHandler} value={email} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <div className='row my-3'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData &&
                            Object.keys(getData).map(key =>
                                <tr>
                                    <th scope="row">{key}</th>
                                    <td>{getData[key].firstName}</td>
                                    <td>{getData[key].lastName}</td>
                                    <td>{getData[key].email}</td>
                                    <td>
                                        <button className='btn btn-secondary btn-sm mx-1'
                                        onClick={() => navigate(`/edit?firstName=${getData[key].firstName}&lastName=${getData[key].lastName}&email=${getData[key].email}&key=${[key]}`)}
                                        >Edit</button>

                                        <button className='btn btn-danger btn-sm mx-1'
                                        onClick={() => deleteHandler(key)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;
