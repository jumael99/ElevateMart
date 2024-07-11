import { useState } from 'react';

const AdminNavbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="text-2xl font-semibold text-gray-800">
                <a href="/">Elevate-Mart</a>
            </div>
            <div className="relative">
                <button onClick={toggleDropdown} className="text-gray-600 focus:outline-none flex items-center gap-2">
                    <UserIcon className="w-6 h-6" />
                    <span className="hidden md:inline">Admin</span>
                    <ArrowDownIcon className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                        <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                        <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                        <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
                    </div>
                )}
            </div>
        </header>
    );
};

const UserIcon = () => (
    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A7.963 7.963 0 0012 20a7.963 7.963 0 006.879-2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
);

export default AdminNavbar;
