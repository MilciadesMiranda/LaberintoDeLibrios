import { Svg } from '../Utility/Icons_Svg.js';
import { Insert_Review } from '../Crud/Insert.js';
import { Select_Reviews_Product } from '../Crud/Select.js';

class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.DataObject;
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
                height: 100%;
                position: absolute;
            }
            .ContMain{
                width: 100%;
                height: 100%;
                background-color: #00000080;
                display: grid;
                grid-template:  "SectionBar" 40px
                                "SectionContent" 1fr/1fr;
                padding: 50px;
                gap: 10px;
                overflow: hidden;
            }
            
            .SectionBar{
                grid-area: SectionBar;
            
            }
            .BtnClose{
                width: 40px;
                height: 100%;
                background-color: #f2c318;
                padding: 10px;
                border-radius: 50px;
                cursor: pointer;
                outline: none;
                border: 0;
            }
            .BtnClose:hover{
                background-color: #f8cc4e;
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
                gap: 10px;
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

            .Content{
                width: 100%;
                display: grid;
                grid-template: "ContImg ContInfo" min-content / min-content 1fr;
                gap: 10px;
                overflow: hidden;
            }

            .ContImg{
                grid-area: ContImg; 
            }
            .ContImg img{
                width: 400px;
                height: 600px;  
                border-radius: 10px;
            }

            .ContInfo{
                grid-area: ContInfo;
                display: grid;
                grid-auto-rows: min-content;
                background-color: #0000001a;
                border-radius: 10px;
                padding: 20px;
            }
            .Title{
                font-family: Arial;
                font-size: 1.5rem;
                font-weight: bold;
                color: #000000;
            }
            .Description{
                font-family: Arial;
                font-size: 1rem;
                color: #000000;
                margin: 50px 0 0 0;
            }
            .Category{
                font-family: Arial;
                font-size: 1rem;
                color: #000000;
                margin: 50px 0 0 0;
            }
            .Price{
                font-family: Arial;
                font-size: 1.2rem;
                font-weight: bold;
                color: #000000;
                margin: 50px 0 0 0;
            }

            .Reviews{
                width: 100%;
                display: grid;
                grid-template: "CreateReview ListReviews" min-content/min-content 1fr;
                gap: 10px;
            }
            
            .CreateReview{
                grid-area: CreateReview;
                display: grid;
                grid-auto-rows: min-content;
                background-color: #0000001a;
                padding: 10px;
                border-radius: 5px;

            }

            .SectInput{
                display: grid;
                grid-auto-flow: column;
                gap: 10px;
            }

            .Comment{
                width: 350px;
            }
            .Comment label{
                width: 100%;
                font-family: Arial;
                font-size: 1.5rem;
                font-weight: bold;
                color: #000000;
            }
            .Comment textarea{
                width: 100%;
                height: 200px;
                margin: 5px 0 0 0;
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
                box-shadow: 0 2px 4px 2px #00000033;
            }

            .Rating{
                width: 100%;
                display: grid;
                grid-auto-rows: min-content;
            }

            .Rating label{
                font-family: Arial;
                font-size: 1.5rem;
                font-weight: bold;
                color: #000000;
            }

            .ContRating{
                width: min-content;
                height: min-content;
                display: grid;
                background-color: #8999E4;
                margin: 5px 0 0 0;
                gap: 10px;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 4px 2px #00000033;
            }
            .NumRating{
                width: 50px;
                height: 50px;
                position: relative;
            }
            .NumRating svg{
                width: 100%;
                height: 100%;
            }
            .NumRating h1{
                position: absolute;
                width: 100%;
                height: 100%;
                display: grid;
                place-items: center;
                font-family: Arial;
                font-size: 1.5rem;
                font-weight: bold;
                color: #ffffff;
            }
            .BtnRating{
                width: 50px;
                height: 50px;
                background-color: #f2c318; 
                padding: 8px;
                border-radius: 50px;
                cursor: pointer;
                outline: none;
                border: 0;
                box-shadow: 0 2px 4px 2px #00000033;
            }
            .BtnRating:hover{
                background-color: #f8cc4e;
            }
            .BtnRating:active{
                transform: scale(0.9);
            }

            .BtnSend{
                margin: 20px 0 0 0;
                cursor: pointer;
                outline: none;
                border: 0;
                background-color: #ff8000;
                font-family: Arial;
                font-size: 1rem;
                font-weight: bold;
                color: #000000;
                border-radius: 5px;
                padding: 10px 20px;
            }
            .BtnSend:hover{
                background-color: #ff963e;
            }
            .BtnSend:active{
                transform: scale(0.9);
            }
           
            .ListReviews{
                grid-area: ListReviews;
                background-color: #0000001a;
                padding: 10px;
                border-radius: 5px;
            }
            
            .ContComments{
                width: 100%;
                height: 400px;
                border-radius: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                grid-auto-rows: min-content;
                gap: 10px;
                padding: 10px;
                overflow-y: auto; 
            }
            .ContComments::-webkit-scrollbar {
                width: 8px;
                height: 12px;
            }
            .ContComments::-webkit-scrollbar-thumb {
                background: #D99962;
                border-radius: 5px;
            }
            .ContComments::-webkit-scrollbar-thumb:hover {
                background: #e9ba95;
            
            }
            .ContComments::-webkit-scrollbar-corner {
                display: none;
            
            }

        `;
    }
    RenderHTML() {
        this.shadowRoot.innerHTML = `
            <style>${Modal.Estilos}</style>
            <div class="ContMain">
                <section class="SectionBar">
                    <button class="BtnClose" id="BtnClose">
                        ${Svg['equis']}
                    </button>
                </section>
                <section class="SectionContent">
                    <div class="Content">
                        <section class="ContImg" id="ContImg">
                            <img id="ImgProduct">
                        </section>
                        <section class="ContInfo" id="Info">
                            <h1 class="Title" id="Title"></h1>
                            <p class="Description" id="Description"></p>
                            <h1 class="Category" id="Category"></h1>
                            <h1 class="Price" id="Price"></h1>
                        </section>
                    </div>
                    <div class="Reviews">
                        <section class="CreateReview" id="CreateReview">

                            <section class="SectInput">
                                <div class="Comment">
                                    <label>Comentario</label>
                                    <textarea rows="4" cols="50" id="InputComent">Sin Comentario</textarea>
                                </div>
                                <div class="Rating">
                                    <label>Calificación</label>
                                    <div class="ContRating">
                                        <div class="NumRating">
                                            <h1 id="NumRating">0</h1>
                                            ${Svg['dialog']}
                                        </div>
                                        <button class="BtnRating" id="BtnRating">${Svg['staron']}</button>
                                    </div>
                                </div>
                            </section>
                            <section class="SectBtn">
                                <button class="BtnSend" id="BtnSend">Enviar Comentario</button>
                            </section>
                    
                        </section>
                        <section class="ListReviews" id="ListReviews">
                            <div class="ContComments" id="ContComments"></div>
                        </section>
                    </div>
                </section>
            </div>
        `;
    }

    async SetData(Objeto) {

        this.DataObject = Objeto;
        this.AccionesJS();
        this.LoadReview();
    }

    AccionesJS() {

        this.shadowRoot.querySelector('#BtnClose').addEventListener('click', () => {
            this.remove();
        });

        this.shadowRoot.querySelector('#ImgProduct').src = `data:image/jpg;base64,${this.DataObject['img']}`;
        this.shadowRoot.querySelector('#Title').textContent = this.DataObject['name'];
        this.shadowRoot.querySelector('#Description').textContent = this.DataObject['description'];
        this.shadowRoot.querySelector('#Category').textContent = `Categoria: ${this.DataObject['category']}`;
        this.shadowRoot.querySelector('#Price').textContent = `Price: ${this.DataObject['price']}`;

        let valor = 0
        this.shadowRoot.querySelector('#BtnRating').addEventListener('click',()=>{
            
            if(valor === 5){
                valor = 0;
            }else{
                valor+=0.5;
            }
            this.shadowRoot.querySelector('#NumRating').textContent = valor;
        });
        
        this.shadowRoot.querySelector('#BtnSend').addEventListener('click', async ()=>{
            let comment = this.shadowRoot.querySelector('#InputComent');
            let  result = await Insert_Review({ 'type': 'insert', 'comment': comment.value, 'rating': valor, 'idproduct': this.DataObject['id']});
            console.log(result);
            if(result === 'Success'){
                this.LoadReview();
            }

        });

    }

    async LoadReview(){

        let Array_Objeto =  await Select_Reviews_Product({'type':'select', 'idproduct':this.DataObject['id']});

        const ContComments = this.shadowRoot.querySelector('#ContComments');
        ContComments.innerHTML = '';

        for (let objeto of Array_Objeto['data']) {
            let compcardreview = document.createElement('comp-cardreview');
            ContComments.appendChild(compcardreview);
            compcardreview.SetData(objeto);
        }
    }
}
customElements.define('comp-modal', Modal);