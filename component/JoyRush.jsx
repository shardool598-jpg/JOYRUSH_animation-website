import { useEffect, useRef } from "react";
import "./JoyRush.css";

const experiences = [
  {
    title: "Unwind & Reset",
    copy: "Take a breath and let the day melt off. Made for after-work exhalations, cozy nights in, and those quiet moments when you finally get to come back to yourself.",
  },
  {
    title: "Gather & Connect",
    copy: "Good company, easy laughter, and conversations that linger. Perfect for dinner parties, book clubs, backyard hangs, and the everyday moments that feel special together.",
  },
  {
    title: "Celebrate & Spark",
    copy: "Bring a little extra glow to the occasion. From girls' nights and birthday toasts to bachelorettes and spontaneous plans, these are the moments made to feel lively, light, and unforgettable.",
  },
  {
    title: "Play & Indulge",
    copy: "Say yes to the fun part. Think pool days, tailgates, BBQs, weekend escapes, and carefree afternoons where the mood is sunny, social, and full of joy.",
  },
];

/**
 * @param {{ backgroundImage: string }} props Image URL for the full-bleed background.
 */
export default function JoyRush({ backgroundImage }) {
  const cardsRef = useRef(null);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.querySelectorAll(".joy-rush__card").forEach((card) => {
            card.classList.add("in-view");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="joy-rush"
      style={backgroundImage ? { "--joy-rush-image": `url(${backgroundImage})` } : undefined}
      aria-labelledby="joy-rush-heading"
    >
      <div className="joy-rush__shade" />
      <div className="joy-rush__content">
        <header className="joy-rush__intro">
          <h1 id="joy-rush-heading">Life is a lot.<br />Joy should be too.</h1>
          <p>Joy Rush is crafted to turn those hectic moments and busy days into joyful harmony and total balance.</p>
        </header>

        <div className="joy-rush__cards" role="list" ref={cardsRef}>
          {experiences.map(({ title, copy }, index) => (
            <article className="joy-rush__card" role="listitem" key={title} style={{ "--card-index": index }}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
