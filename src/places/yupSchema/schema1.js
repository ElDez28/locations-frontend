import * as yup from "yup";
const schemaOne = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required").min(5),
});

export default schemaOne;
