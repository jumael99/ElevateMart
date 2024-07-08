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
      // Handle form submission
      console.log('Form submitted', formData);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
         <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add Catagories</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                  Catagory Name
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
                  Catagory Description
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
            </div>
           
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Catagory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
