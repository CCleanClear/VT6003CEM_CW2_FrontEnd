//import './App.css';
import 'antd/dist/reset.css';
import { Layout, Space, Col, FloatButton } from 'antd';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import Landing from "./components/Landing"
import * as AuthService from "./services/auth.service";
import UserT from './types/user.type';
import Login from "./components/Login";
import Register from "./components/Register";
import EventBus from "./components/common/EventBus";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import DetailArticle from './components/DetailArticle';
import Profile from './components/Profile';
import FavPage from './components/favpage';
import { LogoutOutlined, HomeOutlined, DashboardOutlined, InfoCircleOutlined, HeartFilled, HeartTwoTone, HomeTwoTone, DashboardTwoTone, InfoCircleTwoTone, SearchOutlined, PictureTwoTone, EnvironmentTwoTone } from '@ant-design/icons';
import Copyright from './components/Copyright';
import Breed from './components/Breed';

const { Header, Content, Footer } = Layout;

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserT | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Router>
      <Layout>
        <Header>
          <nav style={{ float: 'left' }}>
            <div> <Space>

              <Link to={"/"} >
                <img
                  src="/src/assets/pawprint.png"
                  alt="profile-img"
                  className="profile-img-card"
                  width={30}
                />
              </Link>
              <Link to={"/"} >

                <h2 style={{ color: "white" }}>The Canine Shelter</h2>
              </Link>
              <Link to="/" ><HomeTwoTone style={{ fontSize: '32px', color: "white" }} /></Link>
              <Link to="/dashboard"><EnvironmentTwoTone style={{ fontSize: '32px', color: "white" }} /></Link>
              <Link to="/about"><InfoCircleTwoTone style={{ fontSize: '32px', color: "white" }} /></Link>
              {currentUser?.role === 'admin' && (
                <Link to="/breed">
                  <PictureTwoTone style={{ fontSize: '32px', color: 'white' }} />
                </Link>
              )}

            </Space></div>
          </nav>

          <nav style={{ float: 'right' }}>
            {currentUser ? (
              <div>  <Space>

                <Link to={"/profile"} style={{ color: "white", fontSize: 20 }}>
                  {currentUser.username}
                </Link>
                <Link to="/favpage"><HeartTwoTone style={{ fontSize: '32px', color: "white" }} /></Link>
                <a href="/" className="nav-link" onClick={logOut}> <LogoutOutlined style={{ fontSize: '32px', color: "white" }} /></a>
              </Space></div>
            ) : (
              <div><Space>
                <Login />
                <Link to="/register">Register</Link>
              </Space></div>
            )}
          </nav>

        </Header>
        <Content>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/breed" element={<Breed />} />
            <Route path="/:aid" element={<DetailArticle />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favpage" element={<FavPage />} />
          </Routes>
        </Content>
        <Footer>
          <Copyright /><img
            src="/src/assets/pawprint.png"
            alt="profile-img"
            className="profile-img-card"
            width={40} />

        </Footer>
        <FloatButton.BackTop />
      </Layout>
    </Router>
  )
}