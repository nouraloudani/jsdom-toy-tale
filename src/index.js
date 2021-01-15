

//Dom Elements
const toyCollectionDiv = document.querySelector('#toy-collection');

// fetch functionssss

function getToys(){
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      toys.forEach ( toy => {
        renderToys(toy);
      })

    })
}

function postToy(toyData) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    }, 
    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((toyObject) => {
    // console.log('success:', toyObject)
    
    // const newToy = renderToys(toyObject);
    // //toyCollectionDiv.append(newToy);
  })



}

//render toys

function renderToys(toy){
  //create elements and add attr
  const divCard = document.createElement('div');
  divCard.className = "card";

  const h2 = document.createElement('h2');
  h2.innerText = toy.name;
  
  const img = document.createElement('img');
  img.className = "toy-avatar";
  img.src = toy.image;

  const p = document.createElement('p');
  p.innerText = `${toy.likes} likes`;

  const btn = document.createElement('button');
  btn.className = "like-btn";
  btn.id = toy.id;
  btn.innerText ="like";
  
  btn.addEventListener('click', (event) => {
    // console.log(event.target.dataset);
    likes(event)
  })

  divCard.append(h2, img, p, btn);
  toyCollectionDiv.append(divCard);
}

  
  
  // like function

  
  function likes (event) {
    event.preventDefault()
    const pTag = event.target.previousElementSibling
    // console.log(pTag)
    
    let addLikes = parseInt(pTag.textContent) + 1; 
    pTag.innerText = `${addLikes}`


    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        "likes": addLikes
      })
    })

    // add more code later, wait for now


  }
//ACTUALLY DISPLAY THE PAGE LOL
  getToys()

  
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    // console.log("addToy clicked")
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyForm = document.querySelector('form')

  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toyName = document.querySelector('input[name="name"]').value
    const toyURL = document.querySelector(`input[name="image"]`).value
    const numberOfToys = document.querySelectorAll(".card").length 
    const newToy = {
      "name" : toyName,
      "image" : toyURL,
      "likes" : 0, 
      "id" : numberOfToys + 1 
    }
    renderToys(newToy);
    postToy(newToy);
    console.log(event.target);
  });


  
});


