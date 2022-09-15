const express = require('express')
require('dotenv').config()
const jwt =require('jsonwebtoken')
const app=express()

app.use(express.json())
const posts=[
    {
        username:'Kyle',
        title:'Post 1'
    },
    {
        username:'john',
        title:'Post 2'
    }
] 
app.get('/posts',authenticatetoken,(req,res)=>{
    res.json(posts.filter(post.username === req.user.name))
})

app.post('/login',(req,res)=>{
  const username=req.body.username
  const user={name:username}

  const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
  res.json({accessToken:accessToken})

})


function authenticatetoken(req,res,next){
    const autheader=req.headers['autorization']
    const token=autheader && autheader.split(' ')[1]

    if (token ==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user=user
        next()
    })
}



app.listen(3000)