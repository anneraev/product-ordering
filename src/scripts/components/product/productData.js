export default {
    createProduct: function (title, price, description, quantity, image) {
        product = {
            "title": title,
            "price": price,
            "description": description,
            "quantity": quantity,
            "image": image
        }
        return product
    }
}