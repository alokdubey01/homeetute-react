import React from 'react'
import Navbar from '../components/Navbar'

export default function Chat() {
    return (
        <div>
            <div className="rounded-lg">
                <div className="border-b-2">
                    <Navbar />
                </div>
                <div className="flex flex-row justify-between bg-white">
                    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto h-[87vh] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                        <div className="border-b-2 py-4 px-2">
                            <form class="flex items-center">
                                <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                                </div>
                                <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                            </form>
                        </div>
                        <div
                            className="flex relative flex-row py-4 px-2 justify-center items-center border-b-2"
                        >
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Luis1994</div>
                                <span className="text-gray-500">Pick me at 9:00 Am</span>
                            </div>
                            <span className='text-gray-500 float-right text-sm absolute top-2 right-2'>12:40 PM</span>
                        </div>
                        <div className="flex relative flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Everest Trip 2021</div>
                                <span className="text-gray-500">Hi Sam, Welcome</span>
                            </div>
                            <span className='text-gray-500 float-right text-sm absolute top-2 right-2'>12:40 PM</span>
                        </div>
                        <div
                            className="flex relative flex-row py-4 px-2 items-center bg-slate-200"
                        >
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">MERN Stack</div>
                                <span className="text-gray-500">Lusi : Thanks Everyone</span>
                            </div>
                            <span className='text-gray-500 float-right text-sm absolute top-2 right-2'>12:40 PM</span>
                        </div>
                        <div className="flex relative flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                <span className="text-gray-500">Evan : some one can fix this</span>
                            </div>
                            <span className='text-gray-500 float-right text-sm absolute top-2 right-2'>12:40 PM</span>
                        </div>
                        <div className="flex relative flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                <span className="text-gray-500">Evan : some one can fix this</span>
                            </div>
                            <span className='text-gray-500 float-right text-sm absolute top-2 right-2'>12:40 PM</span>
                        </div>

                        <div className="flex relative flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                <span className="text-gray-500">Evan : some one can fix this</span>
                            </div>
                            <span className='text-gray-500 float-right text-sm absolute top-2 right-2'>12:40 PM</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-between">
                        <div className="flex px-3 py-2 sm:items-center justify-between bg-gray-50">
                            <div className="relative flex items-center space-x-4">
                                <div className="relative">
                                    <span className="absolute text-green-400 right-0 bottom-0">
                                        <svg width="12" height="12">
                                            <circle cx="8" cy="8" r="4" fill="currentColor"></circle>
                                        </svg>
                                    </span>
                                    <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 h-10 rounded-full" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <div className="text-base mt-1 flex items-center">
                                        <span className="text-gray-700 mr-3">Anderson Vanhron</span>
                                    </div>
                                    <span className="text-sm text-gray-600">Junior Developer</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </button>
                                <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </button>
                                <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 py-2 sm:py-6 justify-between flex flex-col h-screen">
                            <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto h-[58vh] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                                <div className="chat-message">
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 /items-start">
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end justify-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 /items-end">
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 /items-start">
                                            <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">Command was run with root privileges. I'm sure about that.</span></div>
                                            <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I've update the description so it's more obviously now</span></div>
                                            <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">FYI https://askubuntu.com/a/700266/510172</span></div>
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                    Check the line above (it ends with a # so, I'm running it as root )
                                                    <pre># npm install -g @vue/devtools</pre>
                                                </span>
                                            </div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end justify-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 /items-end">
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 /items-start">
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Thanks for your message David. I thought I'm alone with this issue. Please, ? the issue to support it :)</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end justify-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 /items-end">
                                            <div><span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">Are you using sudo?</span></div>
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Run this command sudo chown -R `whoami` /Users/.npm-global/ then install the package globally without using sudo</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 /items-start">
                                            <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">It seems like you are from Mac OS world. There is no /Users/ folder on linux ?</span></div>
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">I have no issue with any other packages installed with root permission globally.</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end justify-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 /items-end">
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                                    </div>
                                </div>
                                <div className="chat-message">
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 /items-start">
                                            <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I get the same error on Arch Linux (also with sudo)</span></div>
                                            <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I also have this issue, Here is what I was doing until now: #1076</span></div>
                                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">even i am facing</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                                <div className="relative flex">
                                    <span className="absolute inset-y-0 flex items-center">
                                        <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                    <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-5" />
                                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                            </svg>
                                        </button>
                                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </button>
                                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </button>
                                        <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                            <span className="font-bold">Send</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-2/5 border-l-2 px-5">
        <div className="flex flex-col">
<div className='flex items-center justify-center'>
<div className="relative w-full group mx-auto mt-6 mb-6 break-words bg-white border dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
    <div className="pb-6">
        <div className="flex flex-wrap justify-center">
            <div className="flex justify-center w-full">
                <div className="relative">
                    <img src="https://source.unsplash.com/jmURdhtm7Ng/120x120" className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8" />
                </div>
            </div>
        </div>
        <div className="mt-2 text-center">
            <h3 className="mb-1 text-xl font-bold leading-normal text-gray-700 dark:text-gray-300">Ariel Cerda</h3>
            <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-mono">Lucknow, India</div>
            </div>
        </div>
        <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-6">
                    <p className="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis orci, maximus sed purus a, cursus scelerisque purus. Morbi molestie, odio at sagittis rhoncus, felis massa iaculis mi, quis molestie erat ipsum vel risus.
                    </p>
                </div>
            </div>
        </div>
        <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
            <div className="absolute flex -space-x-12 rounded-b-2xl">
                <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50"></div>
            </div>
        </div>
    </div>
</div>

</div>
          </div>
        </div> */}
                </div>
            </div>
        </div>
    )
}
