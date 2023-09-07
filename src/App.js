import './styles/tailwind.css'; // Import your Tailwind CSS file
import React, { useEffect, useState } from 'react';
import AddItemForm from './components/AddItemForm';
import Register from './components/Register';
import Login from './components/Login'

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Register />
      <Login />
      <AddItemForm data-testid="addItemForm" />
  
      <h1 className="text-2xl font-bold mb-4">Items</h1>
  
      <ul className="list-disc pl-4">
        {items.map((item) => (
          <li key={item.id} className="text-lg">{item.name}</li>
        ))}
      </ul>
    </div>
  );  
}

export default App;
