import React from "react";
import { Dropdown } from "flowbite-react";
import { FiMoreVertical } from "react-icons/fi"; // React Icons for 3 dots

const ActionsMenu = ({ itemId, actions }) => {
  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<FiMoreVertical size={20} className="text-gray-500 cursor-pointer" />}
    >
      {actions.map((action, index) => (
        <Dropdown.Item
          key={index}
          onClick={() => action.onClick(itemId)}
          className="hover:bg-gray-100"
        >
          {action.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default ActionsMenu;
