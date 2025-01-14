import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem, Menu } from "semantic-ui-react";

function NavBar() {
  const [activeItem, setActiveItem] = useState("Home");

  function handleClick(e, { name }) {
    setActiveItem(name);
  }

  return (
    <Menu inverted>
      <MenuItem
        name="Home"
        active={activeItem === "Home"}
        onClick={handleClick}
        as={Link}
        to="/"
      />
      <MenuItem
        name="Customers"
        active={activeItem === "Customers"}
        onClick={handleClick}
        as={Link}
        to="/customer"
      />
      <MenuItem
        name="Products"
        active={activeItem === "Products"}
        onClick={handleClick}
        as={Link}
        to="/product"
      />
      <MenuItem
        name="Stores"
        active={activeItem === "Stores"}
        onClick={handleClick}
        as={Link}
        to="/store"
      />
      <MenuItem
        name="Sales"
        active={activeItem === "Sales"}
        onClick={handleClick}
        as={Link}
        to="/sale"
      />
    </Menu>
  );
}

export default NavBar;
