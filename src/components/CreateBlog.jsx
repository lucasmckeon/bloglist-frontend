import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  return (
    <div>
      <h2>create new</h2>
      <form
        className="blog-creator__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateBlog(title, author, url);
        }}
      >
        <div className="blog-creator__title-input">
          <label htmlFor="titleInput">title:</label>
          <input
            type="text"
            id="titleInput"
            name="title"
            value={title}
            onChange={({ currentTarget }) => setTitle(currentTarget.value)}
          />
        </div>
        <div className="blog-creator__author-input">
          <label htmlFor="authorInput">author:</label>
          <input
            type="text"
            id="authorInput"
            name="author"
            value={author}
            onChange={({ currentTarget }) => setAuthor(currentTarget.value)}
          />
        </div>
        <div className="blog-creator__url-input">
          <label htmlFor="urlInput">url:</label>
          <input
            type="text"
            id="urlInput"
            name="url"
            value={url}
            onChange={({ currentTarget }) => setURL(currentTarget.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

CreateBlog.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
};

export { CreateBlog };
