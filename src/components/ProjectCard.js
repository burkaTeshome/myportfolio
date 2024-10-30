import { Col, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import "./ProjectCard.css";

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div
        className="proj-imgbx"
        onClick={() => window.open(link, "_blank")}
        style={{ cursor: "pointer" }}
      >
        <img src={imgUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          <Button
            variant="primary" // You can change the variant to any Bootstrap button style you prefer
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card click event from firing
              window.open(link, "_blank"); // Open link in a new tab
            }}
            className="mt-2" // Add some margin on top for spacing
          >
            See More
          </Button>
        </div>
      </div>
    </Col>
  );
};
