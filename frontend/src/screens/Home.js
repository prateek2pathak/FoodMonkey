import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Foot";
import Card from "../components/Card";


console.log(process.env.REACT_APP_LINK + "/api/getfooddata");

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LINK}/api/getfooddata`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      const json_res = await response.json();
      setFoodItem(json_res[0]);
      setFoodCat(json_res[1]);
      console.log("Data set successfull");
    } catch (error) {
      console.log("Error in loading data from getfooddata");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
    id="carouselExampleCaptions"
    className="carousel slide carousel-fade"
    style={{ objectFit: "contain !important" }}
    data-bs-ride="carousel" // Ensure data-bs-ride is set to "carousel"
>
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
        <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div class="d-flex justify-content-center">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
        </div>
        <div className="carousel-item active" data-bs-interval="4000">
            <div className="carousel-text">
                Explore Our Tasty Burgers
            </div>
            <img
                src='/images/burger.jpg'
                className="d-block w-100"
                alt="Burger"
                style={{ filter: "brightness(30%)" }}
            />
        </div>
        <div className="carousel-item" data-bs-interval="4000">
            <div className="carousel-text" >
                Have a slice!!!!!
            </div>
            <img
                src='/images/pizza.jpg'
                className="d-block w-100"
                alt="Pizza"
                style={{ filter: "brightness(30%)" }}
            />
        </div>
        <div className="carousel-item" data-bs-interval="4000">
            <div className="carousel-text">
                For your sugar rush!!!
            </div>
            <img
                src='/images/pastry.jpg'
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Pastry"
            />
        </div>
    </div>
    <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
    >
        <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
    >
        <span
            className="carousel-control-next-icon"
            aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>

      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr></hr>
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search)
                    )
                    .map((cat_item) => {
                      return (
                        <div
                          key={cat_item._id}
                          className="col-12 col-md-6 col-lg-3 m-3"
                        >
                          <Card
                            foodItem={cat_item}
                            options={cat_item.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div></div>
                )}
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
