import { Button } from "react-bootstrap";
import NavItem from "../Elements/NavItem";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const menus = [
    {
      title: "Home",
      route: "/home",
    },
    {
      title: "Users",
      route: "/users",
    },
    {
      title: "Book",
      route: "/book",
    },
    {
      title: "History",
      route: "/history",
    },
  ];

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <h2 className="mx-5">Library</h2>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {menus.map((menu, index) => {
              return (
                <li key={index}>
                  <NavItem
                    title={menu.title}
                    route={menu.route}
                    active={location.pathname == menu.route ? true : false}
                  />
                </li>
              );
            })}
          </ul>

          <div className="text-end d-flex align-items-center">
            <h6 className="mt-1">Fahro Nur Fauzi</h6>
            <Button type="button" variant="danger" className="ms-4">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;