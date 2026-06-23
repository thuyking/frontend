
import { FiUser, FiBox, FiShoppingCart, FiHome } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../lib/authStorage";

const AdminSideBar = () => {
  const navigate = useNavigate();

  function LogOut() {
    clearAuth();
    navigate("/login");
  }

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-6 ">
      <div className="mb-8">
        <Link to="/" className="text-xl font-bold">
          THUY ▢
        </Link>
      </div>

      <h2 className="text-lg font-semibold mb-6 text-gray-200">
        Admin Dashboard
      </h2>

      <nav className="flex flex-col space-y-2 flex-1">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-3"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3"
          }
        >
          <FiUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-3"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3"
          }
        >
          <FiBox />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-3"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3"
          }
        >
          <FiShoppingCart />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin/shop"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-3"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-3"
          }
        >
        </NavLink>
      </nav>

      <button
        onClick={LogOut}
        className="mt-6 bg-red-600 hover:bg-red-700 py-2 rounded flex items-center justify-center space-x-2"
      >
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSideBar;
