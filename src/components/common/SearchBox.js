import { IconButton, InputBase, styled } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const InputContainer = styled("div")({
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  border: `1px solid lightgray`,
  height: "32px",
  borderRadius: "5px",
});

const SearchBox = ({ searchValue, setSearchValue, onChange }) => {
  return (
    <InputContainer>
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchRoundedIcon sx={{ paddingRight: "5px" }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={"Search product"}
        value={searchValue}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setSearchValue("");
          }
        }}
      />
    </InputContainer>
  );
};

export default SearchBox;
