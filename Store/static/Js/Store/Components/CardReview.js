import { Svg } from '../Utility/Icons_Svg.js';

class CardReview extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }
    connectedCallback(){
        this.RenderHTML();
        this.AccionesJS();
    }
    static get Estilos(){
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
                grid-template: "Comment Rating" min-content / 1fr min-content;
                background-color: #94A684; 
                overflow: hidden;
                padding: 10px;
                gap: 10px;
            }
            .Comment{
                grid-area: Comment;
                font-family: Arial;
                font-size: 0.9rem;
                color: #000000;
            }
            .Rating{
                grid-area: Rating;
                display: grid;
                grid-auto-flow: column;
                gap: 5px;
            }
            .Rating h1{
                width: 32px;
                height: 32px;
                display: grid;
                place-items: center;
                font-family: Arial;
                font-size: 1.2rem;
                font-weight: bold;
                color: #000000;
            }
            .Rating svg{
                width: 32px;
                height: 32px;
            }

        `;
    }
    RenderHTML(){
        this.shadowRoot.innerHTML = `
            <style>${CardReview.Estilos}</style>
            <div class="ContMain">
                <div class="Comment" id="Comment"></div>
                <div class="Rating">
                    <h1 id="Rating">12<h1>
                    ${Svg['staron']}
                </div>
            </div>
        `;
    }
    SetData(objeto){
        this.shadowRoot.querySelector('#Comment').textContent = objeto['comment'];
        this.shadowRoot.querySelector('#Rating').textContent = objeto['rating'];
    }
    AccionesJS(){

    }
}
customElements.define('comp-cardreview', CardReview);