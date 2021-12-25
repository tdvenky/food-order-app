import React, { useEffect, useState } from 'react';

import useAxios from '../../../hooks/useAxios';

import Card from '../../UI/Card/Card';
import MealItem from '../MealItems/MealItem';

import classes from './AvailableMeals.module.css'

  const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    const { get: fetchMeals} = useAxios();

    useEffect(() => {
      const transformedMeals = (mealsObj) => {
        const loadedMeals = [];

        for(const key in mealsObj) {
          loadedMeals.push({ 
            id: key, 
            name: mealsObj[key].name, 
            description: mealsObj[key].description, 
            price: mealsObj[key].price 
          });
        }

        setMeals(loadedMeals);
      };

      fetchMeals({
        url: process.env.REACT_APP_DB_URL
      }, transformedMeals)
    }, []);

    const mealsList = meals.map(
        meal => <MealItem 
                    id={meal.id}
                    key={meal.id} 
                    name={meal.name} 
                    description={meal.description} 
                    price={meal.price}
                />
    );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )

  }

  export default AvailableMeals;