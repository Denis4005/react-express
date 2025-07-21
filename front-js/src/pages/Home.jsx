import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import { address } from "../config";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.assign("/login");
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${address}/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        window.location.assign("/");
      } else {
        alert("Нет Доступа");
      }
    } catch (error) {
      alert("Нет Доступа");
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`${address}/api/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .post(
        `${address}/auth/provlogin`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${address}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="rootHome">
      <header>
        <div class="title">Посты</div>
        <div class="username">
          <div className="user-name">{user ? user : ""}</div>
          <button
            className="glow-on-hover"
            type="button"
            onClick={() => logOut()}
          >
            Выйти
          </button>
          <button
            className="btncreate glow-on-hover"
            type="button"
            onClick={() => navigate("/create")}
          >
            Создать пост
          </button>
        </div>
      </header>

      <div class="posts">
        {data.map((item) => (
          <div class="post">
            <div class="post-content">
              <div class="post-title">{item.title}</div>
              <div class="post-text">{item.content}</div>
              <div>
                {users
                  .filter((use) => use.id === item.user_id)
                  .map((userok) => (
                    <div>Автор: {userok.name}</div>
                  ))}
                <svg
                  class="Layer_1"
                  version="1.1"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => deletePost(item.id)}
                >
                  <g>
                    <g
                      id="Icon-Trash"
                      transform="translate(232.000000, 228.000000)"
                    >
                      <polygon
                        class="st0"
                        id="Fill-6"
                        points="-207.5,-205.1 -204.5,-205.1 -204.5,-181.1 -207.5,-181.1    "
                      />
                      <polygon
                        class="st0"
                        id="Fill-7"
                        points="-201.5,-205.1 -198.5,-205.1 -198.5,-181.1 -201.5,-181.1    "
                      />
                      <polygon
                        class="st0"
                        id="Fill-8"
                        points="-195.5,-205.1 -192.5,-205.1 -192.5,-181.1 -195.5,-181.1    "
                      />
                      <polygon
                        class="st0"
                        id="Fill-9"
                        points="-219.5,-214.1 -180.5,-214.1 -180.5,-211.1 -219.5,-211.1    "
                      />
                      <path
                        class="st0"
                        d="M-192.6-212.6h-2.8v-3c0-0.9-0.7-1.6-1.6-1.6h-6c-0.9,0-1.6,0.7-1.6,1.6v3h-2.8v-3     c0-2.4,2-4.4,4.4-4.4h6c2.4,0,4.4,2,4.4,4.4V-212.6"
                        id="Fill-10"
                      />
                      <path
                        class="st0"
                        d="M-191-172.1h-18c-2.4,0-4.5-2-4.7-4.4l-2.8-36l3-0.2l2.8,36c0.1,0.9,0.9,1.6,1.7,1.6h18     c0.9,0,1.7-0.8,1.7-1.6l2.8-36l3,0.2l-2.8,36C-186.5-174-188.6-172.1-191-172.1"
                        id="Fill-11"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
