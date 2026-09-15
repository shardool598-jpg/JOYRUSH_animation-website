import React, { useEffect, useRef } from "react";
import "./section1.css";

const StarIcon = ({ fill = 1 }) => (
  <span className="c-rating__star" style={{ "--fill": fill }}>
    <span className="c-rating__star--empty">
      <svg viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.35055 1.81345C9.90865 0.727931 11.4605 0.727932 12.0186 1.81345L13.8825 5.43889C14.1055 5.87251 14.5253 6.17072 15.0081 6.23848L19.075 6.8092C20.3239 6.98445 20.8122 8.52891 19.8911 9.39025L17.03 12.0657C16.6587 12.4129 16.4885 12.9246 16.5779 13.4251L17.2634 17.2624C17.4809 18.4798 16.2147 19.4226 15.1108 18.8652L11.3606 16.9718C10.9355 16.7571 10.4337 16.7571 10.0085 16.9718L6.25838 18.8652C5.15447 19.4226 3.88822 18.4798 4.10569 17.2624L4.7912 13.4251C4.8806 12.9246 4.71043 12.4129 4.3391 12.0657L1.47804 9.39025C0.556949 8.52891 1.04527 6.98445 2.29411 6.8092L6.36104 6.23848C6.84389 6.17072 7.26367 5.87251 7.48661 5.43889L9.35055 1.81345Z"
          fill="currentColor"
          stroke="#2F1948"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <span className="c-rating__star--full">
      <svg viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.35055 1.81345C9.90865 0.727931 11.4605 0.727932 12.0186 1.81345L13.8825 5.43889C14.1055 5.87251 14.5253 6.17072 15.0081 6.23848L19.075 6.8092C20.3239 6.98445 20.8122 8.52891 19.8911 9.39025L17.03 12.0657C16.6587 12.4129 16.4885 12.9246 16.5779 13.4251L17.2634 17.2624C17.4809 18.4798 16.2147 19.4226 15.1108 18.8652L11.3606 16.9718C10.9355 16.7571 10.4337 16.7571 10.0085 16.9718L6.25838 18.8652C5.15447 19.4226 3.88822 18.4798 4.10569 17.2624L4.7912 13.4251C4.8806 12.9246 4.71043 12.4129 4.3391 12.0657L1.47804 9.39025C0.556949 8.52891 1.04527 6.98445 2.29411 6.8092L6.36104 6.23848C6.84389 6.17072 7.26367 5.87251 7.48661 5.43889L9.35055 1.81345Z"
          fill="currentColor"
          stroke="#2F1948"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </span>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.83398 14.1663L14.1673 5.83301M14.1673 5.83301H5.83398M14.1673 5.83301V14.1663"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Rating = ({ rating = 4.3, reviewCount = 170 }) => {
  const stars = [1, 1, 1, 1, 0.3];

  return (
    <div className="c-rating" style={{ "--rating": rating }}>
      <div className="c-rating__stars">
        {stars.map((fill, i) => (
          <StarIcon key={i} fill={fill} />
        ))}
      </div>

      <div className="c-rating__reviews">
        <p className="upper montreal-b">{reviewCount} reviews</p>
        <span className="c-rating__underline" />
      </div>
    </div>
  );
};

/* ---------- Left side parallax cloud images ---------- */
/* Positions/sizes measured directly off the reference image (1041 x 950 px) */
const cloudImages = [
  {
    src: "/10042.png",
    alt: "Two friends taking a selfie together",
    className: "b-about__cloud b-about__cloud--top",
    pictureClass: "mw1",
    movement: 20,
  },
  {
    src: "/10041.png",
    alt: "Two friends laughing and hugging outdoors",
    className: "b-about__cloud b-about__cloud--middle",
    pictureClass: "mw2",
    movement: -20,
  },
  {
    src: "/10043.png",
    alt: "Woman laughing with hair in motion",
    className: "b-about__cloud b-about__cloud--bottom",
    pictureClass: "mw3",
    movement: 10,
  },
];

const AboutClouds = () => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const items = Array.from(wrap.querySelectorAll("[data-parallax='mouse']"));

    const handleMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      items.forEach((el) => {
        const movement = parseFloat(el.dataset.movement) || 0;
        const x = relX * movement;
        const y = relY * movement;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const handleMouseLeave = () => {
      items.forEach((el) => {
        el.style.transform = "translate(0px, 0px)";
      });
    };

    wrap.addEventListener("mousemove", handleMouseMove);
    wrap.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrap.removeEventListener("mousemove", handleMouseMove);
      wrap.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="b-about__clouds" ref={wrapRef}>
      {cloudImages.map((cloud, i) => (
        <figure
          key={i}
          className={cloud.className}
          data-parallax="mouse"
          data-movement={cloud.movement}
        >
          <picture className={cloud.pictureClass}>
            <img src={cloud.src} alt={cloud.alt} loading={i === 0 ? "eager" : "lazy"} />
          </picture>
        </figure>
      ))}
    </div>
  );
};

const AboutContent = () => {
  return (
    <div className="b-about__text">
      <h4 className="b-about__subheading fedro-sb wild-berries">
        Joy Rush isn't just another thc brand. It's a cultural shift in how
        we socialize, unwind, and celebrate.
      </h4>

      <div className="b-about__actions">
      
 <div className="body">
          <div className="stage">

            <div className="morph-btn1">
              <svg
                className="arrow"
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
            </div>

            <button className="pill1">
              About us
            </button>

          </div>
        </div>

        <Rating rating={4.3} reviewCount={170} />
      </div> 










    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="b-about">
      <div className="b-about__holder">
        <AboutClouds />
        <AboutContent />
      </div>
    </section>
  );
};

export default AboutSection;
