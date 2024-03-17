import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <section className="footer_area">
      <div className="footer_widgets">
        <div className="container">
          <div className="row footer_wd_inner">
            <div className="col-lg-3 col-6">
              <aside className="f_widget f_about_widget">
                <div className="f_title">
                  <h3>MWFHAL Bakers</h3>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                  beatae sint temporibus sit distinctio accusamus, assumenda,
                  praesentium repellendus, optio fugit reprehenderit.
                </p>{" "}
                <ul className="nav">
                  <li>
                    <Link to="/">
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-google-plus"></i>
                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="col-lg-3 col-6">
              <aside className="f_widget f_link_widget">
                <div className="f_title">
                  <h3>Quick links</h3>
                </div>
                <ul className="f_list_style">
                  <li>
                    <Link to="/">Your Account</Link>
                  </li>
                  <li>
                    <Link to="/">View Order</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/">Terms &amp; Conditionis</Link>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="col-lg-3 col-6">
              <aside className="f_widget f_link_widget">
                <div className="f_title">
                  <h3>Work Times</h3>
                </div>
                <ul className="f_list_style">
                  <li>
                    <Link to="/">Mon. : Fri.: 8 am - 8 pm</Link>
                  </li>
                  <li>
                    <Link to="/">Sat. : 9am - 4pm</Link>
                  </li>
                  <li>
                    <Link to="/">Sun. : Closed</Link>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="col-lg-3 col-6">
              <aside className="f_widget f_contact_widget">
                <div className="f_title">
                  <h3>Contact Info</h3>
                </div>
                <h4>(1800) 574 9687</h4>
                <p>
                  Justhope Store 25,
                  <br /> near baker Street, Lahore
                </p>
                <h5>MWFHALbakery@gamil.com</h5>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_copyright">
        <div className="container">
          <div className="copyright_inner">
            <div className="float-left">
              <h5>© Copyright cakebakery. All right reserved.</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;
