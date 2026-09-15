import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import "./AgeGate.css";
import ProductCarousel from "../component/ProductCarousel";
import ProductCarousel2 from "../component/Carouel2";
import AboutSection from "../component/section1";
import AboutContent from "../component/section1";
import JoyRush from "../component/JoyRush";
// import Section3 from "../component/section3";

import JoyRushHero from "../component/JoyRushHero";
import JoyRushReviews from "../component/JoyRushReviews";





import BundleSave from "../component/BundleSave";
import Footer from "../component/footer";
import Footer2 from "../component/footer2";









const ACCENT = "#EA4324";
const LIGHT = "#FBF4EC";
const RIPPLE_MS = 520;


/* =========================================================
   BUTTON FACE
   ========================================================= */

function ButtonFace({ filled, Icon }) {
  return (
    <div
      style={{
         
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: filled ? ACCENT : LIGHT,
        transition:
          "background 220ms ease, box-shadow 220ms ease",
        boxShadow: filled
          ? `inset 0 0 0 1.5px ${ACCENT}`
          : `inset 0 0 0 3px ${ACCENT}`,
      }}
    >
      <Icon color={filled ? LIGHT : ACCENT} />
    </div>
  );
}


/* =========================================================
   APPLE MARK
   ========================================================= */

function AppleMark({ color }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="46%"
      height="46%"
      style={{ display: "block" }}
    >
      <g fill={color}>
        <circle cx="50" cy="60" r="26" />

        <path d="M50 35 C 47 24 58 17 68 21 C 64 30 56 34 50 35 Z" />
      </g>

      <path
        d="M50 36 L 54 18"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}


/* =========================================================
   CART MARK
   ========================================================= */

function CartMark({ color }) {
  return (
    <svg
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="46%"
      height="46%"
      style={{ display: "block" }}
    >
      <path
        d="M22.5597 6.63371C22.4147 6.47092 22.2368 6.34074 22.0377 6.25177C21.8387 6.16279 21.623 6.11704 21.405 6.11753H16.8244C16.8244 4.90066 16.341 3.73362 15.4805 2.87316C14.6201 2.0127 13.453 1.5293 12.2362 1.5293C11.0193 1.5293 9.85225 2.0127 8.99179 2.87316C8.13133 3.73362 7.64793 4.90066 7.64793 6.11753H3.06734C2.8506 6.11812 2.63642 6.16439 2.43878 6.25333C2.24113 6.34227 2.06446 6.47188 1.92028 6.63371C1.77731 6.79494 1.67002 6.98455 1.60544 7.19014C1.54087 7.39572 1.52047 7.61263 1.54557 7.82665L2.90866 19.2972C2.95287 19.671 3.13333 20.0153 3.4155 20.2643C3.69767 20.5133 4.06175 20.6496 4.43807 20.647H20.0429C20.4192 20.6496 20.7833 20.5133 21.0654 20.2643C21.3476 20.0153 21.5281 19.671 21.5723 19.2972L22.9354 7.82665C22.9603 7.61256 22.9398 7.39561 22.875 7.19003C22.8103 6.98444 22.7028 6.79486 22.5597 6.63371ZM9.17734 9.94107C9.17734 10.1439 9.09677 10.3384 8.95336 10.4818C8.80995 10.6252 8.61545 10.7058 8.41264 10.7058C8.20982 10.7058 8.01532 10.6252 7.87191 10.4818C7.7285 10.3384 7.64793 10.1439 7.64793 9.94107V8.41165C7.64793 8.20884 7.7285 8.01433 7.87191 7.87092C8.01532 7.72751 8.20982 7.64695 8.41264 7.64695C8.61545 7.64695 8.80995 7.72751 8.95336 7.87092C9.09677 8.01433 9.17734 8.20884 9.17734 8.41165V9.94107ZM12.2362 3.05871C13.0474 3.05871 13.8254 3.38098 14.3991 3.95462C14.9727 4.52826 15.295 5.30628 15.295 6.11753H9.17734C9.17734 5.30628 9.49961 4.52826 10.0733 3.95462C10.6469 3.38098 11.4249 3.05871 12.2362 3.05871ZM16.8244 9.94107C16.8244 10.1439 16.7438 10.3384 16.6004 10.4818C16.457 10.6252 16.2625 10.7058 16.0597 10.7058C15.8569 10.7058 15.6624 10.6252 15.519 10.4818C15.3756 10.3384 15.295 10.1439 15.295 9.94107V8.41165C15.295 8.20884 15.3756 8.01433 15.519 7.87092C15.6624 7.72751 15.8569 7.64695 16.0597 7.64695C16.2625 7.64695 16.457 7.72751 16.6004 7.87092C16.7438 7.72751 16.8244 8.20884 16.8244 8.41165V9.94107Z"
        fill={color}
      />
    </svg>
  );
}


