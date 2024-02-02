import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Manu.css";
import { useParams } from "react-router-dom";

function BasicExample(props) {
  return (
    <div className="card">
      {" "}
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
          <Button
            variant="primary"
            onClick={() => {
              alert(
                `Your ${props.strCategory} Order received . Thanks you for using our services `
              );
            }}
          >
            Order Now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BasicExample;
