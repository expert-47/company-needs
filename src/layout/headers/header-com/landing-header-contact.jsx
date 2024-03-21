import React from "react";
import { Email, Phone } from "@/svg";
import Link from "next/link";

const LandingTopHeaderContact = ({ shownOnlyNmber }) => {
  return (
    <div className="d-flex mt-2">
      {!shownOnlyNmber && (
        <div className="d-flex mr-10">
          <div className="mr-5 ml-5">
            <Email color={"white"} />
          </div>
          <p className="text-white">
            <Link href="mailto:ompanyneeds@support.com">
              companyneeds@support.com
            </Link>
          </p>
        </div>
      )}
      <div className="d-flex mr-10 ml-10">
        <div className="mr-5">
          <Phone color={"white"} width={16} height={15} />
        </div>
        <p className="text-white">
          <Link href="tel:402-763-282-46">+966-11199-8877</Link>
        </p>
      </div>
    </div>
  );
};

export default LandingTopHeaderContact;
