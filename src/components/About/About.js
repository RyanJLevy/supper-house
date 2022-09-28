import ABOUT_DATA from "../../data/data.about";
import AboutProfile from "./AboutProfile";

function About() {
  return (
    <section
      id="about-section"
      className="flex flex-col items-center py-10 shadow-inner dark:shadow-none dark:border-t-supper-dark-gray dark:border-t-2"
    >
      <h1 className="event-header-text text-supper-dark-gray dark:text-supper-light-gray pb-4 md:pb-6">
        meet the lads <span role="img">🤝</span>
      </h1>
      {ABOUT_DATA.people.map((person) => {
        return <AboutProfile key={person.id} person={person} />;
      })}
    </section>
  );
}

export default About;
