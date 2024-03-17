import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import categoryService from "../services/CategoryService";
import Footer from "./Footer";
const Home = () => {
  const [category, setCategory] = React.useState([]);
  const getData = () => {
    categoryService
      .getCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(getData, []);

  let history = useHistory();
  return (
    <div style={{ marginTop: "3rem" }}>
      <h3 style={{ paddingBottom: "0.5rem", textAlign: "center" }}>Gallery</h3>
      <div className="container ">
        <Grid container>
          <Grid item md={6}>
            <img
              style={{ paddingRight: "0.5rem" }}
              src="/img/s2.jpg"
              alt="newsletter"
              className="img-fluid"
            />
          </Grid>

          <Grid item md={6}>
            <Grid container>
              <Grid item md={6}>
                <div
                  className="text-center"
                  style={{
                    paddingBottom: "0.3rem",
                    paddingRight: "0.3rem",
                  }}
                >
                  <h5> </h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore
                  </p>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={(e) => {
                      history.push("/home/Items");
                    }}
                  >
                    See More
                  </Button>
                </div>
              </Grid>

              <Grid item md={6}>
                <img
                  style={{ paddingBottom: "0.3rem" }}
                  src="/img/carousel-2.jpg"
                  alt="newsletter"
                  className="img-fluid"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6}>
                <img
                  style={{ paddingRight: "0.3rem" }}
                  src="/img/feature-5.jpg"
                  alt="newsletter"
                  className="img-fluid"
                />
              </Grid>

              <Grid item md={6}>
                <img src="/img/d2.jpg" alt="newsletter" className="img-fluid" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="container" style={{ marginTop: "6rem" }}>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner text-center">
            <div className="carousel-item active">
              <div>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
              </div>
              <p className="paragraph">"As chefs,especially pastry chefs,</p>
              <p className="paragraph">
                your creativity plays such big part of daily work"
              </p>
              <p style={{ paddingBottom: "0.7rem" }}>INA DORSEY</p>
            </div>
            <div className="carousel-item">
              <div>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
              </div>
              <p className="paragraph ">
                "Quality breads and pastries made to order.
              </p>
              <p className="paragraph ">
                Beautiful Cakes for Beautiful Occasions"
              </p>
              <p style={{ paddingBottom: "0.7rem" }}>RANDY WOOD</p>
            </div>
            <div className="carousel-item">
              <div>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
                <i className="fa fa-star stars" aria-hidden="true"></i>
              </div>
              <p className="paragraph  ">
                "Everyone has a favourite cake, pastry, pudding
              </p>
              <p className="paragraph  ">or pie from when they were kids"</p>
              <p style={{ paddingBottom: "0.7rem" }}>TOM TALLY</p>
            </div>
          </div>
          <Link
            className="carousel-control-prev"
            to="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </Link>
          <Link
            className="carousel-control-next"
            to="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </Link>
        </div>
      </div>
      <section class="section-5" id="purchase_menu">
        <div class="container">
          <div class="menu_title">
            <h2>Our Menu</h2>
          </div>

          {category.length === 0 ? (
            <div className="text-center"> </div>
          ) : (
            <div className="row">
              {category.map((category, index) => {
                return (
                  <div key={index} className="col-md-4 col-sm-6">
                    <div className="single-content">
                      <Link to="/home/Items">
                        <img
                          src={category.photo}
                          className="img-fluid"
                          alt=""
                        />
                        <div className="text-content">
                          <h4>{category.category}</h4>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
