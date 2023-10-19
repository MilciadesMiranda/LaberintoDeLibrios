import {Get_Cookie} from '../Utility/GetCookie.js';


export async function Select_All_Categories() {
    let Consulta = await fetch('/managestore/categories/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'type':'select'}),
    });
    return await Consulta.json();
}


export async function Select_All_Products() {

    const formData = new FormData();
    formData.append('type', 'select');

    let Consulta = await fetch('/managestore/products/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
        },
        body: formData,
    });
    return await Consulta.json();
}

export async function Select_Products_Category(idcategory) {

    const formData = new FormData();
    formData.append('type', 'select_idcategory');
    formData.append('idcategpry', idcategory);

    let Consulta = await fetch('/managestore/products/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
        },
        body: formData,
    });
    return await Consulta.json();
}



