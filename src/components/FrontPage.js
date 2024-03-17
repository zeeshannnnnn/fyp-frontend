import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import AlertBar from "../Alerts/AlertBar";
const FrontPage = () => {
  let history = useHistory();
  const [values, setValues] = React.useState({
    infoMessage: "",
  });
  const { infoMessage } = values;
  return (
    <div className="frontPage-bg">
      {infoMessage && (
        <AlertBar type="info" message={infoMessage} autoClose={4000} />
      )}
      <div id="addModal" className="modal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-light text-white">
              <button className="close bg-dark text-white" data-dismiss="modal">
                <span>
                  <i className="fa fa-times "></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <Grid container>
                <Grid item xs={2} md={1}></Grid>
                <Grid item xs={12} md={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <h5>Join Our Mailing List </h5>
                      <p className="text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </Grid>
                    <Grid item xs={9}>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        data-dismiss="modal"
                        size="small"
                        onClick={(e) => {
                          setValues({
                            ...values,
                            infoMessage: "Thank You for Subscribing",
                          });
                        }}
                      >
                        Subscribe
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2} md={1}></Grid>
                <Grid item xs={0} md={6}>
                  <img
                    src="/img/d1.jpg"
                    alt="newsletter"
                    className="img-fluid"
                  />
                </Grid>
                <Grid item xs={2} md={1}></Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FrontPage;