/* =========================================================
   RIPPLE ICON BUTTON
   ========================================================= */

function RippleIconButton({ Icon, label }) {
  const [filled, setFilled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(null);

  const btnRef = useRef(null);
  const rippleLayerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const previewFilled =
    !ripple && hovered ? true : filled;

  const baseFilled =
    ripple ? filled : previewFilled;

  const handleClick = useCallback(
    (e) => {
      const el = btnRef.current;

      if (!el || ripple) return;

      const rect = el.getBoundingClientRect();

      const x =
        ((e.clientX - rect.left) /
          rect.width) *
        100;

      const y =
        ((e.clientY - rect.top) /
          rect.height) *
        100;

      const from = filled;

      setFilled(!from);

      setRipple({
        x,
        y,
        from,
      });

      const start = performance.now();

      const corners = [
        Math.hypot(x, y),
        Math.hypot(100 - x, y),
        Math.hypot(x, 100 - y),
        Math.hypot(100 - x, 100 - y),
      ];

      const maxR =
        Math.max(...corners) + 4;

      const tick = (now) => {
        const t = Math.min(
          1,
          (now - start) / RIPPLE_MS
        );

        const eased =
          1 - Math.pow(1 - t, 3);

        const r =
          maxR * (1 - eased);

        if (rippleLayerRef.current) {
          rippleLayerRef.current.style.clipPath =
            `circle(${r}% at ${x}% ${y}%)`;
        }

        if (t < 1) {
          rafRef.current =
            requestAnimationFrame(tick);
        } else {
          setRipple(null);
        }
      };

      rafRef.current =
        requestAnimationFrame(tick);
    },
    [filled, ripple]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        ref={btnRef}
        onClick={handleClick}
        onPointerEnter={() =>
          setHovered(true)
        }
        onPointerLeave={() =>
          setHovered(false)
        }
        onPointerCancel={() =>
          setHovered(false)
        }
        role="button"
        aria-pressed={filled}
        tabIndex={0}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" ||
            e.key === " "
          ) {
            e.preventDefault();

            const rect =
              btnRef.current.getBoundingClientRect();

            handleClick({
              clientX:
                rect.left +
                rect.width / 2,
              clientY:
                rect.top +
                rect.height / 2,
            });
          }
        }}
        style={{
          position: "relative",
          width: 66,
          height: 66,
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 20,
          pointerEvents: "auto",
          transform:
            hovered && !ripple
              ? "scale(1.04)"
              : "scale(1)",
          transition:
            "transform 220ms ease, filter 220ms ease",
          filter:
            "drop-shadow(0 10px 30px rgba(234,67,36,0.25))",
          outline: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            
          }}
        >
          <ButtonFace
            filled={baseFilled}
            Icon={Icon}
          />
        </div>

        {ripple && (
          <div
            ref={rippleLayerRef}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              
              clipPath:
                `circle(150% at ${ripple.x}% ${ripple.y}%)`,
              pointerEvents: "none",
            }}
          >
            <ButtonFace
              filled={ripple.from}
              Icon={Icon}
            />
          </div>
        )}
      </div>

      {label && (
        <p
          style={{
            margin: 0,
            color: "#c9b8ab",
            fontSize: 13,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </p>
      )}
    </div>
  );
}


/* =========================================================
   BACKGROUND
   ========================================================= */

const backgroundImg = "/10025.jpg";


/* =========================================================
   ANNOUNCEMENTS
   ========================================================= */

const ANNOUNCEMENTS = [
  "always delicious",
  "joyfully bold",
  "effortlessly stylish",
  "playfully confident",
  "unapologetically you",
  "always delicious",
  "joyfully bold",
  "effortlessly stylish",
  "playfully confident",
  "unapologetically you",
];


