import React from "react";
import { Dropdown, Avatar, DropdownDivider } from "flowbite-react";
import { useAuth } from "../services/provider/AuthContextProvider";
const UserDropDown = () => {
  const {logout}=useAuth();
  return (
    <>
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <span>
            <Avatar
            size="md"
              img="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              rounded
             
            />
          </span>
        )}
      >
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <DropdownDivider />
        <Dropdown.Item onClick={()=>{
          logout()
        }}>Sign out</Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default UserDropDown;
