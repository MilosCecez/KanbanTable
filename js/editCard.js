editCard = (e) =>{
    e.preventDefault();
    form.style.display = 'grid';
    edit.classList.add('active');
        let editTitle = e.currentTarget.parentElement.previousElementSibling.previousElementSibling;
        let editDesc = e.currentTarget.parentElement.previousElementSibling;
        title.value = editTitle.innerText;
        description.value = editDesc.innerText;
        let editedCard = e.currentTarget.parentElement.parentElement;

        let session = new Session();
        let session_id = session.getSession();


        async function populateUserData() {
            let card = new Card();
            card = await card.get(session_id);
            card.group = group.value;
            card.status = status.value;
            card.substatus = substatus.value;
            let editedCardOverlay = editedCard.closest('body').querySelector('.overlay');
            editedCardOverlay.querySelector('#group').value = card['group'];
            editedCardOverlay.querySelector('#status').value = card['status'];
            editedCardOverlay.querySelector('#substatus').value = card['substatus'];
        }
        populateUserData();


    saveBtn.addEventListener('click', ()=>{
        if(edit.classList.contains('active')){
                let card = new Card();
                editedCard.querySelector('.card-title').innerText = title.value;
                card.title = editedCard.querySelector('.card-title').innerText;
                editedCard.querySelector('.card-text').innerText = description.value;
                card.description = editedCard.querySelector('.card-text').innerText;
                allFields.forEach(fields =>{
                    let childrenFields = fields.children;
                    childrenFields = [...childrenFields];
                    childrenFields.forEach(field =>{
                        if (field.querySelector('.card') == editedCard) {
                                editHeaderIndex(editedCard);
                                cardPosition(field.innerHTML,group.value,status.value);
                                editedCard.remove();
                        }
                })
            })
            let card_id = editedCard.getAttribute('data-id');
            card.edit(card_id);
            editLocalStorage(card_id,card.title,card.description);
        }
    })
}

const editHeaderIndex = (card) =>{
    let newArray = [];
    let parent = card.parentElement.getAttribute('id');
    let headerIndex = parseInt(document.querySelector(`.${parent}`).children[0].innerText); 
    document.querySelector(`.${parent}`).children[0].textContent = headerIndex - 1;
    let progressIndexes = document.querySelectorAll('td .header-index');
        progressIndexes.forEach(progressIndex =>{
            progressIndex = parseInt(progressIndex.innerText);
            newArray.push(progressIndex);
        });
        let sum = 0;
        for (let i = 0; i < newArray.length; i++) {
            sum += newArray[i];                                 
        }
        document.querySelector('.inprogress').children[0].textContent = sum;
}

































