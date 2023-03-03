class Session {
    card_id = '';

    startSession(){
        const d = new Date();
        d.setTime(d.getTime() + (2*24*60*60*1000));
        let epxires = "expires=" + d.toUTCString();
        document.cookie = "card_id=" + this.card_id + ";" + epxires;
    }

    getSession(){
        let name = "card_id=";
        let ca = document.cookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    destroySession(){
        let cookies = document.cookie.split(';');
        for(let i = 0; i< cookies.length ; i++){
            let cookie = cookies[i];
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
}