import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu } from "antd";

import Today from "./Today";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Today />
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a>today</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/month">
              <a>month</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/goal">
              <a>goal</a>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="pageWrapper">{children}</div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
