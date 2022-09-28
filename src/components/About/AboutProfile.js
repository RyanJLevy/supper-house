import { useEffect } from "react";
import { useInView } from "react-hook-inview";
import { motion, useAnimation } from "framer-motion";

const sectionVariants = {
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  hidden: { x: "-20%", opacity: 0, transition: { duration: 0.5 } },
};

function AboutProfile({ person }) {
  const slideAnimation = useAnimation();
  // // ref - reference to element, inView - boolean for whether or not ref element is in view.
  const [ref, inView] = useInView({ threshold: 0.5 });
  useEffect(() => {
    inView ? slideAnimation.start("visible") : slideAnimation.start("hidden");
  }, [inView, slideAnimation]);

  // For tailwind JIT, please ignore.
  // bg-supper-green
  // bg-supper-blue
  // bg-supper-pink
  // border-supper-green
  // border-supper-blue
  // border-supper-pink

  return (
    <motion.div
      animate={slideAnimation}
      variants={sectionVariants}
      initial={"hidden"}
      ref={ref}
      className={`flex justify-center items-center w-[80%] md:w-[60%] p-8 rounded-bl-xl rounded-tr-xl ${person.border} border-[5px] border-dashed m-4`}
    >
      <div className="flex flex-col justify-center items-center space-x-3 w-full rounded-md">
        <div className="flex flex-col md:flex-row  space-y-5 justify-center items-center md:space-x-5">
          <div
            className={`max-w-[100px] max-h-[100px] md:max-w-[150px] md:max-h-[150px] lg:max-w-[200px] lg:max-h-[200px] rounded-full object-contain overflow-hidden ${person.border} border-[5px]`}
          >
            <img
              className=" max-w-full"
              src={require(`../../images${person.pic}`)}
              alt="Profile"
            ></img>
          </div>
          <div
            className={`flex justify-between items-center ${person.bg} rounded-md p-4 md:p-8 space-x-2`}
          >
            <h1 className="text-white text-2xl md:text-[50px] font-light">
              {person.name.toLowerCase()},
            </h1>
            <h1 className="text-white text-2xl md:text-[50px] font-bold">
              {person.age}
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center w-[60%] pt-4">
          <h2 className="text-center text-lg md:text-2xl text-supper-dark-gray dark:text-supper-light-gray">
            "{person.bio}"
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutProfile;
