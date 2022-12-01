const express = require('express')
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes')
const app = express()

const PORT = 3000
app.listen(PORT,()=>{
    console.log("The server is running at port:",PORT)
})
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny'))
//template engine or view engine
app.set('view engine','ejs')

// app.use((req,res,next)=>{
//     console.log("Inside the logging middleware")
//     console.log("New Request:")
//     console.log("Host:",req.hostname)
//     console.log("Path:", req.path)
//     console.log("Method: ", req.method)
//     next()
// })

// app.use((req,res,next)=>{
//     console.log("In the next middleware after logging middleware")
//     next()
// })
app.get('/',(req,res)=>{
    res.redirect('/blogs')
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page'
    })
})

app.get('/about-us', (req,res)=>{
    res.redirect('/about')
})

app.use('/blogs',blogRoutes)

app.use((req,res)=>{
    res.status(404).render('404',{title:"404"})
})

