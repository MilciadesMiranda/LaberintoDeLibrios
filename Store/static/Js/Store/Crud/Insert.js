import {Get_Cookie} from '../Utility/GetCookie.js';

export async function Insert_Review(objeto) {
    
    let Consulta = await fetch('/review/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto),
    });

    let Objeto = await Consulta.json();
    
    if(Objeto['process'] === 'Error'){
        console.log(Objeto['message']);
    }else{
        return Objeto['process'];
    }
}
