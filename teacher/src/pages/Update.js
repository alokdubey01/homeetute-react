import React, { useEffect } from 'react'
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, uploadString, getStorage } from 'firebase/storage'
import db from "../firebase"
import { storage } from '../firebase'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { RadioGroup } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../HOC/AuthContext'
import { Update } from '@mui/icons-material'
import { Helmet } from 'react-helmet'
import Switches from '../components/Switch'

export default function UpdateProfile() {
    const [loading, setLoading] = React.useState(false)
    const [step, setStep] = React.useState(1)
    const [mobile, setMobile] = React.useState('')
    // notification - mail
    const [comments, setComments] = React.useState(false)
    const [jobs, setJobs] = React.useState(false)
    const [updates, setUpdates] = React.useState(false)
    // notification - push
    const [commentsPush, setCommentsPush] = React.useState(false)
    const [jobsPush, setJobsPush] = React.useState(false)
    const [updatesPush, setUpdatesPush] = React.useState(false)

    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const docRef = doc(db, "teachers", user.uid)
        getDoc(docRef).then((doc) => {
            const data = doc.data()
            if (data.firstName === undefined) {
                setLoading(false)
                navigate("/register")
            }
            else {
                setLoading(false)
            }
        }).catch((error) => {
            console.log("Error getting document:", error)
        })
    })

    const pages = (step) => {
        switch (step) {
            case 1:
                return <PersonalDetails onClick={() => setStep(7)} />
            case 2:
                return <CommunicationDetails onClick={() => setStep(8)} />
            case 3:
                return <Documents />
            case 4:
                return <Notification
                    comments={comments}
                    jobs={jobs}
                    updates={updates}
                    commentsPush={commentsPush}
                    jobsPush={jobsPush}
                    updatesPush={updatesPush}
                    handleComments={() => setComments(!comments)}
                    handleJobs={() => setJobs(!jobs)}
                    handleUpdates={() => setUpdates(!updates)}
                    handleCommentsPush={() => setCommentsPush(!commentsPush)}
                    handleJobsPush={() => setJobsPush(!jobsPush)}
                    handleUpdatesPush={() => setUpdatesPush(!updatesPush)}
                />
            case 5:
                return <PricingPlan />
            case 6:
                return <CloseAccount />
            case 7:
                return <UpdateBasicInfo goBack={() => setStep(1)} mobile={mobile} />
            case 8:
                return <UpdateCommunication goBack={() => setStep(2)} mobile={mobile} />
            default:
                return null
        }
    }
    return (
        <div>{loading ? <div>loading view...</div> : (
            <div className="flex flex-no-wrap container mx-auto">
                <div className="w-64 absolute sm:relative md:h-full flex-col justify-between hidden sm:flex">
                    <div className="px-8">
                        <ul className="mt-12">
                            <li onClick={() => setStep(1)} className={`${step === 1 ? 'flex w-full justify-between text-black font-semibold hover:text-gray-500 cursor-pointer items-center mb-6' : 'flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'}`}>
                                <div className="flex items-center">
                                    <span className="text-sm ml-2">Personal details</span>
                                </div>
                            </li>
                            <li onClick={() => setStep(2)} className={`${step === 2 ? 'flex w-full justify-between text-black font-semibold hover:text-gray-500 cursor-pointer items-center mb-6' : 'flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'}`}>
                                <div className="flex items-center">
                                    <span className="text-sm ml-2">Communication details</span>
                                </div>
                            </li>
                            <li onClick={() => setStep(3)} className={`${step === 3 ? 'flex w-full justify-between text-black font-semibold hover:text-gray-500 cursor-pointer items-center mb-6' : 'flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'}`}>
                                <div className="flex items-center">
                                    <span className="text-sm ml-2">Documents</span>
                                </div>
                            </li>
                            <li onClick={() => setStep(4)} className={`${step === 4 ? 'flex w-full justify-between text-black font-semibold hover:text-gray-500 cursor-pointer items-center mb-6' : 'flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'}`}>
                                <div className="flex items-center">
                                    <span className="text-sm ml-2">Notifications</span>
                                </div>
                            </li>
                            <li onClick={() => setStep(5)} className={`${step === 5 ? 'flex w-full justify-between text-black font-semibold hover:text-gray-500 cursor-pointer items-center mb-6' : 'flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'}`}>
                                <div className="flex items-center">
                                    <span className="text-sm ml-2">Pricing plan</span>
                                </div>
                            </li>
                            <li onClick={() => setStep(6)} className={`${step === 6 ? 'flex w-full justify-between text-black font-semibold hover:text-gray-500 cursor-pointer items-center mb-6' : 'flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'}`}>
                                <div className="flex items-center">
                                    <span className="text-sm ml-2">Close account</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Sidebar ends */}
                {/* Remove class [ h-64 ] when adding a card block */}
                <div className="mx-auto py-6 h-64 md:w-4/5 w-11/12 px-6">
                    <nav aria-label="breadcrumb" className="w-full py-4 text-gray-800">
                        <ol className="flex h-8 space-x-2 items-center">
                            <li className="flex items-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 pr-1 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                            </li>
                            <li className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-400">
                                    <path d="M32 30.031h-32l16-28.061z"></path>
                                </svg>
                                <div className="flex items-center px-1 mt-1 text-sm capitalize">
                                    {step === 1 && <span>Personal details</span>}
                                    {step === 2 && <span>Communication details</span>}
                                    {step === 3 && <span>Documents</span>}
                                    {step === 4 && <span>Notifications</span>}
                                    {step === 5 && <span>Pricing plan</span>}
                                    {step === 6 && <span>Close account</span>}
                                    {step === 7 && <div className='flex items-center space-x-2'>
                                        <span>Personal details</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 transform rotate-90 fill-current text-gray-400">
                                            <path d="M32 30.031h-32l16-28.061z"></path>
                                        </svg>
                                        <span>Update Basic Info</span>
                                    </div>}
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="w-full h-full rounded">
                        {pages(step)}
                    </div>
                </div>
            </div>
        )}</div>
    )
}

