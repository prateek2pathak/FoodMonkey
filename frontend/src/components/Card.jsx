import React, { useEffect, useRef, useState } from "react";
import { useDispatch,useCart } from "./ContextReducer";

export default function Card(props) {
  let cart=useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch=useDispatch();
  const priceRef=useRef();
  

  const [qty, setQty] = useState(1);
  const [size, setsize] = useState("");

  const addtocart = async() => {

    for(const item of cart){
      if(item.id=== props.foodItem._id && item.size=== size){
        await dispatch({type:"UPDATE",id:item.id,price: finalPrice,qty:qty});
        return;
      }
    }
    await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name,qty:qty,size:size,price:finalPrice})
    console.log(cart);
  };

  useEffect(()=>{
    setsize(priceRef.current.value);
  },[])
  let finalPrice=qty*parseInt(options[size]);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          className="card-img-top"
          src={props.foodItem.img}
          alt="Card-cap"
          style={{ height: "140px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text"></p>

          <div className="container w-100">
            <select className="m-2 h-100 bg-warning rounded" onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return <option key={i+1} value={i + 1}>{i + 1}</option>;
              })}
            </select>
            <select className="m-2 h-100 bg-warning rounded" ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
              {
              priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5" >₹{finalPrice}/-</div>
          </div>
          <hr />
          <div
            className="btn bg-warning justify-center ms-2 "
            onClick={addtocart}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
