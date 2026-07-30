import { FiAlertTriangle, FiHeart, FiMapPin, FiPhone } from "react-icons/fi";

const contacts = [
  {
    label: "National Emergency Response",
    number: "112",
    detail: "Police, fire, ambulance, and urgent help anywhere in India.",
  },
  {
    label: "Ambulance Emergency",
    number: "108",
    detail:
      "Emergency response ambulance service; availability may vary by state.",
  },
  {
    label: "Patient Transport",
    number: "102",
    detail:
      "Government-supported patient transport, especially for pregnant women and children.",
  },
  {
    label: "AIIMS New Delhi - Medicine Emergency",
    number: "011-26594405",
    detail: "24-hour emergency service · Ansari Nagar, New Delhi.",
  },
  {
    label: "AIIMS New Delhi - Surgery Emergency",
    number: "011-26594706",
    detail: "24-hour surgery emergency service · Ansari Nagar, New Delhi.",
  },
];

const steps = [
  [
    "Call for help first",
    "Call 112 or 108 immediately for life-threatening symptoms, a serious accident, or when someone is unconscious.",
  ],
  [
    "Share the exact location",
    "State the address, a nearby landmark, the person’s condition, and a callback number.",
  ],
  [
    "Check safety and response",
    "Keep yourself safe. Check whether the person responds and is breathing normally; follow the dispatcher’s instructions.",
  ],
  [
    "Do not delay urgent care",
    "For severe chest pain, trouble breathing, major bleeding, seizures, stroke signs, or loss of consciousness, seek emergency help at once.",
  ],
  [
    "Stay with the person",
    "Keep them comfortable, do not give food or medicine unless instructed, and do not move them after a serious fall or crash unless there is immediate danger.",
  ],
];

export default function Emergency() {
  return (
    <main className="page emergency-page">
      <section className="emergency-hero">
        <FiAlertTriangle />
        <div>
          <p className="eyebrow">EMERGENCY SUPPORT</p>
          <h1>Get help quickly.</h1>
          <p>
            For a life-threatening emergency, call now. This page provides
            contact shortcuts and general first-response guidance; it does not
            replace professional medical care.
          </p>
        </div>
        <a href="tel:112" className="emergency-call">
          <FiPhone /> Call 112
        </a>
      </section>
      <section className="emergency-section">
        <div className="section-heading">
          <h2>Ambulance and government emergency contacts</h2>
          <p>
            Use 112 for nationwide emergency assistance. AIIMS numbers below are
            for New Delhi only.
          </p>
        </div>
        <div className="contact-grid">
          {contacts.map((contact) => (
            <article className="emergency-contact" key={contact.number}>
              <FiPhone />
              <div>
                <h3>{contact.label}</h3>
                <p>{contact.detail}</p>
              </div>
              <a
                href={`tel:${contact.number.replaceAll("-", "")}`}
                aria-label={`Call ${contact.label}`}
              >
                {contact.number}
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="emergency-section critical-guide">
        <div className="section-heading">
          <FiHeart />
          <div>
            <h2>What to do in a critical health emergency</h2>
            <p>
              Act calmly, get professional help, and follow the emergency
              dispatcher’s directions.
            </p>
          </div>
        </div>
        <ol>
          {steps.map(([title, description], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <aside className="location-note">
        <FiMapPin />
        <p>
          <b>Need a nearby government hospital?</b> Call 112, share your
          location, and ask for the nearest appropriate emergency facility.
          Hospital numbers and services vary by city and state.
        </p>
      </aside>
    </main>
  );
}
