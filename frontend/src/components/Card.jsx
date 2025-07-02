import React,{useEffect, useRef, useState} from "react";
import { useDispatch,useCart } from "./ContextReducer";


export default function Card(props){
  let cart = useCart();
  let options = props.options
  //it gives you value for all the keys passed as an array
  let priceOptions = Object.keys(options);
  let dispatch = useDispatch();
  const priceRef = useRef();
  const [added,setAdded] = useState(false);

  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");

  const addToCart = async()=>{
    setAdded(true);
    for(const item of cart){
      if(item.id=== props.foodItem._id && item.size=== size){
        await dispatch({type:"UPDATE",id:item.id,price: finalPrice,qty:qty});
        return;
      }
    }

    await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name,qty:qty,size:size,price:finalPrice})
    console.log(cart);
    console.log("New item added to cart"); 
  }

  useEffect(()=>{
    setSize(priceRef.current.value);
  },[]);

  let finalPrice = qty* parseInt(options[size]);


  return (
    <div className="bg-orange-400 text-black rounded-2xl shadow-md overflow-hidden w-72 max-h-[360px] flex flex-col justify-between">
        <img src={props.foodItem.img} alt={props.foodItem.name} className="h-30 w-full object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <h5 className="text-lg font-semibold mb-2">{props.foodItem.name}</h5>
          <div className="flex justify-between items-center mb-2">

              {/* Quantity dropdown */}

              <select
                className="px-2 py-1 bg-yellow-300 rounded text-sm"
                onChange={(e) => setQty(e.target.value)}
              >

                {Array.from(Array(6),(_,i)=>{
                  return (
                    <option key={i+1} value={i+1}>
                    {i+1}
                    </option>
                  )
                    
                })}

              </select>


              {/* Size dropdown */}
              <select 
                className="px-2 py-1 bg-yellow-300 rounded text-sm"
                ref={priceRef}
                onChange={(e)=>setSize(e.target.value)}
              >
                {
                  priceOptions.map((data)=>{
                    return (
                      <option value={data} key={data}>
                        {data}
                      </option>
                    )
                  })
                }
              </select>

              {/* Price */}

              <span className="text-md font medium text-gray-700">
                ₹{finalPrice}/-
              </span>
          </div>

          <button
             className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition duration-200"
             onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
    </div>
  )
}