import React, { useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import {
  AboutUsBanner,
  branding,
  callEver,
  candidate,
  docDollarWeOffer,
  people,
  peopleBlue,
  personWeOffer,
  ringCorner,
  ringSection,
  rocket,
  taxWeOffer,
  verified,
} from "../../assests/media-constants";

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page about-page">
      <Header />
      <div
        style={{
          backgroundImage: `url("${AboutUsBanner}")`,
          minHeight: "70vh",
        }}
        className="home-banner-section"
      >
        <div className="container mb-5 pb-5">
          <div className="about-us-banner">
            <h1>Read About Us</h1>
            <h3>WE'RE TAX CONSULTANT</h3>
          </div>
        </div>
      </div>
      <div className="ring-design-section">
        <img className="ring-corner" src={ringCorner} />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img className="w-100" src={ringSection} />
            </div>
            <div className="col-lg-6">
              <div className="content">
                <div>
                  <h3 className="sub-heading mb-3">
                    <i>Inception since 2013...</i>
                  </h3>
                  <h1 className="main-heading fw-bold mb-4">
                    Progress is impossible without change.
                  </h1>
                  <p>
                    Duis pretium gravida enim, vel maximus ligula fermentum a.
                    Sed rhoncus eget ex id egestas. Nam nec nisl placerat,
                    tempus erat a, condimentum metus. Curabitur nulla nisi,
                    lacinia at lobortis at, suscipit at nibh. Proin quis lectus
                    finibus, mollis purus vitae, rutrum neque. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Etiam sed cursus metus, vel viverra
                    mi. Mauris aliquet egestas eros ac placerat. Proin
                    condimentum ligula at diam euismod fringilla et quis lacus.
                  </p>
                  <button className="btn btn-light blue-btn mt-4">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="boxes-section">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-lg-4 text-center align-self-center">
              <div className="d-flex bg-blue box">
                <img src={verified} alt="verified" />
                <div>
                  <h3 className="mb-3  fw-bold">ENSURE SECURITY</h3>
                  <p>
                    Perspiciatis unde omnis ist natus error sit voluptatem
                    accusantium loremque tium totam rem aperiam eaque
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center align-self-center">
              <div className="d-flex no-bg-blue box">
                <img src={peopleBlue} alt="verified" />
                <div>
                  <h3 className="mb-3  fw-bold">EXPERT TEAM</h3>
                  <p>
                    Perspiciatis unde omnis ist natus error sit voluptatem
                    accusantium loremque tium totam rem aperiam eaque
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center align-self-center">
              <div className="d-flex bg-blue box">
                <img src={callEver} alt="verified" />
                <div>
                  <h3 className="mb-3 fw-bold">24/7 SUPPORT</h3>
                  <p>
                    Perspiciatis unde omnis ist natus error sit voluptatem
                    accusantium loremque tium totam rem aperiam eaque
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="we-offer">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="content">
                <img className="branding" src={branding} />
                <div>
                  <h1 className="mb-4 fw-bold">We Offer Popular Plans</h1>
                  <p className="mb-5">
                    Our vision is to utilize the resources with accurate
                    workable plans that deliver results. We know resources are
                    scarce and the only way we can maximize efficiency is to
                    employ better methods of production and execution.
                  </p>
                  <div className="d-flex mb-4">
                    <img src={personWeOffer} alt="person We Offer" />
                    <div>
                      <h3 className="fw-bold">Individual Tax</h3>
                      <p>
                        Our vision is to utilize the resources with <br />{" "}
                        accurate workable plans that deliver results.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-4">
                    <img src={docDollarWeOffer} alt="person We Offer" />
                    <div>
                      <h3 className="fw-bold">Small Business Tax</h3>
                      <p>
                        Our vision is to utilize the resources with <br />{" "}
                        accurate workable plans that deliver results.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-4">
                    <img src={taxWeOffer} alt="person We Offer" />
                    <div>
                      <h3>Small Business Tax</h3>
                      <p>
                        Our vision is to utilize the resources with <br />{" "}
                        accurate workable plans that deliver results.
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-light blue-btn ">Get Offer</button>
                </div>
              </div>
            </div>
            <div className="col-lg-7 ps-5">
              <div className="img-bg-section"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-records">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 text-center">
              <img src={people} className="mb-1" alt="person record" />
              <h3>1452+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="col-lg-4 text-center">
              <img src={rocket} className="mb-1" alt="person record" />
              <h3>1200+</h3>
              <p>Taxes Filled this year</p>
            </div>
            <div className="col-lg-4 text-center">
              <img src={candidate} className="mb-1" alt="person record" />
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 py-5 dp-none-res"></div>
      <div className="what-we-believe">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 ps-0">
              <div className="bg-main-image"></div>
            </div>
            <div className="col-lg-6">
              <div className="content">
                <h1 className="my-5 pt-5 fw-bold">What we believe in...</h1>
                <p className="pb-5 mb-5">
                  Our aim is to use our unique experiences and expertise gained
                  over a period of time with our own insights derived from the
                  experience. We are passionate about supporting our clients in
                  achieving their business goals and targets. Using these
                  invaluable insights, we want to deliver quality solutions to
                  increase our client’s productivity.
                </p>
                <div className="row mb-5 pb-5">
                  <div className="col-lg-6 pe-4">
                    <h3 className="mb-4 fw-bold">1. Our Mission</h3>
                    <p>
                      Our mission is simple enough. To unearth the magic behind
                      the numbers of organizations big and small using ratio
                      analysis and make meaningful decisions to boost up their
                      performance. Our passion drives us forward.
                    </p>
                  </div>
                  <div className="col-lg-6 ps-4">
                    {" "}
                    <h3 className="mb-4 fw-bold">2. Our Vision</h3>
                    <p>
                      Our vision is to utilize the resources with accurate
                      workable plans that deliver results. We know resources are
                      scarce and the only way we can maximize efficiency is to
                      employ better methods of production and execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 py-5 dp-none-res"></div>
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default About;
