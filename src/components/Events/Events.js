import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import EventWidget from "./EventWidget";

function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);

  // FETCH event data from firebase db.
  useEffect(() => {
    const eventsCollectionRef = collection(db, "events");
    const previousEventsCollectionRef = collection(db, "previous-events");

    const getUpcomingEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      setUpcomingEvents(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    const getPreviousEvents = async () => {
      const data = await getDocs(previousEventsCollectionRef);
      setPreviousEvents(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getUpcomingEvents();
    getPreviousEvents();
  }, []);

  const [previousActive, setPreviousActive] = useState(false);
  const [upcomingActive, setUpcomingActive] = useState(true);
  const HandleButtonClick = (event) => {
    if (event.target.dataset.type === "previous") {
      setPreviousActive(true);
      setUpcomingActive(false);
    } else {
      setPreviousActive(false);
      setUpcomingActive(true);
    }
  };
  return (
    <section
      id="events-section"
      className="w-full flex flex-col items-center shadow-inner py-10 mb-10 border-t-transparent dark:shadow-none dark:border-t-supper-dark-gray border-t-2"
    >
      <fieldset className="border-supper-dark-gray border-2 rounded-md w-[80%] flex flex-col justify-center items-center px-6 py-10">
        <legend className="flex justify-center items-center m-auto w-auto rounded-md">
          <div className="flex justify-center items-center mx-2">
            <button
              data-type={"previous"}
              className={
                previousActive
                  ? "text-supper-dark-gray dark:text-supper-light-gray event-header-text"
                  : "text-supper-light-gray dark:text-supper-dark-gray event-header-text"
              }
              onClick={HandleButtonClick}
            >
              previous
            </button>
            <p className="text-lg md:text-5xl text-supper-light-gray dark:text-supper-dark-gray">
              /
            </p>
            <button
              data-type={"upcoming"}
              className={
                upcomingActive
                  ? "text-supper-dark-gray dark:text-supper-light-gray event-header-text"
                  : "text-supper-light-gray dark:text-supper-dark-gray event-header-text"
              }
              onClick={HandleButtonClick}
            >
              upcoming
            </button>
          </div>
          <h1 className="event-header-text text-supper-pink">events.</h1>
        </legend>
        <div className="flex w-full flex-col py-6 space-y-6 md:space-y-0 md:flex-row items-center overflow-hidden flex-wrap md:space-x-10 justify-center">
          {upcomingActive &&
            upcomingEvents.map((event) => {
              return <EventWidget key={event.id} data={event} />;
            })}
          {previousActive &&
            previousEvents.map((event) => {
              return (
                <div
                  className="w-80 h-80 object-cover rounded-bl-xl rounded-tr-xl overflow-hidden relative hover:scale-105 border-[1px] border-supper-light-gray cursor-default"
                  key={event.id}
                >
                  <h1 className="max-w-[50%] absolute top-10 left-[25%] text-white text-center bg-supper-black bg-opacity-75 p-4 text-2xl">
                    {event.name}
                  </h1>
                  <img
                    className="w-full h-full"
                    src={event.picture}
                    alt="Event"
                  ></img>
                </div>
              );
            })}
        </div>
      </fieldset>
    </section>
  );
}

export default Events;
