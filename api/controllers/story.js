import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getStories = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    try
    {const data = await db.query(`SELECT s.*, name FROM stories AS s JOIN users AS u ON (u.id = s.userId)
    LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId= $1) LIMIT 4`, [userInfo.id])
      return res.status(200).json(data);
    }catch(err){
      return res.status(500).json(err);
    }
  });
};

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
    {await db.query("INSERT INTO stories(img, createdAt, userId) VALUES ($1,$2,$3)", [
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ])
      return res.status(200).json("Story has been created.");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};

export const deleteStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
    {const data = await db.query("DELETE FROM stories WHERE id = $1 AND userId = $2", [req.params.id, userInfo.id])
      if (data.affectedRows > 0)
        return res.status(200).json("Story has been deleted.");
      return res.status(403).json("You can delete only your story!");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};
