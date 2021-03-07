export const fetchCategories= 
    ()=>
{  
    return fetch("http://localhost:5000/api/tags")
    .then(tags=> tags.json())

}

export const auth=(email, password)=>{
    const auth= {email, password};
    
    return fetch('http://localhost:5000/api/Users/auth',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(auth),
        })
  .then(response => response.json())
  
}

export const fetchRestaurants= (tag)=>{
    return fetch(`http://localhost:5000/api/restauranttags/${tag}`)
    .then(restaurants=>restaurants.json())
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
