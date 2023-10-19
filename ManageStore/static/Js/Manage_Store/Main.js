import './Components/FormCategoria.js';
import './Components/FormProductos.js';
import './Components/CardCategorias.js';
import './Components/CardProducts.js';

import { Select_All_Categories, Select_All_Products, Select_Products_Category} from './Crud/Select.js';
import {Load_Categories, Load_Products} from './LoadCards.js';

document.addEventListener('DOMContentLoaded', () => {

});

window.addEventListener('load', async () => {
   
    const Section_ListCat = document.querySelector('#Section_ListCat');
    const Section_ListProducts = document.querySelector('#Section_ListProducts');
    const Select_Categories = document.querySelector('#Select_Categories');

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





    //Carga datos en Categoria
    if(Section_ListCat !== null){    
        let Objeto = await Select_All_Categories();
        Load_Categories(Objeto['data']);
    }
    
});
