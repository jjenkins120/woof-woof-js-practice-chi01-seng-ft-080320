

function main(){
    dogClickListener();
    changeDogStatus(); 
    filterDogs();
}

const dogBar = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
const dogSummaryContainer = document.querySelector('#dog-summary-container')
const filterBtn = document.querySelector('#good-dog-filter')


function dogClickListener(){
    dogBar.addEventListener('click', function(event){
        fetch('http://localhost:3000/pups')
            .then(resp => resp.json())
            .then(dogs => {
                dogs.forEach(function(dog_instance){
                    if (event.target.textContent == dog_instance.name && dog_instance.isGoodDog === false){
                        dogInfoDiv.innerHTML += `<div class="dog-profile"><img src=${dog_instance.image}><h2>${dog_instance.name}</h2><button data-id=${dog_instance.id}>Bad Dog!</button></div>`
                    } else if (event.target.textContent == dog_instance.name && dog_instance.isGoodDog === true){
                        dogInfoDiv.innerHTML += `<div class="dog-profile"><img src=${dog_instance.image}><h2>${dog_instance.name}</h2><button data-id=${dog_instance.id}>Good Dog!</button></div>`
                    }
                   
                    })
                })
            })
}


function changeDogStatus(){
    dogSummaryContainer.addEventListener('click', function(event){
        
        if (event.target.tagName === "BUTTON"){
            
            if (event.target.textContent == "Good Dog!"){

                const updateGoodDog = {
                    "isGoodDog": false
                }
                const reqObj = {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updateGoodDog)
                    }
                const id = event.target.dataset.id
                fetch(`http://localhost:3000/pups/${id}`, reqObj)
                    .then(resp => resp.json())
                    .then(data => {
                        event.target.innerText = "Bad Dog!"
                    })
                

            } else if (event.target.textContent == "Bad Dog!"){
                const updateBadDog = {
                    "isGoodDog": true
                }
                const reqObj = {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updateBadDog)
                    }
                const id = event.target.dataset.id
                fetch(`http://localhost:3000/pups/${id}`, reqObj)
                    .then(resp => resp.json())
                    .then(data => {
                        event.target.innerText = "Good Dog!"
                    })
            }      
        }    
    })
}



function filterDogs(){
    filterBtn.addEventListener('click',function(event){
        dogBar.innerHTML= ""
        if (event.target.innerText == "Filter good dogs: OFF"){
            event.target.innerText = "Filter good dogs: ON"
            fetch('http://localhost:3000/pups')
                .then(resp => resp.json())
                .then(dogs => {
                    dogs.forEach(function(dog_instance){
                        if (dog_instance.isGoodDog === true){
                            dogBar.innerHTML += `<span>${dog_instance.name}</span>`
                        }
                    })
                })
        } else if (event.target.innerText == "Filter good dogs: ON"){
            event.target.innerText = "Filter good dogs: OFF"
            fetch('http://localhost:3000/pups')
                .then(resp => resp.json())
                .then(dogs => {
                    dogs.forEach(function(dog_instance){
                        dogBar.innerHTML += `<span>${dog_instance.name}</span>`
                })
            })
        } 
    })
}


main()