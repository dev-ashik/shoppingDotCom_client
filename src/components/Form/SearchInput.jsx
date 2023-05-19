import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `https://shopping-dot-com-server.onrender.com/api/v1/product/search/${values.keyword}`
      );

      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        className="d-flex nav_search rounded-pill shadow-sm"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control shadow-none bg-transparent rounded-start border-0"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn rounded-end-circle" type="submit">
          <HiSearch />
        </button>
      </form>
    </>
  );
};

export default SearchInput;
