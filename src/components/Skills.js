import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"; // Removed unused arrow imports

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Our Skills</h2>
              <p>At B-tek Digital, we excel in a variety of areas including digital marketing strategies, creative graphics design, and comprehensive web development solutions. Our expertise helps clients achieve their goals in the digital space.</p> {/* Updated paragraph */}
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                <div className="item">
                  <img src={meter1} alt="Web Development" />
                  <h5>Digital Marketing</h5> {/* Updated skill */}
                </div>
                <div className="item">
                  <img src={meter2} alt="Graphics Design" />
                  <h5>Graphics Design</h5> {/* Updated skill */}
                </div>
                <div className="item">
                  <img src={meter3} alt="Web Development" />
                  <h5>Web Development</h5> {/* Updated skill */}
                </div>
                <div className="item">
                  <img src={meter1} alt="Brand Strategy" />
                  <h5>Brand Strategy</h5> {/* Updated skill */}
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Color Shape" />
    </section>
  )
}
