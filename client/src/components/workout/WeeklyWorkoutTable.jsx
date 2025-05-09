import React from 'react'


const WorkoutWeeklyPlan = ({ weeklyWorkoutPlan }) => {
  return (
      <div>
          <hr className="my-4" />
          <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">📅 Full Weekly Workout Plan</h4>
          </div>

          {weeklyWorkoutPlan && weeklyWorkoutPlan.length > 0 ? (
              <div className="table-responsive mb-4">
                  <table className="table table-bordered table-hover">
                      <thead className="thead-light">
                          <tr>
                              <th style={{ width: "15%" }}>Day</th>
                              <th>Workouts</th>
                          </tr>
                      </thead>
                      <tbody>
                          {weeklyWorkoutPlan.map((plan, idx) => (
                              <tr key={idx}>
                                  <td><strong>{plan.day}</strong></td>
                                  <td>
                                      {plan.workouts && plan.workouts.length > 0 ? (
                                          <ul className="mb-0 ps-3">
                                              {plan.workouts.map((ex, i) => (
                                                  <li key={i}>
                                                      <strong>{ex.exercise}</strong> — {ex.sets}×{ex.reps} ({ex.target})
                                                  </li>
                                              ))}
                                          </ul>
                                      ) : (
                                          <em>No workouts planned</em>
                                      )}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          ) : (
              <div className="text-center">No weekly plan available</div>
          )}
      </div>
  )
};

export default WorkoutWeeklyPlan;
