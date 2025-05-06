import React, { useState, useEffect } from 'react'
import API from '../../utils/api';
import TodayWorkoutCard from './TodayWorkoutCard';
const OverView = () => {

    const [userName, setUserName] = useState('');
    const [streak, setStreak] = useState(0);
    const [lastWorkoutDate, setLastWorkoutDate] = useState(null);
    const [weight, setWeight] = useState(null);
    const [motivation, setMotivation] = useState("Your Journey Starts Here!");

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const response = await API.get('/user/overview');
                const data = response.data;
                if (data) {
                    setUserName(data.name);
                    setStreak(data.workoutStreak);
                    setWeight(data.weight);
                    setLastWorkoutDate(data.lastWorkoutDate);
                    // setMotivation(data.motivation);
                } else {
                    console.error(response.message);
                }
            } catch (err) {
                console.error('Failed to fetch user stats', err);
            }
        };

        fetchOverview();
    }, []);

    return (
        <div className='mb-4'>
            <h2 className="mb-4">
                {userName ? `Welcome, ${userName}` : ''}
            </h2>

            {motivation && (
                <div className="alert alert-success mb-4" role="alert">
                    🏅 Congrats! {motivation}
                </div>
            )}

            <h5 className='mb-3'>Today's Overview</h5>
            <div className="row g-4 mb-5">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <ul className="list-group list-group-flush mb-3">
                                <li className="list-group-item">
                                    Current Weight: <strong>{weight} kg</strong>
                                </li>
                                <li className="list-group-item">
                                    Workout Streak: <strong>{streak}</strong>
                                </li>
                            </ul>
                            {lastWorkoutDate && (
                                <p className="text-muted mb-0">
                                    Last completed: {new Date(lastWorkoutDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-8">
                    <TodayWorkoutCard />
                </div>

            </div>
        </div>
    )
}

export default OverView
