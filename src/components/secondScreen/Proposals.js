import React from 'react'
import look from '../../images/look.svg'

export default function Proposals() {
    return (
        <div className="flex justify-between">
            <div className='my-auto ml-8'>
                <h1 className='text-4xl font-bold'>Nothing to show</h1>
                <p className='text-sm w-1/2 mt-1'>
                    It seems that there are no proposals to show. Once someone makes a proposal, you will see it here.
                </p>
            </div>
            <div>
                <img className='h-72 w-72 mr-8' src={look} alt="search"/>
            </div>
        </div>
    )
}
