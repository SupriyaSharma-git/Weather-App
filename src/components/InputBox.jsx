import { useContext, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Context } from "../App";

const InputBox = () => {
  const [InputValue, setInputVal] = useState("");
  const { Location, setLocation } = useContext(Context); 

  //Function to handle user click
  
  const handleSearch = () => {
    setLocation(InputValue);
    setInputVal("");
  };

  return (
    <div className="bg-amber-200 flex justify-between items-center border-none m-3 p-2 cursor-pointer rounded-full">
      <input
        className="text-xl font-light border-none outline-none"
        type="text"
        value={InputValue}
        placeholder="Search by City or Country"
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <div className="bg-blue-500 p-2 rounded-full" onClick={() => handleSearch()}>
        <IoMdSearch className="text-2xl font-semibold text-white" />
      </div>
    </div>
  );
};

export default InputBox;
