import bootstrapCreator from "../../global modules/bootstrapUtility/bootstrapCreator"
import htmlBuilder from "../../global modules/htmlBuilder";

export default {
    createCard: function (product) {
        //description
        //price
        //quantity
        //the product's generated object key will be its ID# in the data.
        //card container
        const card = bootstrapCreator.createCard("div", `product_card${product.id}`);
        //product image
        const cardImage = htmlBuilder.elementBuilder("img", `product_card_image${product.id}`)
        cardImage.setAttribute("src", `${product.image}`)
        cardImage.setAttribute("alt", `Image of ${product.title}`)
        //product title
        const cardTitle = bootstrapCreator.createCardTitle("h3", `product_card_title${product.id}`, `${product.title}`)
        //product text
        const cardText = bootstrapCreator.createCardText("p", `product_card_text${product.id}`, `${product.description}`)
        //append to card and card-body
        const price = htmlBuilder.elementBuilder("span", `product_card_price${product.id}`, `Price: $${product.price}`)
        const quantity = htmlBuilder.elementBuilder("span", `product_card_price${product.id}`, `Qty: ${product.quantity}`)
        //append content to card body.
        card.firstChild.appendChild(cardImage);
        card.firstChild.appendChild(cardText);
        card.firstChild.appendChild(price);
        card.firstChild.appendChild(quantity);
        //insert card title before card body.
        card.insertBefore(cardTitle, card.firstChild);
        return card;
    }
}