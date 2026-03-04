import React, { forwardRef } from "react";

const SplitPanel = forwardRef(
  ({ left, right, className = "", panelClassName = "", leftClassName = "", rightClassName = "" }, ref) => {
  const leftCount = React.Children.count(left);
  const rightCount = React.Children.count(right);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 flex flex-col lg:flex-row lg:p-20 p-10 items-center justify-center ${className}`}
    >
      <div
        className={`w-full flex items-center justify-center lg:p-20 p-10 ${panelClassName} ${
          leftCount > 1 ? "flex-row gap-10" : "flex-col gap-10"
        } ${leftClassName}`}
      >
        {left}
      </div>

      <div
        className={`w-full flex items-center justify-center lg:p-20 p-10 ${panelClassName} ${
          rightCount > 1 ? "flex-row gap-10" : "flex-col gap-10"
        } ${rightClassName}`}
      >
        {right}
      </div>
    </div>
  );
  }
);

export default SplitPanel;
