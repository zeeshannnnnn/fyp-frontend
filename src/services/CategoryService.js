import GenericService from "./GenericService";
class CategoryService extends GenericService {
  constructor() {
    super();
  }
  addCategory = (data) => this.post("category/addCategory", data);
  deleteCategory = (_id) => this.delete("category/deleteCategory/" + _id);
  updateCategory = (_id, data) =>
    this.put("category/updateCategory/" + _id, data);
  getCategories = () => this.get("category/getCategory");
  getSingleCategory = (id) => this.get("category/getCategory/" + id);
}

let categoryService = new CategoryService();
export default categoryService;
