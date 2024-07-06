import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../features/crudSlice';

const Update = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, user: { name, email } }))
      .then(() => {
        navigate("/read");
      })
      .catch((error) => {
        console.error("There was an error updating data!", error);
      });
  };

  return (
    <>
      <h2>Update</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="text">Name</label>
          <input type="text" className="form-control" value={name}
            onChange={(e) => setName(e.target.value)} required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />
        </div>

        <button type="submit" className="btn btn-primary mx-2">Update</button>
        <Link to="/read">
          <button className="btn btn-primary mx-2">Back</button>
        </Link>
      </form>
    </>
  );
}

export default Update;
