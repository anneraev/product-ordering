import product from "./product.js";
import bootstrapCreator from "../../global modules/bootstrapUtility/bootstrapCreator.js";
import domManager from "../../global modules/domManager.js";

export default {
    listProducts: function (products) {
        const deck = bootstrapCreator.createCardDeck("div", "featured-products-deck")
        const deckTitle =  bootstrapCreator.createCardTitle("H2", "featured-products-title", "Our Featured Products");
        deck.appendChild(deckTitle);
        products.forEach(item => {
            const newProduct = product.createCard(item);
            deck.appendChild(newProduct);
        })
        domManager.postToDom(deck);
    }
}