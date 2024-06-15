import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = async(req, res) => {
try
{  const data = await db.query(`SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = $1 ORDER BY c.createdAt DESC
    `, [req.query.postId])
    return res.status(200).json(data);
  }catch(err){
    return res.status(500).json(err);
  }
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
    {await db.query("INSERT INTO comments(desc, createdAt, userId, postId) VALUES ($1,$2,$3,$4)", [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ])
      return res.status(200).json("Comment has been created.");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    try
    {const data = await db.query("DELETE FROM comments WHERE id = $1 AND userId = $2", [commentId, userInfo.id])
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};
//
