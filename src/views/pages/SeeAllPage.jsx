import React from "react";
import { HeaderSeeAll } from "../../components/index";
import { Card } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SeeAllPage = () => {
  const { module_action } = useParams();
  console.log(module_action);
  // Sample data for the items
  const items = [
    {
      id: 1,
      name: "Gel Liner",
      price: "₹450",
      mrp: "₹500",
      image: "url_to_image",
      category: "Beauty & Care",
      username: "User1",
    },
    {
      id: 2,
      name: "Face Razor For Women",
      price: "₹170",
      mrp: "₹200",
      image: "url_to_image",
      category: "Beauty & Care",
      username: "User2",
    },
    {
      id: 3,
      name: "Alia Peties Imported Zipper Jacket",
      price: "₹349",
      mrp: "₹400",
      image: "url_to_image",
      category: "Women",
      username: "User3",
    },
    {
      id: 4,
      name: "Reitmanz Imported Zipper Jacket",
      price: "₹349",
      mrp: "₹450",
      image: "url_to_image",
      category: "Women",
      username: "User4",
    },
    {
      id: 5,
      name: "PAC 231 Foundation Brush",
      price: "₹400",
      mrp: "₹450",
      image: "url_to_image",
      category: "Beauty & Care",
      username: "User5",
    },
    {
      id: 6,
      name: "PAC 265 Makeup Brush",
      price: "₹375",
      mrp: "₹400",
      image: "url_to_image",
      category: "Beauty & Care",
      username: "User6",
    },
    {
      id: 7,
      name: "Westside Noun Dress",
      price: "₹500",
      mrp: "₹600",
      image: "url_to_image",
      category: "Women",
      username: "User7",
    },
    {
      id: 8,
      name: "Apple AirPods Pro 2nd Gen",
      price: "3000 Coins",
      mrp: "3500 Coins",
      image: "url_to_image",
      category: "Gadgets",
      username: "User8",
    },
  ];

  return (
    <div>
      <div className="header2">
        <HeaderSeeAll />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>Filter by</h3>
            <div className="mb-3">
              <h5>Category</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="women"
                />
                <label className="form-check-label" htmlFor="women">
                  Women
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="men" />
                <label className="form-check-label" htmlFor="men">
                  Men
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="babyKids"
                />
                <label className="form-check-label" htmlFor="babyKids">
                  Baby & Kids
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="beautyCare"
                />
                <label className="form-check-label" htmlFor="beautyCare">
                  Beauty & Care
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="bags" />
                <label className="form-check-label" htmlFor="bags">
                  Bags
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="books"
                />
                <label className="form-check-label" htmlFor="books">
                  Books
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="homeKitchen"
                />
                <label className="form-check-label" htmlFor="homeKitchen">
                  Home & Kitchen
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gadgets"
                />
                <label className="form-check-label" htmlFor="gadgets">
                  Gadgets
                </label>
              </div>
            </div>
            <div className="mb-3">
              <h5>Status</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="any"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="any">
                  Any
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="available"
                />
                <label className="form-check-label" htmlFor="available">
                  Available
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="sold"
                />
                <label className="form-check-label" htmlFor="sold">
                  Sold
                </label>
              </div>
            </div>
            <div className="mb-3">
              <h5>Condition</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="anyCondition"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="anyCondition">
                  Any
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="unused"
                />
                <label className="form-check-label" htmlFor="unused">
                  Unused
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="used"
                />
                <label className="form-check-label" htmlFor="used">
                  Used
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-end mb-3">
              <select className="form-select w-25">
                <option>Sort by default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="row">
              {items.map((item) => (
                <div key={item.id} className="col-md-3 mb-4">
                  <Card
                    className="h-100 w-100 border-0 position-relative"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        height: "220px",
                        width: "190px",
                        margin: "0px auto",
                        borderRadius: "10px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Card.Img
                        src={
                          item.image || "https://via.placeholder.com/220x250"
                        }
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <Card.Body className="px-3 py-2">
                      <Card.Title
                        className="mb-1 text-black fw-bold"
                        style={{
                          fontSize: "0.9rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {item.category}
                      </Card.Text>
                      <div className="d-flex align-items-center">
                        <span className="fw-bolder text-success me-2">
                          {item.price}
                        </span>
                        <span className="ml-2">
                          <strike
                            className="text-muted"
                            style={{ fontSize: "0.85rem" }}
                          >
                            {item.mrp}
                          </strike>
                        </span>
                      </div>
                      <div className="pt-3">
                        <span className="fw-bolder text-black me-2">
                          {item.username}
                        </span>
                        <div className="d-flex mt-2">
                          {[...Array(4)].map((_, i) => (
                            <FaStar
                              key={i}
                              style={{
                                color: "green",
                                fontSize: "1rem",
                                marginRight: "3px",
                              }}
                            />
                          ))}
                          <FaRegStar
                            style={{
                              color: "grey",
                              fontSize: "1rem",
                              marginLeft: "3px",
                              stroke: "grey",
                              strokeWidth: "10",
                            }}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAllPage;
