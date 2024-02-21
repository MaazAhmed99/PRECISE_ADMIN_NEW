import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backArrowBlue, tickGreen } from "../../assests/media-constants";
import { payment } from "../../constants/payment-constant";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";

const SelectPayment = () => {
  const navigate = useNavigate();
  const [paymentWay, setPaymentWay] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(paymentWay);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="individual-cost-page select-payment ">
      <div className="container-fluid pe-0">
        <div className="row">
          <div className="col-lg-8 px-0">
            <div className="form-container-main">
              <div className="row">
                <div className="col-lg-12">
                  {" "}
                  <p onClick={() => navigate(-1)} className="back-button">
                    <img className="back-button-img" src={backArrowBlue} /> Back
                  </p>
                  <div className="form-fields">
                    <h1 className="mt-4 pt-3 mb-5">Select Payment Method</h1>
                    <div className="row">
                      {payment.map((item, index) => {
                        return (
                          <div key={index} className="col-lg-4 mb-5 px-4">
                            <div
                              onClick={() => setPaymentWay(item.id)}
                              className={`payment-box ${
                                paymentWay == item.id ? "active" : ""
                              }`}
                            >
                              <img src={item.image} alt={`${item.text}`} />
                              <p>{item.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="offset-lg-8 col-lg-4 mt-2">
                      <button
                        onClick={handleClickOpen}
                        disabled={!paymentWay}
                        className="btn btn-light blue-btn w-100 py-2 mt-4 mb-4"
                      >
                        {" "}
                        {"Next"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 px-0">
            <div className="must-checkoout">
              <div className="cost-container mx-2 h-100">
                <h3>
                  Individual Cost <br /> <div className="small-underline"></div>{" "}
                </h3>
                <p className="text-center mt-4 mb-0 line-height-adjust">
                  Starting at
                </p>
                <p className="pricing text-center">
                  <sub>$</sub> <span>100</span>
                </p>
                <p className="mb-4 text-lamp">
                  We will file your taxes within 24 hours, or it's FREE (up to
                  100).
                </p>
                <p className="fw-bold">What's included:</p>
                <ul className="mb-5">
                  <li>Lorem ipsium dolar site imit</li>
                  <li>Lorem ipsium dolar site imit</li>
                  <li>Lorem ipsium dolar site imit</li>
                </ul>
                <button className="btn btn-light blue-btn w-100">
                  Individual
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dialog code */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="payment-modal">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-end">
                    <CloseIcon
                      onClick={handleClose}
                      className="cross-icon cursor_pointer"
                    />
                  </div>
                  <div className="col-lg-12 text-center">
                    <img className="tick-modal" src={tickGreen} />
                    <h3>Great! Prepare your file</h3>
                    <p>
                      Thank you! We are working on your file once the file{" "}
                      <br /> completed we will share file with you. <br /> Stay
                      Tuned!
                    </p>
                  </div>
                  <div className="offset-2 col-lg-8 text-center">
                    <button className="btn btn-light blue-btn  py-2 mt-4 mb-4 px-5 w-100">
                      Login Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectPayment;
