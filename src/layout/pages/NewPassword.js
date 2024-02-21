import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { backArrowBlue, branding, logo } from "../../assests/media-constants";
import APP_CONSTANTS from "../../constants/app-constant";
import {
  ClearState,
  loginSubmit,
  loginSuccess,
  resetPasswordSubmit,
} from "../../redux/reducers/AuthReducer";
import { useLoader } from "../../services/Loader/LoaderContext";

const NewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setIsLoading = useLoader();
  const [code, setCode] = useState();
  const { error, loading, user, success } = useSelector(
    (state) => state?.AuthReducer
  );
  const schema = yup.object().shape({
    // email: yup.string().required("Code is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    cpassword: yup
      .string()
      .required("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters")
      .oneOf(
        [yup.ref("password"), null],
        "Passwords and Confirm Password must match"
      ),
  });
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    setCode(token);
  }, [location.search]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let sendData = {
      token: code,
      password: data.password,
    };
    dispatch(resetPasswordSubmit(sendData));
  };

  // useEffect(() => {
  //   if (JSON?.parse(localStorage?.getItem(`${APP_CONSTANTS.ACCESS_TOKEN}`))) {
  //     navigate("/");
  //   }
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    if (success) {
      // toast.error(`Invalid email adddress or password`);
      setTimeout(() => {
        dispatch(ClearState());
        navigate("/");
      }, 100);
    }
  }, [success]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div className="auth-pages login">
      <div className="container-fluid ps-0">
        <div className="row">
          <div className="col-lg-7">
            <div className="bg-img">
              <img className="img-branding" src={branding} />
            </div>
          </div>
          <div className="col-lg-5 ">
            <div className="login-contnr">
              <div className="login_box ">
                <div className="row">
                  <div className="col-lg-12">
                    <p
                      onClick={() => {
                        navigate("/");
                      }}
                      className="back-button"
                    >
                      <img className="back-button-img" src={backArrowBlue} />{" "}
                      Back
                    </p>
                  </div>
                  <div className="col-lg-12 text-center">
                    <img className="login-branding my-3 pb-3" src={logo} />
                  </div>
                  <div className="col-lg-12">
                    <h3>RESET PASSWORD</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-lg-12 mt-2">
                      {/* <p className="mb-1 mt-2">Token</p>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              placeholder="Code"
                              className={`inpt-fld ${
                                errors.email ? "error" : ""
                              }`}
                              {...field}
                            />
                            {errors.email && (
                              <small className="text-danger">
                                {errors.email.message}
                              </small>
                            )}
                          </>
                        )}
                      /> */}
                    </div>
                    <div className="col-lg-12 mt-2">
                      <p className="mb-1 mt-2">Password</p>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="password"
                              placeholder="Enter Password"
                              className={`inpt-fld ${
                                errors.password ? "error" : ""
                              }`}
                              {...field}
                            />
                            {errors.password && (
                              <small className="text-danger">
                                {errors.password.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="col-lg-12 mt-2">
                      <p className="mb-1 mt-2">Confirm Password</p>
                      <Controller
                        name="cpassword"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              className={`inpt-fld ${
                                errors.cpassword ? "error" : ""
                              }`}
                              {...field}
                            />
                            {errors.cpassword && (
                              <small className="text-danger">
                                {errors.cpassword.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="col-lg-12 mt-4">
                      <button
                        type="submit"
                        className="btn btn-light bt-login w-100"
                      >
                        Rest Password
                      </button>
                    </div>
                  </form>
                  <div className="col-lg-12 my-4">
                    <div className="line-main">
                      <div className="line1"></div>
                      <div className="or">OR</div>
                      <div className="line2"></div>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-2 text-center">
                    <p className="alrdd mb-1 mt-2">
                      {" "}
                      Don't have an account?
                      <span
                        onClick={() => {
                          navigate("/register");
                        }}
                        className="orng-txt cursor_pointer"
                      >
                        {" "}
                        Create Account
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 mt-3"></div>
                <div className="col-lg-12 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
