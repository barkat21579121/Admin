import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Manu.css";
import axios from "axios";

function BasicExample(props) {
  const location = useLocation(); // Get the current location
  const isOrdersRoute = location.pathname === "/Orders";

  const handleOrderNow = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/orders", {
        title: props.strCategory,
        image: props.strCategoryThumb,
      });
      console.log(res);
      alert(`Your ${props.strCategory} order received. Thank you!`);
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Error placing order. Please try again later.");
    }
  };

  return (
    <div className="card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.strCategoryThumb} />
        <Card.Body>
          <Card.Title
            style={{
              fontSize: "26px",
              fontFamily: "initial",
              margin: "30px auto",
              fontWeight: "bold",
            }}
          >
            {props.strCategory}
          </Card.Title>
          <Card.Text>{props.strCategoryDescription}</Card.Text>

          {isOrdersRoute ? (
            <Button
              variant="primary"
              onClick={() => {
                alert("order deleted sucessFully");
              }}
            >
              Delete
            </Button>
          ) : (
            <Button variant="primary" onClick={handleOrderNow}>
              Order Now
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BasicExample;
