import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarItem = ({ item, isSidebarOpen, isActive, onClick }) => {
  const navigate = useNavigate();
  const itemRef = useRef(null);
  const [position, setPosition] = useState({ top: 0 });

  useEffect(() => {
    if (itemRef.current && !isSidebarOpen) {
      const { top } = itemRef.current.getBoundingClientRect();
      setPosition({ top });
    }
  }, [isActive, isSidebarOpen]);

  const handleClick = () => {
    if (item.children) {
      onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      <li
        className="list-group-item bg-light border-0 p-2 mt-3"
        style={{ cursor: 'pointer', position: 'relative' }}
        ref={itemRef}
        onClick={handleClick}
      >
        <div className="d-flex align-items-center">
          <span className="me-3">{item.icon}</span>
          {isSidebarOpen && <span>{item.title}</span>}
        </div>

        {isSidebarOpen && isActive && item.children && (
          <ul className="list-group list-group-flush ms-4 mt-2">
            {item.children.map((child, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action p-2"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(child.path)}
              >
                {child.icon && <span className="me-2">{child.icon}</span>}
                {child.title}
              </li>
            ))}
          </ul>
        )}
      </li>

      {!isSidebarOpen && isActive && item.children && (
        <div
          className="position-absolute bg-white shadow p-2 rounded"
          style={{
            top: position.top,
            left: '60px',
            zIndex: 999,
            minWidth: '150px'
          }}
        >
          <ul className="list-group">
            {item.children.map((child, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(child.path)}
              >
                {child.icon && <span className="me-2">{child.icon}</span>}
                {child.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

};

export default SidebarItem;