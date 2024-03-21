/** @format */

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { GET_ALL_ORDERS } from "@/graphql/query/orderdetails";
import { useLazyQuery } from "@apollo/client";
import { getCookie } from "cookies-next";
import Pagination from "react-js-pagination";
import { useTranslations } from "next-intl";
import SearchPrdLoader from "../loader/search-prd-loader";
import useLoadingState from "@/hooks/use-loading";
import ReviewPopup from "./reviewPopup";

const ITEMS_PER_PAGE = 10;

const MyOrders = () => {
  const [userInfo, setUserInfo] = useState(null);
  const isLoading = useLoadingState();
  const token = getCookie("token");
  const [Orders, { loading, error, data }] = useLazyQuery(GET_ALL_ORDERS);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrderItems, setFilteredOrderItems] = useState([]);
  const t = useTranslations("header");
  const [showPopup, setShowPopup] = useState(false);
  const [product_id, setProductId] = useState(false);
  useEffect(() => {
    const userCookie = getCookie("userInfo");
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUserInfo(user);
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      Orders({
        variables: {
          filters: {
            user: {
              id: {
                eq: userInfo.id,
              },
            },
          },
          pagination: {
            limit: 100,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [userInfo?.id]);

  useEffect(() => {
    if (data?.orders?.data) {
      const reversedItems = data.orders.data.slice().reverse();
      const filteredItems = reversedItems.filter((item) =>
        item.id.toString().includes(searchQuery)
      );
      setFilteredOrderItems(filteredItems);
      setActivePage(1);
      setProductId(data?.orders?.data[0]?.attributes?.products[0]?.productId);
    }
  }, [data?.orders?.data, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginatedOrderItems = filteredOrderItems.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  const handleLogout = () => {
    setShowPopup(true);
  };
  const submitReview = () => {
    setShowPopup(false);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {loading || isLoading ? (
        <div>
          <SearchPrdLoader />
        </div>
      ) : (
        <div
          className="profile__ticket table-responsive"
          style={{
            backgroundColor: "white",
          }}
        >
          <div className="search-bar">
            <input
              type="text"
              placeholder={t("Search by Order Id")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {!filteredOrderItems || filteredOrderItems.length === 0 ? (
            <div
              style={{ height: "210px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="text-center">
                <i
                  style={{ fontSize: "30px" }}
                  className="fa-solid fa-cart-circle-xmark"
                ></i>
                <p>{t("You Have no order Yet")}</p>
              </div>
            </div>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t("Order Id")}</th>
                    <th scope="col">{t("Order Time")}</th>
                    <th scope="col">{t("Status")}</th>
                    <th scope="col">{t("View")}</th>
                    {/* <th scope="col">{t("Add Review")}</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrderItems.map((item) => (
                    <tr key={item?.id}>
                      <th scope="row">{item?.id}</th>
                      <td data-info="title">
                        {dayjs(item.attributes.publishedAt).format(
                          "MMMM D, YYYY"
                        )}
                      </td>
                      <td>{item?.attributes?.status}</td>
                      <td>
                        <Link
                          href={`/order/${item.id}`}
                          className="tp-logout-btn"
                        >
                          {t("Invoice")}
                        </Link>
                      </td>
                      {/* <td>
                        {item?.attributes?.status === "pending" ||
                          item?.attributes?.status === "processing" ||
                          item?.attributes?.status === "canceled" ||
                          item?.attributes?.status === "approved" ||
                          item?.attributes?.status === "Tracking" ? (
                          <button className="tp-logout-btn text-secondary bg-light border-light" disabled onClick={handleLogout}>
                            {t("Add Review")}
                          </button>
                        ) : (
                          <button className="tp-logout-btn" onClick={handleLogout}>
                            {t("Add Review")}
                          </button>
                        )}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filteredOrderItems.length > ITEMS_PER_PAGE && (
            <div
              className="pagination-container shadow-none d-flex justify-content-center my-2"
              style={{ direction: "ltr" }}
            >
              <Pagination
                className="shadow-none "
                activePage={activePage}
                itemsCountPerPage={ITEMS_PER_PAGE}
                totalItemsCount={filteredOrderItems.length}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </div>
      )}
      {showPopup && (
        <ReviewPopup
          product_id={product_id}
          isOpen={showPopup}
          message={t("Are you sure you want to logout") + "?"}
          onConfirm={submitReview}
          onCancel={closePopup}
        />
      )}
    </>
  );
};

export default MyOrders;
