import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Admin/Admin-Sidebar';
import axios from 'axios';
import dynamic from 'next/dynamic';

 const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; 

const SubCategories = () => {
  const [formData, setFormData] = useState({
    subCategoryName: '',
    subCategoryDescription: '',
    categoryId: ''
  });

  const [errors, setErrors] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories'); 
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('/api/subcategories');  
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.subCategoryName) tempErrors.subCategoryName = 'SubCategory Name is required';
    if (!formData.subCategoryDescription) tempErrors.subCategoryDescription = 'SubCategory Description is required';
    if (!formData.categoryId) tempErrors.categoryId = 'Category is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (isEditing) {
          await axios.put(`/api/subcategories/${currentSubCategoryId}`, formData); 
        } else {
          await axios.post('/api/subcategories', formData);  
        }
        fetchSubCategories();
        resetForm();
      } catch (error) {
        console.error('Error saving subcategory:', error);
      }
    }
  };

  const handleEdit = (subCategory) => {
    setFormData({
      subCategoryName: subCategory.name,
      subCategoryDescription: subCategory.description,
      categoryId: subCategory.categoryId
    });
    setIsEditing(true);
    setCurrentSubCategoryId(subCategory._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/subcategories/${id}`);  
      fetchSubCategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      subCategoryName: '',
      subCategoryDescription: '',
      categoryId: ''
    });
    setErrors({});
    setIsEditing(false);
    setCurrentSubCategoryId(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
  <span className="text-green-500 border-b-2 border-black-500 pb-1">
Add-Subcatagory :  </span>
</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategoryName">
                  SubCategory Name
                </label>
                <input
                  id="subCategoryName"
                  name="subCategoryName"
                  type="text"
                  value={formData.subCategoryName}
                  onChange={handleChange}
                  placeholder="Enter subcategory name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.subCategoryName && <p className="text-red-500 text-xs italic">{errors.subCategoryName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryId">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-500 text-xs italic">{errors.categoryId}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategoryDescription">
                  SubCategory Description
                </label>
                <ReactQuill
                  id="subCategoryDescription"
                  value={formData.subCategoryDescription}
                  onChange={(value) => setFormData({ ...formData, subCategoryDescription: value })}
                  placeholder="Enter subcategory description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.subCategoryDescription && <p className="text-red-500 text-xs italic">{errors.subCategoryDescription}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEditing ? 'Update SubCategory' : 'Add SubCategory'}
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
  <span className="text-green-500 border-b-2 border-black-500 pb-1">
    Subcatagory List :
  </span>
</h2>        <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subCategory, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{subCategory.name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{subCategory.description}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{categories.find(cat => cat._id === subCategory.categoryId)?.name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleEdit(subCategory)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subCategory._id)}
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

export default SubCategories;
