import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [arrowVisible, setArrowVisible] = React.useState(false);
  const [backgroundColor, setBackgroundColor] = React.useState('rgba(106, 156, 165, 0.8)');

  const slides = [
    {
      id: 1,
      image: "https://imgs.justfreeup.com/zorro/9fc5cf5018f4a46e9bf33a285813b2c3.png",
      alt: "Slide 1",
      color: 'rgb(255,246,166)', // yellow
    },
    {
      id: 2,
      image: "https://imgs.justfreeup.com/zorro/053073a999993ebd0336b0f564a626af.png",
      alt: "Slide 2",
      color: 'rgb(255, 213, 241)', // Pink
    },
    {
      id: 3,
      image: "https://imgs.justfreeup.com/zorro/29b1c0fc3e4cbb43d55e10ddaf54ea83.png",
      alt: "Slide 3",
      color: 'rgb(213,234,255)', // dark blue
    },
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setBackgroundColor(slides[index].color);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextSlide);
    setBackgroundColor(slides[nextSlide].color);
  };

  const goToPrevSlide = () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prevSlide);
    setBackgroundColor(slides[prevSlide].color);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      setCurrentSlide(nextSlide);
      setBackgroundColor(slides[nextSlide].color);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  return (
    <div
      className="hero-container container-fluid p-0 mt-5"
      onMouseEnter={() => setArrowVisible(true)}
      onMouseLeave={() => setArrowVisible(false)}
    >
      <div className="hero-background" style={{ backgroundColor }}>
        <div className="hero-section">
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              className={`hero-image w-100 h-100 position-absolute top-0 left-0 ${currentSlide === index ? "active" : ""}`}
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
      </div>
      <div className="hero-overlay">
        <p>Join 5 million sellers and buyers</p>
      </div>
    </div>
  );
};

export default HeroSection;