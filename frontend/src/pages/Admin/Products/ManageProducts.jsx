import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import API from "../../../api";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProd, setNewProd] = useState({ name: "", category: "", price: 0 });

  const fetchProducts = async () => {
    try {
    const { data } = await API.get("/admins/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    try {
     await API.post("/admins/products", newProd);

      fetchProducts();
      setNewProd({ name: "", category: "", price: 0 });
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await API.delete(`/admins/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div className="manage-products">
      <AdminSidebar />
      <div className="content">
        <h2>Manage Products</h2>

        <div className="add-form">
          <input placeholder="Name" value={newProd.name}
            onChange={(e) => setNewProd({ ...newProd, name: e.target.value })} />
          <input placeholder="Category" value={newProd.category}
            onChange={(e) => setNewProd({ ...newProd, category: e.target.value })} />
          <input placeholder="Price" type="number" value={newProd.price}
            onChange={(e) => setNewProd({ ...newProd, price: e.target.value })} />
          <button onClick={handleAdd}>Add Product</button>
        </div>

        <table className="products-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Category</th><th>Price</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td><button onClick={() => handleDelete(p._id)}>❌</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
