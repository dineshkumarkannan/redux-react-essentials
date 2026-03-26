import { decrement, increment, selectCount } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";

const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <>
      <h2>Counter App</h2>
      <p>counter : {count}</p>
      <section>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </section>
    </>
  );
};

export default Counter;
