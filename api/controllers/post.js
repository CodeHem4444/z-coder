import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);
    try
   { const data = await db.query(userId !== "undefined"
      ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = $1 ORDER BY p.createdAt DESC`
      : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
  LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= $1 OR p.userId =$2
  ORDER BY p.createdAt DESC`, userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id])
      return res.status(200).json(data);
    }catch(err){
      return res.status(500).json(err);
    }
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    try 
    {await db.query("INSERT INTO posts(desc, img, createdAt, userId) VALUES ($1,$2,$3,$4)", [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ])
      return res.status(200).json("Post has been created.");
    } catch(err){
      return res.status(500).json(err);
    }
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
   { const data = await db.query("DELETE FROM posts WHERE id=$1 AND userId = $2", [req.params.id, userInfo.id]) 
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    }catch(err){
      return res.status(500).json(err);
    }
  });
};
//
