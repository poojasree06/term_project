
import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import Item from './item';
import Header from '../Header/Header';
import axios from 'axios';

export default function Items(){
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
    // Perform search logic here and return results
    // For example, search an array of items for matching names
    const items = ['Apple', 'Banana', 'Orange', 'Pear'];
    const filteredItems = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    return filteredItems;
  }

  return (
   <div>
    <Header/>
    <div className='items'>
      <div className='items-container'>
        {itemsinfo.map((item) => (
            <Item id={item._id} name={item.name} desc={item.desc} 
               user_id={user_id} price={item.price}
            />
        ))}
      </div>
    </div>

   </div>
  );
}
