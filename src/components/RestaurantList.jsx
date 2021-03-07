import React from 'react';
import CategoryRestaurant from './CategoryRestaurant';

function RestaurantList(props) {
    const { restaurants } = props;

    return (
        <div className="d-flex flex-wrap my-4">
            { restaurants.map((rest) => {
                return <CategoryRestaurant
                    {...rest}
                    key={rest.id}
                />
            })}
        </div>
    );
}

export default RestaurantList;