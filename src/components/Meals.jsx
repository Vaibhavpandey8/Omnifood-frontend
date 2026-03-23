import AnimateOnScroll from "./AnimateOnScroll";

const Meals = () => {
  return (
    <section className="section-meals" id="meals">
      <div className="container center-text">
        <AnimateOnScroll direction="up">
          <span className="subheading">Meals</span>
          <h2 className="heading-secondary">Omnifood AI chooses from 5,000+ recipes</h2>
        </AnimateOnScroll>
      </div>
      <div className="container grid grid--3-cols margin-bottom-md">
        <AnimateOnScroll direction="up" delay={0.1}>
          <div className="meal">
            <img src="/img/meals/meal-1.jpg" className="meal-img" alt="Japanese Gyozas" />
            <div className="meal-content">
              <div className="meal-tags">
                <span className="tag tag--vegetarian">Vegetarian</span>
              </div>
              <p className="meal-title">Japanese Gyozas</p>
              <ul className="meal-attributes">
                <li className="meal-attribute">
                  <ion-icon className="meal-icon" name="flame-outline"></ion-icon>
                  <span><strong>650</strong> calories</span>
                </li>
                <li className="meal-attribute">
                  <ion-icon className="meal-icon" name="restaurant-outline"></ion-icon>
                  <span>NutriScore &reg; <strong>74</strong></span>
                </li>
                <li className="meal-attribute">
                  <ion-icon className="meal-icon" name="star-outline"></ion-icon>
                  <span><strong>4.9</strong> rating (537)</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="meal">
            <img src="/img/meals/meal-2.jpg" className="meal-img" alt="Avocado Salad" />
            <div className="meal-content">
              <div className="meal-tags">
                <span className="tag tag--vegan">Vegan</span>
                <span className="tag tag--paleo">Paleo</span>
              </div>
              <p className="meal-title">Avocado Salad</p>
              <ul className="meal-attributes">
                <li className="meal-attribute">
                  <ion-icon className="meal-icon" name="flame-outline"></ion-icon>
                  <span><strong>400</strong> calories</span>
                </li>
                <li className="meal-attribute">
                  <ion-icon className="meal-icon" name="restaurant-outline"></ion-icon>
                  <span>NutriScore &reg; <strong>92</strong></span>
                </li>
                <li className="meal-attribute">
                  <ion-icon className="meal-icon" name="star-outline"></ion-icon>
                  <span><strong>4.8</strong> rating (441)</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={0.3}>
          <div className="diets">
            <h3 className="heading-tertiary">Works with any diet:</h3>
            <ul className="list">
              {["Vegetarian","Vegan","Pescatarian","Gluten-free","Lactose-free","Keto","Paleo","Low FODMAP","Kid-friendly"].map((diet) => (
                <li className="list-item" key={diet}>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  <span>{diet}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateOnScroll>
      </div>
      <div className="container all-recipes">
        <a href="#" className="link">See all recipes &rarr;</a>
      </div>
    </section>
  );
};

export default Meals;