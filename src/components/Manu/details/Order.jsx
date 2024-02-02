import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicExample from "../Cards";

const Order = ({ params }) => {
  const [data, setData] = useState([]);
  const Api = "http://localhost:3001/api/orders";
  useEffect(() => {
    axios
      .get(Api)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(params);
  return (
    <div style={{ overflow: "auto" }}>
      <div className="products_list">
        {data.map((item) => {
          return (
            <div className="check">
              {" "}
              <BasicExample
                id={item._id}
                strCategoryThumb={item.image}
                strCategory={item.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
