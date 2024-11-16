import { styled } from "@mui/material";

const InputContainer = styled("input")({
  width: "70px",
  height: "31px",
  padding: "12px 16px 11px 16px",
  borderRadius: "8px",
  border: "none",
  "&:focus": {
    border: "none",
    outline: "none",
  },
  color: "black",
});

const Input = ({
  value,
  onChange,
  disabled = false,
  placeholder,
  type = "text",
  fullWidth = false,
}) => {
  return (
    <InputContainer
      disabled={disabled}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
