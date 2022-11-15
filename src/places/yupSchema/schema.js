import * as yup from "yup";
const basicSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required").min(5),
  address: yup.string().required("Address is required"),
});

export default basicSchema;
