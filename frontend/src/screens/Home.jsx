import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card"
import Footer from "../components/Foot";



export default function Home(){
    const [search,setSearch] = useState("");
    const [foodCat,setFoodCat] = useState([]);
    const [foodItem,setFoodItem] = useState([]);
    const [username,setUsername] = useState("");

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

    return(
      <div className="bg-zinc-700 text-white">
        <Navbar/>
        <div className="text-3xl font-semibold mt-6 mb-6 px-6">
          Hi, <span className="text-orange-600">{username} 👋</span>
        </div>

        {/* Search bar */}
        <div className="flex justify-center-mb-6 px-6">
          <input 
            className="bg-transparent w-2/3 md:w-1/3 px-4 py-2 rounded-lg border border-orange-500 shadow-sm focus-outline-none"
            type="search"
            placeholder="What are you looking..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
           />
        </div>

        {/* Food cat and items */}
        <div className="conatiner mx-auto px-6">

            {foodCat.length>0 &&
                foodCat.map((data,idx)=>{
                  return (
                    <div key={idx} className="mb-6">
                        <div className="text-2xl font-semibold mb-2">
                          {data.CategoryName}
                        </div>
                        <hr className="mb-4" />
                        <div className="flex flex-wrap gap-4">
                          {
                            foodItem.length>0 &&
                              foodItem.filter((item)=>{
                                return item.CategoryName===data.CategoryName &&
                                item.name.toLowerCase().includes(search.toLowerCase())
                              })
                              .map((cat_item,idx)=>(
                                <div key={idx} className="w-full sm:w-1/2 lg:w-1/4">
                                    <Card foodItem={cat_item} options={cat_item.options[0]}/>
                                </div>
                              ))
                          }
                        </div>
                    </div>
                  )
                })
            }


        </div>
        <Footer></Footer>
      </div>

    )
    
}