import * as yup from "yup";
// const passwordRules =
//   /^(?=.*d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&*])(?=.*[a-zA-Z]).{8,16}$/;
const schemaFour = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    // .matches(passwordRules, "Enter a stronger password")
    .required("This field is required"),
  username: yup.string().required("This field is required"),
  confimPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});

export default schemaFour;
