import React, { useEffect, useRef, useState } from "react";
import "./JoyRushReviews.css";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

const REVIEWS = [
  {
    title: "Perfect way to unwind",
    text: "I was honestly a bit skeptical at first, but JoyRush drinks completely changed my mind. The effect is smooth and relaxing without feeling overwhelming.",
    author: "Tina A",
  },
  {
    title: "My new favorite treat",
    text: "These gummies are amazing. The flavor is actually really good I take one after work and it just melts the stress away. Will definitely be ordering again.",
    author: "Sara M",
  },
  {
    title: "Subtle, relaxing, and delicious",
    text: "These drinks taste great and give a calm, happy feeling without being too intense. Perfect for a chill night at home.",
    author: "Nina K",
  },
  {
    title: "A game-changer for my routine",
    text: "I've tried so many wellness drinks and JoyRush is hands down the best. It gives me that gentle lift without the jitters. Love the natural ingredients!",
    author: "Marcus L",
  },
  {
    title: "Tastes like a vacation",
    text: "Every sip feels like a little escape. The fruit flavors are so authentic and the calming effect is just what I need after a long day at work.",
    author: "Priya S",
  },
  {
    title: "Better than coffee for focus",
    text: "I swapped my afternoon coffee for JoyRush and my productivity actually went up. No crash, no anxiety — just clean, focused energy all day.",
    author: "James R",
  },
];

function getVisibleCards() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

export default function JoyRushReviews() {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(getVisibleCards());
  const [animateKey, setAnimateKey] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const maxIndex = Math.max(REVIEWS.length - visibleCards, 0);

  useEffect(() => {
    function handleResize() {
      setVisibleCards(getVisibleCards());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setAnimateKey((k) => k + 1);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setAnimateKey((k) => k + 1);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    isDragging.current = false;
  };

  const cardWidth = trackRef.current?.children[0]?.offsetWidth ?? 0;
  const gap = 24;
  const offset = currentIndex * (cardWidth + gap);

  return (
    <section className="jrr-reviews">
      <h2 className="jrr-title">
        DON'T TAKE OUR
        <br />
        WORD FOR IT
      </h2>

      <div className="jrr-controls">
        <button
          className="jrr-nav-btn"
          aria-label="Previous"
          onClick={goPrev}
          type="button"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className="jrr-nav-btn"
          aria-label="Next"
          onClick={goNext}
          type="button"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="9 6 15 12 9 18"></polyline>
          </svg>
        </button>
      </div>

      <div className="jrr-track-wrapper">
        <div
          className="jrr-track"
          ref={trackRef}
          style={{ transform: `translateX(-${offset}px)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {REVIEWS.map((review, i) => (
            <div
              key={`${animateKey}-${review.author}`}
              className="jrr-card jrr-card--stagger"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="jrr-stars">
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <svg key={starIdx} viewBox="0 0 24 24">
                    <path d={STAR_PATH} />
                  </svg>
                ))}
              </div>
              <h3 className="jrr-card-title">{review.title}</h3>
              <p className="jrr-card-text">{review.text}</p>
              <div className="jrr-divider"></div>
              <p className="jrr-card-author">{review.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="jrr-float-buttons">
        <button className="jrr-float-btn" aria-label="Products" type="button">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <path
              d="M12 2C12 2 8 6 8 11C8 13.5 9.5 15.5 12 17C14.5 15.5 16 13.5 16 11C16 6 12 2 12 2Z"
              fill="#e85d3a"
              stroke="#e85d3a"
            />
            <path
              d="M12 17C12 17 10 19 10 21C10 21.5 11 22 12 22C13 22 14 21.5 14 21C14 19 12 17 12 17Z"
              fill="#e85d3a"
              stroke="#e85d3a"
            />
          </svg>
        </button>
        <button className="jrr-float-btn" aria-label="Cart" type="button">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <path
              d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
              stroke="#e85d3a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="#e85d3a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
              stroke="#e85d3a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div> */}
    </section>
  );
}
