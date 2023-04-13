/* eslint-disable default-case */
import React, { useEffect } from "react";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, uploadString, getStorage } from 'firebase/storage';
import db from "../firebase";
import { storage } from "../firebase";
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { RadioGroup } from '@headlessui/react'
import { Navigate } from "react-router-dom";
import useAuth from "../HOC/AuthContext";

const years = [
    { id: 1, name: '2021' },
    { id: 2, name: '2020' },
    { id: 3, name: '2019' },
    { id: 4, name: '2018' },
    { id: 5, name: '2017' },
    { id: 6, name: '2016' },
    { id: 7, name: '2015' },
    { id: 8, name: '2014' },
    { id: 9, name: '2013' },
    { id: 10, name: '2012' },
    { id: 11, name: '2011' },
    { id: 12, name: '2010' },
    { id: 13, name: '2009' },
    { id: 14, name: '2008' },
    { id: 15, name: '2007' },
    { id: 16, name: '2006' },
    { id: 17, name: '2005' },
    { id: 18, name: '2004' },
    { id: 19, name: '2003' },
    { id: 20, name: '2002' },
    { id: 21, name: '2001' },
    { id: 22, name: '2000' },
    { id: 23, name: '1999' },
    { id: 24, name: '1998' },
    { id: 25, name: '1997' },
    { id: 26, name: '1996' },
    { id: 27, name: '1995' },
    { id: 28, name: '1994' },
    { id: 29, name: '1993' },
    { id: 30, name: '1992' },
    { id: 31, name: '1991' },
    { id: 32, name: '1990' },
    { id: 33, name: '1989' },
    { id: 34, name: '1988' },
    { id: 35, name: '1987' },
    { id: 36, name: '1986' },
    { id: 37, name: '1985' },
    { id: 38, name: '1984' },
    { id: 39, name: '1983' },
    { id: 40, name: '1982' },
    { id: 41, name: '1981' },
    { id: 42, name: '1980' },
]

