import { Crear_Producto } from '../Crud/Insert.js'
import { Select_All_Categories } from '../Crud/Select.js';

class FormProductos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
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
            }
            
            .ContMain{
                width: 100%;
                height: min-content;
                display: grid;
                overflow: hidden;
                gap: 20px;
            }

            .SectName{
                width: 100%;
                height: min-content;
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
                height: min-content;
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
                height: min-content;
                display: grid;
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
            <style>${FormProductos.Estilos}</style>

            <div class="ContMain">
                <section class="SectName">
                    <label>Nombre de producto</label>
                    <input type="text" placeholder="Nombre del producto" id="InputName">
                </section>
                <section class="SectDesc">
                    <label>Descripción:</label>
                    <textarea rows="4" cols="50" id="InputDesc"></textarea>
                </section>
                <section class="SectPrec">
                    <label>Precio:</label>
                    <input type="text" placeholder="Precio" id="InputPrecio">
                </section>
                <section class="SectCat">
                    <label>Categoria:</label>
                    <select id="SelectCat">
                        <option value="false">Vacío</option>
                    </select>
                </section>
                <section class="SectFile">
                    <label>Cargar Imagen:</label>
                    <img src="../../static/Img/not_img.jpg" alt="img" id="ImgProduct">
                    <button>
                        <label for="InputImage">Buscar archivo</label>
                        <input type="file" accept=".png, .jpg, .jpeg" id="InputImage"/>
                    </button>
                </section>
                <section class="SectBtn">
                    <button class="BtnInsert" id="BtnInsert">Añadir</button>
                </section>
            </div>
        `;
    }
    AccionesJS() {

        const InputName = this.shadowRoot.querySelector('#InputName');
        const InputDesc = this.shadowRoot.querySelector('#InputDesc');
        const InputPrecio = this.shadowRoot.querySelector('#InputPrecio');
        const SelectCat = this.shadowRoot.querySelector('#SelectCat');
        const InputImage = this.shadowRoot.querySelector('#InputImage');
        const ImgProduct = this.shadowRoot.querySelector('#ImgProduct');
        const BtnInsert = this.shadowRoot.querySelector('#BtnInsert');

        let ImgSelected;

        InputImage.addEventListener('change', function() {

            ImgSelected = InputImage.files[0];
            ImgProduct.src = URL.createObjectURL(ImgSelected);

        })

        BtnInsert.addEventListener('click', () => {

            const formData = new FormData();
            formData.append('type', 'insert');
            formData.append('name', InputName.value);
            formData.append('description', InputDesc.value);
            formData.append('price', InputPrecio.value);
            formData.append('idcategory', SelectCat.value);
            formData.append('img', ImgSelected);

            Crear_Producto(formData);
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
customElements.define('comp-formprductos', FormProductos);