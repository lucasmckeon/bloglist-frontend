import { useState } from 'react';
import { updateBlog } from '../services/blogs.js';
import PropTypes from 'prop-types';
const Blog = ({ blog: b, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [show, setShow] = useState(false);
  const [blog, setBlog] = useState(b);
  const handleLike = async () => {
    try {
      const updatedBlog = await updateBlog({ ...blog, likes: blog.likes + 1 });
      setBlog(updatedBlog);
    } catch (e) {
      console.log(e.message ?? 'Error updating blog');
    }
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button>
      {show && (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => handleDeleteBlog(blog)}>remove</button>
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
