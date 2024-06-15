import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = async (req,res)=>{

    try
    {const data = await db.query("SELECT followerUserId FROM relationships WHERE followedUserId = $1", [req.query.followedUserId])
      return res.status(200).json(data.map(relationship=>relationship.followerUserId));
    }catch(err){
      return res.status(500).json(err);
    }
}

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
    {await db.query("INSERT INTO relationships (followerUserId,followedUserId) VALUES ($1,$2)", [
      userInfo.id,
      req.body.userId
    ])
      return res.status(200).json("Following");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};

export const deleteRelationship = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async(err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try
    {await db.query("DELETE FROM relationships WHERE followerUserId = $1 AND followedUserId = $2", [userInfo.id, req.query.userId])
      return res.status(200).json("Unfollow");
    }catch(err){
      return res.status(500).json(err);
    }
  });
};