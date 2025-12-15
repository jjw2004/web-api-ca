import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", marginLeft: 16 }}>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end" size="small">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: { color: 'black' },
        }}
        sx={{ background: "white", borderRadius: 1, minWidth: 180, input: { color: 'black' } }}
      />
    </form>
  );
};

export default SearchBar;
