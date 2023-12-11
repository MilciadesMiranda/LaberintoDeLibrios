import { Svg } from '../Utility/Icons_Svg.js';
import { Set_ArrayBooks, Get_ArrayBooks } from '../Utility/DataCompras.js';

class CardProducts extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.DataObject = {};
        this.RenderHTML();
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
                width: 100%;
                height: min-content;
                background-color: #94a5b3;
                display: grid;
                gap: 20px ;
                padding: 20px;
                overflow: hidden;
            }

            .SectionTitle{
                width: 100%;
                height: min-content;
                background-color: #617b8f;
                border-radius: 50px;
                padding: 10px;
            }
            .SectionTitle div{
                display: grid;
                place-items: center;
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
            }

            .SectionImg{
                width: 100%;
            }
            .SectionImg img{
                width: 100%;
                height: 600px;
                aspect-ratio: 1/1;
                object-fit: cover;
                border-radius: 10px;
            }

            .SectionBtn{
                width: 100%;
                display: flex;
                gap: 20px;
            }
            .SectionBtn button{
                width: 100%;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #bee066;
                cursor: pointer;
                outline: none;
                border: 0;
                border-radius: 50px;
                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
                box-shadow: 0 2px 4px 2px #00000033;
                overflow: hidden;
                gap: 10px;
            }
            .SectionBtn button:active{
                background-color: #dafc81;
                transform: scale(0.9);
            }
            .SectionBtn button svg{
                width: 20px;
                height: 20px;
            }

        `;
    }

    RenderHTML() {
        this.shadowRoot.innerHTML = `
            <style>${CardProducts.Estilos}</style>

            <div class="ContMain">

                <section class="SectionTitle">
                    <div id="title">${this.name_product}</div>
                </section>

                <section class="SectionImg">
                    <img class="img" id="ImgProduct">
                </section>

                <section class="SectionBtn">
                    <button class="BtnVer" id="BtnVer">Ver Producto</button>
                    <button class="BtnComprar" id="BtnComprar">Añadir ${Svg.cesta}</button>
                </section>

            </div>

        `;
    }

    SetData(Objetos){
        this.DataObject = Objetos;
        this.AccionesJS();
    }

    AccionesJS() {

        this.shadowRoot.querySelector('#ImgProduct').src = `data:image/jpg;base64,${this.DataObject['img']}`;
        this.shadowRoot.querySelector('#title').textContent = this.DataObject['name'];

        this.shadowRoot.querySelector('#BtnVer').addEventListener('click',()=>{
            let modal = document.createElement('comp-modal');
            document.querySelector('#ContMain').appendChild(modal);
            modal.SetData(this.DataObject);
        });
        
        this.shadowRoot.querySelector('#BtnComprar').addEventListener('click',()=>{
            Set_ArrayBooks(this.DataObject);
            console.log(Get_ArrayBooks());
        });

    }


}
customElements.define('comp-cardproducts', CardProducts);
