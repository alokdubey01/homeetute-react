import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Math from "../../images/browse/1.png";
import Science from "../../images/browse/2.png";
import English from "../../images/browse/3.png";
import Computer from "../../images/browse/4.png";
import Physics from "../../images/browse/5.png";
import Chemistry from "../../images/browse/6.png";
import Commerce from "../../images/browse/7.png";
import Grammer from "../../images/browse/8.png";

const responsive = {
    0: { items: 2 },
    600: { items: 3 },
    960: { items: 4 },
    1200: { items: 4 },
    1400: { items: 5 },
};

const items = [
    <div className="item p-4" data-value="1">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${Math})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
            {/* <div className="flex flex-col justify-between text-center">
                <h2 className="text-sm font-semibold tracking-wide">Mathematics</h2>
            </div> */}
        </div>
    </div>,
    <div className="item p-4" data-value="2">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${Science})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
    </div>,
    <div className="item p-4" data-value="3">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${English})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
    </div>,
    <div className="item p-4" data-value="4">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${Computer})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
    </div>,
    <div className="item p-4" data-value="5">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${Physics})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
    </div>,
    <div className="item p-4" data-value="6">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${Chemistry})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
    </div>,
    <div className="item p-4" data-value="7">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${Commerce})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
    </div>,
    <div className="item p-4" data-value="8">
        <div className="w-full h-[10rem] p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100" style={{backgroundImage: `url(${Grammer})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
    </div>,
];

export default function Browse() {
    return (
        <>
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
                disableDotsControls={true}
                disableButtonsControls={true}
                infinite={true}
                autoPlay={true}
                autoPlayInterval={2000}
                animationDuration={1000}
                animationType="fadeout"
                touchTracking={true}
                disableSlideInfo={true}
            />
        </>
    )
}
