import React from 'react'
import { Fragment, useState, useEffect, useRef } from "react";
import {
    Dialog,
    Disclosure,
    Menu,
    Popover,
    Transition,
} from "@headlessui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import db from '../firebase'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { getDoc, doc } from "firebase/firestore";
import HomeeTuteLogo from "../images/homeetute.svg"
import useAuth from '../HOC/AuthContext';

const classs = [
    {
        name: "Analytics",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: AiFillPlusCircle,
    },
    {
        name: "Engagement",
        description: "Speak directly to your customers",
        href: "#",
        icon: AiFillPlusCircle,
    },
    {
        name: "Security",
        description: "Your customers’ data will be safe and secure",
        href: "#",
        icon: AiFillPlusCircle,
    },
    {
        name: "Integrations",
        description: "Connect with third-party tools",
        href: "#",
        icon: AiFillPlusCircle,
    },
    {
        name: "Automations",
        description: "Build strategic funnels that will convert",
        href: "#",
        icon: AiFillPlusCircle,
    },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [model, setModel] = useState(false)
    const [msg, setMsg] = useState(true)
    const [selected, setSelected] = useState(0);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState("student");
    const [notification, setNotification] = useState(false);
    const [name, setName] = useState("")
    const [picture, setPicture] = useState("");

    const cancelButtonRef = useRef(null);
    const { user, logout } = useAuth()

    useEffect(() => {
        if (user) {
            setIsAuthenticate(true);
            const getUser = async () => {
                await getDoc(doc(db, "users", user.uid))
                    .then((doc) => {
                        setPicture(doc.data().image);
                        setName(doc.data().firstName + " " + doc.data().lastName);
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log("Error getting document:", error);
                        // Navigate("/register")
                    });
            }
            getUser();
        }
    }, []);

    return (
        <>
            <header className="bg-transparent">
                {notification && (
                    <div className="z-20 w-full absolute right-20 top-14 max-w-xs bg-white divide-y divide-gray-100 rounded-lg shadow-2xl dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
                        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-200 dark:bg-gray-800 dark:text-white">
                            <div className="bg-gray-200 w-4 h-4 rotate-45 absolute z-50 -top-1" style={{ right: "20px" }} />
                            Notifications
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            <a href="/" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex-shrink-0">
                                    <img className="rounded-full w-11 h-11 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="Jese" />
                                    <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                                        <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                    </div>
                                </div>
                                <div className="w-full pl-3">
                                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span></div>
                                    <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                                </div>
                            </a>
                            <a href="/" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex-shrink-0">
                                    <img className="rounded-full w-11 h-11 object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" alt="Joseph" />
                                    <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                                        <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                                    </div>
                                </div>
                                <div className="w-full pl-3">
                                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
                                </div>
                            </a>
                            <a href="/" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex-shrink-0">
                                    <img className="rounded-full w-11 h-11 object-cover" src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" alt="Bonnie" />
                                    <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-800">
                                        <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="w-full pl-3">
                                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span> and <span className="font-medium text-gray-900 dark:text-white">141 others</span></div>
                                    <div className="text-xs text-blue-600 dark:text-blue-500">44 minutes ago</div>
                                </div>
                            </a>
                            <a href="/" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex-shrink-0">
                                    <img className="rounded-full w-11 h-11 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" alt="Leslie" />
                                    <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
                                        <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="w-full pl-3">
                                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned you in a comment: <span className="font-medium text-blue-500" href="/">@bonnie.green</span> what do you say?</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-500">1 hour ago</div>
                                </div>
                            </a>
                            <a href="/" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex-shrink-0">
                                    <img className="rounded-full w-11 h-11 object-cover" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" alt="Robert" />
                                    <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full dark:border-gray-800">
                                        <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    </div>
                                </div>
                                <div className="w-full pl-3">
                                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend.</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-500">3 hours ago</div>
                                </div>
                            </a>
                        </div>
                        <a href="/" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                            <div className="inline-flex items-center ">
                                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                                View all
                            </div>
                        </a>
                    </div>)}
                <Transition.Root show={model} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModel}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="xl:px-4">
                                            <div className="flex items-center">
                                                <div className="w-80 mx-auto mt-12">
                                                    <div className="flex items-center">
                                                        <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800 mx-auto capitalize">
                                                            Please select your role
                                                        </h1>
                                                    </div>
                                                    <p className="mt-4 text-sm leading-5 text-gray-600 text-center">
                                                        It will help us to provide you the best experience on our
                                                        platform.
                                                    </p>
                                                </div>
                                            </div>

                                            {msg && (
                                                <div className="px-5 py-4 bg-gray-100 rounded-lg flex items-center justify-between mt-7">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M19 9.99999H20C20.2652 9.99999 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 9.99999 4 9.99999H5V8.99999C5 8.08074 5.18106 7.17049 5.53284 6.32121C5.88463 5.47193 6.40024 4.70026 7.05025 4.05025C7.70026 3.40023 8.47194 2.88462 9.32122 2.53284C10.1705 2.18105 11.0807 1.99999 12 1.99999C12.9193 1.99999 13.8295 2.18105 14.6788 2.53284C15.5281 2.88462 16.2997 3.40023 16.9497 4.05025C17.5998 4.70026 18.1154 5.47193 18.4672 6.32121C18.8189 7.17049 19 8.08074 19 8.99999V9.99999ZM17 9.99999V8.99999C17 7.67391 16.4732 6.40214 15.5355 5.46446C14.5979 4.52678 13.3261 3.99999 12 3.99999C10.6739 3.99999 9.40215 4.52678 8.46447 5.46446C7.52678 6.40214 7 7.67391 7 8.99999V9.99999H17ZM11 14V18H13V14H11Z"
                                                                    fill="#4B5563"
                                                                />
                                                            </svg>
                                                        </div>

                                                        <p className="text-sm text-gray-800 pl-3">
                                                            We take privacy issues seriously. You can be sure that your
                                                            personal data is securely protected.
                                                        </p>
                                                    </div>
                                                    <button className="md:block hidden focus:outline-none focus:ring-2 focus:ring-gray-700 rounded" onClick={() => setMsg(!msg)}>
                                                        <svg
                                                            aria-label="Close this banner"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M15.8337 5.34166L14.6587 4.16666L10.0003 8.825L5.34199 4.16666L4.16699 5.34166L8.82533 10L4.16699 14.6583L5.34199 15.8333L10.0003 11.175L14.6587 15.8333L15.8337 14.6583L11.1753 10L15.8337 5.34166Z"
                                                                fill="#79808F"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>)}

                                            <div className="justify-between pb-16 mb-4">
                                                <div className="flex items-center justify-around flex-wrap">
                                                    <div
                                                        className={`relative bg-white py-6 px-6 cursor-pointer rounded-xl w-64 my-4 shadow-sm ${selected === 1 ? "border-2 border-indigo-700" : "border-2"
                                                            }`}
                                                        onClick={() => {
                                                            setSelected(1);
                                                            // router.push({
                                                            //     pathname: "/login",
                                                            //     query: { role: "student" },
                                                            //     as: "/login/student",
                                                            // })
                                                        }}
                                                    >
                                                        <div className="absolute top-4 right-4">
                                                            {selected === 1 ? (
                                                                <BsCheckCircleFill className="text-indigo-700" />
                                                            ) : (
                                                                <BsCheckCircle />
                                                            )}
                                                        </div>
                                                        <div className=" text-gray-800 flex items-center rounded-md py-2 px-2 shadow-sm w-10 mx-auto">
                                                            <img className="h-6 w-8" src="student.png" alt="student icon" />
                                                        </div>
                                                        <div className="mt-2">
                                                            <p className="text-sm font-medium text-center">
                                                                Join as Stundent
                                                            </p>
                                                            <p className="text-xs mt-2 text-center">
                                                                I'll like to search for a teacher
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`relative bg-white py-6 px-6 cursor-pointer rounded-xl w-64 my-4 shadow-sm ${selected === 2 ? "border-2 border-indigo-700" : "border-2"
                                                            }`}
                                                        onClick={() => {
                                                            setSelected(2);
                                                            // router.push({
                                                            //     pathname: "/login",
                                                            //     query: { role: "teacher" },
                                                            //     as: "/login/teacher",
                                                            // })
                                                        }}
                                                    >
                                                        <div className="absolute top-4 right-4">
                                                            {selected === 2 ? (
                                                                <BsCheckCircleFill className="text-indigo-700" />
                                                            ) : (
                                                                <BsCheckCircle />
                                                            )}
                                                        </div>
                                                        <div className=" text-gray-800 flex items-center rounded-md py-2 px-2 shadow-sm w-10 mx-auto">
                                                            <img className="h-6 w-8" src="teacher.png" alt="teacher icon" />
                                                        </div>
                                                        <div className="mt-2">
                                                            <p className="text-sm font-medium text-center">
                                                                Join as Teacher
                                                            </p>
                                                            <p className="text-xs mt-2 text-center">
                                                                I'll like to search for a student
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <img
                                src={HomeeTuteLogo}
                                alt="Homeetute"
                                width={100}
                                height={32}
                                className="block"
                            />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                            </svg>

                        </button>
                    </div>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex focus:outline-none border-none outline-none rounded-md text-sm font-medium text-black">
                                    Classes
                                    <ChevronDownIcon
                                        className="mt-1 ml-0.5 h-4 w-4 text-black"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute mt-2 w-96 py-6 px-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">

                                    <div className="grid grid-cols-3 mx-auto">
                                        <div className="col-span-1">
                                            <div className="text-indigo-700">
                                                Class 1-5
                                            </div>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="text-indigo-700">
                                                Class 1-5
                                            </div>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="text-indigo-700">
                                                Class 1-5
                                            </div>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item className="px-1 py-1">
                                                <div
                                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                                >
                                                    Create
                                                </div>
                                            </Menu.Item>
                                        </div>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <a href="/" className="text-sm leading-6 text-gray-900">
                            Features
                        </a>
                        <a href="/" className="text-sm leading-6 text-gray-900">
                            Marketplace
                        </a>
                        <a href="/" className="text-sm leading-6 text-gray-900">
                            Company
                        </a>
                    </Popover.Group>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6">
                        {/* Notification icons */}
                        {isAuthenticate ? (
                            <div className=" flex relative space-x-5 justify-center items-center pl-2">
                                <div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
                                    <svg
                                        width={22}
                                        height={22}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                            stroke="#1F2937"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="animate-ping w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto duration-200" />
                                    <div className=" w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg" />
                                </div>

                                <div onClick={() => setNotification(!notification)}>
                                    <svg
                                        className="cursor-pointer  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 "
                                        width={22}
                                        height={22}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                                            stroke="#1F2937"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                                            stroke="#1F2937"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                            </div>
                        ) : null}
                        {isAuthenticate ? (
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex focus:outline-none border-none outline-none rounded-md text-sm font-medium text-black">
                                        <div className="flex mt-0.5 items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white">
                                            <span className="sr-only">Open user menu</span>
                                            {loading ? (<div className="animate-pulse bg-gray-50">
                                                <div className="w-8 h-8 mr-2 rounded-full bg-gray-300"></div>
                                            </div>) : <div>
                                                <img className="w-8 h-8 mr-2 rounded-full object-cover" src={picture} alt={name} />
                                            </div>}
                                        </div>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active
                                                            ? "bg-violet-500 text-white"
                                                            : "text-gray-900"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        {active ? (
                                                            <EditActiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <EditInactiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        Edit
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active
                                                            ? "bg-violet-500 text-white"
                                                            : "text-gray-900"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        {active ? (
                                                            <DuplicateActiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <DuplicateInactiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        Duplicate
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="px-1 py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active
                                                            ? "bg-violet-500 text-white"
                                                            : "text-gray-900"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        {active ? (
                                                            <ArchiveActiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <ArchiveInactiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        Archive
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active
                                                            ? "bg-violet-500 text-white"
                                                            : "text-gray-900"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        {active ? (
                                                            <MoveActiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <MoveInactiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        Move
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="px-1 py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={logout}
                                                        className={`${active
                                                            ? "bg-violet-500 text-white"
                                                            : "text-gray-900"
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        {active ? (
                                                            <DeleteActiveIcon
                                                                className="mr-2 h-5 w-5 text-violet-400"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <DeleteInactiveIcon
                                                                className="mr-2 h-5 w-5 text-violet-400"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        Delete
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) : (
                            <div
                                onClick={() => setModel(true)}
                                className="text-sm cursor-pointer leading-6 text-gray-900 bg-[#ffcf59] rounded-full py-1 px-3 hover:text-gray-900 hover:bg-yellow-300"
                            >
                                Log in
                            </div>
                        )}
                    </div>
                </nav>
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="block"
                                    width={100}
                                    height={32}
                                    src={HomeeTuteLogo}
                                    alt="Homeetute"
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Disclosure as="div" className="-mx-3">
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="flex text-indigo-700 w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                                                    Classes
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="mt-2 space-y-2">
                                                    {[...classs].map((item) => (
                                                        <Disclosure.Button
                                                            key={item.name}
                                                            as="a"
                                                            href={item.href}
                                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                        >
                                                            {item.name}
                                                        </Disclosure.Button>
                                                    ))}
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <Link
                                        href="/"
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-indigo-700 hover:bg-gray-50"
                                    >
                                        Features
                                    </Link>
                                    <a
                                        href="/"
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-indigo-700 hover:bg-gray-50"
                                    >
                                        Marketplace
                                    </a>
                                    <a
                                        href="/"
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-indigo-700 hover:bg-gray-50"
                                    >
                                        Company
                                    </a>
                                </div>
                                <div className="py-6">
                                    {isAuthenticate ? <div className='font-semibold'>
                                        {name}
                                    </div> : <Link
                                        href="/login"
                                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    )
}

function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function ArchiveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function ArchiveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function MoveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function MoveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}

function DeleteInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function DeleteActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}