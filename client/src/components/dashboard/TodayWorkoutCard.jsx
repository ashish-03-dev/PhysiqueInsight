// src/components/TodayWorkoutCard.jsx
import React, { useState, useEffect } from 'react';
import API from '../../utils/api'; // Adjust the import based on your project structure
import { useOutletContext } from 'react-router-dom';

const useLayoutContext = () => useOutletContext();

export default function TodayWorkoutCard({fetchOverview}) {
  const { triggerToast } = useLayoutContext();

  const [todayWorkout, setTodayWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayWorkout = async () => {
      try {
        const res = await API.get('/workout/today');
        setTodayWorkout(res.data); // Set today's workout in state
        setLoading(false);
      } catch (err) {
        console.error('Error fetching today\'s workout', err);
        setLoading(false);
      }
    };

    fetchTodayWorkout();
  }, []);


  const handleWorkoutComplete = async () => {
    try {
      const response = await API.post('/user/workout-complete');
      const data = response.data;

      if (response.status === 201) {
        triggerToast(`🎉 Workout marked complete! Current streak: ${data.streak} days`);
        fetchOverview();
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          triggerToast(`⚠️ ${data.message}`);
        } else {
          triggerToast(`❌ Error: ${data.message || 'Something went wrong'}`);
        }
      } else {
        console.error(error);
        triggerToast('🚫 Network or server issue. Please try again.');
      }
    }
  };


  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">Today's Workout - {todayWorkout?.focus || 'Rest'}</h5>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : todayWorkout ? (
          todayWorkout.workouts.length > 0 ? (
            <>
              <ul className="list-group list-group-flush">
                {todayWorkout.workouts.map((w, i) => (
                  <li className="list-group-item" key={i}>
                    <strong>{w.exercise}</strong> — {w.sets}×{w.reps} ({w.target})
                  </li>
                ))}
              </ul>
              <button
                onClick={handleWorkoutComplete}
                className="btn btn-outline-success mt-3 me-3"
              >
                ✅ Mark as Completed
              </button>
            </>
          ) : (
            <p className="text-muted">Rest day or no workout today.</p>
          )
        ) : (
          <p className="text-muted">No workout planned for today.</p>
        )}
        <a href="/home/workout-page" className="btn btn-primary mt-3">
          📅 View Full Plan
        </a>
      </div>
    </div>
  );
}
