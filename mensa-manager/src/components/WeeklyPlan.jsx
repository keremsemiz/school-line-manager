import React from 'react';
import './WeeklyPlan.css'; 
const WeeklyPlan = () => {
  const mealPlan = {
    Monday: {
      breakfast: {meal: 'Oatmeal with fruits', img: 'oatmeal.jpg'},
      lunch: {meal: 'Grilled chicken salad', img: 'chicken_salad.jpg'},
      dinner: {meal: 'Spaghetti with meatballs', img: 'spaghetti.jpg'},
      snack: {meal: 'Apple slices', img: 'apple_slices.jpg'},
      drink: {meal: 'Orange juice', img: 'orange_juice.jpg'}
    },
    Tuesday: {
      breakfast: {meal: 'Smoothie bowl', img: 'smoothie_bowl.jpg'},
      lunch: {meal: 'Turkey sandwich', img: 'turkey_sandwich.jpg'},
      dinner: {meal: 'Tacos', img: 'tacos.jpg'},
      snack: {meal: 'Granola bar', img: 'granola_bar.jpg'},
      drink: {meal: 'Lemonade', img: 'lemonade.jpg'}
    },
    Wednesday: {
      breakfast: {meal: 'Pancakes', img: 'pancakes.jpg'},
      lunch: {meal: 'Caesar salad', img: 'caesar_salad.jpg'},
      dinner: {meal: 'Grilled salmon with veggies', img: 'grilled_salmon.jpg'},
      snack: {meal: 'Yogurt', img: 'yogurt.jpg'},
      drink: {meal: 'Green tea', img: 'green_tea.jpg'}
    },
    Thursday: {
      breakfast: {meal: 'Yogurt with granola', img: 'yogurt_granola.jpg'},
      lunch: {meal: 'BLT sandwich', img: 'blt_sandwich.jpg'},
      dinner: {meal: 'Stir-fry chicken with rice', img: 'stir_fry.jpg'},
      snack: {meal: 'Mixed nuts', img: 'mixed_nuts.jpg'},
      drink: {meal: 'Iced tea', img: 'iced_tea.jpg'}
    },
    Friday: {
      breakfast: {meal: 'Scrambled eggs', img: 'scrambled_eggs.jpg'},
      lunch: {meal: 'Chicken wrap', img: 'chicken_wrap.jpg'},
      dinner: {meal: 'Pizza', img: 'pizza.jpg'},
      snack: {meal: 'Fruit salad', img: 'fruit_salad.jpg'},
      drink: {meal: 'Smoothie', img: 'smoothie.jpg'}
    },
    Saturday: {
      breakfast: {meal: 'French toast', img: 'french_toast.jpg'},
      lunch: {meal: 'Burrito bowl', img: 'burrito_bowl.jpg'},
      dinner: {meal: 'BBQ ribs', img: 'bbq_ribs.jpg'},
      snack: {meal: 'Chips and salsa', img: 'chips_salsa.jpg'},
      drink: {meal: 'Coca-Cola', img: 'coca_cola.jpg'}
    },
    Sunday: {
      breakfast: {meal: 'Bagels with cream cheese', img: 'bagels.jpg'},
      lunch: {meal: 'Pasta salad', img: 'pasta_salad.jpg'},
      dinner: {meal: 'Roast chicken with potatoes', img: 'roast_chicken.jpg'},
      snack: {meal: 'Cookies', img: 'cookies.jpg'},
      drink: {meal: 'Milkshake', img: 'milkshake.jpg'}
    }
  };

  return (
    <div className="weekly-plan">
      <h1>Weekly Meal Plan</h1>
      <div className="meal-plan">
        {Object.keys(mealPlan).map(day => (
          <div key={day} className="day-plan card">
            <h2>{day}</h2>
            {Object.keys(mealPlan[day]).map(mealType => (
              <div key={mealType} className="meal-item">
                <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                <img src={`/images/${mealPlan[day][mealType].img}`} alt={mealPlan[day][mealType].meal} />
                <p>{mealPlan[day][mealType].meal}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlan;
