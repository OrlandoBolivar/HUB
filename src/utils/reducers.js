import { ADD_MEMBER } from './actions';
import createId from './createId';

// Notice we moved the initial state object from our CarComponent to the reducer itself
const initalState = {
  members: [
    {
      id: 1,
      name: 'Jeison F',
      pin: '1308',
      isRunning: false,
    },
    {
      id: 2,
      name: 'Elyssa',
      pin: '1308',
      isRunning: false,
    },
  ],
};

// Here we pass a default value of initalState if none is provided
export default function reducer(state = initalState, action) {
  switch (action.type) {
    case ADD_MEMBER: {
      const newMemberId = createId(state.members);
      const newMember = { ...action.payload, id: newMemberId };

      return {
        ...state,
        members: [...state.members, newMember],
      };
    };
    
  //   case START_CAR: {
  //     const carIndex = state.cars.findIndex((car) => car.id === action.payload);
  //     const updatedCar = { ...state.cars[carIndex], isRunning: true };

  //     const carsCopy = [...state.cars];
  //     carsCopy[carIndex] = updatedCar;

  //     return {
  //       ...state,
  //       cars: carsCopy,
  //     };
  //   }
  //   case STOP_CAR: {
  //     const carIndex = state.cars.findIndex((car) => car.id === action.payload);
  //     const updatedCar = { ...state.cars[carIndex], isRunning: false };

  //     const carsCopy = [...state.cars];
  //     carsCopy[carIndex] = updatedCar;

  //     return {
  //       ...state,
  //       cars: carsCopy,
  //     };
  //   }
    default: {
      return state;
    }
  };
};