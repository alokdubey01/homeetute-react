import React, {useRef} from "react";
import useAuth from '../HOC/AuthContext'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import { collection, doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { useParams } from 'react-router-dom';

export default function Profile() {
  let form = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form_data = new FormData(form.current);
    let payload = {};
    form_data.forEach(function (value, key) {
      payload[key] = value;
    });
  };
  return (
    <>
          <div className="container md:px-12 md:py-12 px-4 py-4">
        <div className="md:grid md:grid-cols-6">
          <div className="md:col-span-4">
            <div
              className="bg-gray-200 h-48 rounded-t-md"
              style={{
                backgroundImage:
                  "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )",
              }}
            ></div>

            <div className="bg-white p-4">
              <div className="flex items-center p-4 rounded-b-md">
                {/* <img
                  src={data.image}
                  className="rounded-full h-32 w-32 -mt-20 border-4 border-white"
                  alt={data.firstName}
                /> */}
                <div className="flex justify-end w-full">
                  <div className="flex cursor-pointer">
                    <BsThreeDotsVertical className="h-5 w-5 text-gray-500 -mt-8" />
                    {/* <div className="bg-white shadow-md relative">
                    <span className="absolute top-0 left-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 ml-6"></span>
                      <div>
                        <ul className="bg-white shadow-md rounded-lg py-2">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Profile</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete Profile</li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="px-4">
                {/* <h1 className="text-xl font-semibold capitalize">{data.firstName} {data.lastName}</h1> */}
                <div className="text-sm leading-8 gap-1 text-gray-600 flex items-center">
                  <IoLocationOutline className="text-gray-600" />
                  {/* {data.area}, {data.city} */}
                </div>
                <div className="text-sm flex">
                  <div className="flex items-center">
                    <h1 className="font-semibold text-xs">4.5</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="gold"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gold"
                      className="w-3 h-3 m-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <div className="h-1 w-1 bg-slate-300 rounded-full ml-1 mt-0.5" />
                    <p className="ml-1 text-xs">24 Reviews</p>
                  </div>
                </div>
                <p className="text-sm mt-1 font-medium text-gray-600">
                  4 years of experience
                </p>
                <div className="flex gap-2 my-2">
                  <div className="border-2 border-gray-300 px-6 py-1 rounded-lg text-sm font-medium cursor-pointer">
                    Message
                  </div>
                  <div className="bg-yellow-500 flex items-center gap-1 w-auto py-1 px-2 rounded-lg font-medium text-sm cursor-pointer">
                    <IoMdShareAlt /> Share Profile
                  </div>
                  {/* <button onClick={getallData}>Get data</button> */}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 mt-4">
              <h1 className="text-lg font-semibold text-indigo-700">Skills</h1>
              <div className="flex flex-wrap mt-2">
                {/* {skills.map((skill) => (
                  <div className="border border-gray-200 rounded-lg py-1 px-2 text-sm m-1">
                    {skill.name}
                  </div>
                ))} */}
              </div>
            </div>

            <div className="bg-white p-4 mt-4">
              <h1 className="text-lg font-semibold text-indigo-700">
                About me
              </h1>
              <div className="text-sm mt-2 mr-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
                id sit quia ullam libero adipisci repudiandae provident, fugiat,
                pariatur optio perferendis laboriosam incidunt possimus tenetur
                cum quod voluptatum molestiae nihil earum cumque, ab modi!
                Repellendus similique facere amet doloremque, quo unde
                exercitationem qui cupiditate ut optio ab dolor ipsa sed
                expedita, tempora quidem quaerat, hic quia molestiae explicabo.
                Hic, neque.
              </div>
            </div>

            <div className="bg-white p-4 mt-4">
              <h1 className="text-lg font-semibold text-indigo-700">
                Education
              </h1>
              <div className="text-sm mt-2 mr-4">
                <ul>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-gray-500 rounded-full" />
                    <div className="flex flex-col">
                      <span className="font-semibold">B.Tech</span>
                      <span className="text-gray-500">2016 - 2020</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 mt-4">
              <h1 className="text-lg font-semibold text-indigo-700">Reviews</h1>
              <div className="text-sm mt-2 mr-4">
                {/* {ratings.map((rating) => (
                  <div className="flex items-center mt-4 justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src="https://images.unsplash.com/photo-1629783509182-68c8c190e952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWxkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <h1 className="font-semibold">{rating.name}</h1>
                          <p className="text-xs text-gray-500 m-1">
                            12:32 PM, 23 Nov 2022
                          </p>
                        </div>
                        <div>
                          <p className="text-xs">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quod.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-end">
                        <h1>4.5</h1>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="gold"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gold"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
          <div className="col-span-2 -mt-6 ml-16">
            <div className="flex items-center justify-center p-6">
              <div className="flex flex-col shadow-sm bg-white divide-y rounded-lg flex-none w-full">
                <div className="flex flex-col space-y-2">
                  <h1 className="px-4 py-2 capitalize text-lg font-bold">
                    similier profile
                  </h1>

                  <div className="px-4">
                    <div className="flex relative -space-x-4 overflow-hidden">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="inline-block font-semibold justify-center items-center p-2 absolute left-16 h-10 w-10 rounded-full bg-white opacity-70">
                        +3
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mt-2 font-semibold">
                        Rahul Dravin, Khusi, and 3 others
                      </div>
                      <span className="text-gray-400 text-sm font-normal">
                        Top English tutors in your city
                      </span>
                    </div>
                  </div>
                  <div className="border border-gray-100" />
                  <div className="px-4">
                    <div className="flex relative -space-x-4 overflow-hidden">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="inline-block font-semibold justify-center items-center p-2 absolute left-16 h-10 w-10 rounded-full bg-white opacity-70">
                        +3
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mt-2 font-semibold">
                        Rahul Dravin, Khusi, and 3 others
                      </div>
                      <span className="text-gray-400 text-sm font-normal">
                        Top English tutors in your city
                      </span>
                    </div>
                  </div>
                  <div className="border border-gray-100" />
                  <div className="px-4">
                    <div className="flex relative -space-x-4 overflow-hidden">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="inline-block font-semibold justify-center items-center p-2 absolute left-16 h-10 w-10 rounded-full bg-white opacity-70">
                        +3
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mt-2 font-semibold">
                        Rahul Dravin, Khusi, and 3 others
                      </div>
                      <span className="text-gray-400 text-sm font-normal">
                        Top English tutors in your city 
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full border p-2 rounded-md hover:opacity-60 transition">
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>






      <form id="login" onSubmit={handleSubmit}>
      <div className="bg-white dark:bg-gray-800">
        <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
          <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
            <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
              <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Profile</p>
              <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                  <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
              <div className="rounded relative mt-8 h-48">
                <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg" alt className="w-full h-full object-cover rounded absolute shadow" />
                <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                  <p className="text-xs text-gray-100">Change Cover Photo</p>
                  <div className="ml-2 text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1={16} y1={5} x2={19} y2={8} />
                    </svg>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                  <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg" alt className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />
                  <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                  <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1={16} y1={5} x2={19} y2={8} />
                    </svg>
                    <p className="text-xs text-gray-100">Edit Picture</p>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                <label htmlFor="username" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  Username
                </label>
                <input type="text" id="username" name="username" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="@example" />
              </div>
              <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  About
                </label>
                <textarea id="about" name="about" required className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Let the world know who you are" rows={5} defaultValue={""} />
                <p className="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400">Character Limit: 200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
          <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
            <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
              <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Personal Information</p>
              <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                  <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mx-auto pt-4">
            <div className="container mx-auto">
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  First Name
                </label>
                <input type="text" id="FirstName" name="firstName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  Last Name
                </label>
                <input type="text" id="LastName" name="lastName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  Email
                </label>
                <div className="border border-green-400 shadow-sm rounded flex">
                  <div className="px-4 py-3 dark:text-gray-100 flex items-center border-r border-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <rect x={3} y={5} width={18} height={14} rx={2} />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                  </div>
                  <input type="text" id="Email" name="email" required className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="example@gmail.com" />
                </div>
                <div className="flex justify-between items-center pt-1 text-green-400">
                  <p className="text-xs">Email submission success!</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                              0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                      stroke="currentColor"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  Street Address
                </label>
                <input type="text" id="StreetAddress" name="streetAddress" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  City
                </label>
                <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                  <input type="text" id="City" name="city" required className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Los Angeles" />
                  <div className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="6 15 12 9 18 15" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="State/Province" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  State/Province
                </label>
                <input type="text" id="State/Province" name="state" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="California" />
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  Country
                </label>
                <input type="text" id="Country" name="country" required className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="United States" />
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <div className="flex items-center pb-2">
                  <label htmlFor="ZIP" className="text-sm font-bold text-gray-800 dark:text-gray-100">
                    ZIP/Postal Code
                  </label>
                  <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                      <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <input type="text" name="zip" required id="ZIP" className="bg-transparent border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder={86745} />
                <div className="flex justify-between items-center pt-1 text-red-400">
                  <p className="text-xs">Incorrect Zip Code</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                    <circle cx={12} cy={12} r={10} />
                    <line x1={15} y1={9} x2={9} y2={15} />
                    <line x1={9} y1={9} x2={15} y2={15} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-10 rounded bg-gray-100 dark:bg-gray-700 w-11/12 xl:w-full">
          <div className="xl:w-full py-5 px-8">
            <div className="flex items-center mx-auto">
              <div className="container mx-auto">
                <div className="mx-auto xl:w-full">
                  <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Alerts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pt-1">Get updates of any new activity or features. Turn on/off your preferences</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto pb-6">
            <div className="flex items-center pb-4 border-b border-gray-300 dark:border-gray-700 px-8 text-gray-800 dark:text-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x={3} y={5} width={18} height={14} rx={2} />
                <polyline points="3 7 12 13 21 7" />
              </svg>
              <p className="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">Via Email</p>
            </div>
            <div className="px-8">
              <div className="flex justify-between items-center mb-8 mt-4">
                <div className="w-9/12">
                  <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                  <input type="checkbox" name="email_comments" id="toggle1" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                  <label htmlFor="toggle1" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <div className="w-9/12">
                  <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Job Applications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                  <input type="checkbox" name="email_job_application" id="toggle2" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                  <label htmlFor="toggle2" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <div className="w-9/12">
                  <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Product Updates</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                  <input type="checkbox" name="email_product_update" id="toggle3" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                  <label htmlFor="toggle3" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="pb-4 border-b border-gray-300 dark:border-gray-700 px-8">
              <div className="flex items-center text-gray-800 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <p className="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">Push Notifications</p>
              </div>
            </div>
            <div className="px-8">
              <div className="flex justify-between items-center mb-8 mt-4">
                <div className="w-9/12">
                  <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Comments</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                  <input type="checkbox" name="notification_comment" id="toggle4" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                  <label htmlFor="toggle4" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <div className="w-9/12">
                  <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Job Applications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                  <input type="checkbox" name="notification_application" id="toggle5" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                  <label htmlFor="toggle5" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <div className="w-9/12">
                  <p className="text-sm text-gray-800 dark:text-gray-100 pb-1">Product Updates</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                  <input type="checkbox" name="notification_updates" id="toggle6" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                  <label htmlFor="toggle6" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-11/12 xl:w-full">
          <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
            <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">Cancel</button>
            <button className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};
