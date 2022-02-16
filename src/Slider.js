import React, { useState, useRef } from "react";
import "./styles.css";

const Slider = (props) => {
  const carouselContainer = useRef(null);
  const cardsContainer = useRef(null);
  const [pressed, setPressed] = useState(false);
  const startPoint = useRef(0);
  const carouselContainerX = useRef(0);

  const mouseDown = (event) => {
    setPressed(true);
    startPoint.current = event.pageX - cardsContainer.current.offsetLeft;
    carouselContainer.current.style.cursor = "grabbing";
  };

  const mouseMove = (e) => {
    if (!pressed) return;
    e.preventDefault();
    carouselContainerX.current = e.pageX;

    cardsContainer.current.style.left = `${
      carouselContainerX.current - startPoint.current
    }px`;

    checkBoundaries();
  };

  const checkBoundaries = () => {
    let outer = "";
    let inner = "";
    let carousel = carouselContainer.current;
    let cardCarousel = cardsContainer.current;
    if (carousel) {
      outer = carousel.getBoundingClientRect();
    }

    if (cardCarousel) {
      inner = cardCarousel.getBoundingClientRect();
    }

    if (parseInt(cardsContainer.current.style.left) > 0) {
      cardsContainer.current.style.left = "0px";
    } else if (inner.right < outer.right) {
      cardsContainer.current.style.left = `-${inner.width - outer.width}px`;
    }
  };

  return (
    <div
      onMouseDown={mouseDown}
      onMouseEnter={() => {
        carouselContainer.current.style.cursor = "grab";
      }}
      onMouseUp={() => {
        carouselContainer.current.style.cursor = "grab";
        setPressed(false);
      }}
      onMouseLeave={() => (carouselContainer.current.style.cursor = "default")}
      onMouseMove={mouseMove}
      ref={carouselContainer}
      className="slider"
    >
      <div ref={cardsContainer} className="inner">
        <div className="inner-item">
          <div className="item-name">1</div>
        </div>
        <div className="inner-item">
          <div className="item-name">2</div>
        </div>
        <div className="inner-item">
          <div className="item-name">3</div>
        </div>
        <div className="inner-item">
          <div className="item-name">4</div>
        </div>
        <div className="inner-item">
          <div className="item-name">5</div>
        </div>
        <div className="inner-item">
          <div className="item-name">6</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
