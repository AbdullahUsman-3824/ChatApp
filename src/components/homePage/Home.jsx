import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/reducers/userSlice";
// import Box from "@mui/material/Box";
import Drawer from "./Drawer";
import UsersList from "./UsersList";
import Profile from "./Profile";
import ChatBox from "./ChatBox";

const Home = () => {
  const userInfo = useSelector(selectUserInfo || {});

  return (
    <div className="h-screen flex flex-col">
      {/* Title Bar */}
      <div className="title-bar h-12 flex items-center px-4">
        <div className="title-bar-text title text-xl font-medium">MeChat</div>
      </div>

      {/* Main container with drawer and main content */}
      <div className="flex flex-1">
        <Drawer />

        {/* Main Content */}
        <div className="main-content flex-1 flex h-full">
          <div className="sidebar w-1/5  ">
            <Profile userInfo={userInfo} />
            <UsersList />
          </div>
          <div className="chatpanel w-4/5 relative">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
