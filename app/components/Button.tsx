import { Link } from "@remix-run/react";
import { forwardRef } from "react";
import Arrow from "./IconArrow";
import ExternalIcon from "./IconExternal";

const Button = ({
  children,
  to = "",
  small = false,
  classes = "",
  pointLeft = false,
  naked = false,
  internal = false,
  inheritColor = false,
  ...otherProps
}) => {
  const defaultClasses = `transition-all inline-flex items-center cursor-pointer ${
    small ? "text-base" : ""
  } ${pointLeft ? "flex-row-reverse" : ""} `;
  let buttonColors = naked
    ? "text-purple-400 hover:text-purple-500 "
    : "text-white bg-purple-400 hover:text-white hover:bg-purple-500 ";

  if (inheritColor) {
    buttonColors = naked
      ? "text-gray-500 hover:text-gray-700 "
      : "text-white bg-gray-500 hover:text-white hover:bg-gray-700 ";
  }
  const buttonPadding = naked ? "" : "px-4 py-2 rounded-md";
  const iconDimensions = small ? "h-4 w-4" : "h-6 w-6";
  const iconRotation = pointLeft ? "transform rotate-180" : "";
  const iconMargin = pointLeft ? "mr-2" : "ml-2";

  const ButtonLink = forwardRef(() => {
    return (
      <Link
        {...otherProps}
        className={defaultClasses + buttonColors + buttonPadding + classes}
        to={to}
      >
        {children}

        {!internal && <ExternalIcon />}

        {internal && (
          <Arrow
            className={`block ${iconMargin} ${iconDimensions} ${iconRotation}`}
          />
        )}
      </Link>
    );
  });

  return <ButtonLink />;
};

export default Button;
