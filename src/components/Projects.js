import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebaseConfig";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const [projects, setProjects] = useState({
    digitalMarketing: [],
    webDevelopment: [],
    graphicsDesign: []
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Separate projects by category
        const categorizedProjects = {
          digitalMarketing: projectsArray.filter(proj => proj.category === "Digital Marketing"),
          webDevelopment: projectsArray.filter(proj => proj.category === "Web Development"),
          graphicsDesign: projectsArray.filter(proj => proj.category === "Graphics Design"),
        };

        setProjects(categorizedProjects);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Our Projects</h2>
                  <p>Explore our portfolio across digital marketing, web development, and graphics design.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="digitalMarketing">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="digitalMarketing">Digital Marketing</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="webDevelopment">Web Development</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="graphicsDesign">Graphics Design</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="digitalMarketing">
                        <Row>
                          {projects.digitalMarketing.map((project, index) => (
                            <ProjectCard key={index} {...project} link={project.link} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="webDevelopment">
                        <Row>
                          {projects.webDevelopment.map((project, index) => (
                            <ProjectCard key={index} {...project} link={project.link} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="graphicsDesign">
                        <Row>
                          {projects.graphicsDesign.map((project, index) => (
                            <ProjectCard key={index} {...project} link={project.link} />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background Shape" />
    </section>
  );
};
