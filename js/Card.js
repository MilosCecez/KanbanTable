
class Card {
    card_id = '';
    title = '';
    group = '';
    status = '';
    substatus = '';
    description = '';
    api_url = 'https://6364e527f711cb49d1ef4e86.mockapi.io';

    create() {
        let data = {
            title: this.title,
            group: this.group,
            status: this.status,
            substatus: this.substatus,
            description: this.description,
            card_id: this.card_id
        }

        data = JSON.stringify(data);

        fetch(this.api_url + '/card', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data =>{
            form.style.display = 'none';
            let session = new Session();
            session.card_id = data.card_id;
            session.startSession();
            cardPosition(createCard(session.card_id,title.value,description.value),group.value,status.value);
            addToLocalStorage(session.card_id,title.value,description.value,group.value,status.value);
            console.log(data);
        })
    }


    async get(card_id){
        let api_url = this.api_url + '/card/' + card_id;
        let response = await fetch(api_url);
        let data = await response.json();
        console.log(data);
        return data;
    }



    edit(card_id) {
        let data = {
            title: this.title,
            group: this.group,
            status: this.status,
            substatus: this.substatus,
            description: this.description,
            card_id: this.card_id
        }

        data = JSON.stringify(data);


        fetch(this.api_url + '/card/' + card_id, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data =>{
            form.style.display = 'none';
        })
    }


    delete(card_id){
        fetch(this.api_url + '/card/' + card_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data =>{
            let session = new Session();
            session.destroySession();
            console.log(data);
        })

    }

}







//card position

const cardPosition = (position,group,status) =>{
    let newArray = [];
    allFields.forEach(fields =>{
        const groupName = group.toLowerCase();
        const statusName = status.toLowerCase().replaceAll(' ', '');
        const substatusName = substatus.value.toLowerCase();
            if(fields.classList.contains(groupName)){
                let childrenFields = fields.children;
                childrenFields = [... childrenFields];
                childrenFields.forEach(field =>{
                    field.classList.add(groupName);
                    const id = field.id;
                    if(statusName == id){
                        field.innerHTML = position;
    
                    }
                    if( statusName == 'inprogress' && substatusName == id){
                        field.innerHTML = position;
                    }

                    const headerIndex = document.querySelectorAll('.header-index');
                        headerIndex.forEach(index =>{
                            let indexClass = index.parentElement.className;
                            if(indexClass == id && indexClass == statusName){
                                index.textContent ++;
                            }
                            if(statusName == 'inprogress' && indexClass == substatusName && indexClass == id){
                                index.textContent ++;
                                let progressIndexes = document.querySelectorAll('td .header-index');
                                progressIndexes.forEach(progressIndex =>{
                                    progressIndex = parseInt(progressIndex.innerText);
                                    newArray.push(progressIndex);
                                });
                                let sum = 0;
                                for (let i = 0; i < newArray.length; i++) {
                                    sum += newArray[i];                                 
                                }
                                headerIndex[2].textContent = sum;
                            }
    })
            })
        } 

    })
}








