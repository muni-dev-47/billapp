import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import { sidebaritems as sidebarData } from './sidebarData';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeDropdownIndexes, setActiveDropdownIndexes] = useState([]);

  const handleToggle = () => {
    setIsSidebarOpen(prev => {
      const next = !prev;
      setActiveDropdownIndexes([]);
      return next;
    });
  };

  const handleItemClick = (index) => {
    if (isSidebarOpen) {
      setActiveDropdownIndexes(prev => {
        if (prev.includes(index)) {
          return prev.filter(i => i !== index);
        } else {
          return [...prev, index];
        }
      });
    } else {
      setActiveDropdownIndexes(prev => {
        if (prev.includes(index)) {
          return [];
        } else {
          return [index];
        }
      });
    }
  };



  return (
    <div className={`d-flex flex-column position-fixed bg-light border-end p-2`} style={{
      height: '100vh',
      width: isSidebarOpen ? '210px' : '55px',
      transition: 'width 0.3s ease',
      zIndex: 1030
    }}>

      <i className="bi bi-list m-2  fs-5" onClick={handleToggle} style={{ cursor: 'pointer' }} ></i>

      <ul className="list-group list-group-flush">
        {sidebarData().map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            isSidebarOpen={isSidebarOpen}
            isActive={activeDropdownIndexes.includes(index)}
            onClick={() => handleItemClick(index)}
          />

        ))}
      </ul>
    </div>
  );
};

export default Sidebar;