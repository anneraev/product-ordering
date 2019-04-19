//this module contains a function that allows the developer to set classes on a number of elements that have been passed to the elmentsList in the elementClassManager module. Using the id of the element object as a key (assuming it was added to the element list), one can call any element using elementObject.key and style it as needed. This was created so as to have an easy, separate module for styling purposes, rather than having to style elements wherever they are created.

export default {
    setStyles: function (e) {
        for (let i = 1; i <= 20; i += 1) {
            console.log("run count")
            const key = `product_card_image${i}`
            if (e[key]) {
                e[key].classList.add("product__image");
            } else {
                break
            }
        }
    }
}