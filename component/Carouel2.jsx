import React, { useEffect, useRef, useState } from "react";
import "./Carouel2.css";

import socialSpark from "../assets2/10034.png";
import socialSparkBlob from "../assets2/10027.png";
import dailyElevation from "../assets2/10039.png";
import dailyElevationBlob from "../assets2/10028.png";
import pureZen from "../assets2/10048.png";
import pureZenBlob from "../assets2/10037.png";
import sweetDreams from "../assets2/10052.png";
import sweetDreamsBlob from "../assets2/10030.png";
import stressMelt from "../assets2/10053.png";
import stressMeltBlob from "../assets2/10038.png";

const products = [
  {
    id: "10034",
    name: "SOCIAL SPARK",
    flavor: "Citrus Gummies",
    image: socialSpark,
    blob: socialSparkBlob,
  },
  {
    id: "10039",
    name: "DAILY ELEVATION",
    flavor: "Green Apple Gummies",
    image: dailyElevation,
    blob: dailyElevationBlob,
  },
  {
    id: "10048",
    name: "PURE ZEN",
    flavor: "Strawberry Gummies",
    image: pureZen,
    blob: pureZenBlob,
  },
  {
    id: "10052",
    name: "SWEET DREAMS",
    flavor: "Elderberry Gummies",
    image: sweetDreams,
    blob: sweetDreamsBlob,
  },
  {
    id: "10053",
    name: "STRESS MELT",
    flavor: "Mixed Berry Gummies",
    image: stressMelt,
    blob: stressMeltBlob,
  },
];

export default function ProductCarousel2() {
  // `hovered` drives the pop/zoom effect on whichever card is highlighted.
  const [hovered, setHovered] = useState(null);

  // `start` is the index of the leftmost visible card in the track.
  const [start, setStart] = useState(0);
  const [step, setStep] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const dragStartX = useRef(0);

  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const node = headingRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const maxStart = Math.max(0, products.length - visibleCount);

  // Measure the rendered card width (in px) so we can translate the track
  // by an exact amount, and figure out how many cards actually fit.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const firstCard = track?.children?.[0];
      if (!track || !viewport || !firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || "0");
      const viewportWidth = viewport.getBoundingClientRect().width;

      setStep(cardWidth + gap);
      setVisibleCount(
        Math.max(1, Math.round((viewportWidth + gap) / (cardWidth + gap)))
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    // Keep the current position valid if the viewport is resized
    // (e.g. rotating a phone) and fewer/more cards now fit.
    setStart((current) => Math.min(current, maxStart));
  }, [maxStart]);

  const previous = () => {
    setStart((current) => (current <= 0 ? maxStart : current - 1));
  };

  const next = () => {
    setStart((current) => (current >= maxStart ? 0 : current + 1));
  };

  const handlePointerDown = (event) => {
    dragStartX.current = event.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    setDragOffset(event.clientX - dragStartX.current);
  };

  const endDrag = () => {
    if (!isDragging) return;
    const threshold = step / 4 || 40;
    if (dragOffset > threshold) previous();
    else if (dragOffset < -threshold) next();
    setIsDragging(false);
    setDragOffset(0);
  };

  const trackOffset = start * step - dragOffset;

  return (
    <section className="product-carousel">
      <style>{`
        .stagger-heading .stagger-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(0.4em);
          will-change: transform, opacity;
        }
        .stagger-heading.is-visible .stagger-word {
          animation: stagger-word-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--stagger-delay, 0s);
        }
        @keyframes stagger-word-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .stagger-heading .stagger-word {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="product-carousel__top">
        <h2 className={`stagger-heading${headingVisible ? " is-visible" : ""}`} ref={headingRef}>
          {"GUMMIES AS DELIGHTFUL".split(" ").map((word, i) => (
            <span
              key={`l1-${i}`}
              className="stagger-word"
              style={{ "--stagger-delay": `${i * 0.08}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
          <br />
          {"AS THEY ARE DELICIOUS".split(" ").map((word, i) => (
            <span
              key={`l2-${i}`}
              className="stagger-word"
              style={{ "--stagger-delay": `${(i + 3) * 0.08}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h2>

        <div className="product-carousel__navigation">
          <button
            type="button"
            className="carousel-arrow"
            onClick={previous}
            aria-label="Previous product"
          >
            <span>←</span>
          </button>

          <button
            type="button"
            className="carousel-arrow carousel-arrow--filled"
            onClick={next}
            aria-label="Next product"
          >
            <span>→</span>
          </button>
        </div>
      </div>

      <div className="product-carousel__viewport" ref={viewportRef}>
        <div
          className={`product-carousel__track ${
            isDragging ? "product-carousel__track--dragging" : ""
          }`}
          ref={trackRef}
          style={{ transform: `translateX(-${trackOffset}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {products.map((product, index) => {
            const isActive = hovered === index;

            return (
              <article
                className={`product-card ${isActive ? "is-active" : ""}`}
                key={product.id}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="product-card__visual">
                  <img
                    src={product.blob}
                    alt=""
                    aria-hidden="true"
                    className="product-card__blob"
                  />

                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                    draggable={false}
                  />
                </div>

                <h3>{product.name}</h3>
                <p className="product-card__flavor">{product.flavor}</p>

                <div
                  className={`quick-add-stage ${isActive ? "is-active" : ""}`}
                >
                  <button
                    type="button"
                    className="quick-add-pill"
                    onClick={() => setHovered(index)}
                  >
                    QUICK ADD
                  </button>

                  <button
                    type="button"
                    className="quick-add-morph"
                    onClick={() => setHovered(index)}
                    aria-label={`Add ${product.name}`}
                  >
                    <svg
                      className="quick-add-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17 L17 7 M8 7 H17 V16"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
