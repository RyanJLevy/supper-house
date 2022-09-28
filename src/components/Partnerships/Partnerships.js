import React from "react";

function Partnerships() {
  return (
    <section
      id="partners-section"
      className="flex flex-col items-center py-10 shadow-inner dark:shadow-none dark:border-t-supper-dark-gray dark:border-t-2"
    >
      <h1 className="event-header-text text-supper-dark-gray dark:text-supper-light-gray mb-6 md:mb-10 font-normal">
        proudly partnered with
      </h1>
      <div className="flex justify-center items-center space-x-4 md:space-x-16">
        <img
          className="max-w-[100px] max-h-[100px] md:max-w-[150px] md:max-h-[150px] lg:max-w-[200px] lg:max-h-[200px] rounded-bl-xl rounded-tr-xl bg-supper-dark-gray dark:bg-transparent rounded-md p-2"
          src={require("../../images/bog.png")}
          alt="Bog logo"
          title="BOG."
        ></img>
        <img
          className="max-w-[100px] max-h-[100px] md:max-w-[150px] md:max-h-[150px] lg:max-w-[200px] lg:max-h-[200px] bg-transparent rounded-md p-2"
          src={require("../../images/sliv.png")}
          alt="Sliv logo"
          title="Sliv house."
        ></img>
      </div>
    </section>
  );
}

export default Partnerships;
