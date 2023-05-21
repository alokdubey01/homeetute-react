import React from "react";
export default function User() {
    return (
        <div className="flex flex-no-wrap container mx-auto">
            <div className="w-64 absolute sm:relative md:h-full flex-col justify-between hidden sm:flex">
                <div className="px-8">
                    <ul className="mt-12">
                        <li className="flex w-full justify-between text-black font-semibold hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <span className="text-sm  ml-2">Personal details</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <span className="text-sm  ml-2">Communication details</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <span className="text-sm  ml-2">Performance</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Sidebar ends */}
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                <div className="w-full h-full rounded border-dashed border-2 border-gray-300">{/* Place your content here */}</div>
            </div>
        </div>
    );
}
