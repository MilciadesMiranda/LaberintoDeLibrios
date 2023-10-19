import { Svg } from '../Utility/Icons_Svg.js';

import { Actualizar_Producto } from '../Crud/Update.js'
import { Select_All_Categories } from '../Crud/Select.js';
import { Eliminar_Product } from '../Crud/Delete.js'

class CardProducts extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {

        this.id_product = this.getAttribute('id-product');
        this.name_product = this.getAttribute('name-product');
        this.desc_product = this.getAttribute('desc-product');
        this.price_product = this.getAttribute('price-product');
        this.idcategory_product = this.getAttribute('idcategory-product');
        this.category_product = this.getAttribute('category-product');
        this.img_product = this.getAttribute('img-product');

        this.RenderHTML();
        this.AccionesJS();
    }
    static get Estilos() {
        return `
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            :host{
                width: 100%;
                height: min-content;
                display: grid;
                overflow: hidden;
                box-shadow: 0 2px 4px 2px #00000033;
                border-radius: 10px;
            }

            .ContMain{
                
                background-color: #45593F;
                height: min-content;
                display: grid;
                grid-template:  "ContTitle ContBtns" 40px
                                "ContInputs ContInputs" min-content/ 1fr min-content;
                gap: 0 10px ;
                padding: 10px;
            }
            
            .ContTitle{
                grid-area: ContTitle;
                display: grid;
                place-items: center left;
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
            }

            .ContBtns{
                grid-area: ContBtns;
                display: grid;
                grid-auto-flow: column;
                gap: 10px;
                place-items: center;
            }
            .ContBtns button{
                width: 35px;
                height: 35px;
                display: grid;
                background-color: #45593F;
                cursor: pointer;
                outline: none;
                border: 0;
                border-radius: 10px;
                place-items: center;
            }
            .ContBtns button:hover{
                background-color: #61735c;
            }
            .ContBtns button:active{
                transform: scale(0.9);
            }
            .ContBtns button svg{
                width: 24px;
                height: 24px;
            }

            .ContInputs{
                grid-area: ContInputs;
                background-color: #61735c;
                display: none;
                grid-auto-rows: min-content;
                border-radius: 5px;
                margin: 10px 0 0 0;
                padding: 10px;
                gap: 10px;
                overflow: hidden;
            }
            
            .SectName{
                width: 100%;
                display: grid;
                gap: 5px;
            }
            .SectName label{
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
            }
            .SectName input{
                height: 30px;
                padding: 5px 10px;
                cursor: text;
                outline: none;
                border: 0;
                border-radius: 5px;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }
            
            .SectDesc{
                width: 100%;
                display: grid;
                gap: 5px;
            }
            .SectDesc label{
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
            }
            .SectDesc textarea{
                height: 150px;
                padding: 10px;
                cursor: text;
                outline: none;
                border: 0;
                resize: none;
                border-radius: 5px;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }

            .SectPrec{
                width: 100%;
                height: min-content;
                display: grid;
                gap: 5px;
            }
            .SectPrec label{
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
            }
            .SectPrec input{
                height: 30px;
                padding: 5px 10px;
                cursor: text;
                outline: none;
                border: 0;
                border-radius: 5px;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }

            .SectCat{
                width: 100%;
                height: min-content;
                display: grid;
                gap: 5px;
            }
            .SectCat label{
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
            }
            .SectCat select{
                height: 30px;
                cursor: pointer;
                outline: none;
                border: 0;
                border-radius: 5px;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }

            .SectFile{
                width: 100%;
                height: min-content;
                display: grid;
                gap: 5px;
            }
            .SectFile label{
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
            }
            .SectFile img{   
                width: 100%;
                aspect-ratio: 1/1;
                object-fit: cover;
                overflow: hidden;
            }
            .SectFile button{
                height: 30px;
                display: grid;
                background-color: #FFBB5C;
                outline: none;
                border: 0;
                border-radius: 5px;
                overflow: hidden;
            }
            .SectFile button:active{
                background-color: #ffc678;
                transform: scale(0.9);
            }
            .SectFile button label{
                width: 100%;
                height: 100%;
                display: grid;
                place-items: center;
                cursor: pointer;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }
            .SectFile button input{
                display: none;
            }

            
            .SectBtn{
                width: 100%;
                display: grid;
                grid-auto-flow: column;
                gap: 10px;
            }
            .SectBtn button{
                height: 30px;
                display: grid;
                place-items: center;
                background-color: #FFBB5C;
                cursor: pointer;
                outline: none;
                border: 0;
                border-radius: 5px;
                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
                box-shadow: 0 2px 4px 2px #00000033;
            }
            
            .SectBtn button:active{
                background-color: #ffc678;
                transform: scale(0.9);
            }
            
            

        `;
    }

    RenderHTML() {
        this.shadowRoot.innerHTML = `
            <style>${CardProducts.Estilos}</style>

            <div class="ContMain">

                <div class="ContTitle">${this.name_product}</div>

                <div class="ContBtns">
                    <button class="BtnEdit" id="BtnEdit">
                        ${Svg['edit']}
                    </button>
                    <button class="BtnDelete" id="BtnDelete">
                        ${Svg['delete']}
                    </button>
                </div>

                <div class="ContInputs" id="ContInputs">

                    <section class="SectName">
                        <label>Nombre:</label>
                        <input type="text" value="${this.name_product}" placeholder="Nombre categoria" id="InputName">
                    </section>

                    <section class="SectDesc">
                        <label>Descripción:</label>
                        <textarea rows="4" cols="50" id="InputDesc">${this.desc_product}</textarea>
                    </section>

                    <section class="SectPrec">
                        <label>Precio:</label>
                        <input type="text" value="${this.price_product}" placeholder="Nombre categoria" id="SectPrec">
                    </section>

                    <section class="SectCat">
                        <label>Categoria:</label>
                        <select id="SelectCat">
                            <option value="${this.idcategory_product}">${this.category_product}</option>
                        </select>
                    </section>

                    <section class="SectFile">
                        <label>Cargar Imagen:</label>
                        <img src="${this.img_product}" alt="img" id="ImgProduct">
                        <button>
                            <label for="InputImage">Buscar archivo</label>
                            <input type="file" accept=".png, .jpg, .jpeg" id="InputImage"/>
                        </button>
                    </section>

                    <section class="SectBtn">
                        <button class="BtnUpdate" id="BtnUpdate">Actualizar</button>
                    </section>

                </div>
                
            </div>

        `;
    }
    AccionesJS() {

        const BtnEdit = this.shadowRoot.querySelector('#BtnEdit');
        const BtnDelete = this.shadowRoot.querySelector('#BtnDelete');
        const ContInputs = this.shadowRoot.querySelector('#ContInputs');

        const InputName = this.shadowRoot.querySelector('#InputName');
        const InputDesc = this.shadowRoot.querySelector('#InputDesc');
        const SectPrec = this.shadowRoot.querySelector('#SectPrec');
        const SelectCat = this.shadowRoot.querySelector('#SelectCat');
        const ImgProduct = this.shadowRoot.querySelector('#ImgProduct');
        const InputImage = this.shadowRoot.querySelector('#InputImage');
        const BtnUpdate = this.shadowRoot.querySelector('#BtnUpdate');

        let ImgSelected;

        BtnEdit.addEventListener('click', () => {

            if (ContInputs.style.display === '' || ContInputs.style.display === 'none') {
                ContInputs.style.display = 'grid';
                BtnEdit.innerHTML = Svg['equis']
            } else {
                ContInputs.style.display = 'none';
                BtnEdit.innerHTML = Svg['edit']
            }
        });


        InputImage.addEventListener('change', function () {

            ImgSelected = InputImage.files[0];
            if(ImgSelected !== undefined)
                ImgProduct.src = URL.createObjectURL(ImgSelected);

        })

        BtnUpdate.addEventListener('click', () => {

            const formDataUpdate = new FormData();
            formDataUpdate.append('type', 'update');
            formDataUpdate.append('id', this.id_product);
            formDataUpdate.append('name', InputName.value);
            formDataUpdate.append('description', InputDesc.value);
            formDataUpdate.append('price', SectPrec.value);
            formDataUpdate.append('idcategory', SelectCat.value);
            if(ImgSelected !== undefined)
                formDataUpdate.append('img', ImgSelected);

            Actualizar_Producto(formDataUpdate);
        });

        BtnDelete.addEventListener('click', () => {

            const formDataDelete = new FormData();
            formDataDelete.append('type', 'delete');
            formDataDelete.append('id', this.id_product);
            Eliminar_Product(formDataDelete);

        });

        this.LoadCategories(SelectCat);

    }

    async LoadCategories(SelectCat) {
        let Objeto = await Select_All_Categories();
        for (let objeto of Objeto['data']) {
            SelectCat.innerHTML += `<option value="${objeto['id']}">${objeto['name']}</option>`;
        }
    }
}
customElements.define('comp-cardproducts', CardProducts);


//../../static/Img/not_img.jpg