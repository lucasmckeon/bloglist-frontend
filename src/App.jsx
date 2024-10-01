import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import { getAll, createBlog, deleteBlog } from './services/blogs';
import { login } from './services/login.js';
import { setToken } from './services/token.js';
import { Togglable } from './components/Togglable.jsx';
import { CreateBlog } from './components/CreateBlog.jsx';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(() => {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
      return JSON.parse(localStorageUser);
    }
    return null;
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const toggleRef = useRef({});

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await getAll();
      setBlogs(fetchedBlogs);
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    if (user) {
      setToken(user.token);
    }
  }, [user]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(username, password);
      setToken(loggedInUser.token);
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log('Error', err.response.data.error);
      triggerStatusView(
        err.response.data.error ?? 'wrong username or password'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setUsername('');
    setPassword('');
  };

  const triggerStatusView = (message) => {
    setStatus(message);
    setTimeout(() => setStatus(null), 3000);
  };

  const handleCreateBlog = async (title, author, url) => {
    try {
      const createdBlog = await createBlog({ title, author, url });
      setBlogs(blogs.concat(createdBlog));
      toggleRef.current.hide();
      triggerStatusView(
        `a new blog ${createdBlog.title} by ${createdBlog.author} author`
      );
    } catch (error) {
      console.log('Error', error);
      alert('Error creating blog');
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete: ${blog.title}?`)) {
      try {
        await deleteBlog(blog);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.log('Error deleting blog:', error.message);
      }
    }
  };
  return (
    <div className="container">
      <h1>BlogList Application</h1>
      {user ? (
        <>
          <div className="header">
            <h2>blogs</h2>
            {status && <h3>{status}</h3>}
            <p>
              {user.name} logged in{' '}
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          <div className="blog-creator">
            <Togglable innerRef={toggleRef} toggleButtonName={'new note'}>
              <CreateBlog handleCreateBlog={handleCreateBlog} />
            </Togglable>
          </div>
        </>
      ) : (
        <div className="login">
          <h2>log in to application</h2>
          {status && <h3>{status}</h3>}
          <form className="login__form" onSubmit={handleLogin}>
            <div className="login__username-input">
              <label htmlFor="usernameInput">username</label>
              <input
                type="text"
                id="usernameInput"
                name="username"
                value={username}
                onChange={({ currentTarget }) =>
                  setUsername(currentTarget.value)
                }
              />
            </div>
            <div className="login__password-input">
              <label htmlFor="passwordInput">password</label>
              <input
                type="password"
                id="passwordInput"
                name="password"
                value={password}
                onChange={({ currentTarget }) =>
                  setPassword(currentTarget.value)
                }
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              handleDeleteBlog={handleDeleteBlog}
              key={blog.id}
              blog={blog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
