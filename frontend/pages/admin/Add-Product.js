import { useState } from 'react';
import Sidebar from '@/components/Admin/Admin-Sidebar';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
    productImagePreview: ''
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          productImage: file,
          productImagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.productName) tempErrors.productName = 'Product Name is required';
    if (!formData.productDescription) tempErrors.productDescription = 'Product Description is required';
    if (!formData.productPrice) tempErrors.productPrice = 'Product Price is required';
    if (!formData.productImage) tempErrors.productImage = 'Product Image is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isEditing) {
        const updatedProducts = products.map((product, index) =>
          index === currentProductIndex ? formData : product
        );
        setProducts(updatedProducts);
        setIsEditing(false);
      } else {
        setProducts([...products, formData]);
      }
      setFormData({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImage: null,
        productImagePreview: ''
      });
      setErrors({});
    }
  };

  const handleEdit = (index) => {
    const product = products[index];
    setFormData(product);
    setIsEditing(true);
    setCurrentProductIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                  Product Name
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productDescription && <p className="text-red-500 text-xs italic">{errors.productDescription}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                  Product Price
                </label>
                <input
                  id="productPrice"
                  name="productPrice"
                  type="text"
                  value={formData.productPrice}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productPrice && <p className="text-red-500 text-xs italic">{errors.productPrice}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
                  Product Image
                </label>
                <input
                  id="productImage"
                  name="productImage"
                  type="file"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productImage && <p className="text-red-500 text-xs italic">{errors.productImage}</p>}
                {formData.productImagePreview && (
                  <img src={formData.productImagePreview} alt="Product Preview" className="mt-4 w-32 h-32 object-cover" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEditing ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.productName}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.productDescription}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.productPrice}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img src={product.productImagePreview} alt="Product" className="w-16 h-16 object-cover" />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
