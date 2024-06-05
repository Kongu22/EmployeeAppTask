import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaStar } from 'react-icons/fa';
import { useEmployeeContext } from '../context/context';
import { motion } from 'framer-motion';
import './EmployeeItem.css';

const EmployeeItem = ({ employee }) => {
  const { addToFavorites } = useEmployeeContext();

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="card h-100 text-center">
      <img 
        src={employee.picture.large} 
        className="card-img-top img-fluid rounded-circle" 
        alt={employee.name.first} 
        style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '20px auto' }} 
      />
      <div className="card-body">
        <h5 className="card-title">{employee.name.first} {employee.name.last}</h5>
        <p className="card-text">{employee.location.city}, {employee.location.country}</p>
        <p className="card-text"><small>Age: {employee.dob.age}</small></p>
        <div className="d-flex justify-content-center">
          <Link to={`/employee/${employee.login.uuid}`} className="btn btn-info btn-sm me-2 d-flex align-items-center justify-content-center">
            <FaInfoCircle className="icon-centered me-2" /> More Details
          </Link>
          <button onClick={() => addToFavorites(employee)} className="btn btn-warning btn-sm d-flex align-items-center justify-content-center">
            <FaStar className="icon-centered me-2" /> Add to Favorites
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeItem;
