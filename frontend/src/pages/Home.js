// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import WorkoutPlanCard from "../components/WorkoutPlans";

// import "./Home.css";

// const Home = () => {
//   const [workoutPlans, setWorkoutPlans] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/workout-plans")

//       .then((response) => setWorkoutPlans(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="home">
//       <h1>Welcome to Social Fitness</h1>
//       <div className="workout-plans-container">
//         {workoutPlans.map((plan) => (
//           <WorkoutPlanCard key={plan.id} plan={plan} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
// ./components/Home.js
import React, {
  useState,
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import Navbar from '../components/Navbar';


function Home() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/workout-plans')
      .then(response => {
        setWorkoutPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching workout plans:', error);
      });
  }, []);

  const handleStartWorkout = (workoutId) => {
    // Navigate to the workout page with the workout plan ID
    navigate(`/workout/${workoutId}`);
  };

  return (
    <div className="home">
      <Navbar />
      <h1>Workout Plans</h1>
      <div className="workout-plans-container">
        {workoutPlans.map(workoutPlan => (
          <div key={workoutPlan.id}
            className="workout-plan-card">
            <h2>{workoutPlan.name}</h2>
            <p>{workoutPlan.description}</p>
            <img src={workoutPlan.imageUrl}
              alt={workoutPlan.name}
              className="workout-image" /><br />
            <button className="start-button"
              onClick={() => handleStartWorkout(workoutPlan.id)}>
              Start Workout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

