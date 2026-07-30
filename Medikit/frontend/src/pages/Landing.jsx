import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { Button } from "../components/Ui";

const features = [
  [FiCalendar, "Medicine Tracking"],
  [FiMapPin, "Nearby Store"],
  [FiClock, "Reminders"],
];

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">YOUR WELLBEING, SIMPLIFIED</p>
          <h1>
            Your Health,
            <br />
            Our Priority.
          </h1>
          <p>
            Track your medicines, get reminders, compare prices, and get
            medicine details at this platform.
          </p>
          <div className="hero-actions">
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
            <Link to="/medicines">
              <Button variant="outline">Learn more</Button>
            </Link>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Illustration of a medicine checklist"
        >
          <div className="clipboard">
            ✓<br />✓<br />✓<br />✓
          </div>
          <div className="pill p1"></div>
          <div className="pill p2"></div>
          <div className="clock">◷</div>
        </div>
      </section>
      <section className="feature-strip" id="features">
        {features.map(([Icon, text]) => (
          <article key={text}>
            <Icon />
            <span>{text}</span>
          </article>
        ))}
      </section>
      <section className="about" id="about">
        <p className="eyebrow">ABOUT MEDKIT</p>
        <h2>Simple support for healthier everyday routines.</h2>
        <p>
          Medkit brings your medicine schedule, product information, and health
          reminders into one easy-to-use place. It helps people and families
          stay organised, understand why their medicines are used, and avoid
          missing important doses.
        </p>
        <p>
          By making daily healthcare details clearer and more accessible, Medkit
          supports safer routines, better adherence to prescribed treatment, and
          more confident health decisions.
        </p>
      </section>
    </>
  );
}
