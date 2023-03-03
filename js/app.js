let table = document.querySelector('table');
let createBtn = document.querySelector('.create-btn');
let form = document.querySelector('#form-overlay');
let discardBtn = document.querySelector('.discard-btn');
let saveBtn = document.querySelector('.save-btn');
let title = document.querySelector('#title');
let description = document.querySelector('#desc');
let alert = document.querySelector('.alert');
let card = document.querySelector('.card');
let cardTitle = document.querySelector('.card-title');
let cardText = document.querySelector('.card-text');
let group = document.querySelector('#group');
let status = document.querySelector('#status');
let substatus = document.querySelector('#substatus');
let allFields = document.querySelectorAll('.fields');
let substatusInputGroup = document.querySelector('.subhidden');
let edit = document.querySelector('.edit');


window.addEventListener('DOMContentLoaded',setupCards);


createBtn.addEventListener('click', ()=>{
    form.style.display = 'grid';
    edit.classList.remove('active');
    title.value = "";
    description.value = "";

});




discardBtn.addEventListener('click', ()=>{
    form.style.display = 'none';
});




    status.addEventListener('input', (e)=>{
        const option = e.currentTarget.value.toLowerCase().replaceAll(' ', '');
        if(option == 'inprogress'){
            substatusInputGroup.classList.remove('subhidden');
        }
        else{
            substatusInputGroup.classList.add('subhidden');
        }
    })




saveBtn.addEventListener('click', ()=>{
    if(title.value == "" && desc.value == ""){
        displayAlert("please entry the values");
    }
    else if(title.value.length > 12){
        displayAlert("title must be less than 12 caracters");
    }
    else if(title.value == ""){
        displayAlert("please entry the title");
    }
    else if(desc.value == ""){
        displayAlert("please entry the description");     
    }
    else if(desc.value.length < 10 || desc.value.length > 25){
        displayAlert("description must have between 10 and 25 characters");
    }
    else if(!edit.classList.contains('active')){
        let card = new Card();
        card.title = title.value;
        card.group = group.value; 
        card.status = status.value;
        card.substatus = substatus.value;
        card.description = description.value;
        card.create();
    }
})


// display alert
function displayAlert(text){
    alert.textContent = text;
    alert.classList.add(`active`);

setTimeout(()=>{
    alert.textContent = "";
    alert.classList.remove(`active`);    
}, 1000);

}



//default header index
const headerIndex = document.querySelectorAll('.header-index');
headerIndex.forEach(index =>{
    index.textContent = 0;
})


function addToLocalStorage(id,title,description,group,status){
    const product = {id,title,description,group,status};
    let cards = getLocalStorage();
    cards.push(product);
    localStorage.setItem('list', JSON.stringify(cards));
    console.log(cards);
}



function removeFromLocalStorage(id){
    let card = getLocalStorage();
    card = card.filter(item =>{
        if(item.id !== id){
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(card));

}


function editLocalStorage(id,title,description){
    let cards = getLocalStorage();
    cards = cards.forEach(card =>{
        if(card.id === id){
            card.title = title;
            card.description = description;
        }
            return card;
    });
    localStorage.setItem('list', JSON.stringify(cards));
    console.log(cards);
}



function setupCards(){
    let cards = getLocalStorage();
    if(cards.length > 0){
        cards.forEach(card =>{
            cardPosition(createCard(card.id,card.title,card.description),card.group,card.status);
        });
    }
}




function getLocalStorage(){
    return localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")) : [];
}

