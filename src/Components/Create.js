import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createUser } from '../features/crudSlice';

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ name, email }))
      .then(() => {
        navigate("/read");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2>Create</h2>
        <Link to="/read">
          <button className='btn btn-primary'>Show Data</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="text">Name</label>
          <input type="text" className="form-control" 
            onChange={(e) => setName(e.target.value)} required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)} required
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default Create;

