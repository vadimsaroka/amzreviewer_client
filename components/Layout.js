import Header from "./Header";
import Footer from "./Footer";

import "./Layout.scss";

const Layout = props => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
