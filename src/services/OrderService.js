import GenericService from "./GenericService";
class OrderService extends GenericService {
  addItem = (data) => this.post("orders", data);

  deleteItem = (_id) => this.delete("orders/" + _id);
  getItem = () => this.get("orders");
}

let orderService = new OrderService();
export default orderService;
