import { SignInInputType } from "@abhishekwadi/medium-common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

const SignInComponent = () => {
  const navigate = useNavigate();
  const [signInputs, setSignInInput] = useState<SignInInputType>({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInInput({
      ...signInputs,
      [e.target.name]: e.target.value,
    });
  };
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate input

    try {
      if (signInputs.email.trim() === "" || signInputs.password.trim() === "") {
        // alert("Please don't fill the spaces");
        toast.error("Please fill the spaces");
        return;
      }
      toast("loading...");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signInputs
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/blogs");
      toast.success("logged in successfully");

      // TODO: send signIn request to server
      // console.log(signInputs);
    } catch (error) {
      console.log(error);
      // alert("Failed to sign in");
      toast.error("Failed to sign in");
      return;
    }
  };
  return (
    <div className="h-screen flex justify-center items-center overflow-hidden ">
      <div className="px-4 py-5  shadow-lg ">
        <form action="" onSubmit={onFormSubmit}>
          <div className="text-3xl font-bold">SignIn to your account</div>
          <div className="text-sm py-3 pb-4 font-semibold text-center">
            New the medium?{" "}
            <span className="link underline ">
              <Link to={"/signup"}> signUp </Link>
            </span>
          </div>

          <div className="mt-4">
            <input
              className="w-full px-3 py-2 text-sm rounded-md focus:outline-none border focus:ring-primary-500"
              type="text"
              placeholder="Email"
              onChange={handleInputChange}
              name="email"
              value={signInputs.email}
            />
          </div>
          <div className="mt-4">
            <input
              className="w-full px-3 py-2 text-sm rounded-md focus:outline-none border focus:ring-primary-500"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              name="password"
              value={signInputs.password}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm font-medium text-white border bg-black rounded-md hover:bg-primary-700"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInComponent;
