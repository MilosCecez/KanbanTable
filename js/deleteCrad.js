

deleteCardWindow = (e) =>{
    e.preventDefault();
    let close = document.querySelector('#close-overlay');
    close.classList.add('active');
    let delCard = e.target.closest('.card');

    document.querySelector('.no-btn').addEventListener('click', ()=>{
        close.classList.remove('active');
    })

    document.querySelector('.yes-btn').addEventListener('click', ()=>{
        close.classList.remove('active');
        editHeaderIndex(delCard);
        delCard.remove();
        let card = new Card();
        let card_id = delCard.getAttribute('data-id');
        card.delete(card_id);
        removeFromLocalStorage(card_id);
    })
}

