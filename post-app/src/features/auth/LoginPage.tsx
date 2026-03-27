import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { userLoggedIn } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.currentTarget.elements.username.value;
    dispatch(userLoggedIn(username));
    navigate("/posts-list");
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Welcome!</h2>
      <h3>Please login :</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name:</label>
        <select name="username" id="username">
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="submit">Log In</button>
      </form>
    </section>
  );
};

export default LoginPage;
