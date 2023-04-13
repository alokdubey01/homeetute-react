import Navbar from '../../components/Navbar';
import { CheckIcon } from '@heroicons/react/20/solid'
import { Link, Navigate } from "react-router-dom";
import { GoLocation } from 'react-icons/go'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import db from "../../firebase";
import useAuth from '../../HOC/AuthContext';

export default function Home() {
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
  const [isSave, setIsSave] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    // fetching data from firestore v9
    //   const fetchData = async () => {
    //     const db = getFirestore();
    //     const data = await getDocs(collection(db, "tutors"));
    //     setData(data.docs.map(doc => doc.data()));
    //   }
    //   fetchData();

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

  return (
    <div className="h-full">
      <Navbar />
      <div className="bg-white background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8">
          <div className="mx-auto lg:mx-0 lg:flex lg:max-w-none">
            <div>
              <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                  <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
              </form>
              <div className="border rounded mt-2">
                {jobs.map((user) => (
                  <div className="p-2 sm:p-4">
                    <div className="w-full dark:bg-gray-900 py-2">
                      <div className="container mx-auto px-12 flex cursor-default items-start justify-center">
                        <div className="w-full">
                          <div className="flex flex-col lg:flex-col mx-auto w-full dark:bg-gray-800 rounded">
                            <div className="w-full p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded">
                                    <img className="w-full h-full overflow-hidden object-cover rounded" src={user.image} alt="logo" />
                                  </div>
                                  <div className="ml-3">
                                    <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">{user.firstName}</h5>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold">{user.location}</p>
                                  </div>
                                </div>
                                <div className='flex items-center'>
                                  {isSave ? (<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsSave(!isSave)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                  </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsSave(!isSave)} viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                  </svg>)}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-4 items-center">
                                <p className="text-xs text-gray-600">{user.budget}</p> <div className="h-1 w-1 bg-gray-300 rounded-full" />
                                <p className="text-xs text-gray-600">{user.class} <sup>th</sup></p> <div className="h-1 w-1 bg-gray-300 rounded-full" />
                                <p className="text-xs text-gray-600">{user.estBudget}</p> <div className="h-1 w-1 bg-gray-300 rounded-full" />
                                <p className="text-xs text-gray-600">{user.posted}</p>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 tracking-normal text-sm font-normal mt-2">{user.description}</p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                  <h1 className="text-sm text-gray-700">Proposals:</h1>
                                  <p className="text-sm text-indigo-700">{user.proposals}</p>
                                </div>
                                <button type="submit" className="text-xs text-center w-1/4 bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">Apply Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
              <div className="rounded-2xl py-4 text-center ring-1 ring-inset ring-gray-200 lg:flex lg:flex-col lg:justify-center">
                <div className="mx-auto max-w-xs px-8">
                  <div className="up-card mt-0 py-0">
                    <section id="fwh-sidebar-profile" data-test="freelancer-sidebar-profile" className="up-card-section">
                      <Link href="/profile" className="d-flex flex-column align-items-center">
                        {loading ? <div className="animate-pulse">
                          <div className="rounded-full w-20 h-20 mx-auto bg-gray-300"></div>
                        </div> : <img src={data.image} className="rounded-full w-20 h-20 mx-auto object-cover" alt={data.firstName} />}
                      </Link>
                      <div className="text-center">
                        <h3 className="mt-2 text-decoration-underline">
                          {loading ? <div className="animate-pulse">
                            <div className="rounded-full w-1/2 h-1 mx-auto bg-gray-300"></div>
                          </div> : <Link href="/profile" className="underline text-base">
                            {data.firstName} {data.lastName}
                          </Link>}
                        </h3>
                        <p className="mt-1 mb-0 text-sm text-gray-600 flex items-center justify-center text-center gap-1">
                          <GoLocation /> <div>
                            {loading ? <div className="animate-pulse">
                              <div className="rounded-full w-full h-1 mx-auto bg-gray-300"></div>
                            </div> : <span>
                              {data.city}, {data.state}
                            </span>}
                          </div>
                        </p>
                      </div>
                    </section>
                    <div>
                      <section data-test="profile-completeness-nudges" className="justify-start mt-4">
                        <div className="justify-start text-xs"><div><a href="javascript:" rel="noopener noreferrer" data-ev-unique_element_id="t-cfeui_qp_ProfileCompleteness_10" className="flex text-left">
                          Profile Completeness:
                        </a>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-full h-1.5 bg-blue-200 rounded-full">
                              <div className="w-5/6 h-full text-center text-xs text-white bg-blue-600 rounded-full">
                              </div>
                            </div>
                            <span className="text-xs">
                              90%
                            </span>
                          </div>
                        </div>
                        </div>
                        <div className="flex flex-column mt-4">
                          <div>
                            <div className="text-left text-xs">
                              What at next to fill detail...
                            </div>
                            <div className="mt-2 carousel-wrapper">
                              <div data-qa="carousel" className="up-carousel advancing">
                                <div data-qa="carousel-slide" className="bg-indigo-100 py-2 px-2">
                                  <small className="text-muted font-normal">
                                    Add a&nbsp;portfolio to&nbsp;show clients what you can&nbsp;do (+%).
                                    <a href="/freelancers//?qpn-profile-completeness=portfolio" rel="noopener noreferrer" data-ev-unique_element_id="auto-actionalternativeShortCta" className="m-0 p-0">
                                      Add a&nbsp;portfolio
                                    </a>
                                  </small>
                                </div>
                              </div>
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
                          <div className="text-left text-xs">
                            Tution Fee
                          </div>
                          <div className="text-left text-xs">
                            500rs. / month
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
