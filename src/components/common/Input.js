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
  discountType,
}) => {
  // Validation logic on change
  const handleChange = (event) => {
    let newValue = event.target.value;

    // If the value is empty, allow it to be cleared
    if (newValue === "") {
      onChange({ target: { value: newValue } });
      return;
    }

    // If discountType is "% Off", ensure the value stays between 0 and 100
    if (discountType === "% Off") {
      newValue = Math.min(Math.max(0, newValue), 100); // Keep within range of 0-100
    }

    // Call onChange with the potentially modified value
    onChange({ target: { value: newValue } });
  };

  return (
    <InputContainer
      disabled={disabled}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={handleChange} // Use custom handleChange
    />
  );
};

export default Input;
