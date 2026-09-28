import api from "../api/api";

const productService = {

    async getAllProducts() {
        const { data } = await api.get("/products");
        return data;
    },

    async getProduct(slug) {
        const { data } = await api.get(`/products/${slug}`);
        return data;
    },

    async search(query) {
        const { data } = await api.get(`/products/search?q=${query}`);
        return data;
    }

};

export default productService;