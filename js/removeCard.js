deleteCardWindow = () =>{
    let close = document.querySelector('#close-overlay');
    close.classList.add('active');
    close.querySelector('.no-btn').addEventListener('click', ()=>{
        close.classList.remove('active');
    })

    const yesBtn = document.querySelector('.yes-btn');
    yesBtn.addEventListener('click',(e)=>{
        close.classList.add('active');
        const currentCard = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
        currentCard.remove();
    })
};


