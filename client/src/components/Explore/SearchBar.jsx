import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import '../../styles/searchBar.css'

export default function SearchBar({onSearch}){
    const [searchQuery, setSearchQuery] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return(
       <div className = "searchBar" >
           <form>
               <TextField
                   id="search-bar"
                   className="text"
                   onInput={(e) => {
                       setSearchQuery(e.target.value);
                   }}
                   label="Search"
                   variant="outlined"
                   placeholder="Search..."
                   size="small"
               >
               </TextField>
               <IconButton type="submit" aria-label="search" onClick = {handleSubmit} >
                   <SearchIcon sx={{
                       color: "var(--main-color)" ,
                   }}
                   />
               </IconButton>
           </form>
       </div>
    );

}