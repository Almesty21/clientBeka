import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="w-full">
      <div className="w-full pl-260 transition-all duration-500">
        <div className="w-full relative px-9 pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
