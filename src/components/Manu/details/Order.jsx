import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicExample from "../Cards";

const Order = (props) => {
  const [data, setData] = useState([]);
  const apiUrl = "http://localhost:3001/api/orders";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  return (
    <div style={{ overflow: "auto" }}>
      <div className="products_list">
        {data.map((item) => (
          <div key={item._id.$oid} className="check">
            <BasicExample
              id={item._id}
              strCategoryThumb={item.image}
              strCategory={item.title}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