function AnnounceSeparator({ uid }) {
  const maskId =
    `agegate-announce-mask-${uid}`;

  return (
    <svg
      className="agegate__announce-sep-svg"
      viewBox="0 0 10.238 10.238"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id={maskId}
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="11"
        height="11"
      >
        <circle
          cx="5.11913"
          cy="5.11913"
          r="5.11913"
          fill="#FBF6ED"
        />
      </mask>

      <g mask={`url(#${maskId})`}>
        <rect
          x="12.7568"
          y="6.32715"
          width="0.900968"
          height="15.255"
          transform="rotate(90 12.7568 6.32715)"
          fill="currentColor"
        />

        <rect
          x="5.58984"
          y="6.85938"
          width="0.900968"
          height="7.71966"
          transform="rotate(-180 5.58984 6.85938)"
          fill="currentColor"
        />

        <rect
          x="8.55957"
          y="-0.0615234"
          width="0.900968"
          height="15.2593"
          transform="rotate(30 8.55957 -0.0615234)"
          fill="currentColor"
        />

        <rect
          x="11.958"
          y="10.1973"
          width="0.900968"
          height="15.2593"
          transform="rotate(120 11.958 10.1973)"
          fill="currentColor"
        />

        <rect
          x="0.921875"
          y="0.388672"
          width="0.900968"
          height="15.2593"
          transform="rotate(-30 0.921875 0.388672)"
          fill="currentColor"
        />

        <rect
          x="11.5078"
          y="2.55957"
          width="0.900968"
          height="15.2593"
          transform="rotate(60 11.5078 2.55957)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}


function AnnounceSequence({
  seqIndex,
  prefix = "agegate__announce",
}) {
  return (
    <div
      className={`${prefix}-seq`}
      aria-hidden={seqIndex === 1}
    >
      {ANNOUNCEMENTS.map(
        (text, i) => (
          <span
            className={`${prefix}-item upper`}
            key={i}
          >
            <span
              className={`${prefix}-sep`}
            >
              <AnnounceSeparator
                uid={`${prefix}-${seqIndex}-${i}`}
              />
            </span>

            {text}
          </span>
        )
      )}
    </div>
  );
}


/* =========================================================
   STAGGER TEXT
   ========================================================= */

function StaggeredText({
  lines,
  baseDelay = 0,
  charDelay = 35,
  className = "",
  tag: Tag = "span",
}) {
  let globalIndex = 0;

  return (
    <Tag className={className}>
      {lines.map(
        (line, lineIdx) => (
          <React.Fragment
            key={lineIdx}
          >
            {lineIdx > 0 && <br />}

            {Array.from(line).map(
              (char, i) => {
                const delay =
                  baseDelay +
                  globalIndex *
                    charDelay;

                globalIndex++;

                return (
                  <span
                    key={`${lineIdx}-${i}`}
                    className="stagger-char"
                    style={{
                      animationDelay:
                        `${delay}ms`,
                    }}
                  >
                    {char === " "
                      ? "\u00A0"
                      : char}
                  </span>
                );
              }
            )}
          </React.Fragment>
        )
      )}
    </Tag>
  );
}


/* =========================================================
   AGE GATE
   ========================================================= */

export default function AgeGate({
  onConfirm,
  onDeny,
}) {
  const [denied, setDenied] =
    useState(false);

  const [closing, setClosing] =
    useState(false);

  const [closed, setClosed] =
    useState(false);


  /* =======================================================
     BODY SCROLL
     ======================================================= */

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!closing) {
      html.style.overflowY = "auto";
      body.style.overflowY = "auto";
    } else {
      html.style.overflowY = "auto";
      body.style.overflowY = "auto";
    }

    return () => {
      html.style.overflowY = "auto";
      body.style.overflowY = "auto";
    };
  }, [closing]);


  /* =======================================================
     YES
     ======================================================= */

  const handleYes = () => {
    setClosing(true);
  };


  /* =======================================================
     NO
     ======================================================= */

  const handleNo = () => {
    setDenied(true);

    if (onDeny) {
      onDeny();
    }
  };


  /* =======================================================
     ANIMATION END
     ======================================================= */

  const handleAnimationEnd = (e) => {
    if (
      e.animationName !==
      "overlayReveal"
    ) {
      return;
    }

    setClosed(true);

    if (onConfirm) {
      onConfirm();
    }
  };


  return (

    <div className="scroll">
    <div
      className={`agegate ${
        denied
          ? "agegate--denied"
          : ""
      } ${
        closing
          ? "agegate--closing"
          : ""
      }`}
      onAnimationEnd={
        handleAnimationEnd
      }
    >

      {/* =================================================
          NAVBAR
          ================================================= */}

      {closed && (
        <header
          className="site-navbar"
          role="banner"
        >
          <div className="nav-left">
            <button className="nav-link">
              PRODUCTS ▾
            </button>

            <button className="nav-link">
              LEARN ▾
            </button>
          </div>

          <div className="nav-logo">
            <img
              className="nav-logo-img"
              src="/ChatGPT Image Jul 20, 2026, 04_33_43 PM.png"
              alt="Joy Rush"
            />
          </div>

          <div className="nav-right">
            <button className="nav-btn">
              ACCOUNT
              <span className="icon">
                👤
              </span>
            </button>

            <button className="nav-btn">
              CART
              <span className="icon">
                🛍️
              </span>
            </button>
          </div>
        </header>
      )}


      {/* =================================================
          BACKGROUND
          ================================================= */}

      <div
        className="agegate__bg"
        style={{
        
          backgroundImage:
            `url(${backgroundImg})`,
        }}
      />

      <img
        className="cover1"
        src="/10001.png"
        alt=""
      />


      {/* =================================================
          HERO
          ================================================= */}

      {closing && (
        <div className="hero-copy">

          <StaggeredText
            tag="h1"
            className="hero-title"
            lines={[
              "THC-INFUSED SPARKLING",
              "JUICES & GUMMIES",
            ]}
            baseDelay={200}
            charDelay={22}
          />

          <StaggeredText
            tag="h2"
            className="hero-subtitle"
            lines={[
              "CRAFTED FOR THOSE WHO WANT TO LIVE FULLY AND SAVOR",
              "JOYFUL MOMENTS—ALL WHILE MAKING SMARTER",
              "LIFESTYLE CHOICES.",
            ]}
            baseDelay={1300}
            charDelay={10}
          />

        </div>
      )}


      {/* =================================================
          SHOP NOW
          ================================================= */}

      {closing && (
        <div className="body">
          <div className="stage">

            <div className="morph-btn">
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

            <button className="pill">
              SHOP NOW
            </button>

          </div>
        </div>
      )}


      {/* =================================================
          TOP TICKER
          ================================================= */}

      {closing && (
        <div className="wallticker">
          <div className="wallticker__track">

            <AnnounceSequence
              seqIndex={0}
              prefix="wallticker"
            />

            <AnnounceSequence
              seqIndex={1}
              prefix="wallticker"
            />

          </div>
        </div>
      )}


      {/* =================================================
          NEW TRUE INFINITE BOTTOM CAROUSEL
          ================================================= */}

      {closing && (
        <div className="bottom-infinite-carousel">

          <div className="bottom-infinite-track">

            {/* COPY 1 */}
            <div className="bottom-infinite-sequence">

              <span>
                NO ADDED SUGARS
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                GLUTEN FREE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                LOW CALORIE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                FUNCTIONAL INGREDIENTS
              </span>

              <b className="bottom-star">
                ✳
              </b>

            </div>


            {/* COPY 2 */}
            <div
              className="bottom-infinite-sequence"
              aria-hidden="true"
            >

              <span>
                NO ADDED SUGARS
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                GLUTEN FREE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                LOW CALORIE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                FUNCTIONAL INGREDIENTS
              </span>

              <b className="bottom-star">
                ✳
              </b>

            </div>


            {/* COPY 3 */}
            <div
              className="bottom-infinite-sequence"
              aria-hidden="true"
            >

              <span>
                NO ADDED SUGARS
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                GLUTEN FREE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                LOW CALORIE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                FUNCTIONAL INGREDIENTS
              </span>

              <b className="bottom-star">
                ✳
              </b>

            </div>


            {/* COPY 4 */}
            <div
              className="bottom-infinite-sequence"
              aria-hidden="true"
            >

              <span>
                NO ADDED SUGARS
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                GLUTEN FREE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                LOW CALORIE
              </span>

              <b className="bottom-star">
                ✳
              </b>

              <span>
                FUNCTIONAL INGREDIENTS
              </span>

              <b className="bottom-star">
                ✳
              </b>

            </div>

          </div>

        </div>
      )}


      {/* =================================================
          APPLE + CART
          ================================================= */}

      {closing && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            padding: "48px 0",
          }}
        >

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 10,
              position: "fixed",
              top: "850px",
              right: "50px",
            }}
          >

            <RippleIconButton
              Icon={AppleMark}
            />

            <RippleIconButton
              Icon={CartMark}
            />

          </div>

        </div>
      )}


      {/* =================================================
          AGE OVERLAY
          ================================================= */}

      {!closed && (
        <div className="agegate__overlay">

          <div className="agegate__cloud-wrap">

            <svg
              className="agegate__cloud-svg"
              viewBox="0 0 1019 689"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M515 0C515.11 0.14 516.03 0.43 516.39 0.45L524.06 0.85C544.64 1.92 564.34 8.28 582.64 17.72C611.75 33 635.41 57.53 646.77 88.9C682.79 68.98 725.76 64.41 765.33 74.98C785.23 80.41 803.57 89.46 819.66 102.28C850.77 127.22 869.29 163.58 866.9 203.82C912.55 201.57 958.09 218.55 988.34 252.68C1002.18 268.42 1011.88 286.87 1016.26 307.34C1017.43 312.81 1018.07 318.99 1018.05 323.74C1018.05 324.22 1018.46 325.1 1018.5 325V337C1018.48 336.86 1017.99 337.83 1017.99 338.15V349.25C1017.99 349.67 1018.49 350.64 1018.5 350.5V362C1017.74 361.98 1018.07 368.08 1017.62 371.58C1014.91 392.32 1006.38 411.5 993.63 428.08C963.58 466.52 915.24 485.75 866.77 483.34C869.72 523.04 852.09 559.34 821.96 584.52C806.89 597.08 789.7 606.19 770.93 612.09C729.88 624.72 684.37 620.63 646.65 599.73C635.27 631.17 611.71 655.58 582.74 670.86C565.14 679.99 546.34 685.67 526.55 687.64C523.94 687.9 516.45 687.89 517.01 688.5H501.51C501.42 688.35 500.49 688.05 500.03 688.04C479.89 687.51 458.71 681.8 440.6 673.05C409.23 657.89 383.84 632.08 372.34 599.69C334.41 621.07 287.28 624.76 246.22 611.48C226.04 604.82 207.62 594.42 192.05 580.05C165.29 555.4 150 521.56 152.21 484.87C102.64 487.31 53.39 467.1 23.69 427.29C11.1 410.08 2.98 390.32 1 369.05C0.76 366.46 0.96 364.07 0.01 362V353.5C1.42 351.97 1.42 338.03 0.01 336.5V328.5C0.74 325.95 0.81 323.66 1.06 320.93C3.14 298.51 12.15 277.73 25.95 260C56.03 221.93 104.26 202.96 152.32 205.36C149.35 164.81 167.77 127.9 198.86 102.77C214.1 90.48 231.37 81.62 250.19 76.01C290.63 64.14 335.3 68.38 372.46 88.98C382.51 61.34 401.52 39.51 425.97 23.89C449.83 8.64 476.75 1.45 504.51 0.01H515.01L515 0ZM604.13 605.2C613.65 595.06 621.24 583.66 625.92 570.62L634.41 546.99C634.55 546.61 635.32 546.01 635.75 546.24L660.79 560.12C681.89 571.82 705.84 576.18 729.99 575.05C769.97 573.18 808.89 553.73 830.51 519.64C841.65 502.08 847.43 481.85 845.94 461.08L844.3 438.23L872.06 439.46C914.33 441.33 958.99 420.23 982.16 383.92C1002.69 351.76 1002.96 311.35 982.82 278.96C960.23 242.63 915.17 220.55 873.56 222.34L844.73 223.58L845.99 201.43C847.15 180.97 841.53 161.12 830.59 143.83C808.4 108.77 768.1 89.25 727.02 88.19C703.81 87.59 680.96 92.14 660.72 103.28L635.01 117.43L625.94 92.38C620.36 76.98 610.71 63.92 598.84 52.66C547.83 5.38 461.9 7.72 414.35 58.77C405.19 68.94 397.78 80.04 393.13 92.92L384.24 117.55L358.34 103.23C336.61 91.22 311.75 86.86 286.92 88.42C247.69 90.88 209.74 110.3 188.51 143.87C177.3 161.6 171.72 182 173.22 202.97L174.81 225.14L146 223.88C104.52 222.07 59.97 243.56 37.07 279.27C15.49 312.93 16.26 355.45 38.89 388.39C62.7 423.05 105.94 442.77 147.47 440.97L174.44 439.8L173.13 462.05C171.84 483.82 178.41 504.92 190.74 522.85C212.74 554.84 250.03 573.04 288.54 575C312.85 576.24 337.02 571.86 358.25 560.14L384.09 545.87L393.34 571.35C398.6 585.85 407.59 598.14 418.51 609.01C468.87 657.7 556.11 656.31 604.14 605.18L604.13 605.2Z"
                fill="#FE431A"
              />

              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M604.13 605.2C556.1 656.32 468.86 657.71 418.5 609.03C407.59 598.17 398.6 585.87 393.33 571.37L384.08 545.89L358.24 560.16C337.01 571.88 312.84 576.26 288.53 575.02C250.01 573.06 212.72 554.86 190.73 522.87C178.4 504.93 171.83 483.84 173.12 462.07L174.43 439.82L147.46 440.99C105.93 442.79 62.69 423.06 38.88 388.41C16.25 355.47 15.47 312.94 37.06 279.29C59.96 243.58 104.51 222.09 145.99 223.9L174.8 225.16L173.21 202.99C171.7 182.03 177.29 161.62 188.5 143.89C209.73 110.32 247.68 90.9 286.91 88.44C311.73 86.88 336.6 91.24 358.33 103.25L384.23 117.57L393.12 92.94C397.77 80.06 405.18 68.96 414.34 58.79C461.89 7.74 547.81 5.4 598.83 52.68C610.7 63.94 620.36 76.99 625.93 92.4L635 117.45L660.71 103.3C680.95 92.16 703.8 87.62 727.01 88.21C768.09 89.27 808.38 108.79 830.58 143.85C841.52 161.13 847.14 180.99 845.98 201.45L844.72 223.6L873.55 222.36C915.16 220.57 960.22 242.65 982.81 278.98C1002.95 311.37 1002.68 351.78 982.15 383.94C958.98 420.24 914.32 441.34 872.05 439.48L844.29 438.25L845.93 461.1C847.42 481.87 841.64 502.1 830.5 519.66C808.88 553.75 769.97 573.2 729.98 575.07C705.83 576.2 681.87 571.84 660.78 560.14L635.74 546.26C635.32 546.03 634.54 546.63 634.4 547.01L625.91 570.64C621.23 583.68 613.65 595.09 604.12 605.22L604.13 605.2Z"
                fill="#FBF6ED"
              />

            </svg>


            {/* =================================================
                AGE CONTENT
                ================================================= */}

            <div className="agegate__content">

              {denied ? (

                <div className="agegate__denied">

                  <p className="agegate__denied-title">
                    sorry,
                  </p>

                  <p className="agegate__denied-title">
                    we can't let you enter.
                  </p>

                  <p
                    className="agegate__subtitle"
                    style={{
                      textTransform: "none",
                    }}
                  >
                    You must be at least
                    21 years old
                  </p>

                  <p
                    className="agegate__subtitle"
                    style={{
                      textTransform: "none",
                      marginBottom: "22px",
                    }}
                  >
                    to view this site.
                  </p>

                  <div className="agegate__buttons">

                    <button className="agegate__btn">
                      visit our instagram
                    </button>

                  </div>

                  <p
                    className="agegate__legal"
                    style={{
                      textTransform: "none",
                    }}
                  >
                    By entering this site you
                    are agreeing to the Privacy
                    Policy.
                  </p>

                </div>

              ) : (

                <>

                  <StaggeredText
                    tag="h1"
                    className="agegate__title"
                    lines={[
                      "Please Confirm",
                      "Your Age.",
                    ]}
                    baseDelay={500}
                    charDelay={35}
                  />

                  <StaggeredText
                    tag="p"
                    className="agegate__subtitle1"
                    lines={[
                      "You must be at least 21 years old",
                      "to enter this site.",
                    ]}
                    baseDelay={1400}
                    charDelay={18}
                  />

                  <div className="agegate__buttons">

                    <button
                      className="agegate__btn"
                      onClick={handleYes}
                    >
                      Yes
                    </button>

                    <button
                      className="agegate__btn"
                      onClick={handleNo}
                    >
                      No
                    </button>

                  </div>

                  <p className="agegate__legal">

                    By entering this site you are
                    agreeing to the{" "}

                    <a
                      href="/privacy-policy"
                      className="agegate__legal-link"
                    >
                      privacy policy.
                    </a>

                  </p>

                </>

              )}

            </div>

          </div>

        </div>
      )}

    </div>

    {closed && (
      <>
        <ProductCarousel />
        <ProductCarousel2 />
        <AboutSection />
        <JoyRush/>
        

        <JoyRushHero/>

        <JoyRushReviews/>

        <BundleSave/>


        <Footer/>




        
        <Footer2/>
        
      </>
    )}

    </div>
  );
}