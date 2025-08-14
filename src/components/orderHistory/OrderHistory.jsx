import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByUserAndSellerId } from "../../redux/slices/orderSlice";
import "./OrderHistory.css";

const OrderHistory = ({ userId, sellerId }) => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);


  console.log("orderss<><>",orders)

  useEffect(() => {
    dispatch(fetchOrderByUserAndSellerId({ userId, sellerId }));
  }, [dispatch, userId, sellerId]);

  if (loading) return <div className="loading">Loading your orders...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const ordersArray = Array.isArray(orders) ? orders : [];

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {ordersArray.length > 0 ? (
        <div className="orders-list">
          {ordersArray.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order.order_id}</span>
                <span className={`order-status ${order.order_status === "1" ? "delivered" : "pending"}`}>
                  {order.order_status === "1" ? "Delivered" : "Pending"}
                </span>
              </div>
              <div className="order-date">
                Date: {new Date(order.order_date).toLocaleString()}
              </div>
              <div className="order-total">Total: ₹{order.total_amount}</div>
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.order_items?.map((item) => (
                    <li key={item.order_item_id}>
                      {item.product_title} (Size: {item.size}, Weight: {item.weight}) - ₹{item.selling_price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shipping-details">
                <h4>Shipping Details:</h4>
                <p>
                  {order.shipping_details?.name}, {order.shipping_details?.mobile}
                  <br />
                  {order.shipping_details?.address}, {order.shipping_details?.city}, {order.shipping_details?.state} - {order.shipping_details?.zip_code}
                </p>
              </div>
              {order.payouts?.length > 0 && (
                <div className="payout-details">
                  <h4>Payout Details:</h4>
                  <ul>
                    {order.payouts.map((payout) => (
                      <li key={payout.payout_id}>
                        {payout.note} - ₹{payout.amount} ({payout.payment_method})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders">No orders found.</div>
      )}
    </div>
  );
};

export default OrderHistory;
