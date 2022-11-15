import { Navigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { useFormik } from "formik";
import schemaOne from "../yupSchema/schema1";
import { useNavigate } from "react-router-dom";
import schema from "../yupSchema/schema";
import Button from "../../shared/components/Button/Button";
import { useHttp } from "../../user/pages/httpFn";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinner from "../../shared/UIElements/UIElements/LoadingSpinner";

const variants = {
  hidden: { x: "+100vh" },
  visible: {
    x: "0",
    transition: {
      duration: 0.5,
    },
  },
  exit: { x: "+100vh" },
};

const UpdatePlace = () => {
  const navigate = useNavigate();
  const { sendRequest, error, IsLoading, data } = useHttp();
  const onSubmit = async (values, actions) => {
    const data = await sendRequest(
      `http://127.0.0.1:5000/api/v1/places/${id}`,
      "PATCH",
      JSON.stringify({
        title: values.title,
        description: values.description,
      }),
      {
        "Content-Type": "application/json",
      }
    );
    console.log(data);
    if (data) {
      navigate(-1);
    }
  };
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title,
      description,
    },
    validationSchema: schemaOne,
    onSubmit,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://127.0.0.1:5000/api/v1/places/${id}`);
      const { data } = await res.json();
      console.log(data);
      if (!data) return;
      setTitle(data.title);
      setDescription(data.description);
    };

    fetchData();
  }, []);

  // const matchedItem = DUMMY_ITEMS.find((item) => item.id === id);
  // formik.values.title = matchedItem.title;
  // formik.values.description = matchedItem.description;
  if (IsLoading) {
    return <LoadingSpinner asOverlay></LoadingSpinner>;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.form
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="place-form"
      >
        <Input
          formik={formik}
          error={formik.errors.title}
          value={formik.values.title}
          touched={formik.touched.title}
          element="input"
          type="text"
          label="Updated Title"
          id="title"
        ></Input>
        <Input
          formik={formik}
          error={formik.errors.description}
          value={formik.values.description}
          touched={formik.touched.description}
          type="text"
          label="Description"
          id="description"
        ></Input>
        <Button>{formik.isSubmitting ? "Submitting..." : "Update"}</Button>
      </motion.form>
    </AnimatePresence>
  );
};

export default UpdatePlace;
