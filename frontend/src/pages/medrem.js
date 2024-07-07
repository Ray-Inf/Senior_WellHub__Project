import React, { useState, useEffect } from 'react';
import './medrem.css';
import Navbar from './mednav';

const Medrem = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    // Fetch medications from local storage
    const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
    setMedications(storedMedications);
  }, []);

  const [todayMedications, setTodayMedications] = useState([]);
  const [upcomingMedications, setUpcomingMedications] = useState([]);

  useEffect(() => {
    const now = new Date();

    // Filter medications for today
    const todayMedications = medications.filter((medication) => {
      if (medication.frequency.includes('Daily')) {
        return true;
      } else if (medication.frequency.includes('Weekly')) {
        return now.getDay() === new Date(medication.date).getDay();
      } else if (medication.frequency.includes('Monthly')) {
        return now.getDate() === new Date(medication.date).getDate();
      }
      return false;
    });

    // Filter medications for the next day
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);

    const upcomingMedications = medications.filter((medication) => {
      if (medication.frequency.includes('Daily')) {
        return true;
      } else if (medication.frequency.includes('Weekly')) {
        return nextDay.getDay() === new Date(medication.date).getDay();
      } else if (medication.frequency.includes('Monthly')) {
        return nextDay.getDate() === new Date(medication.date).getDate();
      }
      return false;
    });

    setTodayMedications(todayMedications);
    setUpcomingMedications(upcomingMedications);
  }, [medications]);

  const handleMedicationTaken = (medicationId) => {
    // Remove the medication with the corresponding id from the reminder list for today
    const updatedTodayMedications = todayMedications.filter((medication) => medication.id !== medicationId);
    setTodayMedications(updatedTodayMedications);
  };

  return (
    <div>
      <Navbar />
      <div className="medicationremindercontainer">
        <h2>Medication Reminder</h2>
        <h3>⚫ Today's Medication</h3>
        {todayMedications.length > 0 ? (
          <ul className="medicationlist">
            {todayMedications.map((medication) => (
              <li key={medication.id} className="medicationitem">
                <span>Name: {medication.name}</span>
                <span>Dosage: {medication.dosage}</span>
                <span>Frequency: {medication.frequency}</span>
                <span>
                  Time:{' '}
                  {medication.morning && 'Morning '}
                  {medication.afternoon && 'Afternoon '}
                  {medication.night && 'Night'}
                </span>
                <button className='takenbtn' onClick={() => handleMedicationTaken(medication.id)}>Taken</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="nomedications">No medications scheduled for today.</p>
        )}

        <h3>⚫ Tomorrow's Medication</h3>
        {upcomingMedications.length > 0 ? (
          <ul className="medicationlist">
            {upcomingMedications.map((medication) => (
              <li key={medication.id} className="medicationitem">
                <span>Name: {medication.name}</span>
                <span>Dosage: {medication.dosage}</span>
                <span>Frequency: {medication.frequency}</span>
                <span>
                  Time:{' '}
                  {medication.morning && 'Morning '}
                  {medication.afternoon && 'Afternoon '}
                  {medication.night && 'Night'}
                </span>
                <button className='tomtakenbtn' disabled >Taken</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="nomedications">No medications scheduled for the next day.</p>
        )}
      </div>
    </div> 
  );
};

export default Medrem;

