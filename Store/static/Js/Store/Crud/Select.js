import {Get_Cookie} from '../Utility/GetCookie.js';


export async function Select_All_Categories() {
    let Consulta = await fetch('/categories/', {
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

    let Consulta = await fetch('/products/', {
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

    let Consulta = await fetch('/products/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
        },
        body: formData,
    });
    return await Consulta.json();
}

export async function Select_Products_Name(name) {

    const formData = new FormData();
    formData.append('type', 'select_name');
    formData.append('name', name);

    let Consulta = await fetch('/products/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
        },
        body: formData,
    });
    return await Consulta.json();
}

export async function Select_Reviews_Product(objeto) {

    let Consulta = await fetch('/review/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': Get_Cookie(),
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto),
    });
    return await Consulta.json();
}

