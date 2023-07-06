import React from 'react'
// import search from '../../images/search.gif'
import search from '../../images/search-teacher.png'
import contact from '../../images/contact-teacher.png'
import get from '../../images/get-education.png'

export default function Highlights() {
    return (
        <>
            <section className="bg-white">
                <div className="container px-6 py-12">
                    <h1 className='text-3xl font-bold text-center' style={{ fontFamily: "mitr" }}>How it will <span className='text-indigo-700'>help</span> you ?</h1>
                    <div>
                        <div className="mx-auto max-w-5xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl rounded-3xl items-center lg:mx-0 lg:flex lg:max-w-none">
                                <div className="p-8 sm:p-10 lg:flex-auto">
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Ysabeau SC" }}>1. Search Teacher</h3>
                                    <p className="mt-6 text-base leading-7 text-gray-600" style={{ fontFamily: "Ysabeau SC" }}>View the profiles freely and connect with your fantastic teacher according to your criteria (prices, recommendations, reviews and availibility)</p>
                                </div>
                                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                                    <div className="rounded-2xl text-center lg:flex lg:flex-col lg:justify-center">
                                        <div className="mx-auto max-w-md px-8">
                                            <img className='h-auto w-auto' src={search} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto max-w-5xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl rounded-3xl items-center lg:mx-0 lg:flex lg:max-w-none">
                                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                                    <div className="rounded-2xl text-center lg:flex lg:flex-col lg:justify-center">
                                        <div className="mx-auto max-w-md px-8">
                                            <img className='h-auto w-auto' src={contact} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 sm:p-10 lg:flex-auto">
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Ysabeau SC" }}>2. Contact</h3>
                                    <p className="mt-6 text-base leading-7 text-gray-600" style={{ fontFamily: "Ysabeau SC" }}>Choose a best teacher of your favorite subject and schedule a class.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto max-w-5xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl rounded-3xl items-center lg:mx-0 lg:flex lg:max-w-none">
                                <div className="p-8 sm:p-10 lg:flex-auto">
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Ysabeau SC" }}>3. Get Quality Education</h3>
                                    <p className="mt-6 text-base leading-7 text-gray-600" style={{ fontFamily: "Ysabeau SC" }}>Freely schedule your classes with your teacher at your convenience. Our user-friendly platform allows you to easily coordinate and arrange personalized learning sessions that fit your schedule. </p>
                                </div>
                                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                                    <div className="rounded-2xl text-center lg:flex lg:flex-col lg:justify-center">
                                        <div className="mx-auto max-w-md px-8">
                                            <img className='h-auto w-auto' src={get} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
