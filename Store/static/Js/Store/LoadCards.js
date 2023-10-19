export function Load_Products(Array_Objeto) {
    
    const Section_ListProducts = document.querySelector('#Section_ListProducts');

    if(Section_ListProducts !== null){

        Section_ListProducts.innerHTML = '';

        for (let objeto of Array_Objeto) {
            let cardproducts = document.createElement('comp-cardproducts');
            Section_ListProducts.appendChild(cardproducts);
            cardproducts.SetData(objeto);
        }
        
    }
}