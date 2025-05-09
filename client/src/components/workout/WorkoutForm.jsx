// src/components/WorkoutForm.jsx
import React, { useState } from 'react';
import API from '../../utils/api'; // your axios setup
import { useOutletContext } from 'react-router-dom';

const useLayoutContext = () => useOutletContext();

export default function WorkoutForm({ setWeeklyWorkoutPlan, setShowForm }) {
  const { triggerToast } = useLayoutContext();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const initialPlan = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  const [weeklyPlan, setWeeklyPlan] = useState(initialPlan);

  const handleExerciseChange = (day, index, field, value) => {
    const updated = [...weeklyPlan[day]];
    updated[index][field] = value;
    setWeeklyPlan({ ...weeklyPlan, [day]: updated });
  };

  const addExercise = (day) => {
    setWeeklyPlan({
      ...weeklyPlan,
      [day]: [...weeklyPlan[day], { name: '', sets: '', reps: '' }]
    });
  };

  const removeExercise = (day, index) => {
    const updated = weeklyPlan[day].filter((_, i) => i !== index);
    setWeeklyPlan({ ...weeklyPlan, [day]: updated });
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');

    const formattedPlan = Object.entries(weeklyPlan).map(([day, workouts]) => ({
      day,
      workouts: workouts.map((w) => ({
        exercise: w.name,
        sets: Number(w.sets),
        reps: Number(w.reps),
      })),
    }));

    try {
      const res = await API.post('/workout/weekly', {
        userId,
        plan: formattedPlan,
      });

      if (res.data.success) {
        triggerToast('Workout plan submitted!');
        setWeeklyPlan(initialPlan); // Reset the form
        setShowForm(false);
        setWeeklyWorkoutPlan(res.data.plan); // Update the parent component with the new plan
      } else {
        triggerToast('Submission failed.');
      }
    } catch (err) {
      console.error('Failed to save plan', err);
      triggerToast('Server error.');
    }
  };


  return (
    <div className="card p-4 shadow-sm animate__animated animate__fadeIn mb-4">
      <h5 className="mb-4">Create Weekly Workout Plan</h5>
      <button
        type="button"
        className="btn btn-sm btn-secondary mb-3"
        onClick={() => {
          setWeeklyPlan({
            Monday: [
              { name: 'Bench Press', sets: 4, reps: 10 },
              { name: 'Incline Dumbbell Press', sets: 3, reps: 12 },
              { name: 'Push-ups', sets: 3, reps: 20 },
            ],
            Tuesday: [
              { name: 'Deadlifts', sets: 4, reps: 8 },
              { name: 'Pull-ups', sets: 3, reps: 10 },
              { name: 'Barbell Row', sets: 3, reps: 12 },
            ],
            Wednesday: [
              { name: 'Squats', sets: 4, reps: 10 },
              { name: 'Lunges', sets: 3, reps: 12 },
              { name: 'Leg Press', sets: 3, reps: 10 },
            ],
            Thursday: [
              { name: 'Shoulder Press', sets: 3, reps: 10 },
              { name: 'Lateral Raises', sets: 3, reps: 15 },
              { name: 'Face Pulls', sets: 3, reps: 12 },
            ],
            Friday: [
              { name: 'Plank', sets: 3, reps: 60 },
              { name: 'Russian Twists', sets: 3, reps: 20 },
              { name: 'Leg Raises', sets: 3, reps: 15 },
            ],
            Saturday: [
              { name: 'HIIT Cardio', sets: 1, reps: 20 },
              { name: 'Jump Rope', sets: 3, reps: 100 },
              { name: 'Burpees', sets: 3, reps: 15 },
            ],
            Sunday: [
              { name: 'Active Recovery Walk', sets: 1, reps: 45 },
              { name: 'Stretching Routine', sets: 1, reps: 20 },
            ],
          });
        }}

      >
        ⚡ Auto Fill Sample Plan
      </button>
      <form onSubmit={handlePlanSubmit}>
        {daysOfWeek.map((day) => (
          <div key={day} className="mb-4">
            <h6 className="mb-3">{day}</h6>

            {(weeklyPlan[day] || []).map((exercise, idx) => (
              <div key={idx} className="row align-items-end mb-2">
                <div className="col-md-4 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Exercise"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(day, idx, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Sets"
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(day, idx, 'sets', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(day, idx, 'reps', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
                    onClick={() => removeExercise(day, idx)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => addExercise(day)}
            >
              ➕ Add Exercise
            </button>
          </div>
        ))}

        <button type="submit" className="btn btn-success w-100 mt-3">
          💾 Save Weekly Plan
        </button>
      </form>
    </div>
  );
}
