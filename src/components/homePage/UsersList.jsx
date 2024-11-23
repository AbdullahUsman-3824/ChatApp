import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setReceiver,
  selectReceiverInfo,
} from "../../redux/reducers/receiverSlice";
import { selectUserInfo } from "../../redux/reducers/userSlice";
import { getAllUsers } from "../../services/userActions";

// MUI Imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Skeleton from "@mui/material/Skeleton";

export default function UsersList() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const receiverInfo = useSelector(selectReceiverInfo);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await getAllUsers();
      const filteredUsers = users.filter((user) => user.uid !== userInfo?.uid);
      setAllUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleClick = (user) => {
    const createdAt = user.createdAt?.toDate().toISOString() || null;
    const serializedData = { ...user, createdAt };
    dispatch(setReceiver(serializedData));
  };

  if (loading) {
    return (
      <div className="usersList">
        <h3 className="m-0 px-3 pt-3 ">Users</h3>
        <List>
          {Array.from(new Array(5)).map((_, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton className="p-3">
                <ListItemIcon>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemIcon>
                <ListItemText>
                  <Skeleton variant="text" width={120} height={28} />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  if (allUsers.length === 0) {
    return (
      <div className="usersList">
        <h3 className="m-0 px-3 pt-3 ">Users</h3>
        <p className="p-4 text-lg">No users found</p>
      </div>
    );
  }
  return (
    <div className="usersList">
      <h3 className="m-0 px-3 pt-3">Users</h3>
      <List>
        {allUsers.map((user, index) => (
          <ListItem
            key={index}
            disablePadding
            style={{
              backgroundColor:
                receiverInfo &&
                user.id == receiverInfo.id &&
                "var(--bg-primary)",
            }}
          >
            <ListItemButton className="p-3" onClick={() => handleClick(user)}>
              <ListItemIcon>
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="rounded-full"
                    style={{ width: 40, height: 40 }}
                  />
                ) : (
                  <AccountCircleIcon style={{ fontSize: "2.5rem" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