function PersonalDetails({ onClick }) {
    return (
        <div className="w-full h-full">
            <h1 className='text-2xl font-bold'>My Details</h1>
            <p className='text-sm mt-1 text-gray-500'>We use these details for all communication related to your account.</p>
            <div className='mt-4'>
                <h1 className='text-xl font-bold flex items-center'>Basic Information <div className='hover:bg-gray-200 rounded-full ml-2 p-2 cursor-pointer' onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                </div>
                </h1>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Name</label>
                    <span>Anurag Thapar</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Mobile Number</label>
                    <span>+91 9451756649</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Email Address</label>
                    <span>anurag21@gmail.com</span>
                </div>
            </div>
        </div>
    )
}

function CommunicationDetails({ onClick }) {
    return (
        <div className="w-full h-full">
            <h1 className='text-2xl font-bold'>Communication Details</h1>
            <p className='text-sm mt-1 text-gray-500'>We use these details for all communication related to your account.</p>
            <div className='mt-4'>
                <h1 className='text-xl font-bold flex items-center'>Contact Details <div className='hover:bg-gray-200 rounded-full ml-2 p-2 cursor-pointer' onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                </div>
                </h1>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Address</label>
                    <span>E-12/76, Gomati Nagar, Lucknow</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Address 2</label>
                    <span>-</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Pin Code</label>
                    <span>226010</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>City</label>
                    <span>Lucknow</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>State</label>
                    <span>Uttar Pradesh</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Country</label>
                    <span>India</span>
                </div>
            </div>
        </div>
    )
}

