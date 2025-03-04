import React from "react";
import { Link } from "react-router-dom";

const WorkoutPlanCard = ({ plan }) => {
  return (
    <div className="workout-plan-card">
      <h2>{plan.name}</h2>
      <p>{plan.description}</p>
      <img src={plan.imageUrl} alt={plan.name} className="workout-image" />
      <Link to={`/workout/${plan.id}`} className="start-button">Start</Link>
    </div>
  );
};

export default WorkoutPlanCard;
