import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { login } from "@/features/auth/authSlice";

const initialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
});

function Signup() {
  const dispatch = useDispatch();

  const handleSignup = (values) => {
    const mockResponse = {
      user: { id: 1, name: values.name, email: values.email },
      token: "mocktoken",
    };

    dispatch(login(mockResponse));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>
        <Formik
          initialValues={initialValue}
          validationSchema={SignupSchema}
          onSubmit={() => {}}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <Label htmlFor="name" className="block font-medium">
                  Name
                </Label>
                <Field
                  as={Input}
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className={`mt-1 ${
                    errors.name && touched.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="email" className="block font-medium">
                  Email
                </Label>
                <Field
                  as={Input}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`mt-1 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="password" className="block font-medium">
                  Password
                </Label>
                <Field
                  as={Input}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`mt-1 ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="confirmPassword" className="block font-medium">
                  Password
                </Label>
                <Field
                  as={Input}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter your confirm password"
                  className={`mt-1 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full mt-1">
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
