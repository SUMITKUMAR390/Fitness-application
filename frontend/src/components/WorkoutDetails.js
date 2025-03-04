import React from 'react';
import { useParams } from 'react-router-dom';

const WorkoutDetails = ({ workoutPlans }) => {
    const { id } = useParams();
    const plan = workoutPlans.find(plan => plan._id === id);

    if (!plan) return <h2>Workout Plan Not Found</h2>;

    return (
        <div className="workout-plan">
            <h2 className="workout-plan-title">{plan.name}</h2>
            <img src={plan.imageUrl} alt={plan.name} className="workout-image" />
            <div className="workout-list">
                {plan.workouts.map((workout, index) => (
                    <div key={index} className="workout-item">
                        <input type="checkbox" />
                        <label>{workout.name} - {workout.description} ({workout.duration} min)</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutDetails;