export default function Register() {
    const [msg, setMsg] = React.useState(true)
    const [step, setStep] = React.useState(1);
    const [selected, setSelected] = React.useState(0);
    const [pricing, setPricing] = React.useState(0);
    const [error, setError] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [state, setState] = React.useState("Uttar Pradesh");
    const [city, setCity] = React.useState("Lucknow");
    const [pincode, setPincode] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [houseNo, setHouseNo] = React.useState("");
    const [area, setArea] = React.useState("");
    const [college, setCollege] = React.useState("");
    const [course, setCourse] = React.useState("");
    const [degree, setDegree] = React.useState("");
    const [joiningYear, setJoiningYear] = React.useState("");
    const [leavingYear, setLeavingYear] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [subDegree, setSubDegree] = React.useState("");
    const [openingTime, setOpeningTime] = React.useState("");
    const [closingTime, setClosingTime] = React.useState("");
    const [allowedTime, setAllowedTime] = React.useState("");
    const [picture, setPicture] = React.useState("https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png");

    const { user } = useAuth();

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const submit = () => {
        setStep(7);

        if (step) {
            if (firstName.length < 3, lastName.length < 3, dob.length < 3, state.length < 3, city.length < 3, pincode.length < 3, address.length < 3, area.length < 3, college.length < 3, course.length < 3, degree.length < 3, joiningYear.length < 3, leavingYear.length < 3, subject.length < 3, level.length < 3, desc.length < 3, subDegree.length < 3, openingTime.length < 3, closingTime.length < 3, allowedTime.length < 3, houseNo.length < 3) {
                setError(true)
                console.log("please fill the form.")
            }
            else {
                setDoc(doc(db, "users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    image: picture,
                    phoneNumber: user.phoneNumber,
                    dob: dob,
                    state: state,
                    city: city,
                    pincode: pincode,
                    address: address,
                    area: area,
                    college: college,
                    course: course,
                    degree: degree,
                    joiningYear: joiningYear,
                    leavingYear: leavingYear,
                    subject: subject,
                    level: level,
                    desc: desc,
                    subDegree: subDegree,
                    openingTime: openingTime,
                    closingTime: closingTime,
                    allowedTime: allowedTime,
                    uid: user.uid,
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef);
                        Navigate("/")
                    })
                    .catch((error) => {
                        console.log(error);
                        window.location.reload();
                    });
            }
        }
    };

    const fileUpload = async (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
        const file = e.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setPicture(downloadURL);
                });
            }
        );
    };

    const forms = (step) => {
        switch (step) {
            case 1:
                return (
                    <div className="sm:relative md:static">
                        <div className="xl:px-24">
                            <div className="mt-16 lg:flex justify-between border-gray-200 pb-16 mb-4">
                                <div className="mx-auto">
                                    <div className="mb-5 text-center">
                                        <div className="mx-auto w-32 h-32 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                                            <img id="image" className="object-cover w-full h-32 rounded-full"
                                                src={picture ? picture : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                                            />
                                        </div>

                                        <label
                                            htmlFor="fileInput"
                                            type="button"
                                            className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                                <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                                <circle cx="12" cy="13" r="3" />
                                            </svg>
                                            Browse Photo
                                        </label>

                                        <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">Click to add profile picture</div>

                                        <input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" onChange={fileUpload} />
                                        {/* <button type="button" onClick={fileUpload}>Upload</button> */}
                                    </div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="First Name"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="First Name"
                                                placeholder="Enter your First Name"
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="Last Name"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="Last Name"
                                                placeholder="Enter your Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:flex items-center lg:ml-24 mt-8">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="DOB"
                                            >
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                max="2023-12-31"
                                                tabIndex="0"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="DOB"
                                                placeholder="Your city"
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="altPhone"
                                            >
                                                Phone Number{" "}
                                                <span className="text-indigo-700 cursor-pointer">
                                                    (change)
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                readOnly
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                                                aria-labelledby="altPhone"
                                                value={user.phoneNumber}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="absolute bottom-0 flex items-center justify-between w-11/12 py-4 border-t">
                                <div />
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="transition float-right duration-200 bg-[#525fe1] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                >
                                    <span className="inline-block mr-2">Next</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 inline-block"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="sm:relative md:static">
                        <div className="xl:px-24">
                            <div className="mt-16 lg:flex justify-between pb-16 mb-4">
                                <div className="w-80">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl font-medium pr-2 leading-7 text-gray-800" style={{ fontFamily: 'Alkatra' }} >
                                            Locations
                                        </h1>
                                    </div>
                                    <p className="mt-4 text-sm leading-5 text-gray-600" style={{ fontFamily: 'Edu NSW ACT Foundation' }}>
                                        Add your current locations to help us to recomend students
                                        near your area.
                                    </p>
                                </div>
                                <div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="House No./Street"
                                            >
                                                House No./Street <sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={houseNo}
                                                onChange={(e) => setHouseNo(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="House No./Street"
                                                placeholder="Enter your Street/House No."
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="Locality"
                                            >
                                                Locality
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                                                aria-labelledby="Locality"
                                                placeholder="Enter your Locality"
                                                value={area}
                                                onChange={(e) => setArea(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="address"
                                            >
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="address"
                                                placeholder="Enter your Address"
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="pincode"
                                            >
                                                Pin Code
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                                                aria-labelledby="pincode"
                                                placeholder="Enter your Pin Code"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="city"
                                            >
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                                                aria-labelledby="city"
                                                placeholder="Your City"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                readOnly
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="state"
                                            >
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                                                aria-labelledby="state"
                                                placeholder="Enter your state"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex items-center justify-between w-11/12 py-4 border-t">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="transition float-left duration-200 bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                <span className="inline-block ml-2">Back</span>
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="transition float-right duration-200 bg-[#525fe1] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="sm:relative md:static">
                        <div className="xl:px-24">
                            <div className="mt-16 lg:flex justify-between pb-16">
                                <div className="w-80">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl font-medium pr-2 leading-7 text-gray-800" style={{ fontFamily: 'Alkatra' }}>
                                            Higher Education
                                        </h1>
                                    </div>
                                    <p className="mt-4 text-sm leading-5 text-gray-600" style={{ fontFamily: 'Edu NSW ACT Foundation' }}>
                                        Please enter your higher education details to proceed.
                                    </p>
                                </div>
                                <div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="school"
                                            >
                                                School/University <sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={college}
                                                onChange={(e) => setCollege(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="school"
                                                placeholder="University Name"
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="education"
                                            >
                                                Cources
                                            </label>
                                            <select
                                                type="text"
                                                tabIndex="0"
                                                value={course}
                                                onChange={(e) => setCourse(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="education"
                                            >
                                                <option hidden value="Select Education">
                                                    Select Cources
                                                </option>
                                                <option value="B.A.">B.A.</option>
                                                <option value="B.Sc">B.Sc</option>
                                                <option value="B.Ed">B.Ed</option>
                                                <option value="B.Tech">B.Tech</option>
                                                <option value="B.Pharma">B.Pharma</option>
                                                <option value="M.A.">M.A.</option>
                                                <option value="M.Sc">M.Sc</option>
                                                <option value="M.Ed">M.Ed</option>
                                                <option value="M.Tech">M.Tech</option>
                                                <option value="M.Pharma">M.Pharma</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="degree"
                                            >
                                                Field of Study <sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={degree}
                                                onChange={(e) => setDegree(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="degree"
                                                placeholder="Field Name"
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="subField"
                                            >
                                                Sub Field of Study
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={subDegree}
                                                onChange={(e) => setSubDegree(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="First Name"
                                                placeholder="Sub Field(optional)"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="joinigYear"
                                            >
                                                Years Attended
                                            </label>
                                            <select
                                                type="text"
                                                tabIndex="0"
                                                value={joiningYear}
                                                onChange={(e) => setJoiningYear(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="joinigYear"
                                            >
                                                <option hidden value="Select Education">
                                                    Select Year
                                                </option>
                                                {/* <option value="2023">2023</option> */}
                                                {years.map((year) => (
                                                    <option key={year.id} value={year.name}>{year.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="leavingYear"
                                            >
                                                Years Leaved
                                            </label>
                                            <select
                                                type="text"
                                                tabIndex="0"
                                                value={leavingYear}
                                                onChange={(e) => setLeavingYear(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="leavingYear"
                                            >
                                                <option hidden value="Select Education">
                                                    Select Year
                                                </option>
                                                {/* <option value="2023">2023</option> */}
                                                {years.map((year) => (
                                                    <option key={year.id} value={year.name}>{year.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex items-center justify-between w-11/12 py-4 border-t">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="transition float-left duration-200 bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                <span className="inline-block ml-2">Back</span>
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="transition float-right duration-200 bg-[#525fe1] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="sm:relative md:static">
                        <div className="xl:px-24">
                            <div className="mt-16 lg:flex justify-between pb-16">
                                <div className="w-80">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl font-medium pr-2 leading-7 text-gray-800" style={{ fontFamily: 'Alkatra' }}>
                                            Nice! Choose any subject you want to teach.
                                        </h1>
                                    </div>
                                    <p className="mt-4 text-sm leading-5 text-gray-600" style={{ fontFamily: 'Edu NSW ACT Foundation' }}>
                                        It will help us to find the best students for you. You can add more subjects now or later.
                                    </p>
                                </div>
                                <div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="subject"
                                            >
                                                Subject <sup>*</sup>
                                            </label>
                                            <input
                                                type="text"
                                                tabIndex="0"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="First Name"
                                                placeholder="Subject Name"
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="lastName"
                                            >
                                                Proficiency
                                            </label>
                                            <select
                                                type="text"
                                                tabIndex="0"
                                                value={level}
                                                onChange={(e) => setLevel(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="education"
                                            >
                                                <option hidden value="Select Education">
                                                    Select level
                                                </option>
                                                <option value="Basic">Basic</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center lg:ml-24 lg:mt-2 mt-4 gap-1 text-indigo-700 border border-gray-300 rounded-full px-4 py-2 text-xs w-32 cursor-pointer hover:bg-indigo-700 hover:bg-opacity-20">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Add Subject
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex items-center justify-between w-11/12 py-4 border-t">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="transition float-left duration-200 bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                <span className="inline-block ml-2">Back</span>
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="transition float-right duration-200 bg-[#525fe1] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="sm:relative md:static">
                        <div className="xl:px-24">
                            <div className="mt-16 lg:flex pb-16">
                                <div className="w-80">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl font-medium pr-2 leading-7 text-gray-800" style={{ fontFamily: 'Alkatra' }}>
                                            Good! Now let add your availability time
                                        </h1>
                                    </div>
                                    <p className="mt-4 text-sm leading-5 text-gray-600" style={{ fontFamily: 'Edu NSW ACT Foundation' }}>
                                        It will help us to show that profiles which follows your availibility time.
                                    </p>
                                </div>
                                <div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="review"
                                            >
                                                Your Review <sup>*</sup>
                                            </label>
                                            <textarea
                                                rows="10"
                                                cols="100"
                                                type="text"
                                                tabIndex="0"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="review"
                                                placeholder="Enter your top skills and experience. This will help students get to know you."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex items-center justify-between w-11/12 py-4 border-t">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="transition float-left duration-200 bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                <span className="inline-block ml-2">Back</span>
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="transition float-right duration-200 bg-[#525fe1] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="sm:relative md:static">
                        <div className="xl:px-24">
                            <div className="mt-16 lg:flex pb-16">
                                <div className="w-80">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl font-medium pr-2 leading-7 text-gray-800" style={{ fontFamily: 'Alkatra' }}>
                                            Great! Now write a bio to tell the world about yourself.
                                        </h1>
                                    </div>
                                    <p className="mt-4 text-sm leading-5 text-gray-600" style={{ fontFamily: 'Edu NSW ACT Foundation' }}>
                                        Help Students get to know you at a glance. Which Subject are you best at? You can always edit later - just make sure you proofread now!
                                    </p>
                                </div>
                                <div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="Availibility"
                                            >
                                                Availibility <sup>*</sup>
                                            </label>
                                            <input
                                                type="time"
                                                tabIndex="0"
                                                value={openingTime}
                                                onChange={(e) => setOpeningTime(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="Availibility"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="md:w-64 md:ml-12 md:mt-2 mt-4">
                                            <input
                                                type="time"
                                                tabIndex="0"
                                                value={closingTime}
                                                onChange={(e) => setClosingTime(e.target.value)}
                                                className="w-full p-3 md:mt-4 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:flex items-center lg:ml-24 lg:mt-2 mt-4">
                                        <div className="md:w-64">
                                            <label
                                                className="text-sm leading-none text-black font-medium" style={{ letterSpacing: '0.33px' }}
                                                id="allowedTime"
                                            >
                                                Max allowed time <sup>*</sup>
                                            </label>
                                            <select
                                                tabIndex={0}
                                                value={allowedTime}
                                                onChange={(e) => setAllowedTime(e.target.value)}
                                                className="w-full p-3 mt-1 bg-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                                aria-labelledby="allowedTime"
                                            >
                                                <option value="30 minutes">30 minutes</option>
                                                <option value="1 hour">1 hour</option>
                                                <option value="2 hours">2 hours</option>
                                                <option value="3 hours">3 hours</option>
                                                <option value="4 hours">4 hours</option>
                                                <option value="5 hours">5 hours</option>
                                                <option value="6 hours">6 hours</option>
                                                <option value="7 hours">7 hours</option>
                                                <option value="8 hours">8 hours</option>
                                                <option value="9 hours">9 hours</option>
                                                <option value="10 hours">10 hours</option>
                                                <option value="11 hours">11 hours</option>
                                                <option value="12 hours">12 hours</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex items-center justify-between w-11/12 py-4 border-t">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="transition float-left duration-200 bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                <span className="inline-block ml-2">Back</span>
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="transition float-right duration-200 bg-[#525fe1] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="sm:relative md:static">
                        <div className="xl:px-24">
                            <div className="mt-16 lg:flex justify-between pb-16">
                                <div className="w-80">
                                    <div className="flex items-center">
                                        <h1 className="text-2xl font-medium pr-2 leading-7 text-gray-800" style={{ fontFamily: 'Alkatra' }}>
                                            Select your plan
                                        </h1>
                                    </div>
                                    <p className="mt-4 text-sm leading-5 text-gray-600" style={{ fontFamily: 'Edu NSW ACT Foundation' }}>
                                        Choose the plan that works for you. You can always change it
                                        later.
                                    </p>
                                </div>
                                <section className="dark:bg-gray-800">
                                    <div className="container px-6 mx-auto">
                                        <div className="grid gap-4 -mx-6 grid-cols-4">
                                            <div
                                                className={`px-6 py-4 col-span-2 cursor-pointer transition-colors duration-200 transform rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${pricing === 1
                                                    ? "border-2 border-indigo-700"
                                                    : "border-2"
                                                    }`}
                                                onClick={() => setPricing(1)}
                                            >
                                                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                                    Free
                                                </p>
                                                <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
                                                    ₹0{" "}
                                                    <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                                                        / Month
                                                    </span>
                                                </h4>
                                                <p className="mt-4 text-gray-500 dark:text-gray-300">
                                                    For most businesses that want to optimaize web
                                                    queries.
                                                </p>

                                                <div className="mt-8 space-y-6">
                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            All limited links
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Own analytics platform
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Chat support
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Optimize hashtags
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Unlimited users
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={`px-6 py-4 col-span-2 cursor-pointer transition-colors duration-200 transform rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${pricing === 2
                                                    ? "border-2 border-indigo-700"
                                                    : "border-2"
                                                    }`}
                                                onClick={() => setPricing(2)}
                                            >
                                                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                                    Base
                                                </p>
                                                <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
                                                    ₹99{" "}
                                                    <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                                                        / Month
                                                    </span>
                                                </h4>
                                                <p className="mt-4 text-gray-500 dark:text-gray-300">
                                                    For most businesses that want to optimaize web
                                                    queries.
                                                </p>

                                                <div className="mt-8 space-y-6">
                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            All limited links
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Own analytics platform
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Chat support
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Optimize hashtags
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 text-blue-500"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>

                                                        <span className="mx-4 text-gray-700 dark:text-gray-300">
                                                            Unlimited users
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex items-center justify-between w-11/12 py-4 border-t">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="transition float-left duration-200 bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                <span className="inline-block ml-2">Back</span>
                            </button>
                            <button
                                type="button"
                                onClick={submit}
                                className="transition float-right duration-200 bg-[#525fe1] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-24 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Submit</span>
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div>{error && (
            <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute z-10 top-5 left-5 mb-4"
                role="alert"
            >
                <strong className="font-bold">Error! {" "}</strong>
                <span className="block sm:inline">Please fill all records.</span>
                <span onClick={() => setError(false)} className="top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
                    close
                </span>
            </div>
        )}
            <div className="flex items-center justify-center">
                <div className="w-full px-8">
                    <div className="mt-4 mx-4 text-xs text-indigo-700 bg-indigo-700 bg-opacity-20 px-4 py-2 w-28 rounded-full">
                        {step}/7 Completed
                    </div>
                    {forms(step)}
                </div>
            </div>
        </div>
    )
}
