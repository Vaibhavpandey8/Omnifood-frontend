import Hero from "../components/Hero";
import FeaturedIn from "../components/FeaturedIn";
import HowItWorks from "../components/HowItWorks";
import Meals from "../components/Meals";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Signup from "../components/Signup";
import CustomCursor from "../components/CustomCursor";

const Home = () => {
  return (
    <>
      <CustomCursor />
      <Hero />
      <FeaturedIn />
      <HowItWorks />
      <Meals />
      <Testimonials />
      <Pricing />
      <section className="section-cta" id="cta">
        <div className="container">
          <div className="cta">
            <div className="cta-text-box">
              <h2 className="heading-secondary">Get your first meal for free!</h2>
              <p className="cta-text">
                Healthy, tasty and hassle-free meals are waiting for you. Start
                eating well today. You can cancel or pause anytime. And the
                first meal is on us!
              </p>
              <Signup />
            </div>
            <div className="cta-img-box" role="img" aria-label="Woman enjoying food"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;