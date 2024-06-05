import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchEmployees } from '../api/api';
import { toast } from 'react-toastify';

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees(10);
        setEmployees(data);
        toast.success('Employees loaded successfully!');
      } catch (error) {
        setError('Failed to fetch employees. Please try again later.');
        toast.error('Failed to fetch employees.');
      }
    };

    loadEmployees();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (employee) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.find(fav => fav.login.uuid === employee.login.uuid)) {
        toast.success('Added to favorites!');
        return [...prevFavorites, employee];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (employeeId) => {
    setFavorites(prevFavorites => {
      toast.info('Removed from favorites!');
      return prevFavorites.filter(fav => fav.login.uuid !== employeeId);
    });
  };

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, favorites, addToFavorites, removeFromFavorites, error }}>
      {children}
    </EmployeeContext.Provider>
  );
};
