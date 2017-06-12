
//require("jquery-ui/ui/widgets/accordion");

import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import auth from 'feathers-authentication-client';



$(function(){
    const app = feathers();
    app.configure(feathers.hooks());
    app.configure(feathers.rest().jquery=($));
    app.configure(auth());

    app.authenticate().then(resp => {
        alert("logged in!");
    })

});