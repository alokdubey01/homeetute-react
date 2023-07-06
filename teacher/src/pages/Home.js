import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import db from '../firebase'
import useAuth from '../HOC/AuthContext'
import ProposalsLoading from '../components/loading/ProposalsLoading'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [data, setData] = useState([]) //array of user data
  const [post, setPost] = useState([]) //array of proposals
  const [student, setStudent] = useState([]) //array of students
  const [proposals, setProposals] = useState([]) //array of submitted proposals
  const [uids, setUids] = useState([]) //array of uids of posts
  const [studentData, setStudentdata] = useState([]) //array of student data
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()

  useEffect(() => {
    // getting the data from teachers collection in firebase firestore v9
    const getData = async () => {
      await getDoc(doc(db, "teachers", user.uid))
        .then((res) => {
          setData(res.data())
          console.log("Teacher data", res.data())
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // getting the propals from firebase firestore v9 subcollection where id should be same
    const getProposals = async () => {
      const q = query(collection(db, "teachers", user.uid, "myProposals"))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setProposals(data)
      console.log("Sent proposals", data)
    }

    const getPosts = async () => {
      // getting data from firebase firestore v9
      const q = query(collection(db, "posts"))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      // filtering the data from post array which is not in proposals array with the help of id
      const filteredData = data.filter((post) => !proposals.find((proposal) => proposal.id === post.id))

      setPost(filteredData)
      setLoading(false)
      // setPost(data)
    }

    const getpostUid = async () => {
      // store uids of posts in array
      const q = query(collection(db, "posts"))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map(doc => (doc.id))
      console.log(data)
      setUids(data)
    }

    getData()
    getProposals()
    getPosts()
    getpostUid()
  }, [])

  useEffect(() => {
    if (uids.length > 0) {
      // get data from firebase firestore v9 when document id is in uids array
      const q = query(collection(db, "students"), where('__name__', 'in', uids))
      onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        console.log("The all post data", data)
        // append the data to post array with the help of id
        const updatedPost = post.map((post) => {
          const dataObj = data.find((data) => data.id === post.id)
          return { ...post, ...dataObj }
        }
        )
        setPost(updatedPost)
      })
    } else {
      console.log('No data')
    }
  }, [uids])

  useEffect(() => {
    console.log("post data : ", post)
  }, [post])

  const proposal = async (event, param) => {
    console.log(param)
    const docRef = doc(db, "posts", param)
    const colRef = collection(docRef, "proposals")
    const payload = {
      uid: user.uid,
      name: user.firstName + ' ' + user.lastName,
      status: 'pending'
    }
    await addDoc(colRef, payload)
      .then((res) => {
        console.log(res)
        console.log('Proposal sent')
      })
      .catch((err) => {
        console.log(err)
      })

    // disable button after sending proposal for already sent proposals
    event.target.disabled = true
    event.target.classList.remove('bg-indigo-700')
    event.target.classList.add('bg-slate-400')
    event.target.innerHTML = 'Proposal Sent'

    // remove post from list after sending proposal
    // const newPost = post.filter((post) => post.id !== param)
    // setPost(newPost)

    // add post to proposal list after sending proposal in firebase firestore v9 but document id is not same as post id
    const docRef2 = doc(db, "teachers", user.uid, "myProposals", param)
    const payload2 = {
      uid: user.uid,
      name: user.firstName + ' ' + user.lastName,
      status: 'pending'
    }
    await setDoc(docRef2, payload2)
      .then((res) => {
        console.log(res)
        console.log('Proposal sent')
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const card = post.map((post) => {
    return (
      <div className="bg-white rounded-lg my-2 md:mx-auto max-w-md md:max-w-2xl relative">
        {/* <button type="button" className='bg-indigo-700 text-sm w-32 text-white rounded-2xl px-3 py-1 absolute top-5 right-5'>Send Proposal</button> */}
        <div className="text-gray-600 body-font">
          <div className="container px-1 mx-auto">
            <div className="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h1 className="text-black text-lg title-font font-bold mb-2">{post.title}</h1>
                <p className="leading-relaxed text-sm">{post.description}</p>
                <div className="mt-4 md:flex font-bold text-gray-800">
                  <div className="w-full flex flex-wrap space-x-3 justify-between">
                    <div>
                      <h2 className="text-sm text-indigo-600">Class</h2>
                      <p className='text-sm'>{post.standard}</p>
                    </div>
                    <div>
                      <h2 className="text-sm text-indigo-600">Subject</h2>
                      <div className='flex gap-x-1'>
                        {post.subject.map((index, sub) => (
                          <p className='text-sm'>{sub.title}</p>
                          // <p key={index} className='text-sm'>{(index ? ',' : '') + sub.title}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-sm text-indigo-600">Location</h2>
                      <p className='text-sm'>{post.city}</p>
                    </div>
                    {/* <div>
                      <h2 className="text-sm text-indigo-600">Fee</h2>
                      <p className='text-sm'>₹ 5000 / month</p>
                    </div> */}
                    {/* <div>
                      <h2 className="text-sm text-indigo-600">Duration</h2>
                      <p className='text-sm'>1 Month</p>
                    </div> */}
                    {/* <div>
                      <h2 className="text-sm text-indigo-600">Classes</h2>
                      <p className='text-sm'>5 Days a week</p>
                    </div> */}
                    <div>
                      <h2 className="text-sm text-indigo-600">Timings</h2>
                      <p className='text-sm'>{post.time1} - {post.time2}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <a href="/">
                        <img className="rounded-full w-8" src={post.image} alt="hagnerd profile" loading="lazy" />
                      </a>
                      <div>
                        <a href="/" className="text-sm font-semibold text-gray-700 text-sm hover:text-black">{post.firstName} {" "} {post.lastName}</a>
                        <a href="/" className="text-xs text-gray-600 hover:text-black">
                          <p>{post.city}</p>
                        </a>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button className='px-6 py-2 bg-gray-200 rounded-full text-sm font-semibold hover:bg-gray-300' type="button">Save</button>
                      <button className='px-4 py-2 bg-indigo-700 text-white rounded-full text-sm font-semibold hover:bg-indigo-800 disabled:bg-slate-400' type="button" onClick={event => proposal(event, post.id)}>Send Proposal</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='bg-gray-100'>
      <Navbar />
      <div className='grid grid-flow-row grid-cols-10 gap-4 justify-between pt-16'>
        <div className='col-span-2 bg-white w-full px-4'>
          <header className="text-black py-4 h-auto relative">
            <div>
              <div className="fixed h-full">
                <nav className="mt-5 px-2">
                  <a href="/" className="mt-1 group flex items-center px-6 py-2 text-base leading-6 font-semibold rounded-full bg-slate-100 text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6 " stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"></path>
                    </svg>
                    Home
                  </a>
                  <a href="/" className="mt-1 group flex items-center px-6 py-2 text-base leading-6 font-medium rounded-full hover:text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Proposals
                  </a>
                  <a href="/" className="mt-1 group flex items-center px-6 py-2 text-base leading-6 font-medium rounded-full hover:text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                      </path>
                    </svg>
                    Notifications
                  </a>
                  <a href="/" className="mt-1 group flex items-center px-6 py-2 text-base leading-6 font-medium rounded-full hover:text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                      </path>
                    </svg>
                    Messages
                  </a>
                  <a href="/" className="mt-1 group flex items-center px-6 py-2 text-base leading-6 font-medium rounded-full hover:text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Proposals
                  </a>
                  <a href="/" className="mt-1 group flex items-center px-6 py-2 text-base leading-6 font-medium rounded-full hover:text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                    Assessments
                  </a>
                  <a href="/" className="group flex items-center px-6 py-2 text-base leading-6 font-medium rounded-full hover:text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profile
                  </a>
                  <a href="/" className="mt-1 group flex items-center px-6 py-2 text-base leading-6 font-medium rounded-full hover:text-indigo-600">
                    <svg className="mr-4 ml-2 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    More
                  </a>

                  {/* <button className="bg-blue-400 hover:bg-blue-500 w-full mt-5 text-white font-bold py-2 px-4 rounded-full">
                    Tweet
                  </button> */}
                </nav>
              </div>
            </div>
          </header>
        </div>
        <div className='col-span-5 rounded-lg py-6'>
          <div className="flex items-center mx-auto bg-white rounded-lg">
            <div className="w-full">
              <input type="search" className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none" placeholder="search subject" />
            </div>
            {/* <div className="bg-white">
              <div>
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                  <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                      <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                          <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button
                              type="button"
                              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                              onClick={() => setMobileFiltersOpen(false)}
                            >
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>

                          <form className="mt-4 border-t border-gray-200">
                            <h3 className="sr-only">Categories</h3>
                            <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                              {subCategories.map((category) => (
                                <li key={category.name}>
                                  <a href={category.href} className="block px-2 py-3">
                                    {category.name}
                                  </a>
                                </li>
                              ))}
                            </ul>

                            {filters.map((section) => (
                              <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                {({ open }) => (
                                  <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                      <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">{section.name}</span>
                                        <span className="ml-6 flex items-center">
                                          {open ? (
                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                          ) : (
                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                          )}
                                        </span>
                                      </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                      <div className="space-y-6">
                                        {section.options.map((option, optionIdx) => (
                                          <div key={option.value} className="flex items-center">
                                            <input
                                              id={`filter-mobile-${section.id}-${optionIdx}`}
                                              name={`${section.id}[]`}
                                              defaultValue={option.value}
                                              type="checkbox"
                                              defaultChecked={option.checked}
                                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                              className="ml-3 min-w-0 flex-1 text-gray-500"
                                            >
                                              {option.label}
                                            </label>
                                          </div>
                                        ))}
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ))}
                          </form>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                    <div className="flex items-center">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sort
                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {sortOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                  {({ active }) => (
                                    <a
                                      href={option.href}
                                      className={classNames(
                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      {option.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                        <span className="sr-only">View grid</span>
                        <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                      >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </main>
              </div>
            </div> */}
          </div>
          {loading ? (
          <>
          <div className="bg-white rounded-lg my-2 md:mx-auto max-w-md md:max-w-2xl relative">
              <div className="text-gray-600 body-font">
                <div className="container px-1 mx-auto">
                  <div className="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-3 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-8 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className='flex items-center'>
                                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div className='inline ml-1'>
                                  <div className="h-2 bg-slate-200 rounded w-20"></div>
                                  <div className="h-1.5 bg-slate-200 rounded w-20 mt-2"></div>
                                </div>
                              </div>
                              <div className="flex">
                              <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                              <div className="h-6 w-24 bg-slate-200 rounded-full ml-2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg my-2 md:mx-auto max-w-md md:max-w-2xl relative">
              <div className="text-gray-600 body-font">
                <div className="container px-1 mx-auto">
                  <div className="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-3 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-8 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className='flex items-center'>
                                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div className='inline ml-1'>
                                  <div className="h-2 bg-slate-200 rounded w-20"></div>
                                  <div className="h-1.5 bg-slate-200 rounded w-20 mt-2"></div>
                                </div>
                              </div>
                              <div className="flex">
                              <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                              <div className="h-6 w-24 bg-slate-200 rounded-full ml-2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg my-2 md:mx-auto max-w-md md:max-w-2xl relative">
              <div className="text-gray-600 body-font">
                <div className="container px-1 mx-auto">
                  <div className="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-3 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-8 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className='flex items-center'>
                                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div className='inline ml-1'>
                                  <div className="h-2 bg-slate-200 rounded w-20"></div>
                                  <div className="h-1.5 bg-slate-200 rounded w-20 mt-2"></div>
                                </div>
                              </div>
                              <div className="flex">
                              <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                              <div className="h-6 w-24 bg-slate-200 rounded-full ml-2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          ) : <div>
            {card}
          </div>}
        </div>

        {/* Teacher Profile */}

        {loading ? (
          <div className='col-span-3 py-6'>
          <div className="w-full flex justify-center items-center relative">
            <div className="h-full mx-4 w-5/6 bg-white pb-4 rounded-xl shadow-md relative sm:w-80 sm:mx-0">
              {/* cover image */}
              <div className='h-32 animate-pulse'>
                <div className="object-cover w-full h-32 rounded-t-xl bg-slate-300" />
              </div>
              <div className="w-full flex flex-col justify-around px-3 relative">
                <div className="absolute animate-pulse -top-10 left-3 mt-2 flex justify-center items-center">
                  {/* profile image */}
                  <div className="object-cover h-16 w-16 rounded-full z-50 bg-slate-200"/>
                </div>
                <div className="animate-pulse flex mt-16 w-1/2">
                        <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                          <div className="">
                            <div className="grid grid-cols-8 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className='flex items-center'>
                                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div className='inline ml-1'>
                                  <div className="h-2 bg-slate-200 rounded w-20"></div>
                                  <div className="h-1.5 bg-slate-200 rounded w-20 mt-2"></div>
                                </div>
                              </div>
                              <div className="flex">
                              <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                              <div className="h-6 w-24 bg-slate-200 rounded-full ml-2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                <div className='mt-4'>
                  <h1 className='text-sm text-gray-800 font-semibold'>Requirements :</h1>
                  <div className='w-full flex items-center justify-between mt-2'>
                    <ul className='text-[14px] font-semibold text-gray-600 grid gap-0.5'>
                      {/* <li>Looking Class</li> */}
                      <li>Subject</li>
                      <li>Location</li>
                      <li>Fee</li>
                      <li>Classes</li>
                      <li>Timings</li>
                    </ul>
                    <ul>
                      {/* <li>-</li> */}
                      <li>-</li>
                      <li>-</li>
                      <li>-</li>
                      <li>-</li>
                      <li>-</li>
                    </ul>
                    <ul className='text-[14px] justify-center text-indigo-700 font-semibold grid gap-0.5'>
                      {/* <li>1 <sup>st</sup> {" - "} 5 <sup>th</sup></li> */}
                      <li>
                        test
                      </li>
                      {/* <li>{data.area}</li> */}
                      <li>₹ 5000</li>
                      <li>5 Days a week</li>
                      <li>{data.openingTime} - {data.closingTime}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div className='col-span-3 py-6'>
          <div className="w-full flex justify-center items-center relative">
            <div className="h-full mx-4 w-5/6 bg-white pb-4 rounded-xl shadow-md relative sm:w-80 sm:mx-0">
              {/* cover image */}
              <div className='h-32'>
                <img className="object-cover w-full h-32 rounded-t-xl" src="https://images.unsplash.com/photo-1685009498451-a32a731b4150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" />
              </div>
              <div className="w-full flex flex-col justify-around px-3 relative">
                <div className="absolute -top-10 left-3 mt-2 flex justify-center items-center">
                  {/* profile image */}
                  <img
                    className="object-cover h-16 w-16 rounded-full z-50"
                    src={data.image}
                    alt=""
                  />
                </div>
                <div className="w-full flex justify-end items-center mt-2">
                  <h1 className="text-gray-400 font-semibold text-xs">{data.plan !== "pro" ? <div>Free</div> : <div>Pro</div>}</h1>
                </div>
                <div className="w-full flex justify-between items-center mt-4">
                  <div>
                    <h1 className="text-gray-800 font-semibold text-base">{data.firstName} {" "} {data.lastName}</h1>
                    <div className='flex items-center gap-1 mt-0.5'>
                      <p className='text-xs text-indigo-500 font-semibold'>{data.city}</p>
                      <div className='h-1 w-1 bg-gray-400 rounded-full' />
                      <p className='text-xs text-gray-500 font-semibold'>{data.degree}</p>
                    </div>
                  </div>
                  <div className='items-center flex gap-1'>
                    <button className='bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600' type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button className='bg-gray-100 p-2 rounded-md' type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className='mt-4'>
                  <h1 className='text-sm text-gray-800 font-semibold'>Requirements :</h1>
                  <div className='w-full flex items-center justify-between mt-2'>
                    <ul className='text-[14px] font-semibold text-gray-600 grid gap-0.5'>
                      {/* <li>Looking Class</li> */}
                      <li>Subject</li>
                      <li>Location</li>
                      <li>Fee</li>
                      <li>Classes</li>
                      <li>Timings</li>
                    </ul>
                    <ul>
                      {/* <li>-</li> */}
                      <li>-</li>
                      <li>-</li>
                      <li>-</li>
                      <li>-</li>
                      <li>-</li>
                    </ul>
                    <ul className='text-[14px] justify-center text-indigo-700 font-semibold grid gap-0.5'>
                      {/* <li>1 <sup>st</sup> {" - "} 5 <sup>th</sup></li> */}
                      <li>
                        test
                      </li>
                      {/* <li>{data.area}</li> */}
                      <li>₹ 5000</li>
                      <li>5 Days a week</li>
                      <li>{data.openingTime} - {data.closingTime}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
