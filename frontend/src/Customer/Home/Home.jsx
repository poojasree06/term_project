
import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from '../Header/Header';
import Item from '../Item/item';
import "./search.css"
import axios from 'axios';

export default function CustomerHome(){
  const [itemsinfo, setItemsinfo] = useState([]);
  const {username, user_id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [state,setState]=useState([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const response = await axios.get('http://localhost:5000/all_items');
        setItemsinfo(response.data);
        setSearchResults(response.data)
        console.log(response.data)
    };

  
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Perform search logic here
    const results = performSearch(query);
    setSearchResults(results);
  }

  const performSearch = (query) => {
    const filteredItems = itemsinfo.filter(item => (item.name).toLowerCase().includes(query.toLowerCase()));
    return filteredItems;
  }
 
  return (
   <div>
    <Header/>
    <div className='search-body'>
     <div class="input-box">
      <input placeholder="Search here..." type="text" value={searchQuery} onChange={handleSearch} />
      <button class="button">Search</button>
    </div>
    </div>
    <div className='items'>
      <div className='items-container'>
        {searchResults.map((item) => (
            <Item id={item._id} name={item.name} desc={item.desc} 
               user_id={user_id} price={item.price}
            />
        ))}

      </div>
    </div>

   </div>
  );
}
