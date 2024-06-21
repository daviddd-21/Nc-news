import { useState } from "react";

const Query = ({ setQuery, setOption }) => {
  const [searchOption, setSearchOption] = useState("");
  const queries = ["author", "topic", "sort_by", "order"];
  const handleSubmit = (event) => {
    event.preventDefault();
    setOption(searchOption);
    // console.log(searchOption);
  };

  const handleChange = (event) => {
    setSearchOption(event.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Please select a query</label>
        <select
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        >
          {queries.map((query) => {
            return (
              <option id={query} key={query}>
                {query}
              </option>
            );
          })}
        </select>
        <br />
        <label for="option">Enter a keyword to filter by: </label>
        <input
          value={searchOption}
          onChange={handleChange}
          id="option"
          name="option"
        />{" "}
        <br />
        <button>Search</button>
      </form>
    </>
  );
};

export default Query;
