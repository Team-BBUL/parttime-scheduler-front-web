import React from "react";
import { createSelectable } from "react-selectable-fast";

function Box(props) {
  const { selectableRef, isSelected, isSelecting } = props;
  const renderChildren = isSelected ? props.children : null;
  const boxStyles = {
    height: props.height,
    width: props.width,
    background: isSelected ? props.backgroundColor : isSelecting ? "gray" : props.background,
    padding: `${props.padding}px`,
    margin: `${props.margin}px`,
    cursor: props.cursor,
    borderRadius: `${props.borderRadius}px`,
    textAlign: 'center',
  };
  return (
    <div
      ref={selectableRef}
      className="box"
      style={boxStyles}
      id={props.id}
      key={props.key}
    //   onChange={props.onChange}
    >
        {renderChildren}
    </div>
  );
}

export default createSelectable(Box);
