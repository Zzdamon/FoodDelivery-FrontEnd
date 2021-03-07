import React from 'react';
import CategoryRestaurant from './CategoryRestaurant';

function RestaurantList(props) {
    const { restaurants } = props;

    return (
        <div className="container-fluid align-items-center d-flex flex-column my-4">
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