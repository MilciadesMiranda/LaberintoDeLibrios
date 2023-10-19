import {Get_Cookie} from '../Utility/GetCookie.js';
import {Select_All_Categories, Select_All_Products} from './Select.js';
import {Load_Categories, Load_Products} from '../LoadCards.js';

export async function Actualizar_Categoria(objeto) {
    
    let Consulta = await fetch('/managestore/categories/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto),
    });

    let Objeto = await Consulta.json();

    if(Objeto['Process'] === 'Error'){
        console.log(Objeto['message']);
    }else{
        let Objeto = await Select_All_Categories();
        Load_Categories(Objeto['data']);
    }
}

export async function Actualizar_Producto(form) {
    
    let Consulta = await fetch('/managestore/products/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie()
        },
        body: form,
    });

    let Objeto = await Consulta.json();

    if(Objeto['Process'] === 'Error'){
        console.log(Objeto['message']);
    }else{
        let Objeto = await Select_All_Products();
        Load_Products(Objeto['data']);
    }
}




