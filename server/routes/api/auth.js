import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config/index";
const { JWT_SECRET } = config;

import User from "../../models/user";
import { route } from "express/lib/application";

const router = express.Router();

router.post('/', (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({msg: "모든 필드를 채워주세요"});
  }

  User.findOne({email}).then((user) => { 
    if(!user) return res.status(400).json({msg: "계정 정보가 존재하지 않습니다."});
    bcrypt.compare(password, user.password).then((isMatch) => {
      if(!isMatch) return res.status(400).json({msg: "비밀번호가 일치하지 않습니다."});
      jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "2 days"}, (err, token) => {
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        })
      })
    })
  })
});

// 프론트단에서 redux로 로그아웃 상태관리.
router.post('/logout', (req, res) => {
  res.json("성공적으로 로그아웃 되었습니다.");
});

router.post('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) throw Error("계정이 존재하지 않습니다.");
    res.json(user);
  } catch(e) {
    console.log(e)
    res.status(400).json({msg: e.message});
  }
})

export default router;