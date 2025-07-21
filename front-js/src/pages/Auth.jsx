import React, { useState } from "react";
import axios from "axios";
import "./Auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { address } from "../config";
import { Home } from "./Home";

export const Auth = ({ set }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [completeLogin, setCompleteLogin] = useState(0);
  const [completeRegister, setCompleteRegister] = useState(0);
  const [errorLogin, setErrorLogin] = useState(0);
  const [errorRegister, setErrorRegister] = useState(0);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(`${address}/auth/login`, {
        name: name,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setCompleteLogin(1);
        navigate("/");
      }
    } catch (error) {
      setErrorLogin(1);
    }
  };

  const register = async () => {
    try {
      const response = await axios.post(`${address}/auth/registration`, {
        name: name,
        password: password,
        roles: "0",
      });
      if (response) {
        setCompleteRegister(1);
        login();
      }
    } catch (error) {
      setErrorRegister(1);
    }
  };

  return (
    <>
      {completeLogin === 0 && completeRegister === 0 ? (
        <div className="rootDiv">
          <div class="login-container">
            <form class="login-form">
              <h1>{set === 0 ? "Вход" : "Регистрация"}</h1>
              <div class="form-group">
                <label for="email">Логин</label>
                <input
                  type="name"
                  id="email"
                  placeholder="Введите логин"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Введите пароль"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorLogin === 1 ? (
                <p className="paragraph">Вы неверно ввели логин или пароль</p>
              ) : (
                ""
              )}
              {errorRegister === 1 ? (
                <p className="paragraph">Пользователь не создан</p>
              ) : (
                ""
              )}
              {set === 0 ? (
                <button
                  type="button"
                  class="btn-submit"
                  onClick={() => login()}
                >
                  Войти
                </button>
              ) : (
                <button
                  type="button"
                  class="btn-submit"
                  onClick={() => register()}
                >
                  Создать
                </button>
              )}
              {set === 0 ? (
                <p class="register-link">
                  Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
              ) : (
                <p class="register-link">
                  Есть аккаунт? <Link to="/login">Войти</Link>
                </p>
              )}
            </form>
          </div>
        </div>
      ) : "" || completeLogin === 1 ? (
        <Home />
      ) : "" || completeRegister === 1 ? (
        <h1>Пользователь зарегистрирован</h1>
      ) : (
        ""
      )}
    </>
  );
};
