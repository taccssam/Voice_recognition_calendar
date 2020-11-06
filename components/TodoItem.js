import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { MinusOutlined, CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";

const TodoItem = ({ post }) => {
  const { textValue } = post;
  const [end, setEnd] = useState(false);

  const style = {
    backgroundColor: "#f0f0f0",
    color: "#595959",
  };

  const style2 = {
    backgroundColor: "#2f54eb",
    color: "white",
  };
  const onToggle = useCallback(() => {
    setEnd((prev) => !prev);
  }, []);
  return (
    <div className="todoItemWrapper">
      <Button
        size="small"
        shape="circle"
        icon={!end ? <MinusOutlined /> : <CheckOutlined />}
        onClick={onToggle}
      ></Button>
      <div className="textBox" style={end ? style2 : style}>
        <div className="textBox__imo">😀</div>
        <div className="textBox__text">{textValue}</div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default TodoItem;
