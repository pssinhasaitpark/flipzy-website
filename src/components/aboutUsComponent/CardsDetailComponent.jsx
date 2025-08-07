import React from "react";

function FreeUpCards() {
  const cardData = [
    {
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=240&fit=crop&crop=center",
      title: "Sustainable & Affordable Fashion",
      description:
        "At FreeUp, our mission is to make fashion and e-commerce sustainable, fun and affordable. We are a fast-growing, trusted community of 200,000+ women across India who thrift pre-loved items from each other.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop&crop=center",
      title: "Sell & Get Rewarded",
      description:
        "Using our easy-to-use app, you can sell whatever you no longer need, wear or have simply outgrown. We are inspiring a new generation of shoppers. Selling old clothes is rewarding, like never before! At FreeUp, you earn cash on selling good quality clothes and shopping credits on selling any used items.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=240&fit=crop&crop=center",
      title: "Thrift Trendy Items",
      description:
        "You can shop like-new and gently used women's, kids' or men's clothes at up to 90% off MRP from our app. From Biba, Global Desi, W, Max, Pantaloons to Urbanic, Shein, Vero Moda and H&M - all your favourite brands for less! Discover one-of-a-kind treasures on FreeUp at steal prices.",
    },
  ];

  return (
    <>
  
     

      <div className="container-fluid py-5 ">
        <div className="container">
          <div className="row g-4">
            {cardData.map((card, index) => (
              <div key={index} className="col-lg-4 col-md-12">
                <div className="card h-100 bg-none border-0 rounded-3 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-img-top"
                    style={{ height: "240px", objectFit: "cover",borderRadius: "20px" }}
                  />
                  <div className="card-body p-5">
                    <h3 className="card-title text-center mb-3 text-black">
                      {card.title}
                    </h3>
                    <p className="card-text text-muted small lh-base text-justify mb-0">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FreeUpCards;
