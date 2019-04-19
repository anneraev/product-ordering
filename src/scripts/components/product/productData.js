import apiManager from "../../global modules/apiManager";
import productList from "./productList";

export default {
    getProducts: function (){
        apiManager.getAll("products").then(products => productList.listProducts(products));
    }
}