import React, { useEffect, useRef, useState } from 'react';
import './BundleSave.css';

/**
 * Bundle & Save - Joy Rush
 * React conversion of the original HTML/CSS/JS marketing section.
 *
 * Behavior preserved from the original script:
 *  - Scroll progress bar at the top of the page
 *  - IntersectionObserver reveal for the cans, CTA, and gummies sections
 *  - Mouse-move parallax on the can/gummy images while their section is visible
 */

const CANS = [
  {
    src: 'https://drinkjoyrush.com/cdn/shop/files/bundle-can-1.png?v=1777127369',
    alt: 'Joy Rush Ruby Orange Can',
    className: 'b-bundle__image--anchor',
    rotate: 'rotate(-6.16deg)',
  },
  {
    src: 'https://drinkjoyrush.com/cdn/shop/files/bundle-can-2.png?v=1777127369',
    alt: 'Joy Rush Lush Cherry Can',
    className: 'b-bundle__image--float',
    rotate: 'translate(-19%, 6%) rotate(-21.25deg)',
  },
  {
    src: 'https://drinkjoyrush.com/cdn/shop/files/bundle-can-3.png?v=1777127369',
    alt: 'Joy Rush Tropical Tangerine Can',
    className: 'b-bundle__image--float',
    rotate: 'translate(-60%, 15%) rotate(-40.99deg)',
  },
];

const GUMMIES = [
  {
    src: 'https://drinkjoyrush.com/cdn/shop/files/pure-zen-new.png?v=1780659321',
    alt: 'Joy Rush Pure Zen Gummies',
    className: 'b-bundle__image--anchor',
    rotate: 'rotate(10.9deg)',
  },
  {
    src: 'https://drinkjoyrush.com/cdn/shop/files/sweet-dreams-new.png?v=1780659321',
    alt: 'Joy Rush Sweet Dreams Gummies',
    className: 'b-bundle__image--float',
    rotate: 'translate(43%, 7%) rotate(17.37deg)',
  },
  {
    src: 'https://drinkjoyrush.com/cdn/shop/files/stress-melt-new.png?v=1780659321',
    alt: 'Joy Rush Stress Melt Gummies',
    className: 'b-bundle__image--float',
    rotate: 'translate(90%, 19%) rotate(25.82deg)',
  },
];

