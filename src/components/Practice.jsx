import { useReducer } from "react";

const initialState = {
  time: 0,
  name: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "time":
      return { ...state, time: state.time + action.payload };
    case "name":
      return { ...state, name: action.payload };
    default:
      throw new Error("Unknown action");
  }
};

const Practice = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const names = ["yee mon kyaw", "david", "papa", "nunu", "peter"];

  const randomName = Math.floor(Math.random() * 4 + 1);

  return (
    <div>
      <p>{state.time}</p>
      <p>{state.name}</p>

      <button onClick={() => dispatch({ type: "time", payload: 1 })}>
        click time
      </button>
      <button
        onClick={() => dispatch({ type: "name", payload: names[randomName] })}
      >
        click name
      </button>
    </div>
  );
};

export default Practice;
