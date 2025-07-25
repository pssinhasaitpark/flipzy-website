import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [arrowVisible, setArrowVisible] = React.useState(false);

  const slides = [
    {
      id: 1,
      image: "https://imgs.justfreeup.com/zorro/9fc5cf5018f4a46e9bf33a285813b2c3.png",
      alt: "Slide 1",
    },
    {
      id: 2,
      image: "https://imgs.justfreeup.com/zorro/053073a999993ebd0336b0f564a626af.png",
      alt: "Slide 2",
    },
    {
      id: 3,
      image: "https://imgs.justfreeup.com/zorro/29b1c0fc3e4cbb43d55e10ddaf54ea83.png",
      alt: "Slide 3",
    },
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className="hero-container container-fluid p-0 mt-5"
      onMouseEnter={() => setArrowVisible(true)}
      onMouseLeave={() => setArrowVisible(false)}
    >
      <div className="hero-section">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className={`hero-image w-100 h-100 position-absolute top-0 left-0 ${
              currentSlide === index ? "active" : ""
            }`}
          />
        ))}
        <button
          className={`arrow left ${arrowVisible ? "visible" : ""}`}
          onClick={goToPrevSlide}
        >
          &lt;
        </button>
        <button
          className={`arrow right ${arrowVisible ? "visible" : ""}`}
          onClick={goToNextSlide}
        >
          &gt;
        </button>
        <div className="dots-container">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      <div className="hero-overlay">
        <p>Join 5 million sellers and buyers</p>
      </div>
    </div>
  );
};

export default HeroSection;