const DEALS = [
  {
    spend: 'spend $50',
    save: 'save $5',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.52667 14.0003L2 7.47363V8.80697C2 9.1603 2.14 9.5003 2.39333 9.74697L7.58667 14.9403C8.10667 15.4603 8.95333 15.4603 9.47333 14.9403L13.6133 10.8003C14.1333 10.2803 14.1333 9.43363 13.6133 8.91363L8.52667 14.0003Z" fill="currentColor" />
        <path d="M7.58667 11.6067C7.84667 11.8667 8.18667 12 8.52667 12C8.86667 12 9.20667 11.8667 9.46667 11.6067L13.6067 7.46667C14.1267 6.94667 14.1267 6.1 13.6067 5.58L8.41333 0.386667C8.16667 0.14 7.82667 0 7.47333 0H3.33333C2.6 0 2 0.6 2 1.33333V5.47333C2 5.82667 2.14 6.16667 2.39333 6.41333L7.58667 11.6067ZM3.33333 1.33333H7.47333L12.6667 6.52667L8.52667 10.6667L3.33333 5.47333V1.33333Z" fill="currentColor" />
        <path d="M4.83333 3.66667C5.29357 3.66667 5.66667 3.29357 5.66667 2.83333C5.66667 2.3731 5.29357 2 4.83333 2C4.3731 2 4 2.3731 4 2.83333C4 3.29357 4.3731 3.66667 4.83333 3.66667Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    spend: 'spend $75',
    save: 'free shipping',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3V4H9.5V11.5H6.422C6.199 10.6405 5.426 10 4.5 10C3.574 10 2.801 10.6405 2.578 11.5H2V9H1V12.5H2.578C2.801 13.3595 3.574 14 4.5 14C5.426 14 6.199 13.3595 6.422 12.5H10.578C10.801 13.3595 11.574 14 12.5 14C13.426 14 14.199 13.3595 14.422 12.5H16V8.422L15.9685 8.3435L14.9685 5.3435L14.86 5H10.5V3H0ZM0.5 5V6H5V5H0.5ZM10.5 6H14.1405L15 8.5625V11.5H14.422C14.199 10.6405 13.426 10 12.5 10C11.574 10 10.801 10.6405 10.578 11.5H10.5V6ZM1 7V8H4V7H1ZM4.5 11C5.0585 11 5.5 11.4415 5.5 12C5.5 12.5585 5.0585 13 4.5 13C3.9415 13 3.5 12.5585 3.5 12C3.5 11.4415 3.9415 11 4.5 11ZM12.5 11C13.0585 11 13.5 11.4415 13.5 12C13.5 12.5585 13.0585 13 12.5 13C11.9415 13 11.5 12.5585 11.5 12C11.5 11.4415 11.9415 11 12.5 11Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    spend: 'spend $100',
    save: '$10 + free shipping',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.47365 12.4844L10.2268 8.73128M13.9937 9.67071C13.9937 3.94728 8.93879 1.29814 6.55822 0.678711C7.44965 2.90728 7.40051 4.55643 6.24965 6.58843C6.20568 6.66385 6.14426 6.72764 6.07056 6.77444C5.99685 6.82125 5.913 6.8497 5.82604 6.85742C5.73907 6.86515 5.65152 6.85191 5.57072 6.81883C5.48992 6.78575 5.41823 6.73378 5.36165 6.66728L3.89879 5.00785C0.0702215 9.07414 2.27365 15.6147 8.33422 15.3107C12.9708 15.025 13.9937 11.937 13.9937 9.67071Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.92634 9.27748C6.85056 9.27748 6.77789 9.24738 6.72431 9.1938C6.67073 9.14022 6.64062 9.06755 6.64062 8.99177C6.64062 8.91599 6.67073 8.84332 6.72431 8.78974C6.77789 8.73616 6.85056 8.70605 6.92634 8.70605M6.92634 9.27748C7.00212 9.27748 7.07479 9.24738 7.12837 9.1938C7.18195 9.14022 7.21205 9.06755 7.21205 8.99177C7.21205 8.91599 7.18195 8.84332 7.12837 8.78974C7.07479 8.73616 7.00212 8.70605 6.92634 8.70605M9.9652 12.5106C9.88942 12.5106 9.81675 12.4805 9.76317 12.4269C9.70958 12.3734 9.67948 12.3007 9.67948 12.2249C9.67948 12.1491 9.70958 12.0765 9.76317 12.0229C9.81675 11.9693 9.88942 11.9392 9.9652 11.9392M9.9652 12.5106C10.041 12.5106 10.1136 12.4805 10.1672 12.4269C10.2208 12.3734 10.2509 12.3007 10.2509 12.2249C10.2509 12.1491 10.2208 12.0765 10.1672 12.0229C10.1136 11.9693 10.041 11.9392 9.9652 11.9392" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ImageColumn({ id, images, sectionClass, isVisible }) {
  return (
    <div
      id={id}
      className={`b-bundle__images ${sectionClass} ${isVisible ? 'is-visible' : ''}`}
    >
      {images.map((img, i) => (
        <figure
          key={img.src}
          className={`b-bundle__image ${img.className}`}
          style={{ transform: img.rotate }}
        >
          <picture className="mw">
            <img src={img.src} fetchPriority="high" alt={img.alt} width="204" height="430" />
          </picture>
        </figure>
      ))}
    </div>
  );
}

export default function BundleSave() {
  const [cansVisible, setCansVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [gummiesVisible, setGummiesVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const rootRef = useRef(null);
  const holderRef = useRef(null);
  const cansRef = useRef(null);
  const ctaRef = useRef(null);
  const gummiesRef = useRef(null);
  const canImgRefs = useRef([]);
  const gummyImgRefs = useRef([]);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver reveal
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.25 };
    const setters = {
      [cansRef.current]: setCansVisible,
      [ctaRef.current]: setCtaVisible,
      [gummiesRef.current]: setGummiesVisible,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === cansRef.current) setCansVisible(true);
          if (entry.target === ctaRef.current) setCtaVisible(true);
          if (entry.target === gummiesRef.current) setGummiesVisible(true);
        }
      });
    }, observerOptions);

    [cansRef.current, ctaRef.current, gummiesRef.current].forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Mouse parallax
  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;

    const handleMouseMove = (e) => {
      const rect = holder.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      canImgRefs.current.forEach((can, i) => {
        if (!can) return;
        const factor = (i + 1) * 6;
        if (cansVisible) {
          can.style.marginLeft = `${x * factor}px`;
          can.style.marginTop = `${y * factor}px`;
        }
      });

      gummyImgRefs.current.forEach((gum, i) => {
        if (!gum) return;
        const factor = (i + 1) * 6;
        if (gummiesVisible) {
          gum.style.marginLeft = `${-x * factor}px`;
          gum.style.marginTop = `${y * factor}px`;
        }
      });
    };

    const handleMouseLeave = () => {
      canImgRefs.current.forEach((can) => {
        if (can) {
          can.style.marginLeft = '';
          can.style.marginTop = '';
        }
      });
      gummyImgRefs.current.forEach((gum) => {
        if (gum) {
          gum.style.marginLeft = '';
          gum.style.marginTop = '';
        }
      });
    };

    holder.addEventListener('mousemove', handleMouseMove);
    holder.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      holder.removeEventListener('mousemove', handleMouseMove);
      holder.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cansVisible, gummiesVisible]);

  return (
    <div className="bundle-save-root" ref={rootRef}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
{/* 
      <div className="scroll-spacer">
        <div>
          ↓ Scroll down to see the animation ↓
          <span className="arrow">↓</span>
        </div>
      </div> */}

      <section className="b-bundle">
        <div className="pattern-overlay" />
        <div className="wrapper">
          <h2 className="b-bundle__heading" aria-label="Bundle & SAVE">
            <span>
              {'Bundle'.split('').map((ch, i) => (
                <div key={`b-${i}`} aria-hidden="true">{ch}</div>
              ))}
            </span>
            <span>
              <div aria-hidden="true">&amp;</div>
            </span>
            <span>
              {'SAVE'.split('').map((ch, i) => (
                <div key={`s-${i}`} aria-hidden="true">{ch}</div>
              ))}
            </span>
          </h2>

          <p
            className="b-bundle__subhead"
            aria-label="Why pick one? Curate your evening with a variety pack or add in some gummies— a little something for every feeling."
            role="group"
          >
            <span className="lines-mask" aria-hidden="true">
              <span className="lines" aria-hidden="true">Why pick one? Curate your evening with a </span>
            </span>
            <span className="lines-mask" aria-hidden="true">
              <span className="lines" aria-hidden="true">variety pack or add in some gummies— </span>
            </span>
            <span className="lines-mask" aria-hidden="true">
              <span className="lines" aria-hidden="true">a little something for every feeling.</span>
            </span>
          </p>

          <div className="b-bundle__holder" ref={holderRef}>
            {/* LEFT: CANS */}
            <div
              id="cansSection"
              ref={cansRef}
              className={`b-bundle__images b-bundle__images--cans ${cansVisible ? 'is-visible' : ''}`}
            >
              {CANS.map((img, i) => (
                <figure
                  key={img.src}
                  ref={(el) => (canImgRefs.current[i] = el)}
                  className={`b-bundle__image ${img.className}`}
                  style={{ transform: img.rotate }}
                >
                  <picture className="mw">
                    <img src={img.src} fetchPriority="high" alt={img.alt} width="204" height="430" />
                  </picture>
                </figure>
              ))}
            </div>

            {/* CENTER: CTA */}
            <div id="ctaSection" ref={ctaRef} className={`b-bundle__cta center ${ctaVisible ? 'is-visible' : ''}`}>
              <h4 className="b-bundle__content" aria-label="order more. save more. joy more." role="group">
                <div className="lines-mask" aria-hidden="true">
                  <p className="lines" aria-hidden="true">order more.</p>
                </div>
                <div className="lines-mask" aria-hidden="true">
                  <p className="lines" aria-hidden="true">save more.</p>
                </div>
                <div className="lines-mask" aria-hidden="true">
                  <p className="lines" aria-hidden="true">joy more.</p>
                </div>
              </h4>

              <div className="b-bundle__deals">
                {DEALS.map((deal) => (
                  <div className="b-bundle__deal" key={deal.spend}>
                    <span className="b-bundle__deal__icon">{deal.icon}</span>
                    <p className="b-bundle__deal__spend">{deal.spend}</p>
                    <p className="b-bundle__deal__save">{deal.save}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: GUMMIES */}
            <div
              id="gummiesSection"
              ref={gummiesRef}
              className={`b-bundle__images b-bundle__images--gummies ${gummiesVisible ? 'is-visible' : ''}`}
            >
              {GUMMIES.map((img, i) => (
                <figure
                  key={img.src}
                  ref={(el) => (gummyImgRefs.current[i] = el)}
                  className={`b-bundle__image ${img.className}`}
                  style={{ transform: img.rotate }}
                >
                  <picture className="mw">
                    <img src={img.src} fetchPriority="high" alt={img.alt} width="240" height="381" />
                  </picture>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}
