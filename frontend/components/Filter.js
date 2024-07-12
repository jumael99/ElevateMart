import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Filter = () => {
    return (
        <div className="h-[8vh] px-16 shadow-md border flex justify-between items-center rounded-md text-black text-lg">
            <div className="text-gray-600 flex items-center">
                <input
                    type="text"
                    placeholder="Search your products..."
                    className="px-10 py-2 border rounded-lg absolute "
                />
                <AiOutlineSearch
                    className="text-gray-600 cursor-pointer p-2 relative top-[0px] left-0"
                    size={45}
                />
            </div>
            <div className="flex items-center justify-center gap-5">
                <h1>Sort By: </h1>
                <select className="p-2">
                    <option>Default</option>
                    <option>Low to high</option>
                    <option>High to low</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
