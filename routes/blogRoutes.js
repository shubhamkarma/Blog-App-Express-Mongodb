const express = require('express')
const router = express()
const blogController = require('../controller/blogController')

router.get('/', blogController.fetchAllBlogs)
router.get('/create', blogController.createBlogPage)
router.get('/update/:id', blogController.updateBlogPage)
router.get('/:id', blogController.blogDetails)
router.post('/create', blogController.createBlog)
router.delete('/:id', blogController.deleteBlog)
router.put('/:id', blogController.updateBlog)

module.exports = router