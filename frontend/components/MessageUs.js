// components/MessageUs.js
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useSendMessageMutation } from '../store/slices/api/contactApiSlice';

const MessageUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [sendMessage, { isLoading, isError, isSuccess }] = useSendMessageMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(formData).unwrap();
      setFormData({ fullName: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center font-sans">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Message Us</h1>
        <p className="text-sm text-gray-600 mb-6">
          If you would like to be considered for employment or contact, please fill out
          this form. A member of our team will contact you shortly.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-3 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring  focus:ring-opacity-50 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
              required
            ></textarea>
          </div>
          <div className="flex items-center">
            <span className="mr-4 self-center text-2xl font-semibold whitespace-nowrap text-black">ElevateMart</span>
            <div className="text-xs text-gray-600">
              <p>For Marketplace Trust</p>
              <p>Trust • Performance • Integrity</p>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {isError && <p className="text-red-500 mt-4">Failed to send message. Please try again.</p>}
        {isSuccess && <p className="text-green-500 mt-4">Message sent successfully!</p>}
      </div>
    </div>
  );
};

export default MessageUs;
