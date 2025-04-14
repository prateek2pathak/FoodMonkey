import React from "react";

export default function Crousel() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}}>
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner" id="crousel">
        <div className="carousel-caption" style={{"zIndex":"10"}}>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Seach"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="carousel-item active" style={{filter:"brightness(30%)"}}>
          <img
            src="https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2023/5/9/chocolate-pastry.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item" style={{filter:"brightness(30%)"}}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Celebration_Burger_%2849116811283%29.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item" style={{filter:"brightness(30%)"}}>
          <img
            src="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU="
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
