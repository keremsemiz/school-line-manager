import React from 'react';
import './WeeklyPlan.css'; 

const WeeklyPlan = () => {
  const mealPlan = {
    Monday: {
      breakfast: 'Oatmeal with fruits',
      lunch: 'Grilled chicken salad',
      dinner: 'Spaghetti with meatballs'
    },
    Tuesday: {
      breakfast: 'Smoothie bowl',
      lunch: 'Turkey sandwich',
      dinner: 'Tacos'
    },
    Wednesday: {
      breakfast: 'Pancakes',
      lunch: 'Caesar salad',
      dinner: 'Grilled salmon with veggies'
    },
    Thursday: {
      breakfast: 'Yogurt with granola',
      lunch: 'BLT sandwich',
      dinner: 'Stir-fry chicken with rice'
    },
    Friday: {
      breakfast: 'Scrambled eggs',
      lunch: 'Chicken wrap',
      dinner: 'Pizza'
    },
    Saturday: {
      breakfast: 'French toast',
      lunch: 'Burrito bowl',
      dinner: 'BBQ ribs'
    },
    Sunday: {
      breakfast: 'Bagels with cream cheese',
      lunch: 'Pasta salad',
      dinner: 'Roast chicken with potatoes'
    }
  };

  return (
    <div className="weekly-plan">
      <h1>Weekly Meal Plan</h1>
      <div className="meal-plan">
        {Object.keys(mealPlan).map(day => (
          <div key={day} className="day-plan">
            <h2>{day}</h2>
            <p><strong>Breakfast:</strong> {mealPlan[day].breakfast}</p>
            <p><strong>Lunch:</strong> {mealPlan[day].lunch}</p>
            <p><strong>Dinner:</strong> {mealPlan[day].dinner}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlan;
