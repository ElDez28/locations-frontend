import { replace, useFormik } from "formik";
import { useState } from "react";
import ErrorModal from "../../shared/UIElements/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/UIElements/LoadingSpinner";
import Input from "../../places/components/Input";
import schemaThree from "../../places/yupSchema/schema2";
import Button from "../../shared/components/Button/Button";
import Card from "../../shared/UIElements/UIElements/Card/Card";
import Cookies from "js-cookie";
import schemaFour from "../../places/yupSchema/schema3";
import { motion, AnimatePresence } from "framer-motion";
import { useHttp } from "./httpFn";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../places/store/store";
import ImageUpload from "../../shared/UIElements/UIElements/ImageUpload";

import "../../shared/UIElements/UIElements/Card/Card.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const { isLoading, error, sendRequest, clearError } = useHttp();
  console.log(isLoading);
  const navigate = useNavigate();
  const initialValuesOne = {
    email: "",
    password: "",
  };
  const initialValuesTwo = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };

  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    try {
      const response = await sendRequest(
        "http://127.0.0.1:5000/api/v1/users/login",
        "POST",
        JSON.stringify({ email: values.email, password: values.password }),
        { "Content-Type": "application/json" }
      );
      const expDate = new Date().getTime() + 10 * 60 * 60 * 1000;
      const { data } = response;
      const { token } = response;
      Cookies.set("ftkn", token);
      const id = data.user.id;
      localStorage.setItem("jwt", token);
      localStorage.setItem("id", id);
      localStorage.setItem("exp", expDate);

      dispatch(loginActions.login());
      dispatch(loginActions.setId(id));
      dispatch(loginActions.setDate(expDate));
      navigate("/users", { replace: true });
    } catch (err) {}
  };

  const secondFormSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("passwordConfirm", values.confirmPassword);
      formData.append("image", values.image);
      console.log(formData);
      const response = await sendRequest(
        "http://localhost:5000/api/v1/users/signup",
        "POST",
        formData
      );
      const id = response.data.user._id;
      console.log(id);
      secondFormik.resetForm();
      dispatch(loginActions.setId(id));
      dispatch(loginActions.login());

      navigate("/users", { replace: true });
    } catch (err) {}
  };
  const secondFormik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: initialValuesTwo,
    validationSchema: schemaFour,
    onSubmit: secondFormSubmit,
  });
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: initialValuesOne,
    validationSchema: schemaThree,
    onSubmit,
  });
  const switchModeHandler = () => {
    if (mode === "login") {
      setMode((prevState) => "signup");
    }
    if (mode === "signup") {
      setMode((prevState) => "login");
    }
  };
  const variants = {
    initial: {
      x: "-100%",
    },
    visible: {
      x: "0%",
      transition: { ease: "linear", type: "tween" },
    },
    exit: {
      x: "-100%",
    },
  };
  const variantsTwo = {
    initial: {
      x: "100%",
    },
    visible: {
      x: "0%",
      transition: { type: "tween" },
    },
    exit: {
      x: "100%",
    },
  };
  const classes =
    mode === "login" ? "slide-in-left-enter-active" : "slide-in-left-exit";

  return (
    <>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      {!isLoading && !error && (
        <Card className="authentication">
          {mode === "login" && (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                variants={variants}
                initial="initial"
                animate="visible"
                exit="exit"
              >
                <h2>Login required!</h2>
                <hr />
                <form
                  onSubmit={formik.handleSubmit}
                  autoComplete="off"
                  className={classes}
                >
                  <label htmlFor="email">Email</label>
                  <Input
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    element="input"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formik.values.email}
                    formik={formik}
                    name="email"
                    key={"mesd"}
                  ></Input>
                  <label htmlFor="password">Password</label>
                  <Input
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    element="input"
                    id="password"
                    type="text"
                    placeholder="Password"
                    value={formik.values.password}
                    formik={formik}
                    name="password"
                    key={"mef"}
                  ></Input>

                  <Button type="submit">
                    {formik.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </motion.div>
            </AnimatePresence>
          )}

          {mode === "signup" && (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                variants={variantsTwo}
                initial="initial"
                animate="visible"
                exit="exit"
              >
                <h2>Sign Up</h2>
                <hr />
                <motion.form
                  onSubmit={secondFormik.handleSubmit}
                  autoComplete="off"
                  // className="place-form"
                >
                  <label htmlFor="username">Username</label>
                  <Input
                    key={"me"}
                    error={secondFormik.errors.username}
                    touched={secondFormik.touched.username}
                    element="input"
                    id="username"
                    type="text"
                    value={secondFormik.values.username}
                    formik={secondFormik}
                    name="username"
                  ></Input>
                  <label htmlFor="email">Email</label>
                  <Input
                    error={secondFormik.errors.email}
                    touched={secondFormik.touched.email}
                    element="input"
                    id="email"
                    type="email"
                    value={secondFormik.values.email}
                    formik={secondFormik}
                    name="email"
                  ></Input>
                  <label htmlFor="password">Password</label>
                  <Input
                    key={"mes"}
                    error={secondFormik.errors.password}
                    touched={secondFormik.touched.password}
                    element="input"
                    id="password"
                    type="text"
                    value={secondFormik.values.password}
                    formik={secondFormik}
                    name="password"
                  ></Input>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Input
                    error={secondFormik.errors.confirmPassword}
                    touched={secondFormik.touched.confirmPassword}
                    element="input"
                    id="confirmPassword"
                    type="text"
                    value={secondFormik.values.confirmPassword}
                    formik={secondFormik}
                    name="confirmPassword"
                  ></Input>
                  <ImageUpload
                    formik={secondFormik}
                    center
                    id="image"
                    value={secondFormik.values.image}
                  ></ImageUpload>
                  <Button type="submit">
                    {formik.isSubmitting || secondFormik.isSubmitting
                      ? "Submitting..."
                      : "Submit"}
                  </Button>
                </motion.form>
              </motion.div>
            </AnimatePresence>
          )}

          <Button onClick={switchModeHandler} inverse>
            {mode === "login" ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}
          </Button>
        </Card>
      )}
    </>
  );
};

export default Auth;
