import React from 'react'

export default function Header () {
    return (
        <>
            <header className="fixed right-0 top-0 left-60 bg-yellow-50 py-3 px-4 h-16">
                <div className="w-full mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center focus:outline-none rounded-lg text-gray-600 font-semibold p-2 transition">
                                Hello, Alok Dubey
                            </div>
                        </div>
                        {/* <div className="text-lg font-bold">Today's Plan</div>
                        <div>
                            <button type="button" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition">
                                <span className="text-sm">Sign Out</span>
                                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </span>
                            </button>
                        </div> */}
                    </div>
                </div>
            </header>
        </>
    )
}
