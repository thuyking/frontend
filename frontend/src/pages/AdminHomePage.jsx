import { Link } from "react-router-dom";
import { useAdminOrders } from "../hooks/useAdminOrders";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useAdminUsers } from "../hooks/useAdminUsers";

const AdminHomePage = () => {
  const { data: orders = [] } = useAdminOrders();
  const { data: products = [] } = useAdminProducts();
  const { data: users = [] } = useAdminUsers();
  const revenue = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);

  return (
    <div className="flex min-h-screen relative">
      {/* Content */}
      <div className="flex-1 pt-11 laptop:pt-0 tablet:pt-0">
        <div className="p-6 w-full">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-gray-500 text-sm">Revenue</h2>
              <p className="text-2xl font-semibold">${revenue}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-gray-500 text-sm">Total Orders</h2>
              <p className="text-2xl font-semibold">{orders.length}</p>
              <Link
                to="/admin/orders"
                className="text-blue-500 text-sm hover:underline"
              >
                Manage Orders
              </Link>
            </div>

            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-gray-500 text-sm">Products / Users</h2>
              <p className="text-2xl font-semibold">
                {products.length} / {users.length}
              </p>
              <Link
                to="/admin/products"
                className="text-blue-500 text-sm hover:underline"
              >
                Manage Products
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="p-3">ORDER ID</th>
                  <th className="p-3">USER</th>
                  <th className="p-3">TOTAL PRICE</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">{order?.user || "Unknow" }</td>
                    <td className="p-3">${order.totalPrice}</td>
                    <td className="p-3 text-gray-600">{order.status}</td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
