import { useState } from "react";
import { styled } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Placeholder = styled("div")({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "21px",
  textAlign: "left",
  color: "black",
});

const StyledSelect = styled(Select)(({ type }) => ({
  width: "95px",
  height: "31px",
  padding: "12px 16px 11px 16px",
  borderRadius: type === "product" ? "0px" : "30px",
  "& .MuiSelect-icon": {
    color: "black",
  },
  "&.MuiOutlinedInput-notchedOutline": {
    border: "none",
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  borderColor: "white",
  border: "none",
  "&.Mui-focused": {
    outline: "none",
    border: "white",
  },
  "&:hover": {
    border: "none",
  },
  outline: "none",
}));

const StyledMenuItem = styled(MenuItem)({
  "&.Mui-selected": {
    backgroundColor: "lightgray",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  },
  "&:hover": {
    backgroundColor: "lightgray",
  },
});

const DropdownSelect = ({
  options = [],
  value,
  placeholder = "Select an option",
  onChange,
  type = "product",
}) => {
  return (
    <StyledSelect
      type={type}
      value={value}
      onChange={onChange}
      renderValue={(selected) => {
        if (!selected) {
          return <Placeholder>{placeholder}</Placeholder>;
        }
        return selected;
      }}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      MenuProps={{
        sx: {
          "& .MuiMenu-paper": {
            color: "black",
          },
        },
      }}
    >
      {options.map((option, index) => (
        <StyledMenuItem key={index} value={option}>
          {option}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default DropdownSelect;
