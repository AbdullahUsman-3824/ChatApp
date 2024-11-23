import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography, Skeleton } from "@mui/material";

const Profile = ({ userInfo }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to fetch user info, can be replaced by actual API call if necessary
    if (userInfo) {
      setLoading(false); // Stop loading once userInfo is available
    }
  }, [userInfo]);

  if (loading) {
    return (
      <div className="profile p-4 flex items-center ">
        <div className="profile-img mr-4">
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
        </div>
        <div className="profile-name">
          <Skeleton variant="text" width={120} height={28} animation="wave" />
        </div>
      </div>
    );
  }

  return (
    <div className="profile p-4 flex items-center shadow-lg">
      <div className="profile-img mr-4">
        {userInfo?.profilePic ? (
          <img
            src={userInfo.profilePic}
            alt="Profile"
            className="rounded-full w-16 h-16"
          />
        ) : (
          <AccountCircleIcon style={{ fontSize: "3rem" }} />
        )}
      </div>
      <div className="profile-name">
        <Typography variant="h6" component="div">
          {userInfo?.name || "Anonymous"}
        </Typography>
      </div>
    </div>
  );
};

export default Profile;
