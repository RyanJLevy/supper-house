import { InformationCircleIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { db } from '../../firebase-config';
import { updateDoc, doc } from 'firebase/firestore';

function EventWidget({ data }) {
    const [formattedMonth, formattedDay] = data.date.split(',');
    const [ableToAttend, setAbleToAttend] = useState(false);
    const [unableToAttend, setUnableToAttend] = useState(false);
    const [responseSubmitted, setResponseSubmitted] = useState(false);
    const [guestName, setGuestName] = useState('');

    const HandleAbleClick = () => {
        setAbleToAttend(true);
        setUnableToAttend(false);
    }

    const HandleUnableClick = () => {
        setAbleToAttend(false);
        setUnableToAttend(true);
    }

    const HandleCancelClick = (event) => {
        event.preventDefault();
        setAbleToAttend(false);
    }

    const HandleGuestSubmit = async (event, id) => {
        event.preventDefault();
        // Return if empty string.
        if (!guestName.length) return;
        setGuestName('');
        const eventsDoc = doc(db, 'events', id);
        const newField = {guests: [...data.guests, guestName]};
        await updateDoc(eventsDoc, newField);
        setResponseSubmitted(true);
    }

    return (
        <div className="flex flex-col justify-center shadow-md border-supper-light-gray border-[1px] dark:bg-supper-black bg-white rounded-bl-xl rounded-tr-xl p-6 w-[90%] md:w-[60%] lg:w-[50%] relative">
            <div className="absolute top-0 right-0 m-2 md:m-6 bg-white rounded-md flex flex-col items-center shadow-md p-2 border-supper-light-gray border-[1px] dark:border-transparentr">
                <h1 className='text-supper-dark-gray font-light border-b-[1px] md:border-b-supper-light-gray'>{formattedMonth}</h1>
                <h1 className='text-supper-pink font-bold mx-1 md:text-xl'>{formattedDay}</h1>
            </div>
            <h1 className="text-4xl md:text-[50px] dark:text-supper-green text-supper-green-dark font-bold pr-24">{data.name}</h1>
            <div className='flex flex-col border-b-[1px] border-b-supper-light-gray md:border-transparent mb-4 md:mb-0 md:flex-row md:items-center pt-6 md:pt-12 pb-4 md:pb-0 md:space-x-2'>
                <InformationCircleIcon className='dark:text-supper-light-gray text-supper-dark-gray min-w-[20px] max-w-[20px] mr-2' />
                <h3 className="dark:text-supper-light-gray text-supper-dark-gray">{data.description}</h3>
            </div>
            <div className='flex items-center pt-2 md:pt-4 md:space-x-2'>
                <ClockIcon className='dark:text-supper-light-gray text-supper-dark-gray w-[20px] mr-2' />
                <h3 className="dark:text-supper-light-gray text-supper-dark-gray">event starts at {data.time}</h3>
            </div>
            <div className='flex flex-col justify-center border-t-[1px] border-t-supper-light-gray mt-4 pt-4'>
            {!ableToAttend && (
                <>
                    <h2 className='dark:text-supper-light-gray text-supper-dark-gray text-xl italic'>hey fucka, you coming?</h2>
                    <div className='flex justify-center items-center pt-4'>
                        <CheckCircleIcon 
                            className={`${!ableToAttend ? 'dark:text-supper-light-gray text-supper-dark-gray' : 'text-supper-green'} w-[40px] lg:w-[60px] mx-8 hover:scale-125 hover:animate-pulse hover:text-supper-green dark:hover:text-supper-green cursor-pointer`} 
                            onClick={HandleAbleClick}
                        />
                        <XCircleIcon 
                            className={`${!unableToAttend ? 'dark:text-supper-light-gray text-supper-dark-gray' : 'text-supper-pink'}  w-[40px] lg:w-[60px] mx-8 hover:scale-125 hover:animate-pulse hover:text-supper-pink dark:hover:text-supper-pink cursor-pointer`} 
                            onClick={HandleUnableClick}
                        />
                    </div> 
                </>       
            )}
            {ableToAttend && (
                responseSubmitted ? (
                    <div>
                        <p className='dark:text-supper-light-gray text-supper-dark-gray text-xl'>you and {data.guests.length}+ other guests are attending!</p>
                    </div>
                ) :
                (
                    <>
                        <h2 className='dark:text-supper-light-gray text-supper-dark-gray animate-bounce text-xl'>hell yeah dude! <span role="img" aria-label="hurray">🎉</span></h2>
                        <AttendanceForm 
                            handleSubmit={HandleGuestSubmit} 
                            handleCancel={HandleCancelClick} 
                            id={data.id} 
                            handleChange={(event) => setGuestName(event.target.value)} 
                            nameValue={guestName} 
                        />
                    </>
                )                
            )}
            </div>
        </div>
    )
}

const AttendanceForm = ({ handleSubmit, handleCancel, handleChange, id, nameValue }) => {
    return (
    <form className='w-full flex flex-col items-center justify-center py-2' onSubmit={(event) => handleSubmit(event, id)}>
        <input type="text" className='w-full border-[1px] dark:border-supper-light-gray border-supper-dark-gray p-2 rounded-md dark:text-supper-light-gray text-supper-dark-gray dark:bg-supper-black bg-white placeholder:text-supper-light-gray dark:placeholder:text-supper-dark-gray lg:w-[80%]' placeholder='type in your name' value={nameValue} onChange={handleChange}></input>
        <div className='flex w-full justify-center items-center py-4 space-x-4'>
            <button type='button' className='border-[1px] dark:border-supper-light-gray border-supper-dark-gray px-8 py-2 dark:text-supper-light-gray text-supper-dark-gray rounded-md hover:bg-supper-light-gray hover:bg-opacity-20' onClick={handleCancel}>cancel</button>
            <button type='submit' className='border-[1px] dark:border-supper-light-gray border-supper-dark-gray px-8 py-2 dark:text-supper-light-gray text-supper-dark-gray rounded-md hover:bg-supper-light-gray hover:bg-opacity-20'>rsvp</button>
        </div>
    </form>
    )
}

export default EventWidget