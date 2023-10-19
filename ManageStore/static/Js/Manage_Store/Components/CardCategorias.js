import { Svg } from '../Utility/Icons_Svg.js';
import { Actualizar_Categoria } from '../Crud/Update.js'
import { Eliminar_Categoria } from '../Crud/Delete.js'

class CardCategorias extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {

        this.id_cat = this.getAttribute('id-cat');
        this.name_cat = this.getAttribute('name-cat');
        this.desc_cat = this.getAttribute('desc-cat');

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
                grid-template:  "SectName" min-content
                                "SectDesc" min-content
                                "SectBtn" min-content / 1fr;
                border-radius: 5px;
                margin: 10px 0 0 0;
                padding: 10px;
                gap: 10px;
                overflow: hidden;
            }

            .SectName{
                grid-area: SectName;
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
                grid-area: SectDesc;
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
                height: 200px;
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
            
            
            .SectBtn{
                grid-area: SectBtn;
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
            <style>${CardCategorias.Estilos}</style>

            <div class="ContMain">

                <div class="ContTitle">${this.name_cat}</div>

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
                        <label>Categoria:</label>
                        <input type="text" value="${this.name_cat}" placeholder="Nombre categoria" id="InputName">
                    </section>
                    <section class="SectDesc">
                        <label>Descripción:</label>
                        <textarea rows="4" cols="50" id="InputDesc">${this.desc_cat}</textarea>
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
        const BtnUpdate = this.shadowRoot.querySelector('#BtnUpdate');

        BtnEdit.addEventListener('click', () => {

            if (ContInputs.style.display === '' || ContInputs.style.display === 'none') {
                ContInputs.style.display = 'grid';
                BtnEdit.innerHTML = Svg['equis']
            } else {
                ContInputs.style.display = 'none';
                BtnEdit.innerHTML = Svg['edit']
            }
        });

        BtnUpdate.addEventListener('click', () => {
            Actualizar_Categoria({ 'type': 'update', 'id': this.id_cat, 'name': InputName.value, 'description': InputDesc.value });
        });

        BtnDelete.addEventListener('click', () => {

            Eliminar_Categoria({ 'type': 'delete', 'id': this.id_cat });

        });


    }
}
customElements.define('comp-cardcategorias', CardCategorias);