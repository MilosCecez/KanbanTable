
IDValue = 1;

const createIndex = () =>{
    if(IDValue < 10){
        return `00${IDValue++}`;
    }
    else{
        return `0${IDValue++}`;
    }
}





function  createCard (card_id,title,description) {
    let card = new Card();

    return `<div class="card" data-id="${card_id}">
    <div class="card-header">
        <h4 class="card-title">${title}</h4>
        <div id="close-btn" onclick="deleteCardWindow(event)">
            <i class="fa-solid fa-xmark"></i>
        </div>
    </div>
    <p class="card-text">${description}</p>
    <div class="card-footer">
        <div class="index">${createIndex()}</div>
        <div id="edit-btn" onclick="editCard(event)">
            <i class="fa-solid fa-pen"></i>
        </div>
    </div>
    <div class="overlay" id="close-overlay">
    <div class="close-modal">
        <p>Are you sure you want to delete the task?</p>
        <div class="button-group">
            <input type="button" value="No" class="no-btn">
            <input type="button" value="Yes" class="yes-btn"">
        </div>
    </div>
</div>
</div>`;

}




















