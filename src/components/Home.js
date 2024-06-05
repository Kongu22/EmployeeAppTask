import React, { useState } from 'react';
import { useEmployeeContext } from '../context/context';
import EmployeeList from './EmployeeList';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { employees, error } = useEmployeeContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const filteredEmployees = currentEmployees.filter(employee => {
    const fullName = `${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}`;
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mt-4">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <EmployeeList employees={filteredEmployees} />
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, index) => (
            <li key={index + 1} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Home;
