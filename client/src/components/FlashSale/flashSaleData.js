import products from "../../data/products";

const flashSaleProducts = products
  .filter((product) => product.discount > 0)
  .slice(0, 8);

export default flashSaleProducts;