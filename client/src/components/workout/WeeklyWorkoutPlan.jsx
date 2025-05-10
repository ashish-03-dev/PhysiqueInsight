// src/components/WeeklyWorkoutPlan.jsx
import { useEffect, useState } from 'react';
import API from '../../utils/api';


export default function WeeklyWorkoutPlan({weeklyWorkoutPlan}) {


  return (
    <div className='row g-4'>
       <hr className="my-4" />
          <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">📅 Full Weekly Workout Plan</h4>
          </div>
      {weeklyWorkoutPlan.map((dayPlan, index) => (
        <div className="col-12 col-md-6 col-lg-4" key={index} >
          <div className="card h-100">

            <div className="card-header bg-light">
              <h5 className="mb-0 text-primary">
                🗓️ {dayPlan.day}
              </h5>
            </div>

            <div className="card-body">
              {dayPlan.workouts.length === 0 ? (
                <p className="text-muted">Rest day or no workouts planned.</p>
              ) : (
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Sets</th>
                      <th>Reps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dayPlan.workouts.map((workout, idx) => (
                      <tr key={idx}>
                        <td>{workout.exercise}</td>
                        <td>{workout.sets}</td>
                        <td>{workout.reps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
