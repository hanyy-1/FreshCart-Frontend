import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [eye, seteye] = useState("password");
  const [iconeye, seticoneye] = useState(true);
  const PassRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  function passwordType() {
    if (eye == "password") {
      seteye("text");
      seticoneye(!eye);
    } else {
      seteye("password");
      seticoneye(!eye);
    }
  }
  const navigate = useNavigate();
  const validationSchema = object({
    email: string().required("email required").email("must be email verified"),
    newPassword: string()
      .required("password required")
      .matches(
        PassRegex,
        "pass must start with capital letter followed 5 chars or more"
      ),
  });
  const Formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: ResetPass,
    validationSchema,
  });
  async function ResetPass(values) {
    const loading = toast.loading("wait");

    const verifiedEmail = localStorage.getItem("verifiedEmail");
    if (verifiedEmail !== values.email) {
      toast.error(
        "This email is not verified. Please enter the verified email."
      );
      toast.dismiss(loading);
      return;
    }
    try {
      const options = {
        url: "http://localhost:5143/api/v1/auth/resetPassword",
        method: "put",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Password Updated");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error);
      toast.error(error.response?.data?.message);
    } finally {
      toast.dismiss(loading);
    }
  }
  return (
    <div className="py-40">
      <h2 className="text-xl font-semibold text-mainColor">Reset password</h2>
      <form onSubmit={Formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="">Email</label>
          <input
            className="input bg-slate-100 w-full"
            type="email"
            name="email"
            value={Formik.values.email}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
          />
          {Formik.errors.email && Formik.touched.email && (
            <p className="text-red-500 text-sm mt-1">{Formik.errors.email}</p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="">New Password</label>
          <div className="relative">
            <input
              className="input bg-slate-100 w-full"
              type={eye}
              name="newPassword"
              value={Formik.values.newPassword}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            {iconeye ? (
              <i
                className="fa-solid fa-eye absolute right-4 top-[50%] -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  passwordType();
                }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash absolute right-4 top-[50%] -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  passwordType();
                }}
              ></i>
            )}
          </div>
          {Formik.errors.newPassword && Formik.touched.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {Formik.errors.newPassword}
            </p>
          )}
        </div>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}