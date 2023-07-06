import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import db from '../firebase';
import useAuth from '../HOC/AuthContext';
import { useEffect } from 'react';
import { getDoc, addDoc, doc, setDoc, collection, query, getDocs } from 'firebase/firestore';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Application(props) {
    const [open, setOpen] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [standard, setStandard] = useState('');
    // const [classes, setClasses] = useState();
    const [subject, setSubject] = useState([]);
    const [budget, setBudget] = useState('');
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dataSend, setDataSend] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        const getApplication = async () => {
            const docRef = await getDoc(doc(db, 'students', user.uid));
            if (docRef.exists()) {
                const data = docRef.data();
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setArea(data.area);
                setCity(data.city);
                setState(data.state);
            } else {
                console.log("No such document!");
            }
        };
        getApplication();
    }, [])

    const postApplication = () => {
        const data = {
            firstName,
            lastName,
            houseNo,
            area,
            city,
            state,
            standard,
            subject,
            budget,
            time1,
            time2,
            title,
            description
        }
        setLoading(true);
        const docRef = doc(db, 'posts', user.uid);
        setDoc(docRef, data)
            .then(() => {
                setDataSend(true);
                console.log('Application submitted successfully');
                setLoading(false);
                window.location.reload();
            }
            )
            .catch((error) => {
                console.error("Error adding document: ", error);
            }
            );
    }

    return (
        <Fragment>
            <div className='absolute -top-2 -right-2 cursor-pointer' onClick={props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="py-1 items-center justify-center relative overflow-hidden">
                <div className="p-4 bg-gray-700 bg-opacity-10 rounded flex justify-between items-center cursor-pointer" onClick={() => setOpen(1)}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <h4 className="font-semibold text-sm text-indigo-700 cursor-pointer">
                            Personal Details
                        </h4>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {open === 1 && <div className="bg-white p-4 ">
                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                        <div className="md:w-64">
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="firstName"
                            >
                                First Name <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="md:w-64 md:ml-12 md:mt-2 -mt-2">
                            {/* <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="education"
                            >
                                Class <sup>*</sup>
                            </label>
                            <select
                                type="text"
                                tabIndex="0"
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="education"
                            >
                                <option hidden value="Select Education">
                                    Select Cources
                                </option>
                                <option value="Pre Nursery">Pre Nursery</option>
                                <option value="Nursery">Nursery</option>
                                <option value="LKG">LKG</option>
                                <option value="UKG">UKG</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4<sup>th</sup></option>
                                <option value="5th">5<sup>th</sup></option>
                                <option value="6th">6<sup>th</sup></option>
                                <option value="7th">7<sup>th</sup></option>
                                <option value="8th">8<sup>th</sup></option>
                                <option value="9th">9<sup>th</sup></option>
                                <option value="10th">10<sup>th</sup></option>
                                <option value="11th">11<sup>th</sup></option>
                                <option value="12th">12<sup>th</sup></option>
                            </select> */}
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="lastName"
                            >
                                Last Name <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <span>If you want to update your details, please move <Link className='underline text-indigo-700 font-semibold' to="/profile">Here</Link></span>
                </div>}
            </div>
            <div className="py-1 items-center justify-center relative overflow-hidden">
                <div className="p-4 bg-gray-700 bg-opacity-10 rounded flex justify-between items-center cursor-pointer" onClick={() => setOpen(2)}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                        <h4 className="font-semibold text-sm text-indigo-700 cursor-pointer">Communicational Details</h4>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {open === 2 && <div>
                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                        <div className="md:w-64">
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="houseNo"
                            >
                                House No./Building <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="houseNo"
                                value={houseNo}
                                onChange={(e) => setHouseNo(e.target.value)}
                                placeholder="House No./Building"
                            />
                        </div>
                        <div className="md:w-64 md:ml-12 md:mt-2 -mt-2">
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="area"
                            >
                                Street/Area <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="Street/Area"
                            />
                        </div>
                    </div>
                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                        <div className="md:w-64">
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="city"
                            >
                                City <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </div>
                        <div className="md:w-64 md:ml-12 md:mt-2 -mt-2">
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="State"
                            >
                                State <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                            />
                        </div>
                    </div>
                </div>}
            </div>
            <div className="py-1 items-center justify-center relative overflow-hidden">
                <div className="p-4 bg-gray-700 bg-opacity-10 rounded flex justify-between items-center cursor-pointer" onClick={() => setOpen(3)}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        <h4 className="font-semibold text-sm text-indigo-700 cursor-pointer">Educational Details</h4>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {open === 3 && <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                    <div className="md:w-64">
                        <label
                            className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                            id="education"
                        >
                            Class/Standard <sup>*</sup>
                        </label>
                        <select
                            type="text"
                            tabIndex="0"
                            className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                            aria-labelledby="education"
                            value={standard}
                            onChange={(e) => setStandard(e.target.value)}
                        >
                            <option hidden value="Select Education">
                                Select Class/Standard
                            </option>
                            <option value="Pre Nursery">Pre Nursery</option>
                            <option value="Nursery">Nursery</option>
                            <option value="LKG">LKG</option>
                            <option value="UKG">UKG</option>
                            <option value="1st">1<sup>st</sup></option>
                            <option value="2nd">2<sup>nd</sup></option>
                            <option value="3rd">3<sup>rd</sup></option>
                            <option value="4th">4<sup>th</sup></option>
                            <option value="5th">5<sup>th</sup></option>
                            <option value="6th">6<sup>th</sup></option>
                            <option value="7th">7<sup>th</sup></option>
                            <option value="8th">8<sup>th</sup></option>
                            <option value="9th">9<sup>th</sup></option>
                            <option value="10th">10<sup>th</sup></option>
                            <option value="11th">11<sup>th</sup></option>
                            <option value="12th">12<sup>th</sup></option>
                        </select>
                    </div>
                    <div className="md:w-64 md:ml-12 md:mt-2 -mt-2">
                        <label
                            className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                            id="area"
                        >
                            Subjects <sup>*</sup>
                        </label>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={subjectsList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.title}
                                </li>
                            )}
                            onChange={(e, value) => setSubject(value)}
                            style={{ width: "auto" }}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Subject Name" />
                            )}
                        />
                    </div>
                </div>}
            </div>
            <div className="py-1 items-center justify-center relative overflow-hidden">
                <div className="p-4 bg-gray-700 bg-opacity-10 rounded flex justify-between items-center cursor-pointer" onClick={() => setOpen(4)}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                        <h4 className="font-semibold text-sm text-indigo-700 cursor-pointer">Budgets and Others</h4>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {open === 4 && <div>
                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                        <div className="md:w-64">
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="budget"
                            >
                                Budget <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="budget"
                                placeholder="Rs. 3000"
                            />
                        </div>
                        <div className="md:w-64 md:ml-12 md:mt-2 -mt-2">
                            <label
                                className="text-sm flex items-center leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="area"
                            >
                                Timings <span className='text-xs text-gray-500 mx-0.5'>(From - To)</span> <span title='Teaching Time'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                                </span>
                            </label>
                            <div className='flex gap-2 mt-2'>
                                {/* <input type="number" value={hours} onChange={(e) => setTime1(e.target.value)} max={24} min={1} className="rounded-none rounded-l-lg bg-white border focus:ring-blue-500 block flex-1 min-w-0 w-full p-3 border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" placeholder="1 hours" />
                                <span className="inline-flex items-center p-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    hours
                                </span> */}
                                <input className="rounded bg-white border focus:ring-blue-500 block flex-1 min-w-0 w-full p-3 border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" type="time" value={time1} onChange={(e) => setTime1(e.target.value)} />
                                <input className="rounded bg-white border focus:ring-blue-500 block flex-1 min-w-0 w-full p-3 border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" type="time" value={time2} onChange={(e) => setTime2(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="py-1 items-center justify-center relative overflow-hidden">
                <div className="p-4 bg-gray-700 bg-opacity-10 rounded flex justify-between items-center cursor-pointer" onClick={() => setOpen(5)}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                        <h4 className="font-semibold text-sm text-indigo-700 cursor-pointer">Title & Description</h4>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {open === 5 && <div>
                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                        <div>
                            <label
                                className="text-sm leading-none text-black font-medium font-sans" style={{ letterSpacing: '0.33px' }}
                                id="desc"
                            >
                                Title & Description <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                tabIndex="0"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="desc"
                                placeholder="Enter the title"
                            />
                            <textarea
                                type="text"
                                tabIndex="0"
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 mt-1 bg-white border rounded border-gray-400 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                aria-labelledby="desc"
                                placeholder="Tell more about your requirement"
                            />
                        </div>
                    </div>
                </div>}
                {/* <button onClick={postApplication} className="bg-blue-500 float-right p-2 text-sm text-white font-bold rounded mt-4">Submit Application</button> */}
                {!dataSend &&
                    <div className="flex justify-center items-center mt-4">
                        <button
                            className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            disabled={loading}
                            onClick={postApplication}
                        >
                            {loading ? <div className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                loading
                            </div> : 'Submit'}
                        </button>
                    </div>}
            </div>
        </Fragment>
    )
}

const subjectsList = [
    { title: 'Hindi' },
    { title: 'English' },
    { title: 'Maths' },
    { title: 'Science' },
    { title: 'Computer' },
    { title: 'Physics' },
    { title: 'Chemistry' },
    { title: 'Biology' }
];