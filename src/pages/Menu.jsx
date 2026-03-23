import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CustomCursor from "../components/CustomCursor";
import PaymentModal from "../components/PaymentModal";

const Menu = () => {
  const { user, token } = useAuth();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [orderModal, setOrderModal] = useState(null);
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/meals");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const filtered = filter === "all" ? meals : meals.filter(m => m.category === filter);

  const handleProceedToPayment = () => {
    if (!address) return alert("Please enter delivery address!");
    setPendingOrder({ meal: orderModal, quantity, address });
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setOrderModal(null);
    setOrderSuccess(true);
    setAddress("");
    setQuantity(1);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  return (
    <>
      <CustomCursor />

      {/* Payment Modal */}
      {showPayment && pendingOrder && (
        <PaymentModal
          meal={pendingOrder.meal}
          quantity={pendingOrder.quantity}
          address={pendingOrder.address}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* Order Success Toast */}
      {orderSuccess && (
        <div style={{
          position: "fixed", top: "2rem", right: "2rem",
          backgroundColor: "#27ae60", color: "white",
          padding: "1.6rem 2.4rem", borderRadius: "9px",
          fontSize: "1.6rem", fontWeight: 500, zIndex: 99999,
          boxShadow: "0 1rem 2rem rgba(0,0,0,0.2)",
        }}>
          🎉 Order placed successfully!
        </div>
      )}

      {/* Order Modal */}
      {orderModal && !showPayment && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "white", borderRadius: "11px", padding: "3.2rem",
            width: "90%", maxWidth: "50rem", position: "relative",
          }}>
            <button
              onClick={() => setOrderModal(null)}
              style={{
                position: "absolute", top: "1.6rem", right: "1.6rem",
                background: "none", border: "none", fontSize: "2rem",
                cursor: "none", color: "#000",
              }}
            >✕</button>

            <h3 style={{ fontSize: "2.4rem", fontWeight: 600, marginBottom: "2rem", color: "#000" }}>
              Order {orderModal.name}
            </h3>

            <img
              src={orderModal.image}
              alt={orderModal.name}
              style={{ width: "100%", height: "20rem", objectFit: "cover", borderRadius: "9px", marginBottom: "2rem" }}
              onError={(e) => e.target.src = "/img/meals/meal-1.jpg"}
            />

            <div style={{ marginBottom: "1.6rem" }}>
              <label style={{ fontSize: "1.6rem", fontWeight: 500, display: "block", marginBottom: "0.8rem", color: "#000" }}>
                Quantity
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: "3.6rem", height: "3.6rem", borderRadius: "50%",
                    border: "2px solid #e67e22", background: "none",
                    fontSize: "2rem", color: "#e67e22", cursor: "none",
                  }}
                >-</button>
                <span style={{ fontSize: "2rem", fontWeight: 600, color: "#000" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: "3.6rem", height: "3.6rem", borderRadius: "50%",
                    border: "2px solid #e67e22", background: "none",
                    fontSize: "2rem", color: "#e67e22", cursor: "none",
                  }}
                >+</button>
                <span style={{ fontSize: "1.6rem", color: "#000" }}>
                  Total: <strong style={{ color: "#e67e22" }}>${orderModal.price * quantity}</strong>
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "2.4rem" }}>
              <label style={{ fontSize: "1.6rem", fontWeight: 500, display: "block", marginBottom: "0.8rem", color: "#000" }}>
                Delivery Address
              </label>
              <input
                type="text"
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: "100%", padding: "1.2rem", fontSize: "1.6rem",
                  border: "1px solid #ddd", borderRadius: "9px",
                  fontFamily: "inherit", outline: "none", color: "#000",
                }}
              />
            </div>

            <button
              onClick={handleProceedToPayment}
              style={{
                width: "100%", padding: "1.4rem", backgroundColor: "#e67e22",
                color: "white", border: "none", borderRadius: "9px",
                fontSize: "1.8rem", fontWeight: 600, cursor: "none",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={e => e.target.style.backgroundColor = "#cf711f"}
              onMouseLeave={e => e.target.style.backgroundColor = "#e67e22"}
            >
              Proceed to Payment 💳
            </button>
          </div>
        </div>
      )}

      <main style={{ padding: "9.6rem 0", minHeight: "80vh" }}>
        <div className="container">
          <span className="subheading">Our Menu</span>
          <h2 className="heading-secondary" style={{ marginBottom: "4.8rem" }}>
            All our delicious meals
          </h2>

          <div style={{ display: "flex", gap: "1.6rem", marginBottom: "4.8rem", flexWrap: "wrap" }}>
            {["all", "vegetarian", "vegan", "paleo"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "0.8rem 2rem", fontSize: "1.4rem", fontWeight: 500,
                  borderRadius: "9px", border: "2px solid #e67e22",
                  backgroundColor: filter === cat ? "#e67e22" : "transparent",
                  color: filter === cat ? "white" : "#e67e22",
                  cursor: "none", textTransform: "capitalize", transition: "all 0.3s ease",
                }}
              >
                {cat === "all" ? "All Meals" : cat}
              </button>
            ))}
          </div>

          {loading ? (
            <p style={{ fontSize: "1.8rem", color: "#888" }}>Loading meals... 🍽️</p>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4.8rem" }}>
              <p style={{ fontSize: "2rem", color: "#888" }}>No meals found! 😔</p>
            </div>
          ) : (
            <div className="grid grid--3-cols">
              {filtered.map((meal) => (
                <div className="meal" key={meal._id}>
                  <img
                    src={meal.image}
                    className="meal-img"
                    alt={meal.name}
                    onError={(e) => e.target.src = "/img/meals/meal-1.jpg"}
                  />
                  <div className="meal-content">
                    <div className="meal-tags">
                      <span className={`tag tag--${meal.category}`}>
                        {meal.category}
                      </span>
                    </div>
                    <p className="meal-title">{meal.name}</p>
                    <ul className="meal-attributes">
                      <li className="meal-attribute">
                        <ion-icon className="meal-icon" name="flame-outline"></ion-icon>
                        <span><strong>{meal.calories}</strong> calories</span>
                      </li>
                      <li className="meal-attribute">
                        <ion-icon className="meal-icon" name="restaurant-outline"></ion-icon>
                        <span>NutriScore &reg; <strong>{meal.nutriscore}</strong></span>
                      </li>
                      <li className="meal-attribute">
                        <ion-icon className="meal-icon" name="star-outline"></ion-icon>
                        <span><strong>{meal.rating}</strong> rating</span>
                      </li>
                      <li className="meal-attribute">
                        <ion-icon className="meal-icon" name="cash-outline"></ion-icon>
                        <span><strong>${meal.price}</strong> per meal</span>
                      </li>
                    </ul>
                    {user ? (
                      <button
                        onClick={() => { setOrderModal(meal); setQuantity(1); setAddress(""); }}
                        style={{
                          width: "100%", marginTop: "2rem", padding: "1.2rem",
                          backgroundColor: "#e67e22", color: "white", border: "none",
                          borderRadius: "9px", fontSize: "1.6rem", fontWeight: 500,
                          cursor: "none", transition: "background-color 0.3s",
                        }}
                        onMouseEnter={e => e.target.style.backgroundColor = "#cf711f"}
                        onMouseLeave={e => e.target.style.backgroundColor = "#e67e22"}
                      >
                        Order Now 🛒
                      </button>
                    ) : (
                      <p style={{ fontSize: "1.4rem", color: "#888", marginTop: "2rem", textAlign: "center" }}>
                        Login to order! 🔐
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Menu;