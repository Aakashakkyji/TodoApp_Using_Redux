import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../features/crudSlice';

const Read = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.crud.users);
  const status = useSelector((state) => state.crud.status);
  const error = useSelector((state) => state.crud.error);
  const [tabledark, setTabledark] = React.useState("");

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  let content;
  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = (
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to="/update">
                  <button className="btn btn-success" onClick={() => setToLocalStorage(user.id, user.name, user.email)}>Edit</button>
                </Link>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox"
          onClick={() => setTabledark(tabledark === 'table-dark' ? "" : "table-dark")}
        />
      </div>

      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>
      <div>
        {content}
      </div>
    </>
  );
}

export default Read;
