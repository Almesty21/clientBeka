import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import  Navbar  from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer  from "./components/Footer";
import Newsletter from "./components/NewsLetter";
import { NotificationProvider } from './contexts/NotificationContext';

const App: React.FC = () => {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "rgb(30,30,30)",
      },
      components: {
        Input: {
          boxShadow: "0 0 0 1px rgba(3, 3, 3, 0.3)",
          activeShadow: "0 0 0 1px rgba(3, 3, 3, 0.5)",
        },
        Select: {
          boxShadow: "0 0 0 1px rgba(3, 3, 3, 0.64)",
          boxShadowSecondary: "0 0 0 1px rgba(3, 3, 3, 0.64)",
          boxShadowTertiary: "0 0 0 1px rgba(3, 3, 3, 0.64)",
        },
      },
    }}>
    <NotificationProvider>
    <BrowserRouter>
      <Navbar />
      <div>
        <AppRoutes />
        <Newsletter/><hr/>
        <Footer/>
      </div>

    </BrowserRouter>
    </NotificationProvider>
    </ConfigProvider>
  );
};

export default App;