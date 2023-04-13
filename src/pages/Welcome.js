import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { BsBook } from 'react-icons/bs'
import Corousel from '../components/Corousel'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import girl from "../images/girl.svg"

export default function Welcome() {
    return (
        <>
            <div style={{ backgroundColor: "#f9fbfc", height: "100vh" }}>
                {/* <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Mitr:wght@400&family=Patua+One&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
            />
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        </Head> */}
                <Navbar />

                {/* Landing Page */}
                <section className="grid grid-cols-2 items-center">
                    <div className="col-span-1">
                        <div
                            className="text-3xl mx-auto w-4/6 font-semibold capitalize leading-[1.4]"
                            style={{ fontFamily: "mitr" }}
                        >
                            {/* Getting Best Quality Education is now easy with WelcomeeTute */}
                            Get the best quality education from the comfort of your Home
                        </div>
                        <div className="mx-auto w-4/6 text-sm mt-4 leading-5">
                            We provides the best teacher for your child at your Welcome and area, who can help to sharp your child.
                        </div>
                        <div className="flex gap-6 items-center mt-6 mx-auto w-4/6">
                            <Link
                                className="inline-block py-1.5 px-2 border-[#ffcf59] bg-[#ffcf59] rounded-full hover:bg-gray-200"
                                href="/"
                            >
                                <div className="inline-block px-2 font-medium text-sm rounded-full items-center relative cursor-pointer whitespace-nowrap">
                                    Search a Teacher
                                </div>
                            </Link>
                            <button className="flex text-sm items-center gap-1 font-medium border-2 px-2 py-1.5 border-[#525fe1] hover:bg-[#525fe1] rounded-full">
                                <BsBook className="text-[#525fe1] text-3xl items-center hover:text-white" size={20} /> Join as
                                Techer
                            </button>
                        </div>
                    </div>
                    <div className="col-span-1 ml-auto mr-4">
                        <img loading="eager" src={girl} alt="girl" width={400} height={400} />
                    </div>
                </section>
                {/* Landing Page Ends */}

                {/* Banner */}
                <section className="bg-[#525fe1] mt-6 h-32 w-full">
                    <div className="flex items-center justify-between h-full w-1/2 mx-auto">
                        <div className="text-white text-2xl font-semibold">
                            2K + <br />
                            <span className="text-xs">Happy Students</span>
                        </div>
                        <div className="border border-r-white h-1/2 rounded-full" />
                        <div className="text-white text-2xl font-semibold">
                            200 + <br />
                            <span className="text-xs">Happy Teachers</span>
                        </div>
                        <div className="border border-r-white h-1/2 rounded-full" />
                        <div className="text-white text-2xl font-semibold">
                            4 + <br />
                            <span className="text-xs">Cities</span>
                        </div>
                        <div className="border border-r-white h-1/2 rounded-full" />
                        <div className="text-white text-2xl font-semibold">
                            24/7 <br />
                            <span className="text-xs">Support</span>
                        </div>
                    </div>
                </section>
                {/* Banner Ends */}

                {/* Category Search */}
                <section className="category-search bg-[#f6fbfc] pt-12">
                    <div className="text-center justify-center items-center">
                        <div
                            className="text-2xl mx-auto w-4/6 font-semibold capitalize leading-[1.4]"
                            style={{ fontFamily: "mitr" }}
                        >
                            Browse Teachers by categories
                        </div>
                        <div className="flex flex-wrap justify-center w-1/2 mx-auto mt-2 text-sm">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque,
                            quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            earum totam aspernatur, perferendis aperiam.
                        </div>
                        <div className="container-xl mt-4">
                            <Corousel />
                        </div>
                    </div>
                </section>
                {/* End Category Search */}

                {/* Highlights */}
                <section className="bg-[#f6fbfc]">
                    <div className="container px-6 py-12 mx-auto">
                        <div className="grid items-center gap-4 xl:grid-cols-5">
                            <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                                <h2 className="text-2xl font-bold">
                                    How it works
                                </h2>
                                <p className="text-gray-400">
                                    Connect with the perfect tutor at your area
                                </p>
                            </div>
                            <div className="p-6 xl:col-span-3">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid content-center gap-4">
                                        <div className="card border border-gray-300">
                                            <span className="icon">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
                                                </svg>
                                            </span>
                                            <h4>Products</h4>
                                            <p>
                                                Standard chunk of Lorem Ipsum used since the 1500s is
                                                showed below for those interested.
                                            </p>
                                        </div>
                                        <div className="card border border-gray-300">
                                            <span className="icon">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
                                                </svg>
                                            </span>
                                            <h4>Products</h4>
                                            <p>
                                                Standard chunk of Lorem Ipsum used since the 1500s is
                                                showed below for those interested.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid content-center gap-4">
                                        <div className="card border border-gray-300">
                                            <span className="icon">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
                                                </svg>
                                            </span>
                                            <h4>Products</h4>
                                            <p>
                                                Standard chunk of Lorem Ipsum used since the 1500s is
                                                showed below for those interested.
                                            </p>
                                        </div>
                                        <div className="card border border-gray-300">
                                            <span className="icon">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
                                                </svg>
                                            </span>
                                            <h4>Products</h4>
                                            <p>
                                                Standard chunk of Lorem Ipsum used since the 1500s is
                                                showed below for those interested.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
