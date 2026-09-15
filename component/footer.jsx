import React, { useEffect, useRef, useState } from 'react';
import './footer.css';

export default function Footer() {
  const heroRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Mouse parallax + subtle rotation on the hero images
  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const rotateY = (dx / centerX) * 5;

      if (leftImageRef.current) {
        const x = dx * 0.03;
        const y = dy * 0.03;
        leftImageRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotateY * 0.3}deg)`;
      }

      if (rightImageRef.current) {
        const x = -dx * 0.04;
        const y = -dy * 0.04;
        rightImageRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${-rotateY * 0.3}deg)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trigger hero text animation on intersection (matches original IntersectionObserver behavior)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    const headings = heroRef.current
      ? heroRef.current.querySelectorAll('.hero-text h2')
      : [];
    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2000);
  };

  return (
    <div className="joy-rush-page">
<div className="color">
     {/* <svg viewBox="0 0 1440 108" xmlns="http://www.w3.org/2000/svg">
<defs>
  <pattern id="noisePattern" patternUnits="userSpaceOnUse" width="700" height="700">
    <image href="//drinkjoyrush.com/cdn/shop/t/19/assets/noise.webp?v=120341862010877411541783600983" width="700" height="700"></image>
  </pattern>
  <clipPath id="cloudClip">
    <path d="M329.758 315.16C331.359 454.342 219.192 568.475 79.2262 570.085C-60.7394 571.694 -175.501 460.17 -177.102 320.989C-178.702 181.807 -66.5354 67.6736 73.4302 66.0641C213.396 64.4545 328.158 175.979 329.758 315.16Z"></path>
    <path d="M1110.22 316.881C1108.61 177.699 1220.78 63.5654 1360.75 61.9559C1500.71 60.3464 1615.47 171.87 1617.08 311.052C1618.68 450.234 1506.51 564.367 1366.54 565.977C1226.58 567.586 1111.82 456.062 1110.22 316.881Z"></path>
    <path d="M593.796 282.209C595.396 421.391 483.229 535.524 343.264 537.134C203.298 538.743 88.536 427.219 86.9355 288.038C85.335 148.856 197.502 34.7224 337.468 33.1129C477.433 31.5034 592.195 143.027 593.796 282.209Z"></path>
    <path d="M1346.9 282.209C1348.5 421.391 1236.33 535.524 1096.36 537.134C956.398 538.743 841.636 427.219 840.036 288.038C838.435 148.856 950.602 34.7224 1090.57 33.1129C1230.53 31.5034 1345.3 143.027 1346.9 282.209Z"></path>
    <path d="M1111.17 392.254C1113.66 608.68 939.242 786.156 721.597 788.659C503.952 791.162 325.499 617.743 323.01 401.318C320.522 184.893 494.94 7.41628 712.584 4.91347C930.229 2.41067 1108.68 175.829 1111.17 392.254Z"></path>
  </clipPath>
</defs>

<g clip-path="url(#cloudClip)" fill="#ff9dd3">
  <path d="M329.758 315.16C331.359 454.342 219.192 568.475 79.2262 570.085C-60.7394 571.694 -175.501 460.17 -177.102 320.989C-178.702 181.807 -66.5354 67.6736 73.4302 66.0641C213.396 64.4545 328.158 175.979 329.758 315.16Z"></path>
  <path d="M1110.22 316.881C1108.61 177.699 1220.78 63.5654 1360.75 61.9559C1500.71 60.3464 1615.47 171.87 1617.08 311.052C1618.68 450.234 1506.51 564.367 1366.54 565.977C1226.58 567.586 1111.82 456.062 1110.22 316.881Z"></path>
  <path d="M593.796 282.209C595.396 421.391 483.229 535.524 343.264 537.134C203.298 538.743 88.536 427.219 86.9355 288.038C85.335 148.856 197.502 34.7224 337.468 33.1129C477.433 31.5034 592.195 143.027 593.796 282.209Z"></path>
  <path d="M1346.9 282.209C1348.5 421.391 1236.33 535.524 1096.36 537.134C956.398 538.743 841.636 427.219 840.036 288.038C838.435 148.856 950.602 34.7224 1090.57 33.1129C1230.53 31.5034 1345.3 143.027 1346.9 282.209Z"></path>
  <path d="M1111.17 392.254C1113.66 608.68 939.242 786.156 721.597 788.659C503.952 791.162 325.499 617.743 323.01 401.318C320.522 184.893 494.94 7.41628 712.584 4.91347C930.229 2.41067 1108.68 175.829 1111.17 392.254Z"></path>
</g>

<rect width="1440" height="108" fill="url(#noisePattern)" clip-path="url(#cloudClip)" opacity="1"></rect>
</svg>  */}
{/* <img className="noise-texture" src="assets5/ChatGPT Image Sep 15, 2026, 02_53_52 PM.png" alt="Noise Texture" />  


*/}





<img className='pink' src="assets5/ChatGPT Image Sep 15, 2026, 03_24_46 PM.png" alt="" srcset="" />



</div>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <h1>Joy Rush</h1>
        </div>

        {/* Hero Section */}
        <div className="hero" id="hero" ref={heroRef}>
          {/* Left Parallax Image */}
          <div className="parallax-image image-left" ref={leftImageRef} data-speed="0.03">
            <img src="assets5\2clouadu3.png" alt="Two friends laughing" />
          </div>

          {/* Hero Text */}
          <div className="hero-text">
            <h2 className="shimmer-text">MORE JOY</h2>
            <h2 className="shimmer-text">MORE OFTEN</h2>
          </div>

          {/* Right Parallax Image */}
          <div className="parallax-image image-right" ref={rightImageRef} data-speed="0.04">
            <img src="assets5\2cloadu2.png" alt="Person with colorful dots" />
          </div>

          {/* Email Form */}
          <div className="email-form">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              style={{ background: subscribed ? '#2d8a4e' : '#8B1A1A' }}
            >
              {subscribed ? '✓ SUBSCRIBED!' : 'NOTIFY ME'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-column">
            <h3>DRINKS</h3>
            <ul>
              <li><a href="#">TROPICAL TANGERINE</a></li>
              <li><a href="#">RUBY ORANGE</a></li>
              <li><a href="#">LUSH CHERRY</a></li>
              <li><a href="#">WILD BERRIES</a></li>
              <li><a href="#">VARIETY PACK</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>GUMMIES</h3>
            <ul>
              <li><a href="#">SOCIAL SPARK</a></li>
              <li><a href="#">SWEET DREAMS</a></li>
              <li><a href="#">PURE ZEN</a></li>
              <li><a href="#">STRESS MELT</a></li>
              <li><a href="#">DAILY ELEVATION</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>EXPLORE</h3>
            <ul>
              <li><a href="#">ABOUT US</a></li>
              <li><a href="#">FIND US</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>JOY RUSH</h3>
            <ul>
              <li><a href="#">CONTACT US</a></li>
              <li><a href="#">MY ACCOUNT</a></li>
              <li><a href="#">LAB RESULTS</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>LEGAL</h3>
            <ul>
              <li><a href="#">REFUND POLICY</a></li>
              <li><a href="#">PRIVACY POLICY</a></li>
              <li><a href="#">SHIPPING POLICY</a></li>
              <li><a href="#">TERMS OF SERVICE</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Icons */}
      {/* <div className="bottom-icons">
        <div className="icon-circle">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C10 2 8 3 8 5C8 3 6 2 4 2C2 2 2 4 2 6C2 10 6 14 12 22C18 14 22 10 22 6C22 4 22 2 20 2C18 2 16 3 16 5C16 3 14 2 12 2Z" />
          </svg>
        </div>
        <div className="icon-circle">
          <svg viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.17 14.75l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0020 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25z" />
          </svg>
        </div>
      </div> */}
    </div>
  );
}
