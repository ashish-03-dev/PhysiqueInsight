import React from 'react'

const WorkoutWeeklyPlan = ({ weeklyWorkoutPlan }) => {
    weeklyWorkoutPlan = [{
        day: "Monday",
        focus: "Upper Body Strength",
        workouts: [
          { exercise: "Push-ups", sets: 4, reps: 15, target: "Chest" },
          { exercise: "Bench Press", sets: 3, reps: 10, target: "Chest" },
          { exercise: "Shoulder Press", sets: 3, reps: 12, target: "Shoulders" },
        ],
      },
      {
        day: "Tuesday",
        focus: "Lower Body Strength",
        workouts: [
          { exercise: "Squats", sets: 4, reps: 12, target: "Quads" },
          { exercise: "Lunges", sets: 3, reps: 10, target: "Glutes" },
          { exercise: "Leg Press", sets: 3, reps: 10, target: "Quads" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back & Pull",
        workouts: [
          { exercise: "Pull-ups", sets: 3, reps: 8, target: "Back" },
          { exercise: "Barbell Rows", sets: 3, reps: 10, target: "Back" },
          { exercise: "Lat Pulldown", sets: 3, reps: 12, target: "Lats" },
        ],
      },
      {
        day: "Thursday",
        focus: "Rest Day",
        workouts: [],
      },
      {
        day: "Friday",
        focus: "Posterior Chain",
        workouts: [
          { exercise: "Deadlifts", sets: 3, reps: 6, target: "Hamstrings" },
          { exercise: "Romanian Deadlifts", sets: 3, reps: 10, target: "Hamstrings" },
          { exercise: "Hamstring Curls", sets: 3, reps: 12, target: "Hamstrings" },
        ],
      },
      {
        day: "Saturday",
        focus: "Arms & Isolation",
        workouts: [
          { exercise: "Bicep Curls", sets: 4, reps: 12, target: "Biceps" },
          { exercise: "Tricep Dips", sets: 3, reps: 10, target: "Triceps" },
          { exercise: "Cable Pushdowns", sets: 3, reps: 12, target: "Triceps" },
        ],
      },
      {
        day: "Sunday",
        focus: "Active Recovery",
        workouts: [
          { exercise: "Yoga or Active Recovery", sets: 1, reps: 30, target: "Mobility" },
        ],
      },
    ];

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
                                <th style={{ width: "25%" }}>Focus</th>
                                <th>Workouts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyWorkoutPlan.map((plan, idx) => (
                                <tr key={idx}>
                                    <td><strong>{plan.day}</strong></td>
                                    <td>{plan.focus || <em>No focus</em>}</td>
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
}

export default WorkoutWeeklyPlan
