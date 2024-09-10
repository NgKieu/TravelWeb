import React, { memo } from "react";

const SelectAddress = ({ label, options, value, setValue, type }) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-medium" htmlfor="select-address">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="select-address"
        className="outline-none border border-gray-300 p-2 w-full rounded-md"
      >
        <option value="">{`---Chọn ${label}---`}</option>
        {options?.map((item) => {
          if (type === "province") {
            return (
              <option key={item?.province_id} value={item?.province_id}>
                {item?.province_name}
              </option>
            );
          } else if (type === "district") {
            return (
              <option key={item?.district_id} value={item?.district_id}>
                {item?.district_name}
              </option>
            );
          } else if (type === "ward") {
            return (
              <option key={item?.ward_id} value={item?.ward_id}>
                {item?.ward_name}
              </option>
            );
          }
          return null;
        })}
      </select>
    </div>
  );
};

export default memo(SelectAddress);
