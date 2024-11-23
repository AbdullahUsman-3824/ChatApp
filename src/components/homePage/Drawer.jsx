import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOutUser } from "../../services/userActions.js";
import ConfirmDialog from "./ConfirmDialog.jsx";

import "../../Styles/Home.css"

export default function Drawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the drawer open/close state
  const toggleDrawer = () => setDrawerOpen((prevState) => !prevState);

  // Handle drawer item click actions
  const handleActionClick = (action) => {
    if (action === "Profile") {
      // Handle profile navigation
      navigate("/profile");
    } else if (action === "LogOut") {
      // Open the confirmation dialog for logout
      setLogoutDialogOpen(true);
    }
  };

  // Close the confirmation dialog
  const handleDialogClose = () => setLogoutDialogOpen(false);

  // Handle actual logout action
  const handleLogOut = () => {
    signOutUser();
    navigate("/login");
  };

  return (
    <div
      className={`drawer h-full flex flex-col relative transition-all duration-300 ${
        isDrawerOpen ? "w-48" : "w-12"
      }`}
    >
      {/* Toggle drawer icon */}
      <IconButton
        onClick={toggleDrawer}
        className="w-fit mt-1 mx-1"
        aria-label={isDrawerOpen ? "Close drawer" : "Open drawer"}
      >
        {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

      {/* Drawer List Items */}
      <List className="mt-auto" >
        {["Profile", "LogOut"].map((text, index) => (
          <ListItem key={text} disablePadding >
            <ListItemButton onClick={() => handleActionClick(text)}>
              <ListItemIcon className="justify-center" sx={{ minWidth: 0 }} >
                {index === 0 ? <PersonIcon /> : <LogoutIcon />}
              </ListItemIcon>
              {/* Conditional text rendering for when drawer is open */}
              <ListItemText
                primary={text}
                className={`${
                  isDrawerOpen ? "opacity-100" : "opacity-0"
                } pl-3 transition-all duration-300`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        open={isLogoutDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleLogOut}
        confirmText="Log Out"
        dialogText="Are you sure you want to log out?"
      />
    </div>
  );
}
