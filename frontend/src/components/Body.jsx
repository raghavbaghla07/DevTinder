import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <Navbar />
      {/* we need an outlet here to render all the child routes of body */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
