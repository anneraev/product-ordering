import bootstrapCreator from "../../global modules/bootstrapUtility/bootstrapCreator"

export default {
    create: function (product) {
        //the product's generated object key will be its ID# in the data.
        const card = bootstrapCreator.createCard("div", `product--card--${product.title}--${product.id}`);
        console.log(card);
    }
}