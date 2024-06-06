import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import Star_fill from "./images/Star_fill.svg";
import Star from "./images/Star.svg";
import { useEffect, useState } from "react";

function App() {
  const [coffee, setCoffee] = useState([]);
  const [avai, setAvai] = useState([]);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
       setArr(data)
       setCoffee(data)
        const tmp = data.filter((item) => {
          return item.available === true;
        });
        setAvai(tmp);
        console.log("tmp", tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <div className="top"></div>
      <div className="buttom">
        <div className="container">
          <div className=" box">
            <h1 className="title ">Our Collection</h1>
            <p className="sub-title ">
              Introducing our Coffee Collection, a selection of unique coffees
              from different roast types and origins, expertly roasted in small
              batches and shipped fresh weekly.
            </p>
            <div className="btns">
              <button
                className="all"
                onClick={() => {
                  setArr(coffee);
                }}
              >
                All Products
              </button>
              <button
                className="available"
                onClick={() => {
                  setTimeout(() => {
                    setArr(avai);
                  }, 200);
                  
                }}
              >
                Available Now
              </button>
            </div>
          </div>

          <div className="row ">
            <AnimatePresence>
              {arr.map((item) => {
                return (
                  <motion.div 
                    layout
                    initial={{ transform: "scale(0)" }}
                    animate={{ transform: "scale(1)" }}
                    transition={{type:"spring",damping:8,stiffness:100}}
                    className="col card " 
                    key={item.id} 
                  >
                   
                   
                    <img src={item.image} alt={item.name} />
                    {item.popular && (
                      <button className="Popular">Popular</button>
                    )}
                    <div className=" card-body">
                      <h2 className="card-title">{item.name} </h2>
                      <span className="price ">{item.price}</span>
                    </div>
                    <div className="  card-foot">
                      <div className=" holder">
                        <img src={item.rating > 0 ? Star_fill : Star} alt="" />
                        <span className="rate">{item.rating} </span>{" "}
                        <p className="vote">
                          {item.rating > 0
                            ? `(${item.votes} votes)`
                            : "No ratings"}{" "}
                        </p>
                      </div>

                      {!item.available && <p className="solde">Solde out </p>}
                    </div>
                    <div></div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
