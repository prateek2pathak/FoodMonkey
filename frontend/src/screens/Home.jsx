import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card"
import Footer from "../components/Foot";
import { useNavigate } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";



export default function Home(){
    const [search,setSearch] = useState("");
    const [foodCat,setFoodCat] = useState([]);
    const [foodItem,setFoodItem] = useState([]);
    const [username,setUsername] = useState("");
    const navigate = useNavigate();

    const loadData = async()=>{

        try {

          const res = await fetch(`${process.env.REACT_APP_LINK}/api/getfooddata`,{
            method:"POST",
            headers:{
              "Content-Type":"appication/json"
            },
          }) 
  
          const data = await res.json();
          setFoodItem(data[0]);
          setFoodCat(data[1]);
          
        } catch (error) {
          console.log("Error in loading items data ",error);
        }
    }
    useEffect(()=>{
      loadData();
      const name1 = localStorage.getItem("username");
      setUsername(name1);
    },[])

    return (
  <div className="bg-zinc-700 text-white min-h-screen">
    <Navbar />

    {/* Greeting Section */}
    <div className="pt-20 px-6 text-3xl font-bold">
      {username ? (
        <p>
          Hi, <span className="text-orange-500">{username} 👋</span>
        </p>
      ) : (
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl sm:text-2xl">
            Welcome! <span className="text-orange-400">Please log in to continue 😊</span>
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-2 sm:mt-0 bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-md text-white transition duration-300"
          >
            Log In
          </button>
        </div>
      )}
    </div>

    {/* Search Bar */}
    <div className="flex justify-center mt-6 mb-6 px-6">
      <input
        className="bg-zinc-800 text-white w-full sm:w-2/3 md:w-1/2 px-4 py-2 rounded-lg border border-orange-500 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        type="search"
        placeholder="What are you looking for?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Food Categories and Items */}
    <div className="container mx-auto px-6">
      {foodCat.length > 0 &&
        foodCat.map((data, idx) => {
          return (
            <div key={idx} className="mb-8">
              <div className="text-2xl font-semibold mb-2 border-b border-orange-400 pb-1">
                {data.CategoryName}
              </div>

              <div className="flex flex-wrap gap-6 mt-4">
                {foodItem.length > 0 &&
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((cat_item, idx) => (
                      <div
                        key={idx}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform hover:scale-105"
                      >
                        <Card foodItem={cat_item} options={cat_item.options[0]} />
                      </div>
                    ))}
              </div>
            </div>
          );
        })}
        <ChatWidget />
    </div>

    <Footer />
  </div>
);

    
}