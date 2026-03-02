import React, { forwardRef } from "react";

const SplitPanel = forwardRef(({ left, right }, ref) => {
  const leftCount = React.Children.count(left);
  const rightCount = React.Children.count(right);

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col lg:flex-row lg:p-20 p-10 items-center justify-center"
    >
      <div
        className={`w-full flex items-center justify-center lg:p-20 p-10 ${
          leftCount > 1 ? "flex-row gap-10" : "flex-col gap-10"
        }`}
      >
        {left}
      </div>

      <div
        className={`w-full flex items-center justify-center lg:p-20 p-10 ${
          rightCount > 1 ? "flex-row gap-10" : "flex-col gap-10"
        }`}
      >
        {right}
      </div>
    </div>
  );
});

export default SplitPanel;
