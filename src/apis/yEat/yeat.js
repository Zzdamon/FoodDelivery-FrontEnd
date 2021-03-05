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
