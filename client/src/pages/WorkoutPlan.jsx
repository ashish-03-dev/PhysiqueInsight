// WorkoutSuggestions.js
import React, { useEffect, useState } from 'react';
import WeeklyWorkoutTable from '../components/workout/WeeklyWorkoutTable';
import WorkoutForm from '../components/workout/WorkoutForm';
import WeeklyWorkoutPlan from '../components/workout/WeeklyWorkoutPlan';
import API from '../utils/api';


const Workoutplan = ({ measurementId, token }) => {

  const [weeklyWorkoutPlan, setWeeklyWorkoutPlan] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchWeeklyWorkout();
  }, []);

  const fetchWeeklyWorkout = async () => {
    try {
      const res = await API.get('/workout/weekly');

      if (res.status === 200) {
        console.log(res.data);
        setWeeklyWorkoutPlan(res.data.plan || []);
      }
    } catch (err) {
      console.error('Failed to fetch weekly workout:', err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <p>Loading...</p>;

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Workout Plan</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Plan'}
        </button>
      </div>

      {showForm && <WorkoutForm setWeeklyWorkoutPlan={setWeeklyWorkoutPlan}/>}

      <WeeklyWorkoutPlan weeklyWorkoutPlan={weeklyWorkoutPlan} />

      <WeeklyWorkoutTable weeklyWorkoutPlan={weeklyWorkoutPlan} />

    </div>
  );
};

export default Workoutplan;
