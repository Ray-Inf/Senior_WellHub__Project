import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addrem.css';
import Navbar from './mednav';


const Addmed = () => {
  const navigate = useNavigate();
  const [medication, setMedication] = useState({
    id: Date.now(), // Unique ID for each medication
    name: '',
    dosage: '',
    frequency: '',
    morning: false,
    afternoon: false,
    night: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedication((prevMedication) => ({
      ...prevMedication,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if any required field is empty
    if (!medication.name || !medication.dosage || !medication.frequency) {
      alert('Please fill in all required fields (Medication Name, Dosage, and Frequency).');
      return;
    }
  
    // Save medication to local storage
    const existingMedications = JSON.parse(localStorage.getItem('medications')) || [];
    const updatedMedications = [...existingMedications, medication];
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
  
    // Clear form fields after submission
    setMedication({ name: '', dosage: '', frequency: '', morning: false, afternoon: false, night: false });

    navigate('/medicine');
  };
  

  return (
    <div>
      <Navbar />
      <div className="add-medication-container">
        <h2>Add New Medication</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Medication Name:
            <input type="text" name="name" value={medication.name} placeholder='Enter name' onChange={handleChange} />
          </label>
          <label>
            Dosage:
            <input type="number" name="dosage" value={medication.dosage} placeholder='Enter dosage count' onChange={handleChange} />
          </label>
          <label>
            Frequency:
            <select name="frequency" value={medication.frequency} onChange={handleChange}>
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Twice Daily">Twice Daily</option>
              <option value="Thrice Daily">Thrice Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </label>
          <label>
            Time:
            <div className="time-checkboxes">
              <label>
                <input type="checkbox" name="morning"  checked={medication.morning} onChange={handleChange} />
                Morning
              </label>
              <label>
                <input type="checkbox" name="afternoon" checked={medication.afternoon} onChange={handleChange} />
                Afternoon
              </label>
              <label>
                <input type="checkbox" name="night" checked={medication.night} onChange={handleChange} />
                Night
              </label>
            </div>
          </label>
          <button type="submit">Add Medication</button>
        </form>
      </div>
    </div>
  );
};

export default Addmed;
