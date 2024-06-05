import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaTrash } from 'react-icons/fa';
import { useEmployeeContext } from '../context/context';
import MapComponent from './MapComponent';
import Comments from './Comments';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, favorites, addToFavorites, removeFromFavorites, error } = useEmployeeContext();
  const [employee, setEmployee] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const foundEmployee = employees.find(emp => emp.login.uuid === id);
        if (!foundEmployee) {
          throw new Error('Employee not found');
        }
        setEmployee(foundEmployee);
      } catch (error) {
        setLocalError(error.message);
      }
    };

    fetchEmployee();
  }, [id, employees]);

  if (error || localError) {
    return <div className="alert alert-danger mt-4">{error || localError}</div>;
  }

  if (!employee) return <p>Loading...</p>;

  const isFavorite = favorites.some(fav => fav.login.uuid === employee.login.uuid);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(employee.login.uuid);
    } else {
      addToFavorites(employee);
    }
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mt-4 employee-details">
      <div className="card text-center">
        <img 
          src={employee.picture.large} 
          className="card-img-top img-fluid rounded-circle" 
          alt={employee.name.first} 
          style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '20px auto' }} 
        />
        <div className="card-body">
          <h5 className="card-title mb-0">{employee.name.first} {employee.name.last}</h5>
          <p className="card-text"><strong>Age:</strong> {employee.dob.age}</p>
          <p className="card-text mb-2">
            <FaEnvelope className="me-2" /> {employee.email}
          </p>
          <p className="card-text mb-2">
            <FaPhone className="me-2" /> {employee.phone}
          </p>
          <p className="card-text mb-2">
            <FaMapMarkerAlt className="me-2" /> {employee.location.street.number} {employee.location.street.name}, {employee.location.city}, {employee.location.country}
          </p>
          <MapComponent location={employee.location} className="mb-3" />
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="btn btn-primary me-2" onClick={goBack}>Return to Main Page</button>
            <button className="btn btn-warning d-flex align-items-center justify-content-center" onClick={toggleFavorite}>
              {isFavorite ? <FaTrash className="icon-centered me-2" /> : <FaStar className="icon-centered me-2" />} {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
      <Comments employeeId={id} />
    </motion.div>
  );
};

export default EmployeeDetails;
