import React from 'react'
import AliceCarousel from 'react-alice-carousel';

const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    960: { items: 3 },
    1200: { items: 4 },
    1400: { items: 5 },
};

const items = [
    <div className="item" data-value="1">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/mathematics.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Mathematics</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="2">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/data-report-svgrepo-com.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Science</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="3">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/chemistry.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Chemistry</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="4">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/commerce.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Commerce</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="5">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/computer.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Computer</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="6">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/biology.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Biology</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="7">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/art.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Art</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="8">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/geography.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Geography</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="9">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/gk.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">GK</h2>
        </div>
      </div>
    </div>,
    <div className="item" data-value="10">
      <div className="w-28 p-3 justify-between items-center rounded-md border border-gray-50 bg-white dark:bg-gray-900 dark:text-gray-100">
        <img
          src="../images/economy.svg"
          alt=""
          width={35}
          height={35}
          className="justify-center items-center mx-auto"
        />
        <div className="flex flex-col justify-between text-center">
          <h2 className="text-sm font-semibold tracking-wide">Economy</h2>
        </div>
      </div>
    </div>,
  ];

export default function Corousel() {
  return (
    <div className="container w-10/12">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        disableDotsControls={true}
      />
    </div>
  )
}
