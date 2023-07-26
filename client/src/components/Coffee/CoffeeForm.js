import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COFFEE } from '../../utils/mutations';
import { toast } from 'react-toastify';

const CoffeeForm = () => {
  const [coffee, setCoffee] = useState('');
  const [milk, setMilk] = useState('');
  const [size, setSize] = useState('');
  const [sugar, setSugar] = useState(0);

  const [saveCoffee, { loading, error }] = useMutation(SAVE_COFFEE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveCoffee({
        variables: { coffeeData: { coffee, milk, size, sugar } },
      });
      toast.success('Coffee saved successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Handle the successful response if needed
      console.log(data);
    } catch (err) {
      console.error(err);

      // Show error message on error
      toast.error('Error occurred while saving coffee!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Handle any errors if needed
    }
  };

  return (
    <div>
      <h1>Coffee Form</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Coffee"
          name="coffee"
          onChange={(e) => setCoffee(e.target.value)}
          value={coffee}
          required
        />
        <input
          type="text"
          placeholder="Milk"
          name="milk"
          onChange={(e) => setMilk(e.target.value)}
          value={milk}
          required
        />
        <input
          type="text"
          placeholder="Size"
          name="size"
          onChange={(e) => setSize(e.target.value)}
          value={size}
          required
        />
        <input
          type="number"
          placeholder="Sugar"
          name="sugar"
          onChange={(e) => setSugar(Number(e.target.value))}
          value={sugar}
          required
        />
        <button type="submit">Save Coffee</button>
      </form>
    </div>
  );
};

export default CoffeeForm;
