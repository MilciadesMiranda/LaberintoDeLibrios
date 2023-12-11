import './Components/CardProducts.js';
import './Components/Modal.js';
import './Components/ModalCesta.js';
import './Components/CardReview.js';

import { Select_All_Categories, Select_All_Products, Select_Products_Category, Select_Products_Name} from './Crud/Select.js';
import {Load_Products} from './LoadCards.js';

document.addEventListener('DOMContentLoaded', () => {

});

window.addEventListener('load', async () => {
   
    const Section_ListProducts = document.querySelector('#Section_ListProducts');
    const Select_Categories = document.querySelector('#Select_Categories');
    const BtnBuscar = document.querySelector('#BtnBuscar');
    const InputName = document.querySelector('#InputName');

    //Carga datos en Productos
    if(Select_Categories !== null){    
        let Objeto = await Select_All_Categories();
        for (let objeto of Objeto['data']) {
            Select_Categories.innerHTML += `<option value="${objeto['id']}">${objeto['name']}</option>`;
        }
        Select_Categories.addEventListener("change", async ()=> {
            
            let idcategory = Select_Categories.value;
            
            if(idcategory !== 'false'){
                let Objeto = await Select_Products_Category(idcategory);
                Load_Products(Objeto['data']);
            }else{
                let Objeto = await Select_All_Products();
                Load_Products(Objeto['data']);
            }
            
        });
    }

    if(Section_ListProducts !== null){
        let Objeto = await Select_All_Products();
        Load_Products(Objeto['data']);
    }

    BtnBuscar.addEventListener('click', async ()=>{

        let nombre = InputName.value;
        let Objeto = await Select_Products_Name(nombre);
        Load_Products(Objeto['data']);

    });

    document.querySelector('#BtnCompras').addEventListener('click', async ()=>{
        let modalcesta = document.createElement('comp-modalcesta');
        document.querySelector('#ContMain').appendChild(modalcesta);
    });
    
});