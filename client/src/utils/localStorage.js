export const getSavedCoffeeIds = () => {
    const savedCoffeeIds = localStorage.getItem('saved_coffees')
      ? JSON.parse(localStorage.getItem('saved_coffees'))
      : [];
  
    return savedCoffeeIds;
  };
  
  export const saveCoffeeIds = (coffeeIdArr) => {
    if (coffeeIdArr.length) {
      localStorage.setItem('saved_coffees', JSON.stringify(coffeeIdArr));
    } else {
      localStorage.removeItem('saved_coffees');
    }
  };
  
  export const removeCoffeeId = (coffeeId) => {
    const savedCoffeeIds = localStorage.getItem('saved_coffees')
      ? JSON.parse(localStorage.getItem('saved_coffees'))
      : null;
  
    if (!savedCoffeeIds) {
      return false;
    }
  
    const updatedSavedCoffeeIds = savedCoffeeIds?.filter((savedCoffeeId) => savedCoffeeId !== coffeeId);
    localStorage.setItem('saved_coffees', JSON.stringify(updatedSavedCoffeeIds));
  
    return true;
  };