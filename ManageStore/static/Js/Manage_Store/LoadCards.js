export function Load_Categories(Array_Objeto) {

    const Section_ListCat = document.querySelector('#Section_ListCat');

    if(Section_ListCat !== null){

        Section_ListCat.innerHTML = '';

        for (let objeto of Array_Objeto) {
            let cardcategories = document.createElement('comp-cardcategorias');
            cardcategories.setAttribute('id-cat', objeto['id']);
            cardcategories.setAttribute('name-cat', objeto['name']);
            cardcategories.setAttribute('desc-cat', objeto['description']);
            Section_ListCat.appendChild(cardcategories);
        }
        
    }
}

export function Load_Products(Array_Objeto) {
    
    const Section_ListProducts = document.querySelector('#Section_ListProducts');

    if(Section_ListProducts !== null){

        Section_ListProducts.innerHTML = '';

        for (let objeto of Array_Objeto) {
            let cardproducts = document.createElement('comp-cardproducts');
            cardproducts.setAttribute('id-product', objeto['id']);
            cardproducts.setAttribute('name-product', objeto['name']);
            cardproducts.setAttribute('desc-product', objeto['description']);
            cardproducts.setAttribute('price-product', objeto['price']);
            cardproducts.setAttribute('idcategory-product', objeto['idcategory']);
            cardproducts.setAttribute('category-product', objeto['category']);
            cardproducts.setAttribute('img-product', `data:image/jpg;base64,${objeto['img']}`);
            Section_ListProducts.appendChild(cardproducts);
        }
        
    }
}