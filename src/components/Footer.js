import React from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
    return (
        <footer className="p-6 bg-[#525fe1] text-white">
            <div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
                <div className="flex flex-col space-y-4">
                    <h2 className="font-medium">Getting started</h2>
                    <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
                        <a rel="noopener noreferrer" href="#">
                            Installation
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Release Notes
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Upgrade Guide
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Using with Preprocessors
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Optimizing for Production
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Browser Support
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            IntelliSense
                        </a>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="font-medium">About Us</h2>
                    <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
                        <Link rel="noopener noreferrer" href="about/Privacy">
                            Privacy Policy
                        </Link>
                        <a rel="noopener noreferrer" href="#">
                            Terms of Service
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Contact Us
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Press Kit
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            Help Center
                        </a>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="font-medium">Support</h2>
                    <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
                        <Link rel="noopener noreferrer" href="#">
                            <MdEmail className="inline-block mr-1 mb-0.5 items-center" /> Email Us
                        </Link>
                    </div>
                </div>
                <div className="w-12 bg-white">
                    {/* <h2 className="font-medium border-2 text-center border-white px-5 py-2">Legal</h2> */}
                    <img src="../images/homeetute.svg" alt="" width={200} height={100} />

                </div>
            </div>
            <div className="flex items-center justify-center px-6 pt-12 text-sm">
                <span className="dark:text-gray-400">
                    © Copyright 2023. All Rights Reserved.
                </span>
            </div>

            <style jsx>
                {`
      a:hover {
          color: #ffcf59;
          text-decoration: none;
      }
      `}
            </style>
        </footer>
    )
}
