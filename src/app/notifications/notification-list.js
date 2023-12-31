"use client"
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

const NotificationCardList = () => {

  const { user, setRouterLoading, isModalOpen, setIsModalOpen, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const route = useRouter()
  // Assuming you are calling this function in a React component or another client-side context
  async function getNotifications() {
    try {
      const response = await fetch('/api/get-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNotifications(data.reverse())
      console.log(data);
      setIsNotificationsLoading(false)


      // Process the retrieved data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getNotifications()
  }, [user])

  // Example usage
  const CustomFormattedDistance = ({ createdAt }) => {
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true });

    // Extract the numeric part of the distance
    const numericDistance = parseInt(distance);

    // Customize the output based on the numeric distance
    const formattedDistance = numericDistance < 1 ? 'Just now' : `${distance.replace('about', '').trim()}`;

    return <span className='text-gray-600 text-sm mx-2 relative right-0' style={{ whiteSpace: 'nowrap',fontSize:'0.8rem' }}>{formattedDistance}</span>;
  };
  return (
    <div className={`p-2 overflow-auto border border-b-0 pb-0 pt-0 rounded bg-white w-full`}>
      {!isNotificationsLoading ? (
        <>
          {notifications && notifications.map((notification, index) => (
            <div key={index} onClick={() => {
              setRouterLoading(true)
              route.push(notification.clickAction)
            }} className="flex items-center px-4 py-3 cursor-pointer border-b justify-between hover:bg-gray-100 -mx-2">
              <div className='flex items-center overflow-ellipsis ' style={{ maxWidth: "80%"/* set your desired width */ }}>
                {notification.iconUrl && <img style={{ minWidth: "2rem" }} className="h-8 w-8 rounded-full object-cover mx-1" src={notification.iconUrl} alt="avatar" />}
                <p className="text-gray-600 text-sm mx-2  truncate " >
                  <span className="font-bold"  >{notification.title}</span>
                  <p className='truncate '> {notification.body}</p>
                </p>
              </div>
              <span className='text-gray-600 text-sm mx-2 '>
                <CustomFormattedDistance createdAt={notification.createdAt} />
              </span>
            </div>
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center pb-80 pt-56 bg-white opacity-75">
          <div className="animate-spin rounded-full border-t-4 border-gray-500 border-solid h-12 w-12"></div>
        </div>
      )}
    </div>


  );
};

export default NotificationCardList;
