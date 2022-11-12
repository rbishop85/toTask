import Carousel from "react-bootstrap/Carousel";
import LoginButton from "../LoginButton";

function ControlledCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./assets/images/image1.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>When you need ‘TO’ do it,</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./assets/images/image2.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
        <h3>get someone to ‘DO’ it!</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./assets/images/image3.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>DO it with toTask!</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
