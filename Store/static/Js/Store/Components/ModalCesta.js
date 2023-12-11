import {Get_ArrayBooks, Delete_Book} from '../Utility/DataCompras.js';

class ModalCesta extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.RenderHTML();
        this.CargarLista();
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
                width: 400px;
                height: 100%;
                position: absolute;
                right: 0;
                animation: animacion 0.5s ease-out;
            }
            @keyframes animacion {
                0% { 
                    right: -100%;
                }
                100% { 
                    right: 0; 
                }
            }
            .ContMain{
                width: 100%;
                height: 100%;
                background-color: #00000033;
                display: grid;
                grid-template:  "SectionBar" 40px
                                "SectionContent" 1fr
                                "SectionPago"100px/1fr;
                padding: 50px 20px;
                gap: 10px;
                overflow: hidden;
            }
            
            .SectionBar{
                grid-area: SectionBar;
                display: flex;
                align-items: center;
                gap: 20px;
                background-color: #bee066;
                border-radius: 50px;
                overflow: hidden;
                
                font-family: Arial;
                font-size: 1.2rem;
                font-weight: bold;
                color: #000000;
            }
            .BtnClose{
                width: 40px;
                height: 100%;
                background-color: #bee066;
                padding: 10px;
                cursor: pointer;
                outline: none;
                border: 0;
                border-radius: 50px;
            }
            .BtnClose:hover{
                background-color: #dafc81;
            }
            .BtnClose:active{
                transform: scale(0.9);
            }

            .SectionContent{
                grid-area: SectionContent; 
                display: grid;
                grid-auto-rows: min-content;
                background-color: #ffffff;
                overflow-y: auto;
                border-radius: 10px;
                gap: 20px;
                padding: 10px;
            }
            
            .SectionContent::-webkit-scrollbar {
                width: 10px;
                height: 12px;
            }
            .SectionContent::-webkit-scrollbar-thumb {
                background: #D99962;
                border-radius: 5px;
            }
            .SectionContent::-webkit-scrollbar-thumb:hover {
                background: #e9ba95;
            }
            .SectionContent::-webkit-scrollbar-corner {
                display: none;
            }

            .card{
                width: 100%;
                height: 200px;
                background-color: #94A5B3;
                overflow: hidden;
                box-shadow: 0 2px 4px 2px #00000033;
                border-radius: 10px;
                display: flex;
                gap: 10px;
                padding: 10px;
            }
            .card img{
                height: 100%;
                border-radius: 10px;
            }

            .card div{
                width: 100%;
                height: 100%;
                display: grid;
                align-content: space-between;

            }
            .card div div{
                height: min-content;
                background-color: #ffffff;
                padding: 5px;
                border-radius: 5px;
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #000000;
            }
            .card div button{
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                outline: none;
                border: 0;
                border-radius: 50px;
                padding: 5px;
                box-shadow: 0 2px 4px 2px #00000033;
                gap: 10px;
                background-color: #ffffff;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }
            .card div button svg{
                width: 20px;
                height: 20px;
            }
            .card div button:active{
                transform: scale(0.9);
            }
            
            .SectionPago{
                grid-area: SectionPago;
                background-color: #ffffff;
                border-radius: 10px;
                display: flex;
                padding: 10px;
                place-content: space-between;
                align-items: center;
            }

            .SectionPago div{
                height: 100%;
                display: grid;
                gap: 5px;
                place-items: center left;
                overflow: hidden;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }
            .SectionPago button{
                width: min-content;
                height: min-content;
                cursor: pointer;
                outline: none;
                border: 0;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 2px 4px 2px #00000033;
                background-color: #bee066;

                font-family: Arial;
                font-size: 0.9rem;
                font-weight: bold;
                color: #000000;
            }
            .SectionPago button:active{
                background-color: #dafc81;
                transform: scale(0.9);
            }
        `;
    }
    RenderHTML() {
        this.shadowRoot.innerHTML = `
            <style>${ModalCesta.Estilos}</style>
            <div class="ContMain">
                <section class="SectionBar">
                    <button class="BtnClose" id="BtnClose">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path fill="#000000" d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/></g></svg>
                    </button>
                    Libros Seleccionados
                </section>
                <section class="SectionContent" id="SectionContent"></section>
                <section class="SectionPago" id="SectionPago"></section>
            </div>
        `;
    }

    AccionesJS() {

        this.shadowRoot.querySelector('#BtnClose').addEventListener('click', () => {
            this.remove();
        });
        
    }
    
    CargarLista(){
        
        let SectionContent = this.shadowRoot.querySelector('#SectionContent');
        SectionContent.innerHTML = '';

        for (let objeto of Get_ArrayBooks()){
            SectionContent.innerHTML += `
                <div class="card">
                    <img src="data:image/jpg;base64,${objeto['img']}">
                    <div>
                        <div>${objeto['name']}<br><br>Precio: $${objeto['price']}</div>

                        <button id="BtnEliminar" id-libro="${objeto['id']}">Eliminar <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff0000" d="M17,4V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2V4ZM11,17H9V11h2Zm4,0H13V11h2ZM15,4H9V2h6Z"/></svg></button>
                    </div>
                </div>
            `;
        }
        this.Calcuar_Pago();

        this.shadowRoot.querySelectorAll('#BtnEliminar').forEach(BtnEliminar => {
            BtnEliminar.addEventListener('click', () => {
                if (Delete_Book(BtnEliminar.getAttribute('id-libro')))
                    this.CargarLista();
            });
        });
  
    }

    Calcuar_Pago(){
        
        let subtotal = 0, itbms = 0;

        for (let objeto of Get_ArrayBooks())
            subtotal += parseFloat(objeto['price']);
        itbms =  subtotal * 0.07;
        this.shadowRoot.querySelector('#SectionPago').innerHTML = `
            <div>
                <span>Sub-Total: ${subtotal}</span>
                <span>ITBMS: ${itbms}</span>
                <span>Total: ${subtotal + itbms}</span>
            </div>
            <button>Confirmar</button>    
        `;
    }
    
}
customElements.define('comp-modalcesta', ModalCesta);