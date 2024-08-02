import React from 'react';
import { Send } from 'lucide-react';

const MessageUs = () => {
    return (
        <div className="bg-white min-h-screen flex items-center justify-center font-sans">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Message Us</h1>
                <p className="text-sm text-gray-600 mb-6">
                    If you would like to be considered for employment or contact, please fill out
                    this form. A member of our team will contact you shortly.
                </p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
                        <textarea id="comments" name="comments" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                    </div>
                    <div className="flex items-center">
                        <span
                            className="mr-4 self-center text-2xl font-semibold whitespace-nowrap text-black">ElevateMart</span>
                        <div className="text-xs text-gray-600">
                            <p>For Marketplace Trust</p>
                            <p>Trust • Performance • Integrity</p>
                        </div>
                    </div>
                    <button type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Send className="w-4 h-4 mr-2" />
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageUs;