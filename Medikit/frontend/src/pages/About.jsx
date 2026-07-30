import { Link } from "react-router-dom";
import { FiBell, FiBookOpen, FiHeart } from "react-icons/fi";
import { Button } from "../components/Ui";

export default function About() {
  return (
    <main className="about-page">
      <section className="about-intro">
        <p className="eyebrow">ABOUT MEDKIT</p>
        <h1>Healthcare routines, made easier.</h1>
        <p>
          Medkit is a simple medicine companion that helps people remember their
          doses, understand their medicines, and keep a healthier routine. It
          brings important medicine information and timely reminders together in
          one calm, easy-to-use space.
        </p>
        <Link to="/register">
          <Button>Create your account</Button>
        </Link>
      </section>
      <section className="about-benefits">
        <article>
          <FiBell />
          <h2>Stay on schedule</h2>
          <p>
            Set medicine alarms so important doses are less likely to be missed.
          </p>
        </article>
        <article>
          <FiBookOpen />
          <h2>Understand medicines</h2>
          <p>
            Read clear descriptions and intended uses before adding medicines to
            your routine.
          </p>
        </article>
        <article>
          <FiHeart />
          <h2>Build confidence</h2>
          <p>
            Keep daily health tasks organised for yourself or the people you
            care for.
          </p>
        </article>
      </section>
      <section className="about-closing">
        <h2>Designed for everyday care.</h2>
        <p>
          Whether you manage one medicine or several, Medkit turns small health
          tasks into a dependable daily habit.
        </p>
      </section>
    </main>
  );
}
