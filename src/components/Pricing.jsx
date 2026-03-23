import { useRef } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import useBounceText from "../hooks/useBounceText";

const Pricing = () => {
  const headingRef = useRef(null);
  useBounceText(headingRef);

  return (
    <section className="section-pricing" id="pricing">
      <div className="container">
        <AnimateOnScroll direction="up">
          <span className="subheading">Pricing</span>
          <h2 className="heading-secondary" ref={headingRef}>
            Eating well without breaking the bank
          </h2>
        </AnimateOnScroll>
      </div>
      <div className="container grid grid--2-cols margin-bottom-md">
        <AnimateOnScroll direction="left" delay={0.1}>
          <div className="pricing-plan pricing-plan--starter">
            <header className="plan-header">
              <p className="plan-name">Starter</p>
              <p className="plan-price"><span>$</span>399</p>
              <p className="plan-text">per month. That's just $13 per meal!</p>
            </header>
            <ul className="list">
              <li className="list-item"><ion-icon className="list-icon" name="checkmark-outline"></ion-icon><span>1 meal per day</span></li>
              <li className="list-item"><ion-icon className="list-icon" name="checkmark-outline"></ion-icon><span>Order from 11am to 9pm</span></li>
              <li className="list-item"><ion-icon className="list-icon" name="checkmark-outline"></ion-icon><span>Delivery is free</span></li>
              <li className="list-item"><ion-icon className="list-icon" name="close-outline"></ion-icon></li>
            </ul>
            <div className="plan-sing-up">
              <a href="#" className="btn btn--full">Start eating well</a>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll direction="right" delay={0.2}>
          <div className="pricing-plan pricing-plan--complete">
            <header className="plan-header">
              <p className="plan-name">Complete</p>
              <p className="plan-price"><span>$</span>649</p>
              <p className="plan-text">per month. That's just $11 per meal!</p>
            </header>
            <ul className="list">
              <li className="list-item"><ion-icon className="list-icon" name="checkmark-outline"></ion-icon><span><strong>2 meals</strong> per day</span></li>
              <li className="list-item"><ion-icon className="list-icon" name="checkmark-outline"></ion-icon><span>Order <strong>24/7</strong></span></li>
              <li className="list-item"><ion-icon className="list-icon" name="checkmark-outline"></ion-icon><span>Delivery is free</span></li>
              <li className="list-item"><ion-icon className="list-icon" name="checkmark-outline"></ion-icon><span>Get access to latest recipes</span></li>
            </ul>
            <div className="plan-sing-up">
              <a href="#" className="btn btn--full">Start eating well</a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <div className="container grid">
        <aside className="plan-details">
          Prices include all applicable taxes. You can cancel at any time. Both plans include the following:
        </aside>
      </div>

      <div className="container grid grid--4-cols">
        {[
          { icon: "infinite-outline", title: "Never cook again!", text: "Our subscriptions cover 365 days per year, even including major holidays." },
          { icon: "nutrition-outline", title: "Local and organic", text: "Our cooks only use local, fresh, and organic products to prepare your meals." },
          { icon: "leaf-outline", title: "No waste", text: "All our partners only use reusable containers to package all your meals." },
          { icon: "pause-outline", title: "Pause anytime", text: "Going on vacation? Just pause your subscription, and we refund unused days." },
        ].map((feature, i) => (
          <AnimateOnScroll key={feature.title} direction="up" delay={i * 0.1}>
            <div className="feature">
              <ion-icon className="feature-icon" name={feature.icon}></ion-icon>
              <p className="feature-title">{feature.title}</p>
              <p className="feature-text">{feature.text}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

export default Pricing;