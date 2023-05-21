import React from 'react'
import Navbar from '../components/Navbar'
import useAuth from '../HOC/AuthContext'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import { collection, doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { useParams } from 'react-router-dom';

const skills = [
  {
    id: 1,
    name: "Mathematics",
  },
  {
    id: 2,
    name: "Science",
  },
  {
    id: 3,
    name: "English",
  },
  {
    id: 4,
    name: "Hindi",
  },
  {
    id: 5,
    name: "Social Science",
  },
];

const ratings = [
  {
    id: 1,
    name: "Monika Dubey",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Kisan Nagar",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Rajesh Singh",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Akash Rajput",
    rating: 5,
  },
  {
    id: 5,
    name: "Khushi Sharma",
    rating: 4,
  },
];

export default function Profile() {
  const [data, setData] = React.useState([])
  const [uid, setUid] = React.useState()
  
  const { user } = useAuth();
  const { id } = useParams();

  React.useEffect(() => {
    setUid(id)
    const getData = async () => {
      await getDoc(doc(db, "teachers", uid)).then((doc) => {
        if (doc.exists()) {
          setData({ ...doc.data() });
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      }
      )};
    getData();
  }, [uid]);

  return (
    <div>
      <Navbar />
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
                <img
                  src={data.image}
                  className="rounded-full h-32 w-32 -mt-20 border-4 border-white"
                  alt={data.firstName}
                />
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
                <h1 className="text-xl font-semibold capitalize">{data.firstName} {data.lastName}</h1>
                <div className="text-sm leading-8 gap-1 text-gray-600 flex items-center">
                  <IoLocationOutline className="text-gray-600" />
                  {data.area}, {data.city}
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
                {skills.map((skill) => (
                  <div className="border border-gray-200 rounded-lg py-1 px-2 text-sm m-1">
                    {skill.name}
                  </div>
                ))}
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
                {ratings.map((rating) => (
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
                ))}
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
    </div>
  )
}
