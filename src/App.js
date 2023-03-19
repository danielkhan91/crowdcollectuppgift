import candidates from "./mock-data.json";
import "./App.css";
import Table from "./components/Table";
import { useState } from "react";

const App = () => {
   const [query, setQuery] = useState("");
   const keys = ["fullName", "address", "email"];
   const search = (data) => {
     return data.filter((item) =>
       keys.some((key) => item[key].toLowerCase().includes(query))
     );
   };
 return (
   <div className="app">
       <input
         className="search"
         placeholder="Search..."
         onChange={(e) => setQuery(e.target.value.toLowerCase())}
       />
     {<Table searchData={search(candidates)} allCandidates={(candidates)} />}
   </div>
 );
 }

 export default App;