import React, { useState } from "react";
import "./Create.scss";
import { address } from "../config";
import axios from "axios";

export const Create = () => {
  const [errorCreate, setErrorCreate] = useState(0);
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [onVkl, setonVkl] = useState("Файл не выбран");

  const complete = async () => {
    try {
      const response = await axios.post(
        `${address}/api/post`,
        { title: name, content: message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        window.location.assign("/");
      }
    } catch (error) {
      setErrorCreate(1);
    }
  };

  return (
    <>
      <div className="rootDiv">
        <form class="custom-form">
          <h1>Создание поста</h1>
          <label>
            Название поста
            <input
              type="text"
              name="name"
              placeholder="Введите название"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Сообщение
            <textarea
              name="message"
              placeholder="Введите сообщение"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>

          <button type="button" class="submit-btn" onClick={() => complete()}>
            Отправить
          </button>
        </form>
      </div>
    </>
  );
};
