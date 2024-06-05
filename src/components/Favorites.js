import React from 'react';
import { Link } from 'react-router-dom';
import { useEmployeeContext } from '../context/context';
import { FaStar, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useEmployeeContext();

  if (!favorites || favorites.length === 0) {
    return <p className="text-center mt-4">No favorites added.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="list-group">
        {favorites.map((employee) => (
          <div className="list-group-item" key={employee.login.uuid}>
            <div className="d-flex w-100 justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={employee.picture.thumbnail} alt={employee.name.first} className="img-thumbnail me-3" style={{ width: '50px', height: '50px' }} />
                <h5 className="mb-1">{employee.name.first} {employee.name.last}</h5>
              </div>
              <div>
                <FaStar className="text-warning me-2" />
                <FaTrash className="text-danger" onClick={() => removeFromFavorites(employee.login.uuid)} />
              </div>
            </div>
            <p className="mb-1">{employee.location.city}, {employee.location.country}</p>
            <div className="d-flex align-items-center">
              <small className="me-3">Age: {employee.dob.age}</small>
              <Link to={`/employee/${employee.login.uuid}`} className="btn btn-info btn-sm">More Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
