import React, { useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SnapContext } from '../context/SnapContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { users, navigate } = useContext(SnapContext)

 const onChangeHandler = (e) => {
  const value = e.target.value;
  setQuery(value);

  if (users && value.trim().length > 2) {
    const filtered = users.filter(item =>
      item.username.toLowerCase().includes(value.trim().toLowerCase())
    );
    if (filtered.length > 0) {
      setResults(filtered)
      console.log(filtered);
      
    } else {
      setResults([{username: "No Profile Found"}])
      
    }
  }else {
    setResults([])
  }
};


  

  return users && (
    <div className="relative w-[800px]">
      {/* Search Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-3 shadow-sm">
        <FiSearch className="text-black text-2xl mr-2" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={onChangeHandler}
          className="w-full bg-transparent text-xl placeholder-gray-700 outline-none"
        />
      </div>

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg z-10 mt-1">
          {results.map((item, index) => (
            <div
              onClick={()=>{navigate(`/profile/${item._id}`),setResults([])}}
              key={index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-800 text-base"
            >
              {item.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
