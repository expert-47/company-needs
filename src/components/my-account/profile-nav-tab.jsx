import { useTranslations } from "next-intl";
import React from "react";

function SingleNav({ active = false, id, title, icon }) {
  return (
    <button
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
    >
      <span>
        <i className={icon}></i>
      </span>
      {title}
    </button>
  );
}

const ProfileNavTab = () => {
  const t = useTranslations("header");
  return (
    <nav>
      <div
        className="nav nav-tabs tp-tab-menu flex-column"
        id="profile-tab"
        role="tablist"
      >
        <SingleNav
          active={true}
          id="profile"
          title={t("Profile")}
          icon="fa-regular fa-user-pen"
        />
        <SingleNav
          id="information"
          title={t("Information")}
          icon="fa-regular fa-circle-info"
        />
        <SingleNav
          id="order"
          title={t("My Orders")}
          icon="fa-light fa-clipboard-list-check"
        />
        <SingleNav
          id="password"
          title={t("Change Password")}
          icon="fa-regular fa-lock"
        />
      </div>
    </nav>
  );
};

export default ProfileNavTab;
