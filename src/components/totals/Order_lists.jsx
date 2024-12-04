import React, { useContext } from "react";
import moment from "moment";
import { OrderContext } from "../../page/dashboard/Order_page";

export default function Order_lists() {
  const orders = useContext(OrderContext);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  return (
    <table className="w-full bg-white">
      <thead>
        <tr className="w-full">
          {["Order ID", "Customer", "Phone","Address", "Date", "Total Price", "Items"].map((header) => (
            <th key={header} className="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-b font-medium text-gray-600">
            <td className="px-2 lg:py-3 py-2 text-sm">{order.orderId}</td>
            <td className="px-2 lg:py-3 py-2 text-sm truncate">{order.firstname} {order.lastname}</td>
            <td className="px-2 lg:py-3 py-2 text-sm">+234{order.phone}</td>
            <td className="px-2 lg:py-3 py-2 text-sm truncate">{order.address}</td>
            <td className="px-2 lg:py-3 py-2 text-sm">
              {moment(order.createdAt).format("MMMM Do, YYYY")}
            </td>
            <td className="px-2 lg:py-3 py-2 text-sm">
              ₦{calculateTotalPrice(order.items).toLocaleString()}
            </td>
            <td className="px-2 lg:py-3 py-2 text-sm">{order.items.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
