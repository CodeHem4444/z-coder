import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = async(req, res) => {
  const userId = req.params.userId;
  try
  {const data = await db.query("SELECT * FROM users WHERE id=$1", [userId])
    const { password, ...info } = data[0];
    return res.json(info);
  }catch(err){
    return res.status(500).json(err);
  }
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    try
    {const data = await db.query(
      "UPDATE users SET name = $1, city = $2, website = $3, profilePic = $4, coverPic = $5 WHERE id = $6",
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id,
      ])
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
    }catch(err){
      res.status(500).json(err);
    }
  });
};
