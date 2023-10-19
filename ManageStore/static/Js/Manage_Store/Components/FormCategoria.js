import { Crear_Categoria } from '../Crud/Insert.js'

class FormCategoria extends HTMLElement {
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
                box-shadow: 0 2px 4px 2px #00000033;
                border-radius: 10px;
            }
            
            .ContMain{
                width: 100%;
                height: min-content;
                display: grid;
                overflow: hidden;
                background-color: #45593F;
                padding: 10px;
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
            <style>${FormCategoria.Estilos}</style>

            <div class="ContMain">
                <section class="SectName">
                    <label>Nombre de la categoria</label>
                    <input type="text" placeholder="Nombre categoria" id="InputName">
                </section>
                <section class="SectDesc">
                    <label>Descripción:</label>
                    <textarea rows="4" cols="50" id="InputDesc"></textarea>
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
        const BtnInsert = this.shadowRoot.querySelector('#BtnInsert');


        BtnInsert.addEventListener('click', () => {


            Crear_Categoria({
                'type': 'insert',
                'name': InputName.value,
                'description': InputDesc.value
            });

        });

    }
}
customElements.define('comp-formcategoria', FormCategoria);