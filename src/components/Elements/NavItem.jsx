import { Link } from "react-router-dom";

const NavItem = (props) => {
  const { title, route, active } = props;
  return (
    <Link className="text-white text-decoration-none" to={route}>
      <div
        className={`${
          active ? "bg-primary" : "bg-transparent"
        } px-3 py-1 rounded-pill fw-semibold`}
      >
        {title}
      </div>
    </Link>
  );
};

export default NavItem;
