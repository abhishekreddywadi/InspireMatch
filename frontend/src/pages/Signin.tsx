import Quote from "../components/Quote";
import SignInComponent from "../components/SignInComponent";

const Signin = () => {
  return (
    <div className="grid  overflow-hidden lg:grid-cols-2">
      <div>
        <SignInComponent />
      </div>
      <div className="invisible hidden lg:block lg:visible">
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
