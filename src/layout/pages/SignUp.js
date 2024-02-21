import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backArrowBlue, branding, logo } from "../../assests/media-constants";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClearState, signupSubmit } from "../../redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import APP_CONSTANTS from "../../constants/app-constant";
import { useLoader } from "../../services/Loader/LoaderContext";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setIsLoading = useLoader();

  const { error, loading, user, success } = useSelector(
    (state) => state?.AuthReducer
  );

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(14, "User name must be shorter than 15 characters"),
    cpassword: yup
      .string()
      .required("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters")
      .oneOf(
        [yup.ref("password"), null],
        "Passwords and Confirm Password must match"
      ),
    userName: yup
      .string()
      .required("User Name is required")
      .min(3, "User Name must be 3 characters"),
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
      username: data.userName,
      email: data.email,
      password: data.password,
    };
    dispatch(signupSubmit(sendData));
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
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
        navigate("/login");
      }, 100);
    }
  }, [success]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                    <h3>CREATE ACCOUNT</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-lg-12 mt-2">
                      <p className="mb-1 mt-2">User Name</p>
                      <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              placeholder="User Name"
                              className={`inpt-fld ${
                                errors.userName ? "error" : ""
                              }`}
                              {...field}
                            />
                            {errors.userName && (
                              <small className="text-danger">
                                {errors.userName.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                    </div>
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
                        Create Account
                      </button>
                    </div>
                  </form>
                  <div className="col-lg-12 mt-2 text-center">
                    <p className="alrdd mb-1 mt-2">
                      {" "}
                      Already have an account?
                      <span
                        onClick={() => {
                          navigate("/login");
                        }}
                        className="orng-txt cursor_pointer"
                      >
                        {" "}
                        Login
                      </span>
                    </p>
                  </div>
                  {/* <div className="col-lg-12">
                    <div className="line-main">
                      <div className="line1"></div>
                      <div className="or">OR</div>
                      <div className="line2"></div>
                    </div>
                  </div> */}
                </div>
                <div className="col-lg-12 mt-3">
                  {/* <div id="signInDiv"></div> */}
                  {/* <button className='btn btn-light bt-goog'><GoogleIcon className='mr-3' />Sign In with Google</button> */}
                </div>
                <div className="col-lg-12 mt-2">
                  {/* <button className='btn btn-light bt-goog'><FacebookIcon className='mr-3' />Sign In with Facebook</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
