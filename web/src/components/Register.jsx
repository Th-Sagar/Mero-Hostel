import React from "react";
import Button from "./Button";
import { RxCrossCircled } from "react-icons/rx";
import { signUpSchema } from "../Schemas/registerSchemas";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/UserDetailSlice.jsx";

const Register = ({ handleCross, handleLogin }) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const dispatch = useDispatch();

  const { values, errors, handleBur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        dispatch(registerUser(values));
        action.resetForm();
      },
    });

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-30  ">
      <div className="container flex justify-center items-center w-full">
        <div className=" rounded-2xl bg-white p-4 flex justify-between items-center w-4/5 md:w-2/3 lg:w-[50rem] py-16 relative">
          <div className="absolute top-0 right-0 m-4">
            <RxCrossCircled
              size={20}
              className="hover:scale-110 transition-all ease-in duration-300"
              onClick={handleCross}
            />
          </div>
          <div className=" md:w-1/3 hidden md:flex  ">
            <img
              src="/images/pattern.jpg"
              className="rounded-2xl "
              width={150}
              alt=""
            />
          </div>
          <div className="w-full md:w-2/3 flex justify-center items-center flex-col ">
            <h2 className=" font-bold text-2xl mb-10">Sign Up</h2>
            <form id="register" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="pt-2 font-bold">First Name</label>
                <input
                  type="text"
                  className="py-2 outline-none border-b-2 focus:border-b-2 focus:border-blue-500 transition-all ease-in duration-300"
                  placeholder="First Name "
                  name="firstname"
                  id="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBur}
                />
                {errors.firstname && touched.firstname ? (
                  <p className="text-red-600 italic">{errors.firstname}</p>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label className="pt-2 font-bold">Last Name</label>
                <input
                  type="text"
                  className="py-2 outline-none border-b-2 focus:border-b-2 focus:border-blue-500 transition-all ease-in duration-300"
                  placeholder="Last Name "
                  name="lastname"
                  id="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBur}
                />
                {errors.lastname && touched.lastname ? (
                  <p className="text-red-600 italic">{errors.lastname}</p>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label className="pt-2 font-bold">Email</label>
                <input
                  type="email"
                  className="py-2 outline-none border-b-2 focus:border-b-2 focus:border-blue-500 transition-all ease-in duration-300"
                  placeholder="Email "
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBur}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600 italic">{errors.email}</p>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label className="pt-2 font-bold">Password</label>
                <input
                  type="password"
                  className="py-2 outline-none border-b-2 focus:border-b-2 focus:border-blue-500 transition-all ease-in duration-300"
                  placeholder="Enter your name "
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBur}
                />
                {errors.password && touched.password ? (
                  <p className="text-red-600 italic">{errors.password}</p>
                ) : null}
              </div>
              <Button
                width={"w-2/3"}
                bg={
                  " bg-[#ff385c] text-white   hover:bg-white hover:text-[#ff385c]"
                }
                title={"Sign Up"}
              />

              <div className="pt-2">
                <h5 className="font-medium">
                  Already a member?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={handleLogin}
                  >
                    SignIn Now
                  </span>
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
