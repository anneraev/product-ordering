import product from "./product.js";

export default {
    listProducts: function (products) {
        products.forEach(item => {
            const newProduct = product.create(item);
        })
    }
}