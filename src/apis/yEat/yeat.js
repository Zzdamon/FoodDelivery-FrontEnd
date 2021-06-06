export const fetchCategories= 
    ()=>
{  
    return fetch("http://localhost:5000/api/tags")
    .then(tags=> tags.json())

}

export const auth=(email, password)=>{
    const auth= {email, password};
    
    return fetch('http://localhost:5000/api/Clients/auth',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(auth),
        })
  .then(response => response.json())
  
}

export const register=(email, password,firstName,lastName)=>{
    const user= {email, password,firstName,lastName};
    
    return fetch('http://localhost:5000/api/Clients',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(user),
        })
  .then(response => response.json())
  
}

export const fetchRestaurants= (tag)=>{
    return fetch(`http://localhost:5000/api/restauranttags/${tag}`)
    .then(restaurants=>restaurants.json())
}

export const fetchRestaurantById= (id)=>{
    return fetch(`http://localhost:5000/api/restaurants/${id}`)
    .then(restaurant=>restaurant.json())
}

export const fetchMenuCategories= (restId)=>{
    return fetch(`http://localhost:5000/api/categories/byRestId/${restId}`)
    .then(categories=>categories.json())
}

// export const fetchCategoryItems= ()=>{
//     return fetch(`http://localhost:5000/api/categories/byRestId/${restId}`)
//     .then(restaurants=>restaurants.json())
// }


export const fetchItems=(categoryIDs)=>{
    // const auth= {email, password};
    
    return fetch('http://localhost:5000/api/items/byCategId',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(categoryIDs),
        })
  .then(response => response.json())
  
}

export const postOrder=(order)=>{
    return fetch('http://localhost:5000/api/orders',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(order),
        })
  .then(response => response.json())
}

export const postOrderItems=(orderItems)=>{
    return fetch('http://localhost:5000/api/orderItems/bulk',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(orderItems),
        })
  .then(response => response.json())
}