function Documents() {
    return (
        <div className="w-full h-full">
            <h1 className='text-2xl font-bold'>Documents</h1>
            <p className='text-sm mt-1 text-gray-500'>We use these details for all communication related to your account.</p>
            <div className='mt-4'>
                <h1 className='text-xl font-bold flex items-center'>Indentity Proof</h1>
                <div className='flex items-center justify-between w-fit'>
                    <div className="flex items-center justify-center mt-4 relative">
                        <div className="w-60 overflow-hidden rounded-xl border border-gray-100 bg-white">
                            <img src="https://i.imgur.com/5dmBrx6.jpg" alt="plant" className="h-auto w-full" />
                            <div className='absolute bg-indigo-600 text-white px-2 py-0.5 rounded-2xl font-semibold text-xs top-2 right-2'>
                                Aadhar card
                            </div>
                            <div className="p-3 flex items-center">
                                <ul>
                                    <li className='text-sm flex items-center justify-between font-semibold'>Name <span className='float-right w-1/2 font-normal'>Anurag Thapar</span></li>
                                    <li className='text-sm flex items-center justify-between font-semibold'>ID number <span className="float-right w-1/2 font-normal">123456789123</span></li>
                                    <li className='text-sm flex justify-between font-semibold'>Address <span className='float-right w-1/2 font-normal'>Alkapuri, New Delhi, India</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Notification({ comments, jobs, updates, commentsPush, jobsPush, updatesPush, handleComments, handleJobs, handleUpdates, handleCommentsPush, handleJobsPush, handleUpdatesPush }) {
    return (
        <div className="w-full h-full">
            <Helmet>
                <title>Notifications</title>
            </Helmet>
            <h1 className='text-2xl font-bold'>Notifications</h1>
            <p className='text-sm mt-1 text-gray-500'>Get updates of any new activity or features. Turn on/off your preferences.</p>
            <div className='mt-4'>
                <h1 className='text-xl font-bold flex items-center'>Via Mail</h1>
                <div className="mx-auto pb-6">
                    <div>
                        <div className="flex justify-between items-center mb-8 mt-4">
                            <div className="w-9/12">
                                <p className="text-sm text-gray-800 dark:text-gray-100 pb-1 font-semibold">Comments</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                            </div>
                            <div className="cursor-pointer rounded-full relative shadow-sm">
                                <Switches isOn={comments}
                                    onColor="#584BEB"
                                    handleToggle={handleComments} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-9/12">
                                <p className="text-sm text-gray-800 dark:text-gray-100 pb-1 font-semibold">Job Applications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                            </div>
                            <div className="cursor-pointer rounded-full relative shadow-sm">
                                <Switches isOn={jobs}
                                    onColor="#584BEB"
                                    handleToggle={handleJobs} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-9/12">
                                <p className="text-sm text-gray-800 dark:text-gray-100 pb-1 font-semibold">Product Updates</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                            </div>
                            <div className="cursor-pointer rounded-full relative shadow-sm">
                                <Switches isOn={updates}
                                    onColor="#584BEB"
                                    handleToggle={handleUpdates} />
                            </div>
                        </div>
                    </div>
                    <h1 className='text-xl font-bold flex items-center'>Push Notifications</h1>
                    <div>
                        <div className="flex justify-between items-center mb-8 mt-4">
                            <div className="w-9/12">
                                <p className="text-sm text-gray-800 dark:text-gray-100 pb-1 font-semibold">Comments</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                            </div>
                            <div className="cursor-pointer rounded-full relative shadow-sm">
                                <Switches isOn={commentsPush}
                                    onColor="#584BEB"
                                    handleToggle={handleCommentsPush} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-9/12">
                                <p className="text-sm text-gray-800 dark:text-gray-100 pb-1 font-semibold">Job Applications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                            </div>
                            <div className="cursor-pointer rounded-full relative shadow-sm">
                                <Switches isOn={jobsPush}
                                    onColor="#584BEB"
                                    handleToggle={handleJobsPush} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-9/12">
                                <p className="text-sm text-gray-800 dark:text-gray-100 pb-1 font-semibold">Product Updates</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                            </div>
                            <div className="cursor-pointer rounded-full relative shadow-sm">
                                <Switches isOn={updatesPush}
                                    onColor="#584BEB"
                                    handleToggle={handleUpdatesPush} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PricingPlan() {
    return (
        <div className="w-full h-full">
            <h1 className='text-2xl font-bold'>Pricing Plan</h1>
            <p className='text-sm mt-1 text-gray-500'>Choose a subscription for extra feature.</p>
            <div className='mt-4'>
                <h1 className='text-xl font-bold flex items-center'>Basic Information <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-4 cursor-pointer">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                </div>
                </h1>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Name</label>
                    <span>Anurag Thapar</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Mobile Number</label>
                    <span>+91 9451756649</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <label className='text-sm font-semibold'>Email Address</label>
                    <span>anurag21@gmail.com</span>
                </div>
            </div>
        </div>
    )
}

function CloseAccount() {
    return (
        <div className="w-full h-full">
            <h1 className='text-2xl font-bold'>Account Clousure</h1>
            <p className='text-sm mt-1 text-gray-500'>You can control your login based data or activity.</p>
            <div className='mt-4'>
                <div className='flex items-center justify-between mt-6'>
                    <div>
                        <label className='text-sm font-semibold'>Change Visibility</label>
                        <p className='text-sm mt-1 text-gray-500'>You can change your profile visibility.</p>
                    </div>
                    <span className="text-red-700 text-sm cursor-pointer px-3 py-1.5 bg-slate-50 border rounded-lg hover:bg-red-200">Make Private</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <div>
                        <label className='text-sm font-semibold'>Sign Out</label>
                        <p className='text-sm mt-1 text-gray-500'>Sign out your account from this device.</p>
                    </div>
                    <span className="text-red-700 text-sm cursor-pointer px-3 py-1.5 bg-slate-50 border rounded-lg hover:bg-red-200">Sign out</span>
                </div>
                <div className='flex items-center justify-between mt-6'>
                    <div>
                        <label className='text-sm font-semibold'>Delete Account</label>
                        <p className='text-sm mt-1 text-gray-500'>Delete your account for permenantly.</p>
                    </div>
                    <span className="text-red-700 text-sm cursor-pointer px-3 py-1.5 bg-slate-50 border rounded-lg hover:bg-red-200">Yes, Delete</span>
                </div>
            </div>
        </div>
    )
}


// grand-child components


function UpdateBasicInfo({ goBack, mobile }) {
    return (
        <div className="w-full h-full">
            <div onClick={goBack} className='flex items-center space-x-2'>
                <div className='hover:bg-gray-200 rounded-full p-2 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <span>Go Back</span>
            </div>
            <div className='mt-4'>
                <h1 className='text-xl font-bold flex items-center'>Update Basic Information</h1>
                <p className='mt-2 text-xs'>Update your name, mobile wish to use for all communication related to your account.</p>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="fname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        id="fname"
                        aria-labelledby='fname'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="lname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lname"
                        aria-labelledby='lname'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="mobile">Mobile Number</label>
                    <div className="w-1/2 flex items-center px-2 resize-none mt-2 p-1 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800">
                        +91
                        <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            maxLength={10}
                            className="w-full resize-none p-1 focus:outline-none outline-none border-none text-sm font-medium leading-none text-gray-800 bg-gray-100 ml-2"
                        />
                    </div>
                    <div className='mt-6 grid'>
                        <label className='text-sm font-semibold' for="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            aria-labelledby='email'
                            placeholder='abc@email.com'
                            className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="bg-[#525fe1] text-white mt-6 rounded-full px-6 py-2 font-semibold uppercase text-sm hover:bg-indigo-500 dark:bg-violet-400 dark:text-gray-900">
                    Update
                </button>
            </div>
        </div >
    )
}

function UpdateCommunication({ goBack, mobile }) {
    return (
        <div className="w-full h-full">
            <div onClick={goBack} className='flex items-center space-x-2'>
                <div className='hover:bg-gray-200 rounded-full p-2 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <span>Go Back</span>
            </div>
            <div className='mt-4'>
                <h1 className='text-xl font-bold flex items-center'>Update Basic Information</h1>
                <p className='mt-2 text-xs'>Update your name, mobile wish to use for all communication related to your account.</p>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="houseno">House No./Building</label>
                    <input
                        type="text"
                        name="houseno"
                        id="houseno"
                        aria-labelledby='houseno'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="street">Street/Apartment</label>
                    <input
                        type="text"
                        name="street"
                        id="street"
                        aria-labelledby='street'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="pincode">Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        aria-labelledby='pincode'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="city">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        aria-labelledby='city'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="state">State</label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        aria-labelledby='state'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <div className='mt-6 grid'>
                    <label className='text-sm font-semibold' for="country">Country</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        aria-labelledby='country'
                        className="w-1/2 resize-none mt-2 p-2 bg-gray-100 rounded border border-gray-200 focus:outline-indigo-600 focus:outline-1 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                    />
                </div>
                <button
                    type="button"
                    className="bg-[#525fe1] text-white mt-6 rounded-full px-6 py-2 font-semibold uppercase text-sm hover:bg-indigo-500 dark:bg-violet-400 dark:text-gray-900">
                    Update
                </button>
            </div>
        </div >
    )
}