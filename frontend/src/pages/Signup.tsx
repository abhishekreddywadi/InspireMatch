import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
  return (
    <div className="grid  overflow-hidden lg:grid-cols-2">
      <div>
        <Auth />
      </div>
      <div className="invisible hidden lg:block lg:visible">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
