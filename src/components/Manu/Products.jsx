import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicExample from "./Cards";
import "./Manu.css";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => {
        const products = res.data.categories;
        setData(products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div style={{ overflow: "auto" }}>
      <div className="products_list">
        {data.map((item) => {
          return (
            <div className="check">
              {" "}
              <BasicExample
                id={item.idCategory}
                strCategoryThumb={item.strCategoryThumb}
                strCategory={item.strCategory}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
