import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About"; 
import Contact from "../pages/Contact/Contact"; 
import Products from "../pages/Ai/Product"; 
import Register from "../pages/Auth/Register/index"; 
import Login from "../pages/Auth/Login/index"; 
import { RouteName } from "../constants/route";
import BlogList from "../pages/Blog/BlogList";
import BlogDetail from "../pages/Blog/BlogDetails";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={RouteName.HOME} element={<Home />} />
      <Route path={RouteName.ABOUT} element={<About />} />
      <Route path={RouteName.CONTACT} element={<Contact />} />
      
      {/* Blog Routes with nested structure */}
      <Route path={RouteName.BLOG}>
        <Route index element={<BlogList />} />
        <Route path=":id" element={<BlogDetail />} />
      </Route>
      
      <Route path={RouteName.PRODUCTS} element={<Products />} />
      <Route path={RouteName.REGISTER} element={<Register />} />
      <Route path={RouteName.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;