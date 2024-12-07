import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { login } from "@/features/auth/authSlice";

// initial values for formik
const initialValue = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Too short!").required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle login submission
  const handleLogin = (values) => {
    const mockReponse = {
      user: { id: 1, name: "John dave", email: values.email },
      token: "mocktoken123",
    };
    dispatch(login(mockReponse));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>
        <Formik
          initialValues={initialValue}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
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
              <Button type="submit" className="w-full mt-1">
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
