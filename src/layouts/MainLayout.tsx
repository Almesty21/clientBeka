import Header from "components/Header";
import SideBar from "components/SideBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="w-full">
      <SideBar />
      <div className="w-full pl-260 transition-all duration-500">
        <div className="w-full relative px-9 pt-4">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
