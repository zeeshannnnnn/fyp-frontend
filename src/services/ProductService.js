import GenericService from "./GenericService";
class ProductsService extends GenericService {
  constructor() {
    super();
  }
  addProduct = (data) => this.post("products/addProduct", data);
  deleteProduct = (_id) => this.delete("products/deleteProduct/" + _id);
  updateProduct = (_id, data) =>
    this.put("products/updateProduct/" + _id, data);
  getProducts = () => this.get("products/getProduct");
  getSingleProduct = (id) => this.get("products/getProduct/" + id);
}

let productService = new ProductsService();
export default productService;
