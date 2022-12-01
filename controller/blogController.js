const connectToDb = require('../db/connection')
const ObjectId = require('mongodb').ObjectId
const dbName = 'blogsdb';
let collection
connectToDb()
    .then((client)=>{
        const db = client.db(dbName);
        collection = db.collection('blog-posts');
    })
    .catch(console.error)

const fetchAllBlogs = async(req,res)=>{
    let blogs = await collection.find({}).toArray()
    blogs = blogs.map((blog)=>{
        blog._id = blog._id.toString()
        return blog;
    })
    // console.log(blogs)
    res.render('index',{
            title: "HomePage",
            blogs
        })
}

const blogDetails = async (req,res)=>{
    const id = req.params.id
    const blog = await collection.findOne({_id:new ObjectId(id)})
    // console.log(blog)
    if(blog){
        res.render('details',{
            title:"Blog Details Page",
            blog
        })
    }else{
        res.render('404',{title:"404"})
    }
}

const createBlogPage = async(req,res)=>{
    res.render('create', {
        title: "Create new Blog"
    })
}

const updateBlogPage = async(req, res)=>{
    const id = req.params.id
    const blog =await collection.findOne({_id:new ObjectId(id)})
    blog._id = blog._id.toString()
    if(blog){
        res.render('update', {
            title: "Update Blog",
            blog
            })
    }else{
        res.render('404',{title:"404"})
    }
}

const createBlog = async(req,res)=>{
    console.log(req.body)
    const newBlog = {
        title:req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    }
    const insertedPost = await collection.insertOne(newBlog)
    return res.redirect('/blogs')
}

const deleteBlog = async(req,res)=>{
    const id = req.params.id
    const deletedPost = await collection.deleteOne({_id:new ObjectId(id)})
    res.json({redirect:'/blogs'})
}

const updateBlog = async(req,res)=>{
    const id = req.params.id
    console.log("Inside put")
    console.log(req.body)
    const updatedBlog = {
        title:req.body.title,
        snippet:req.body.snippet,
        body:req.body.body
    }
    const updated = await collection.updateOne({_id:new ObjectId(id)},{$set:updatedBlog})
    res.json({redirect:`/blogs/${id}`})
}

module.exports = {
    fetchAllBlogs,
    blogDetails, 
    createBlogPage,
    updateBlogPage,
    createBlog,
    deleteBlog,
    updateBlog
}