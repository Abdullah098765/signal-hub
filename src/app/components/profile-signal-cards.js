import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useMyContext } from '../context/context';

export default function ProfileSignalCards({ signals }) {
    const { setRouterLoading } = useMyContext();

    const router = useRouter()
    return (
        <div className='flex-1 bg-white shadow-md lg:shadow-xl lg:p-8 p-0 '>
            {signals?.length === 0 ? (
                <p className="text-center pt-20 pb-32 text-gray-500">No signals available.</p>
            ) : <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 ">
                {signals && signals.map((signal, index) => (
                    <div key={index}>

                        <div className="bg-white p-3 card  " key={signal._id}>
                            <div className='flex justify-between'>
                                {/* Signal Type Badge */}
                                <div className={`mb-2 ${signal.longOrShort === 'Long' ? 'bg-green-500' : 'bg-red-500'} text-white py-1 px-2 rounded-md text-xs font-semibold inline-block`}>
                                    {signal.longOrShort === 'Long' ? "Buy" : "Sell"}
                                </div>
                                {/* Timestamp */}
                                <div className="text-gray-600 text-xs">
                                    {formatDistanceToNow(new Date(signal.createdAt), { addSuffix: true })}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                {/* Trading Pair and Signal Strength */}
                                <div>
                                    <p className="text-sm font-semibold">{signal.pair}</p>
                                    <p className={`text-sm ${signal.duration >= new Date().getTime() ? 'text-green-500' : 'text-red-500'}`}>
                                        {signal.duration >= new Date().getTime() ? 'Active Signal' : 'Expired'}
                                    </p>
                                </div>


                            </div>

                            {/* Description */}
                            <p className="mt-2 text-sm overflow-ellipsis truncate">{signal.explanation}</p>

                            <hr className="my-2 border-gray-300" />

                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 gap-1 text-sm">
                                <div>
                                    <p className="text-gray-600">Entry Price 1</p>
                                    <p>{signal.entry1}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Entry Price 2</p>
                                    <p>{signal.entry2}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Stop-Loss</p>
                                    <p>{signal.stopLoss}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Take-Profit 1</p>
                                    <p>{signal.takeProfit1}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Take-Profit 2</p>
                                    <p>{signal.takeProfit2}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Take-Profit 3</p>
                                    <p>{signal.takeProfit3}</p>
                                </div>
                            </div>




                            {/* User Comments and Ratings */}
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Comments: {signal.comments.length}</p>
                                <p>Followers: {signal.followers.length}</p>
                            </div>




                            {/* Action Buttons */}
                            <div className="mt-2 flex justify-end space-x-2">


                                {!true ? <button onClick={() => {

                                    setRouterLoading(true)
                                    router.push('/signal/' + signal._id)

                                }} className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm">
                                    Follow Signal
                                </button>
                                    :
                                    <button onClick={() => {
                                        setRouterLoading(true)
                                        router.push('/signal/' + signal._id)

                                        // router,
                                    }} className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200 text-sm">
                                        See Details
                                    </button>
                                }

                                {/* Details Button */}


                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}
