import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, createBlog } from './services/blogs';
import { login } from './services/login.js';
import { setToken } from './services/token.js';
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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const [status, setStatus] = useState(null);
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
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      setToken(user.token);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (e) {
      console.log('Error', e.response.data.error);
      triggerStatusView(e.response.data.error ?? 'wrong username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setUsername('');
    setPassword('');
    setBlogs([]);
  };

  const triggerStatusView = (message) => {
    setStatus(message);
    setTimeout(() => setStatus(null), 3000);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await createBlog({ title, author, url });
      setBlogs(blogs.concat(createdBlog));
      setTitle('');
      setAuthor('');
      setURL('');
      triggerStatusView(
        `a new blog ${createdBlog.title} by ${createdBlog.author} author`
      );
    } catch (error) {
      console.log('Error', error);
      alert('Error creating blog');
    }
  };
  return (
    <div>
      <h1>BlogList Application</h1>
      {user ? (
        <>
          <h2>blogs</h2>
          {status && <h3>{status}</h3>}
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
              <label htmlFor="titleInput">title:</label>
              <input
                type="text"
                id="titleInput"
                name="title"
                value={title}
                onChange={({ currentTarget }) => setTitle(currentTarget.value)}
              />
              <br />
              <label htmlFor="authorInput">author:</label>
              <input
                type="text"
                id="authorInput"
                name="author"
                value={author}
                onChange={({ currentTarget }) => setAuthor(currentTarget.value)}
              />
              <br />
              <label htmlFor="urlInput">url:</label>
              <input
                type="text"
                id="urlInput"
                name="url"
                value={url}
                onChange={({ currentTarget }) => setURL(currentTarget.value)}
              />
              <br />
              <button type="submit">create</button>
            </form>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <>
          <h2>log in to application</h2>
          {status && <h3>{status}</h3>}
          <form onSubmit={handleLogin}>
            <div>
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
            <div>
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
        </>
      )}
    </div>
  );
};

export default App;
