import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Button from "../../shared/components/Button/Button";
import Input from "../components/Input";
import { replace, useFormik } from "formik";
import { motion } from "framer-motion";
import { useHttp } from "../../user/pages/httpFn";
import "./NewPlace.css";
import basicSchema from "../yupSchema/schema";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/UIElements/UIElements/ImageUpload";

const NewPlace = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.login.id);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("address", values.address);
    formData.append("image", values.image);
    console.log(formData);
    await sendRequest(
      `http://127.0.0.1:5000/api/v1/users/${id}/places`,
      "POST",
      formData
    );
    actions.resetForm();
    navigate(`/users`, { replace: true });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      address: "",
      image: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  const variants = {
    hidden: { x: "+100vw" },
    visible: {
      x: "0",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
    exit: {
      x: "-100vw",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <motion.form
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={formik.handleSubmit}
        className="place-form"
      >
        <Input
          formik={formik}
          error={formik.errors.title}
          value={formik.values.title}
          touched={formik.touched.title}
          element="input"
          type="text"
          label="Title"
          id="title"
        ></Input>
        <Input
          formik={formik}
          error={formik.errors.description}
          value={formik.values.description}
          touched={formik.touched.description}
          element="desc"
          type="text"
          label="textarea"
          id="description"
        ></Input>
        <Input
          formik={formik}
          error={formik.errors.address}
          value={formik.values.address}
          touched={formik.touched.address}
          element="input"
          type="text"
          label="address"
          id="address"
        ></Input>
        <ImageUpload formik={formik} center></ImageUpload>
        <Button>{formik.isSubmitting ? "Submitting" : "Add Place"}</Button>
      </motion.form>
      <Outlet />
    </>
  );
};

export default NewPlace;
