import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);
  const deliveredRef = useRef(null);
  const imgRef = useRef(null);
  const sectionRef = useRef(null);
  const typewriterRef = useRef(null);

  const texts = [
    "Never cook again!",
    "Eat healthy every day!",
    "365 days, zero effort!",
    "Your personal chef awaits!",
  ];

  useEffect(() => {
    // Entry animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }, "-=0.5"
    )
    .fromTo(btnsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 }, "-=0.4"
    )
    .fromTo(deliveredRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }, "-=0.3"
    )
    .fromTo(imgRef.current,
      { opacity: 0, x: 120, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2 }, "-=1.5"
    );

    // Parallax on scroll
    gsap.to(imgRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Letter bounce - word level wrap
    const heading = headingRef.current;
    if (heading) {
      const words = heading.textContent.split(" ");
      heading.innerHTML = words.map((word) =>
        `<span style="display:inline-block; white-space:nowrap">${
          word.split("").map((char) =>
            `<span class="bounce-letter" style="display:inline-block; transition: transform 0.2s ease, color 0.2s ease; cursor:default">${char}</span>`
          ).join("")
        }</span>`
      ).join(" ");

      heading.querySelectorAll(".bounce-letter").forEach((letter) => {
        letter.addEventListener("mouseenter", () => {
          gsap.to(letter, { y: -8, color: "#e67e22", duration: 0.2 });
        });
        letter.addEventListener("mouseleave", () => {
          gsap.to(letter, { y: 0, color: "inherit", duration: 0.2 });
        });
      });
    }

    // Typewriter
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const typeWriter = () => {
      const current = texts[textIndex];
      const el = typewriterRef.current;
      if (!el) return;

      if (!isDeleting) {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          timer = setTimeout(typeWriter, 1500);
          return;
        }
      } else {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
      timer = setTimeout(typeWriter, isDeleting ? 60 : 100);
    };

    setTimeout(typeWriter, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-hero" ref={sectionRef}>
      <div className="hero">
        <div className="hero-text-box">
          <h1 className="heading-primary" ref={headingRef}>
            A healthy meal delivered to your door, every single day
          </h1>

          <p className="hero-description" ref={descRef}>
            The smart 365-days-per-year food subscription that will make you
            eat healthy again. Tailored to your personal tastes and nutritional
            needs.
          </p>

          <div ref={btnsRef}>
            <p style={{
              fontSize: "2.2rem",
              fontWeight: 600,
              color: "#e67e22",
              marginBottom: "2rem",
              minHeight: "3.5rem",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <span ref={typewriterRef}></span>
              <span style={{
                display: "inline-block",
                width: "3px",
                height: "2.4rem",
                backgroundColor: "#e67e22",
                animation: "blink 0.7s step-end infinite",
                marginLeft: "2px",
                verticalAlign: "middle"
              }}></span>
            </p>

            <a href="#cta" className="btn btn--full margin-right-sm">
              Start eating well
            </a>
            <a href="#how" className="btn btn--outline">
              Learn more &darr;
            </a>
          </div>

          <div className="delivered-meals" ref={deliveredRef}>
            <div className="delivered-imgs">
              <img src="/img/customers/customer-1.jpg" alt="Customer photo" />
              <img src="/img/customers/customer-2.jpg" alt="Customer photo" />
              <img src="/img/customers/customer-3.jpg" alt="Customer photo" />
              <img src="/img/customers/customer-4.jpg" alt="Customer photo" />
              <img src="/img/customers/customer-5.jpg" alt="Customer photo" />
              <img src="/img/customers/customer-6.jpg" alt="Customer photo" />
            </div>
            <p className="delivered-text">
              <span>250,000+</span> meals delivered last year!
            </p>
          </div>
        </div>

        <div className="hero-img-box" ref={imgRef}>
          <picture>
            <source srcSet="/img/hero.webp" type="image/webp" />
            <source srcSet="/img/hero-min.png" type="image/png" />
            <img
              src="/img/hero-min.png"
              className="hero-img"
              alt="Woman enjoying food"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Hero;