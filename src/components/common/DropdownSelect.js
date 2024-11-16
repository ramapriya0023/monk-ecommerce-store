import { styled } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { primaryColor } from "../../constants/colors";

const StyledSelect = styled(Select)(({ type }) => ({
  width: "100px",
  height: "31px",
  borderRadius: "30px",

  "& fieldset": {
    border: `1px solid ${primaryColor}`,
    borderRadius: type === "product" ? "0px" : "30px",
    "&.MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
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
  onChange,
  type = "product",
}) => {
  return (
    <StyledSelect
      type={type}
      value={value}
      onChange={onChange}
      IconComponent={ExpandMoreIcon} // Set the custom icon
      renderValue={(selected) => {
        return selected;
      }}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      MenuProps={{
        PaperProps: {
          sx: {
            "& .MuiMenu-paper": {
              color: "black",
            },
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
