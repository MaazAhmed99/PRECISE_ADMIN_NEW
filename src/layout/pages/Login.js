import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { backArrowBlue, branding, logo } from "../../assests/media-constants";
import APP_CONSTANTS from "../../constants/app-constant";
import {
  ClearState,
  loginSubmit,
  loginSuccess,
} from "../../redux/reducers/AuthReducer";
import { useLoader } from "../../services/Loader/LoaderContext";

const Login = () => {
  const setIsLoading = useLoader();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, user, success } = useSelector(
    (state) => state?.AuthReducer
  );
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let sendData = {
      email: data.email,
      password: data.password,
      // userType: "1",
    };
    dispatch(loginSubmit(sendData));
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(ClearState());
        navigate("/");
      }, 100);
    }
  }, [success]);

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
                    <h3>LOGIN</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-lg-12 mt-2">
                      <p className="mb-1 mt-2">Email</p>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              placeholder="Email"
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
                      />
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
                    {/* <div className="col-lg-12 mt-2 text-end">
                      <p className="alrdd mb-1 mt-2">
                        <span
                          onClick={() => {
                            navigate("/forget-password");
                          }}
                          className="orng-txt cursor_pointer"
                        >
                          {" "}
                          Forget Password?
                        </span>
                      </p>
                    </div> */}

                    <div className="col-lg-12 mt-4">
                      <button
                        type="submit"
                        className="btn btn-light bt-login w-100"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  {/* <div className="col-lg-12 my-4">
                    <div className="line-main">
                      <div className="line1"></div>
                      <div className="or">OR</div>
                      <div className="line2"></div>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-12 mt-2 text-center">
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
                  </div> */}
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

export default Login;
