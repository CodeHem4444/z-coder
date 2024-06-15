import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getLikes = async(req,res)=>{
    try
    {const data = await db.query("SELECT userId FROM likes WHERE postId = $1", [req.query.postId])
      return res.status(200).json(data.map(like=>like.userId));
    }catch(err){
      return res.status(500).json(err);
    }
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
    {await db.query("INSERT INTO likes (userId,postId) VALUES ($1,$2)", [
      userInfo.id,
      req.body.postId
    ])
      return res.status(200).json("Post has been liked.");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};

export const deleteLike = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
    {await db.query("DELETE FROM likes WHERE userId = $1 AND postId = $2", [userInfo.id, req.query.postId])
      return res.status(200).json("Post has been disliked.");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};//