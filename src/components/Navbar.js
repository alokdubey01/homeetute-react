import React from 'react'
import { Fragment, useState, useEffect, useRef } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
  Tab
} from "@headlessui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import db from '../firebase'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { getDoc, doc } from "firebase/firestore";
import HomeeTuteLogo from "../images/homeetute.svg"
import useAuth from '../HOC/AuthContext';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

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

const navigation = {
  categories: [
    {
      id: 'Subjects',
      name: 'Subjects',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [msg, setMsg] = useState(true)
  const [selected, setSelected] = useState(0);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(false);
  const [name, setName] = useState("")
  const [picture, setPicture] = useState("");
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null);
  const { user, logout } = useAuth()

  useEffect(() => {
    if (user) {
      setIsAuthenticate(true);
      const getUser = async () => {
        await getDoc(doc(db, "students", user.uid))
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
        <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-bold'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-6 w-auto mt-0.5"
                    src={HomeeTuteLogo}
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm transition-colors font-semibold duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
      {/* <header className="bg-transparent">
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
                  Courses
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

            <Link href="/" className="text-sm leading-6 font-medium text-gray-900">
              Special for Kids
            </Link>
            <Link href="/" className="text-sm leading-6 font-medium text-gray-900">
              How it Works
            </Link>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex focus:outline-none border-none outline-none rounded-md text-sm font-medium text-black">
                  More
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
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6">
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
                      {loading ? (<div className="animate-pulse">
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
                            tabIndex="-1"
                            role="menuitem"
                            className={`${active ? "bg-blue-gray-50 text-blue-gray-900" : "text-blue-gray-700"
                              } flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                              My Profile
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            tabIndex="-1"
                            role="menuitem"
                            className={`${active ? "bg-blue-gray-50 text-blue-gray-900" : "text-blue-gray-700"
                              } flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                              ></path>
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                              Edit Profile
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            tabIndex="-1"
                            role="menuitem"
                            className={`${active ? "bg-blue-gray-50 text-blue-gray-900" : "text-blue-gray-700"
                              } flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                              ></path>
                            </svg>
                            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                              Inbox
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            tabIndex="-1"
                            onClick={() => logout()}
                            role="menuitem"
                            className={`${active ? "bg-blue-gray-50 text-blue-gray-900" : "text-blue-gray-700"
                              } flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                              ></path>
                            </svg>
                            <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                              Sign Out
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="text-sm cursor-pointer leading-6 text-gray-900 bg-[#ffcf59] rounded-full py-1 px-3 hover:text-gray-900 hover:bg-yellow-300"
              >
                Log in
              </Link>
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
                          Courses
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
                    Courses for Kids
                  </Link>
                  <a
                    href="/"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-indigo-700 hover:bg-gray-50"
                  >
                    Company
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
      </header> */}
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
