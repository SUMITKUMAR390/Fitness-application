// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import { useParams } from "react-router-dom";

// const WorkoutPage = () => {
//   const { id } = useParams();

//   const [workoutDetails, setWorkoutDetails] = useState({});
  
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/workout-plans/${id}`)
//       .then((response) => setWorkoutDetails(response.data))
//       .catch((error) => console.error("Error fetching workout details:", error));
//   }, [id]);

//   return (

//     <div className="workout-plan">
//       <h2>Workout Plan {id}</h2>
//       <h2>{workoutDetails.name}</h2>
//       <p>{workoutDetails.description}</p>
//       <img src={workoutDetails.imageUrl} alt={workoutDetails.name} className="workout-image" />

//     </div>
//   );
// };

// export default WorkoutPage;
import React, {
  useState,
  useEffect
} from 'react';
import {
  useParams
} from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import Navbar from '../components/Navbar';

function WorkoutPage() {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState({});

  useEffect(() => {
    if (!id) {
      console.error('Invalid workout plan ID:', id);
      return;
    }

    axios.get(`http://localhost:5000/api/workout-plans`)
      .then(response => {
        const plan = response.data.find(plan => plan.id === parseInt(id));

        if (plan) {
          setWorkoutPlan(plan);
          // Initialize selected workouts state
          const initialSelectedWorkouts = {};
          plan.workouts.forEach(workout => {
            initialSelectedWorkouts[workout.name] = false;
          });
          setSelectedWorkouts(initialSelectedWorkouts);
        } else {
          console.error('Workout plan not found:', id);
        }
      })
      .catch(error => {
        console.error('Error fetching workout plans:', error);
      });
  }, [id]);

  const handleCheckboxChange = (workoutName) => {
    setSelectedWorkouts({
      ...selectedWorkouts,
      [workoutName]: !selectedWorkouts[workoutName]
    });
  };

  if (workoutPlan === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-plan">
      <Navbar />
      <h1 className="workout-plan-title">
        {workoutPlan.name}
      </h1>
      <img src={workoutPlan.imageUrl}
        alt={workoutPlan.name}
        className="workout-image" />
      <p>{workoutPlan.description}</p>
      <div className="workout-list">
        {workoutPlan.workouts &&
          workoutPlan.workouts.map(workout => (
            <div key={workout.name}
              className={`workout-item ${selectedWorkouts[workout.name] ?
                  'selected' : ''}`}>
              <input
                type="checkbox"
                checked={selectedWorkouts[workout.name]}
                onChange={() => handleCheckboxChange(workout.name)}
              />
              <label>{workout.name}</label>
            </div>
          ))}
      </div>
      {Object.values(selectedWorkouts).every(value => value)
        && <div className="workout-completed">
          Workout Completed!
        </div>}
    </div>
  );
}

export default WorkoutPage;

