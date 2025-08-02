import React from 'react';
import '../Style/Landing.css'
import toast from 'react-hot-toast'; 

const plans = [
  {
    name: "Free",
    price: "0₹",
    features: [
      "✅Seamless Experience",
      "✅Daily Usage Limit 40",
      "❌No Priority Support", 
      "❌ No Export Available"
    ],
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "60₹",
    features: [
      "✅Seamless Experience",
      "✅Daily Usage Limit 100",
      "✅Export Available",
      "✅Priority Support"
    ],
    cta: "Request access"
  },
  {
    name: "Enterprise",
    price: "100₹",
    features: [
      "✅Seamless Experience",
      "✅Unlimited Usage",
      "✅Export Available",
      "✅Priority Support"
    ],
    cta: "Request access"
  }
];

export default function PricingSection() {


  return (
    <section className="pricing-section">
      <h2 className="pricing-title">Pricing Plans</h2>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
            <div
                key={index}
                className={`pricing-card ${index === 1 ? 'highlight-card' : ''}`}
            >
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-price">{plan.price}</p>
                <ul className="plan-features">
                {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                ))}
                </ul>
                
                <button className="plan-cta" onClick={() => { toast("Free Tier - Enjoy Now!") } }>{plan.cta}</button>
            </div>
        ))}

      </div>
    </section>
  )
}
