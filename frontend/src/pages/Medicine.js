import React, { useState, useEffect } from 'react';
import './Medicine.css';
import Navbar from './mednav';

const Medicine = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    // Fetch medications from local storage
    const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
    setMedications(storedMedications);
  }, []);

  const handleMedicationDelete = (medicationId) => {
    // Remove the medication with the corresponding id from the list and update local storage
    const updatedMedications = medications.filter((medication) => medication.id !== medicationId);
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
  };

  return (
    <div>
      <Navbar />
        <div className="home-container">
          <h2>Medication List</h2>
          {medications.length > 0 ? (
            <ul className="medication-list">
              {medications.map((medication) => (
                <li key={medication.id} className="medication-item">
                  <span>Name - {medication.name}</span>
                  <span>Dosage - {medication.dosage}</span>
                  <span>Frequency - {medication.frequency}</span>
                  <span>
                    Time - {' '}
                    {medication.morning && 'Morning '}
                    {medication.afternoon && 'Afternoon '}
                    {medication.night && 'Night'}
                  </span>
                  <button className='delbtn' onClick={() => handleMedicationDelete(medication.id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-medications">No medications added yet, please add some by clicking on add medication in navbar.</p>
          )}
        </div>
    </div>
  );
};

export default Medicine;

