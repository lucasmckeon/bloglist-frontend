import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const Togglable = ({ children, toggleButtonName, innerRef }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    innerRef.current = {
      show: () => setShow(true),
      hide: () => setShow(false),
    };
  }, [innerRef]);

  return (
    <div>
      {show ? (
        <div>
          {children}
          <button onClick={() => setShow(false)}>cancel</button>
        </div>
      ) : (
        <button onClick={() => setShow(true)}>{toggleButtonName}</button>
      )}
    </div>
  );
};

Togglable.propTypes = {
  children: PropTypes.node.isRequired,
  toggleButtonName: PropTypes.string.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export { Togglable };
