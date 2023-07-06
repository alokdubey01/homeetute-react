import Navbar from '../components/Navbar';
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { collection, getDoc, doc, getDocs, query, where, deleteDoc, onSnapshot, setDoc, updateDoc, addDoc } from "firebase/firestore";
import db from "../firebase";
import useAuth from '../HOC/AuthContext';
import { Button, Divider } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
import Application from './Application';
import Posted from '../components/loading/Posted';
import Proposals from '../components/secondScreen/Proposals';

export default function Home() {
    // const [search, setSearch] = useState("")
    // const [filteredData, setFilteredData] = useState([])
    // const [isSearch, setIsSearch] = useState(false)
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [teacherId, setTeacherId] = useState([])
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    // const [allUser, setAllUser] = useState([])
    const [activeTab, setActiveTab] = useState(1)
    const [post, setPost] = useState(null)
    const [showDelete, setShowDelete] = useState(false)
    const [showPrivate, setShowPrivate] = useState(false)
    const [showReuse, setShowReuse] = useState(false)
    const [showUpload, setShowUpload] = useState(false)

    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const docRef = doc(db, "students", user.uid)
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

        const getUser = async () => {
            await getDoc(doc(db, "students", user.uid))
                .then((doc) => {
                    if (doc.exists()) {
                        setData(doc.data())
                        setLoading(false)
                    } else {
                        console.log("No such document!");
                    }
                }
                )
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        };
        getUser();

        const gettingData = async () => {
            // store uid from proposals subcollection in array
            const q = await query(collection(db, "posts", user.uid, "proposals"));
            onSnapshot(q, (querySnapshot) => {
                const docData = querySnapshot.docs.map(doc => doc.data());
                // create a array of all names from proposals subcollection
                const uids = docData.map((item) => item.uid)
                // if uid is not equal to null then set the array of uid to teacherId
                if (uids !== null) {
                    setTeacherId(uids)
                    setTeachers(docData)
                    setLoading(false)
                }
            })
        }
        gettingData();

        // const allTechers = async () => {
        //     const q = await query(collection(db, "teachers"), where("city", "==", "Lucknow"));
        //     getDocs(q).then((querySnapshot) => {
        //         const docData = querySnapshot.docs.map(doc => doc.data());
        //         setTeachers(docData)
        //         setLoading(false)
        //     });
        // };
        // allTechers();

        const appicationData = async () => {
            await getDoc(doc(db, 'posts', user.uid))
                .then((doc) => {
                    if (doc.exists()) {
                        setPost({ ...doc.data() })
                    } else {
                        console.log("No such posts")
                    }
                })
                .catch((error) => {
                    console.log("Error getting post:", error)
                })
        };
        appicationData();

        //count data from firestore v9 at realtime
        const countPosts = async () => {
            // const q = await query(collection(db, "posts", user.uid, "proposals"));
            // onSnapshot(q, (querySnapshot) => {
            //     const docData = querySnapshot.docs.map(doc => doc.data());
            //     setCount(docData.length)
            // });


            const q = await query(collection(db, "posts", user.uid, "proposals"));
            getDocs(q).then((querySnapshot) => {
                const docData = querySnapshot.docs.map(doc => doc.data());
                setCount(docData.length)
                console.log(docData.length)
                console.log(docData)
                setLoading(false)
            })
        }

        countPosts();
    }, []);

    useEffect(() => {
        if (teacherId.length > 0) {
            const q = query(collection(db, "teachers"), where("uid", "in", teacherId));
            onSnapshot(q, (querySnapshot) => {
                const docData = querySnapshot.docs.map(doc => doc.data());
                setTeachers(docData)
                // console.log("proposals length",docData)
                setLoading(false)
            });
        }
    }, [teacherId])


    // deleting a subcollection from firestore v9
    const deleteApplication = async (id) => {
        console.log(id)
        const docRef = doc(db, 'students', user.uid);
        const colRef = collection(docRef, 'proposals');
        const q = query(colRef, where("status", "==", "pending"));
        await onSnapshot(q, (querySnapshot) => {
            const docData = querySnapshot.docs.map(doc => doc.data());
            // console.log(docData)
            setTeachers(docData)
            setLoading(false)
        });
    }

    // click on button of each teacher
    const proposal = async (event, param) => {
        console.log(param)
        // update the status of proposal to accepted from proposals subcollection where uid is equal to param
        // const colRef = collection(db, 'posts', user.uid, 'proposals');
        // const q = query(colRef, where("uid", "==", param));
        // await onSnapshot(q, (querySnapshot) => {
        //     const docData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        //     console.log(docData)
        //     docData.map((item) => 
        //         console.log(item)
        //         console.log(item.id)
        //         setDoc(doc(db, 'posts', user.uid, 'proposals', item.id), {
        //             status: "accepted",
        //         });
        //     })
        //     setLoading(false)
        // })
    }

    return (
        <>
            {loading ? <div>loading view...</div> : <div className="h-full dark:bg-gray-900">
                <Navbar />
                <div>
                    {showUpload && <div className="py-12 bg-gray-700 bg-opacity-30 dark:bg-opacity-30 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 h-full" id="modal">
                        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 h-full">
                            <div className="relative py-4 px-4 md:px-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                                <Application onClick={() => setShowUpload(false)} />
                            </div>
                        </div>
                    </div>}
                </div>

                <div>
                    {showDelete && <div className="py-12 bg-gray-700 bg-opacity-30 dark:bg-opacity-30 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 h-full" id="modal">
                        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg h-full">
                            <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                                <div className="w-full flex justify-center text-red-400 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={56} height={56} className="icon icon-tabler icon-tabler-circle-check">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal capitalize leading-tight mb-4">Delete the post</h1>
                                <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
                                    Are you sure you want to delete this post? This action cannot be undone, You will not be able to recover this post.
                                </p>
                                <div className="flex items-center justify-center w-full">
                                    <button onClick={deleteApplication} className="focus:outline-none transition duration-150 ease-in-out hover:bg-red-600 bg-red-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">Yes, Remove</button>
                                    <button className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => setShowDelete(!showDelete)} >
                                        Cancel
                                    </button>
                                </div>
                                <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out" onClick={() => setShowDelete(!showDelete)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>

                <div>
                    {showPrivate && <div className="py-12 bg-gray-700 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 h-full" id="modal">
                        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg h-full">
                            <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                                <div className="w-full flex justify-center text-indigo-400 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" height={56} width={56}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                </div>
                                <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal capitalize leading-tight mb-4">Make the post private</h1>
                                <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
                                    Are you sure you want to private this post? This action will hide your request to all. Only you can see this post.
                                </p>
                                <div className="flex items-center justify-center w-full">
                                    <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-red-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">Yes, Make it Private</button>
                                    <button className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => setShowPrivate(!showPrivate)} >
                                        Cancel
                                    </button>
                                </div>
                                <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out" onClick={() => setShowPrivate(!showPrivate)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>

                <div>
                    {showReuse && <div className="py-12 bg-gray-700 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 h-full" id="modal">
                        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg h-full">
                            <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                                <div className="w-full flex justify-center text-green-400 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={56} width={56} strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                </div>
                                <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal capitalize leading-tight mb-4">Re-Upload the post</h1>
                                <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
                                    Are you sure you want to re-upload this post? It will help you to reach with another teachers.
                                </p>
                                <div className="flex items-center justify-center w-full">
                                    <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-red-600 bg-red-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">Yes, Remove</button>
                                    <button className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => setShowReuse(!showReuse)} >
                                        Cancel
                                    </button>
                                </div>
                                <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out" onClick={() => setShowReuse(!showReuse)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>


                <div className="sm:hidden relative w-11/12 mx-auto bg-slate-100 dark:bg-gray-900 rounded">
                    <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-selector" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="8 9 12 5 16 9" />
                            <polyline points="16 15 12 19 8 15" />
                        </svg>
                    </div>
                    <select aria-label="Selected tab" className="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 appearance-none bg-transparent relative z-10">
                        <option>Posted Application</option>
                        <option>Posted Application</option>
                        <option>Posted Application</option>
                    </select>
                </div>
                <div className="justify-between flex-wrap hidden sm:block bg-white dark:bg-gray-900 shadow rounded">
                    <div className="xl:w-full xl:mx-0 -b pl-5 pr-5 h-12">
                        <ul className="flex items-center h-full">
                            <li onClick={() => setActiveTab(1)} className={activeTab === 1 ? "text-sm text-indigo-700 py-2 px-4 bg-gray-200 dark:bg-gray-800 dark:text-white rounded mr-8 font-semibold" : "text-sm text-gray-600 dark:text-gray-400 py-2 px-4 mr-8 font-semibold hover:text-indigo-700 cursor-pointer"}>
                                Posted Application
                            </li>
                            <li onClick={() => setActiveTab(2)} className={activeTab === 2 ? "text-sm text-indigo-700 py-2 px-4 bg-gray-200 dark:bg-gray-800 dark:text-white rounded mr-8 font-semibold" : "text-sm text-gray-600 dark:text-gray-400 py-2 px-4 mr-8 font-semibold hover:text-indigo-700 cursor-pointer"}>
                                View Proposals
                            </li>
                            <li onClick={() => setActiveTab(3)} className={activeTab === 3 ? "text-sm text-indigo-700 py-2 px-4 bg-gray-200 dark:bg-gray-800 dark:text-white rounded mr-8 font-semibold" : "text-sm text-gray-600 dark:text-gray-400 py-2 px-4 mr-8 font-semibold hover:text-indigo-700 cursor-pointer"}>
                                Top Teachers
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-white background">
                    <div className="mx-auto px-6 lg:px-8 mt-8">
                        <div className="mx-auto md:grid md:grid-cols-8">
                            <div className='col-span-6 border rounded-2xl mt-2'>
                                {loading ? (<Posted />) : (
                                    <div>
                                        {post === null ? (<div className="w-9/12 m-auto min-h-screen flex items-center justify-center">
                                            <div className="bg-white overflow-hidden sm:rounded-lg pb-8">
                                                <div className="border-gray-200 text-center pt-8">
                                                    <h1 className="text-6xl font-medium py-8">oops! No Requests</h1>
                                                    <p className="text-2xl pb-8 px-12 font-medium">Oops! It seems that you do not apply any Application.</p>
                                                    <button onClick={() => setShowUpload(true)} className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md mr-6">
                                                        Upload your Application
                                                    </button>
                                                </div>
                                            </div>
                                        </div>) : <div>
                                            {activeTab === 1 ?
                                                <div className="p-2 sm:p-4">
                                                    <h1 className='font-bold text-lg'>{post.firstName} {post.lastName}</h1>
                                                    <p className='text-xs text-gray-600 mt-0.5'>Posted 1 hour ago</p>
                                                    <div className='flex items-center gap-1 mt-0.5'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className='text-sm font-semibold text-gray-600'>{post.area} {","} {post.city} {","} {post.state}</p>
                                                    </div>
                                                    <Divider sx={{ marginTop: 2 }} />
                                                    <section className="my-2 md:p-4 text-gray-800">
                                                        <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:flex flex-wrap">
                                                            <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                                                <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                                    <p className="text-sm font-semibold">Student Name</p>
                                                                    <p className='text-sm text-indigo-600 font-semibold'>{post.firstName} {post.lastName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                                                <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                                    <p className="text-sm font-semibold">Class</p>
                                                                    <p className='text-sm text-indigo-600 font-semibold'>{post.standard}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                                                <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                                    <p className="text-sm font-semibold">Subject</p>
                                                                    {/* <p className='text-sm text-indigo-600 font-semibold'>{(index ? ',' : '') + post.subject}</p> */}
                                                                    {post.subject.map((post, index) => (
                                                                        // <p key={index} className='text-sm text-indigo-600 font-semibold'>{post.title}</p>
                                                                        <p key={index} className='text-sm text-indigo-600 font-semibold'>{(index ? ',' : '') + post.title}</p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                                                <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                                    <p className="text-sm font-semibold">Address</p>
                                                                    <p className='text-sm text-indigo-600 font-semibold capitalize'>{post.houseNo}, {post.city}. {post.state}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                                                <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                                    <p className="text-sm font-semibold">Budget</p>
                                                                    <p className='text-sm text-indigo-600 font-semibold'>₹ {post.budget} / month</p>
                                                                </div>
                                                            </div>
                                                            {/* <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                                                <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                                    <p className="text-sm font-semibold">Classes</p>
                                                                    <p className='text-sm text-indigo-600 font-semibold'>5 Days a week</p>
                                                                </div>
                                                            </div> */}
                                                            <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
                                                                <div className="flex items-center justify-between flex-1 p-3 gap-4">
                                                                    <p className="text-sm font-semibold">Timings</p>
                                                                    <p className='text-sm text-indigo-600 font-semibold'>5:00 PM - 6:00 PM</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <Divider sx={{ marginTop: 2 }} />
                                                    <section className="my-2 md:p-4 text-gray-800">
                                                        <div className="container m-4 mx-auto md:m-0">
                                                            <h1 className='font-semibold text-base mb-2'>{post.title}</h1>
                                                            <p className="text-sm">{post.description}</p>
                                                        </div>
                                                    </section>
                                                    <Divider sx={{ marginTop: 2 }} />
                                                    <section className="my-2 md:p-4 text-gray-800">
                                                        <div className="container m-4 mx-auto md:m-0">
                                                            <h1 className='font-semibold text-base mb-2'>Activity on the post:</h1>
                                                            <ul>
                                                                <li className="flex">Proposals : <span>{count > 0 ? <div>Less than 5</div> : <div>{count}</div>}</span></li>
                                                                <li>Invites : <span> 3 </span></li>
                                                                <li>Hired : <span> 0 </span></li>
                                                            </ul>
                                                        </div>
                                                    </section>
                                                </div> : null}
                                            {activeTab === 2 ? <div className="p-2 sm:p-4">
                                                {teachers.length > 0 ? <div className='inline justify-between'>
                                                    {loading ? (<div>
                                                        loading ...
                                                    </div>) :
                                                        (
                                                            <div>
                                                                {teachers.map((teacher) => (
                                                                    <div>
                                                                        <div className="flex flex-col justify-center">
                                                                            <div
                                                                                className="w-full relative flex flex-col md:flex-row md:space-x-5 lg:space-y-3 md:space-y-0 rounded-xl shadow-md p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                                                                                <div className="w-32 h-32 bg-white grid place-items-center">
                                                                                    <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl" />
                                                                                </div>
                                                                                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2">
                                                                                    <div className="flex justify-between items-center">
                                                                                        <div className='flex items-center gap-2'>
                                                                                            <h3 className="font-black text-gray-800 md:text-sm text-sm">{teacher.firstName}{" "}{teacher.lastName}</h3>
                                                                                            <div className='flex items-center'>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20"
                                                                                                    fill="currentColor">
                                                                                                    <path
                                                                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                                </svg>
                                                                                                <p className="text-gray-600 font-bold text-sm">
                                                                                                    4.96
                                                                                                    <span className="text-gray-500 font-normal">{" "}(76 reviews)</span>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='flex items-center gap-3'>
                                                                                            <div className="">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
                                                                                                    fill="currentColor">
                                                                                                    <path fillRule="evenodd"
                                                                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                                                                        clipRule="evenodd" />
                                                                                                </svg>
                                                                                            </div>
                                                                                            <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium hidden md:block cursor-pointer hover:bg-indigo-700" onClick={event => proposal(event, teacher.uid)}>
                                                                                                Approve Proposal
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <p className="text-gsettingray-500 text-sm">{teacher.title} this should be a title</p>
                                                                                    <div className='gap-3 flex items-center'>
                                                                                        <p className="font-black text-gray-800 text-sm flex items-center gap-0.5">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                                                                            </svg>
                                                                                            <span className="font-normal text-gray-600 text-sm">Bachelor in Arts</span>
                                                                                        </p>
                                                                                        <p className="font-black text-gray-800 text-sm flex items-center gap-0.5">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                            </svg>
                                                                                            <span className="font-normal text-gray-600 text-sm">10:00 AM - 11:00 AM</span>
                                                                                        </p>
                                                                                        <p className="font-black text-gray-800 text-sm flex items-center gap-0.5">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                                                                            </svg>
                                                                                            <span className="font-normal text-gray-600 text-sm">5 days/week</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="flex justify-between item-center">
                                                                                        <p className="text-gray-800 font-medium hidden md:block text-xs bg-indigo-200 rounded-full px-3 py-1">#1 in Lucknow</p>
                                                                                        <div className="flex items-center">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                                                                                fill="currentColor">
                                                                                                <path
                                                                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                            </svg>
                                                                                            <p className="text-gray-600 font-bold text-sm ml-1">
                                                                                                4.96
                                                                                                <span className="text-gray-500 font-normal">(76 reviews)</span>
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium hidden md:block cursor-pointer hover:bg-indigo-700">
                                                                                            Superhost
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                </div> : <Proposals />}
                                            </div> : null}
                                            {activeTab === 3 ? <div className="p-2 sm:p-4">
                                                <div className="flex flex-col justify-center">
                                                    <div
                                                        className="w-full relative flex flex-col md:flex-row md:space-x-5 lg:space-y-3 md:space-y-0 rounded-xl shadow-md p-3 max-w-md md:max-w-3xl mx-auto border border-white bg-white">
                                                        <div className="w-32 h-32 bg-white grid place-items-center">
                                                            <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl" />
                                                        </div>
                                                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <div className='flex items-center gap-2'>
                                                                    <h3 className="font-black text-gray-800 md:text-sm text-sm">Rajesh Sagar</h3>
                                                                    <div className='flex items-center'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20"
                                                                            fill="currentColor">
                                                                            <path
                                                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                        </svg>
                                                                        <p className="text-gray-600 font-bold text-sm">
                                                                            4.96
                                                                            <span className="text-gray-500 font-normal">{" "}(76 reviews)</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className='flex items-center gap-3'>
                                                                    <div className="">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
                                                                            fill="currentColor">
                                                                            <path fillRule="evenodd"
                                                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                                                clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium hidden md:block cursor-pointer hover:bg-indigo-700">
                                                                        Approve Proposal
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="text-gsettingray-500 text-sm">this should be a title</p>
                                                            <div className='gap-3 flex items-center'>
                                                                <p className="font-black text-gray-800 text-sm flex items-center gap-0.5">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                                                    </svg>
                                                                    <span className="font-normal text-gray-600 text-sm">Bachelor in Arts</span>
                                                                </p>
                                                                <p className="font-black text-gray-800 text-sm flex items-center gap-0.5">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    <span className="font-normal text-gray-600 text-sm">10:00 AM - 11:00 AM</span>
                                                                </p>
                                                                <p className="font-black text-gray-800 text-sm flex items-center gap-0.5">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                                                    </svg>
                                                                    <span className="font-normal text-gray-600 text-sm">5 days/week</span>
                                                                </p>
                                                            </div>
                                                            <div className="flex justify-between item-center">
                                                                <p className="text-gray-800 font-medium hidden md:block text-xs bg-indigo-200 rounded-full px-3 py-1">#1 in Lucknow</p>
                                                                <div className="flex items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                                                        fill="currentColor">
                                                                        <path
                                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                    <p className="text-gray-600 font-bold text-sm ml-1">
                                                                        4.96
                                                                        <span className="text-gray-500 font-normal">(76 reviews)</span>
                                                                    </p>
                                                                </div>
                                                                <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium hidden md:block cursor-pointer hover:bg-indigo-700">
                                                                    Superhost
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> : null}
                                        </div>}
                                    </div>
                                )}
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

                                                    <span>Edit Posting</span>
                                                </div>
                                                <div className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                                    </svg>

                                                    <span>View Posting</span>
                                                </div>
                                                <div onClick={() => setShowReuse(!showReuse)} className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z" clipRule="evenodd" />
                                                    </svg>

                                                    <span>Reuse Posting</span>
                                                </div>
                                                <div onClick={() => setShowDelete(!showDelete)} className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                    </svg>

                                                    <span>Delete Posting</span>
                                                </div>
                                                <div onClick={() => setShowPrivate(!showPrivate)} className='flex items-center gap-1 text-indigo-700 text-sm font-semibold cursor-pointer mt-1.5'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                                                    </svg>

                                                    <span>Make Private</span>
                                                </div>
                                            </section>
                                            <div className='border-t mt-5 border-gray-300' />
                                            <div>
                                                <section className="justify-start mt-4">
                                                    <div className="justify-between flex items-center text-base font-semibold">
                                                        <span>About the student</span>
                                                    </div>
                                                    <div className="flex flex-column mt-4">
                                                        <div>
                                                            <div className="text-left text-sm font-semibold">
                                                                {data.firstName} {" "} {data.lastName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                            <section className="mt-4">
                                                <div data-test="freelancer-sidebar-availability">
                                                    <div className="pb-5">
                                                        <div className="text-left text-sm font-semibold text-gray-700">
                                                            Availibility
                                                        </div>
                                                        <div className="text-left text-sm">
                                                            9:00 AM - 5:00 PM
                                                        </div>
                                                    </div>
                                                    <div className="pb-5">
                                                        <div className="text-left text-sm font-semibold text-gray-700">
                                                            Hours allowed
                                                        </div>
                                                        <div className="text-left text-sm">
                                                            2 hours max...
                                                        </div>
                                                    </div>
                                                    <div className='border-t mb-3 border-gray-300' />

                                                    {/* <div className="pb-5">
                                                        <div className="justify-between flex items-center text-sm font-semibold">
                                                            <span>Request link</span>
                                                        </div>
                                                        <div className="mt-2 carousel-wrapper">
                                                            <div data-qa="carousel" className="up-carousel advancing">
                                                                <div data-qa="carousel-slide" className="bg-indigo-600 bg-opacity-40 border py-2 px-2 w-full h-12 overflow-auto">
                                                                    <small className="text-muted font-normal">
                                                                        Add a&nbsp;portfolio to&nbsp;show clients what you can&nbsp;do (+%).
                                                                        <span href="/freelancers//?qpn-profile-completeness=portfolio" rel="noopener noreferrer" data-ev-unique_element_id="auto-actionalternativeShortCta" className="m-0 p-0">
                                                                            Add a&nbsp;portfolio
                                                                        </span>
                                                                    </small>
                                                                </div>
                                                                <div data-qa="carousel-slide" className="bg-indigo-700 py-2 mt-2 px-2">
                                                                    <small className="text-muted font-normal">
                                                                        <button>Copy Link</button>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
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
            }
        </>
    )
}
