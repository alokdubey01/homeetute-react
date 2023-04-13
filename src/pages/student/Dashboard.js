import Navbar from '../../components/Navbar';
import { CheckIcon } from '@heroicons/react/20/solid'
import { Link, Navigate } from "react-router-dom";
import { GoLocation } from 'react-icons/go'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import db from "../../firebase";
import useAuth from '../../HOC/AuthContext';
import { Divider } from '@mui/material';

export default function Dashboard() {
    const jobs = [
        {
            id: 1,
            firstName: "Ravi Singh",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 2,
            firstName: "Monika Dubey",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 3,
            firstName: "Khushi Singh",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 4,
            firstName: "Mallu Don",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 5,
            firstName: "Jwala Dubey",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 6,
            firstName: "Riya Pandey",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 7,
            firstName: "Ayush Gupta",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 8,
            firstName: "Anuj Mishra",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 9,
            firstName: "Ansh Jaiswal",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
        {
            id: 10,
            firstName: "Samir Thakur",
            location: "Vinit Khand, Lucknow",
            image: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_24.png",
            budget: "Fixed Budget",
            class: "Class 8th",
            estBudget: "Est. budget 800",
            posted: "Posted 8 hours ago",
            proposals: "Less than 5",
            description: "To many naive users of the platform, a redesign may look just like a facelift. No more, no less. However, for a User Experience designer, the entire redesign process means much more than a lot of research, meticulous planning, iterating, and gallons of coffee!",
        },
    ]

    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [allUser, setAllUser] = useState([])
    const [activeTab, setActiveTab] = useState(1)
    const [post, setPost] = useState([jobs])

    const { user } = useAuth()

    useEffect(() => {
        const getUser = async () => {
            await getDoc(doc(db, "users", user.uid))
                .then((doc) => {
                    if (doc.exists()) {
                        console.log("Document data:", doc.data());
                        setData(doc.data())
                        setLoading(false)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }
                )
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        };
        getUser();

        const allUser = async () => {
            const docRef = await getDocs(collection(db, "users"));
            const docData = docRef.docs.map(doc => doc.data());
            console.log(docData);
            setAllUser(docData)
            setLoading(false)
        };
        allUser();
    }, []);

    const goToLogin = () => {
        Navigate('/login')
    }
    return (<div className="h-full">
        <Navbar />
        <div className="bg-white background">
            <div className="mx-auto px-6 lg:px-8 mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" className='mt-2 mb-4 mx-auto w-full h-12' viewBox="0 0 883.777 46.74">
                    <g onClick={() => setActiveTab(1)} className='cursor-pointer' id="Group_1" data-name="Group 1" transform="translate(-397 -292.768)">
                        <path id="Path_25" data-name="Path 25" d="M202.233,105.968H63.473c-10.209,0-18.486-10.352-18.486-23.122h0c0-12.769,8.277-23.121,18.486-23.121h138.76c10.21,0,18.487,10.352,18.487,23.121h0C220.72,95.616,212.443,105.968,202.233,105.968Z" transform="translate(352.013 233.275)" fill={activeTab === 1 ? "#4B6ED7" : "#E3E7F4"} />
                        <text className='text-center items-center justify-center mx-auto' id="POSTED_APPLICATIONS" data-name="POSTED APPLICATIONS" transform="translate(420 319)" fill={activeTab === 1 ? "#FFF" : "#111"} font-size="16" font-family="MicrosoftUighur-Bold, Microsoft Uighur" font-weight="700"><tspan x="0" y="0">POSTED APPLICATIONS</tspan></text>
                    </g>
                    <g onClick={() => setActiveTab(2)} className='cursor-pointer' id="Group_2" data-name="Group 2" transform="translate(-400.267 -293)">
                        <path id="Path_35" data-name="Path 35" d="M349.057,437.7c-7.941.157,13.335-23.122,13.335-23.122s-22.219-22.6-13.335-23.121,162.4,0,162.4,0,13.335,11.56,13.335,23.121S511.455,437.7,511.455,437.7,357,437.539,349.057,437.7Z" transform="translate(229.04 -98.225)" fill={activeTab === 2 ? "#4B6ED7" : "#E3E7F4"} />
                        <text className='text-center items-center justify-center mx-auto' id="POSTED_APPLICATIONS-2" data-name="POSTED APPLICATIONS" transform="translate(600 319)" fill={activeTab === 2 ? "#FFF" : "#111"} font-size="16" font-family="MicrosoftUighur-Bold, Microsoft Uighur" font-weight="700"><tspan x="0" y="0">TOP TEACHERS</tspan></text>
                    </g>
                    <g onClick={() => setActiveTab(3)} className='cursor-pointer' id="Group_3" data-name="Group 3" transform="translate(-413.435 -293)">
                        <path id="Path_38" data-name="Path 38" d="M349.057,437.7c-7.941.157,13.335-23.122,13.335-23.122s-22.219-22.6-13.335-23.121,162.4,0,162.4,0,13.335,11.56,13.335,23.121S511.455,437.7,511.455,437.7,357,437.539,349.057,437.7Z" transform="translate(420.04 -98.225)" fill={activeTab === 3 ? "#4B6ED7" : "#E3E7F4"} />
                        <text className='text-center items-center justify-center mx-auto' id="POSTED_APPLICATIONS-5" data-name="POSTED APPLICATIONS" transform="translate(792 319)" fill={activeTab === 3 ? "#FFF" : "#111"} font-size="16" font-family="MicrosoftUighur-Bold, Microsoft Uighur" font-weight="700"><tspan x="0" y="0">ALL PROPOSALS</tspan></text>
                    </g>
                    <g onClick={() => setActiveTab(4)} className='cursor-pointer' id="Group_4" data-name="Group 4" transform="translate(-405.603 -292.768)">
                        <path id="Path_40" data-name="Path 40" d="M349.057,437.7c-7.941.157,13.335-23.122,13.335-23.122s-22.219-22.6-13.335-23.121,162.4,0,162.4,0,13.335,11.56,13.335,23.121S511.455,437.7,511.455,437.7,357,437.539,349.057,437.7Z" transform="translate(590.04 -98.225)" fill={activeTab === 4 ? "#4B6ED7" : "#E3E7F4"} />
                        <text className='text-center items-center justify-center mx-auto' id="POSTED_APPLICATIONS-3" data-name="POSTED APPLICATIONS" transform="translate(962 319)" fill={activeTab === 4 ? "#FFF" : "#111"} font-size="16" font-family="MicrosoftUighur-Bold, Microsoft Uighur" font-weight="700"><tspan x="0" y="0">VIEW CHATS</tspan></text>
                    </g>
                    <g onClick={() => setActiveTab(5)} className='cursor-pointer' id="Group_5" data-name="Group 5" transform="translate(-408.771 -292.768)">
                        <path id="Path_15" data-name="Path 15" d="M93.5,438.083a3.994,3.994,0,0,1-3.191-6.4,27.474,27.474,0,0,0,0-33.708,3.994,3.994,0,0,1,3.191-6.4H240.36c12.521,0,23.2,9.772,23.672,22.354a23.217,23.217,0,0,1-23.1,24.147Z" transform="translate(1028.497 -98.575)" fill={activeTab === 5 ? "#4B6ED7" : "#E3E7F4"} />
                        <text className='text-center items-center justify-center mx-auto' id="POSTED_APPLICATIONS-4" data-name="POSTED APPLICATIONS" transform="translate(1141 319)" fill={activeTab === 5 ? "#FFF" : "#111"} font-size="16" font-family="MicrosoftUighur-Bold, Microsoft Uighur" font-weight="700"><tspan x="0" y="0">SETTINGS</tspan></text>
                    </g>
                </svg>
                <div className="mx-auto md:grid md:grid-cols-8">
                    <div className='col-span-6 border rounded-2xl mt-2'>
                        {/* <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
                            <li onClick={() => setActiveTab(1)} className="cursor-pointer">
                                <span className={activeTab === 1 ? "flex justify-center border-b-4 border-transparent py-3 cursor-pointer text-indigo-600 border-indigo-600" : "flex justify-center border-b-4 border-transparent py-3"}>Posted Application</span>
                            </li>
                            <li onClick={() => setActiveTab(2)} className="cursor-pointer">
                                <span className={activeTab === 2 ? "flex justify-center border-b-4 border-transparent py-3 cursor-pointer text-indigo-600 border-indigo-600" : "flex justify-center border-b-4 border-transparent py-3"}>Invite Teachers</span>
                            </li>
                            <li onClick={() => setActiveTab(3)} className="cursor-pointer">
                                <span className={activeTab === 3 ? "flex justify-center border-b-4 border-transparent py-3 cursor-pointer text-indigo-600 border-indigo-600" : "flex justify-center border-b-4 border-transparent py-3"}>Previous Chats</span>
                            </li>
                            <li onClick={() => setActiveTab(4)} className="cursor-pointer">
                                <span className={activeTab === 4 ? "flex justify-center border-b-4 border-transparent py-3 cursor-pointer text-indigo-600 border-indigo-600" : "flex justify-center border-b-4 border-transparent py-3"}>All Proposals</span>
                            </li>
                            <li onClick={() => setActiveTab(5)} className="cursor-pointer">
                                <span className={activeTab === 5 ? "flex justify-center border-b-4 border-transparent py-3 cursor-pointer text-indigo-600 border-indigo-600" : "flex justify-center border-b-4 border-transparent py-3"}>Settings</span>
                            </li>
                        </ul> */}
                        {post === null ? <div className='mx-auto items-center bg-indigo-700 text-center justify-between text-white rounded-2xl w-48 px-4 py-2 my-auto'>Upload a post</div> : <div>
                            {activeTab === 1 ? <div className="p-2 sm:p-4">
                                <h1 className='font-bold text-lg'>Alok Kumar Dubey</h1>
                                <p className='text-xs text-gray-600 mt-0.5'>Posted 1 hour ago</p>
                                <div className='flex items-center gap-1 mt-0.5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                    <p className='text-sm font-semibold text-gray-600'>Naubasta Kala, Chinhat, Lucnkow</p>

                                </div>
                                <Divider sx={{ marginTop: 2 }} />
                                <section className="my-2 md:p-4 text-gray-800">
                                    <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:flex flex-wrap">
                                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                            <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                <p className="text-sm font-semibold">Student Name</p>
                                                <p className='text-sm text-indigo-600 font-semibold'>Alok Dubey</p>
                                            </div>
                                        </div>
                                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                            <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                <p className="text-sm font-semibold">Class</p>
                                                <p className='text-sm text-indigo-600 font-semibold'>10 <sup>th</sup></p>
                                            </div>
                                        </div>
                                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                            <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                <p className="text-sm font-semibold">Subject</p>
                                                <p className='text-sm text-indigo-600 font-semibold'>Math, Science</p>
                                            </div>
                                        </div>
                                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                            <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                <p className="text-sm font-semibold">Address</p>
                                                <p className='text-sm text-indigo-600 font-semibold capitalize'>13-A/132, Naubasta Kala, Deva Road, Chinhat, lucknow</p>
                                            </div>
                                        </div>
                                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                            <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                <p className="text-sm font-semibold">Number of Students</p>
                                                <p className='text-sm text-indigo-600 font-semibold'>2 Students</p>
                                            </div>
                                        </div>
                                        <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                            <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                <p className="text-sm font-semibold">estBudget</p>
                                                <p className='text-sm text-indigo-600 font-semibold'>3500 / month</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <Divider sx={{ marginTop: 2 }} />
                                <section className="my-2 md:p-4 text-gray-800">
                                    <div className="container m-4 mx-auto md:m-0">
                                        <h1 className='font-semibold text-base'>Description:</h1>
                                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                                    </div>
                                </section>
                            </div> : null}
                            {activeTab === 2 ? <div className="p-2 sm:p-4"> 
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-1'>
                                <img className='h-12 w-12 rounded-full object-cover' src="https://images.unsplash.com/photo-1681218034100-801ebcbc0221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60" alt="teacher" />
                                <div className='inline'>
                                    <p className="text-sm font-semibold">pankaj kumar</p>
                                    <p className="text-xs">Lucknow, India</p>
                                </div>
                                </div>
                                like
                                chat
                            </div>
                            <div className="rounded-2xl bg-indigo-700 bg-opacity-20 px-2 py-1 w-24 text-xs text-center my-3">
                                Active now
                            </div>
                            <div className='my-2'>
                                Ranked 1st in Lucknow
                            </div>
                            <div className='my-2'>
                                Ranked 1st in Lucknow
                            </div>
                             </div> : null}
                            {activeTab === 3 ? <div className="p-2 sm:p-4"> hii3 </div> : null}
                            {activeTab === 4 ? <div className="p-2 sm:p-4"> hii4 </div> : null}
                            {activeTab === 5 ? <div className="p-2 sm:p-4"> hii5 </div> : null}
                        </div>}
                    </div>
                    <div className="p-2 col-span-2">
                        <div className="rounded-2xl py-4 text-center ring-1 ring-inset ring-gray-200 lg:flex lg:flex-col lg:justify-center">
                            <div className="mx-auto max-w-xs px-8">
                                <div className="up-card mt-0 py-0">
                                    <section id="fwh-sidebar-profile" data-test="freelancer-sidebar-profile" className="up-card-section">
                                        <div className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                                            </svg>

                                            <spanan>Edit Posting</spanan>
                                        </div>
                                        <div className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                            </svg>

                                            <spanan>View Posting</spanan>
                                        </div>
                                        <div className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z" clipRule="evenodd" />
                                            </svg>

                                            <spanan>Reuse Posting</spanan>
                                        </div>
                                        <div className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>

                                            <spanan>Delete Posting</spanan>
                                        </div>
                                        <div className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                                            </svg>

                                            <spanan>Make Private</spanan>
                                        </div>
                                    </section>
                                    <div className='border-t mt-5 border-gray-300' />
                                    <div>
                                        <section className="justify-start mt-4">
                                            <div className="justify-between flex items-center text-sm font-semibold">
                                                <spanan>About the student</spanan>
                                                <div className='border-2 rounded-full p-1 hover:bg-indigo-700 hover:bg-opacity-30 cursor-pointer'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex flex-column mt-4">
                                                <div>
                                                    <div className="text-left text-xs font-semibold">
                                                        {data.firstName} {" "} {data.lastName}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <section className="mt-4">
                                        <div data-test="freelancer-sidebar-availability">
                                            <div className="pb-5">
                                                <div className="text-left text-xs">
                                                    Availibility
                                                </div>
                                                <div className="text-left text-xs">
                                                    9:00 AM - 5:00 PM
                                                </div>
                                            </div>
                                            <div className="pb-5">
                                                <div className="text-left text-xs">
                                                    Hours allowed
                                                </div>
                                                <div className="text-left text-xs">
                                                    2 hours max...
                                                </div>
                                            </div>
                                            <div className="pb-5">

                                                <div className="mt-2 carousel-wrapper">
                                                    <div data-qa="carousel" className="up-carousel advancing">
                                                        <div data-qa="carousel-slide" className="bg-indigo-100 py-2 px-2">
                                                            <small className="text-muted font-normal">
                                                                Add a&nbsp;portfolio to&nbsp;show clients what you can&nbsp;do (+%).
                                                                <span href="/freelancers//?qpn-profile-completeness=portfolio" rel="noopener noreferrer" data-ev-unique_element_id="auto-actionalternativeShortCta" className="m-0 p-0">
                                                                    Add a&nbsp;portfolio
                                                                </span>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </div >
    )
}
