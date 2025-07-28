import React from 'react';

export const sidebaritems = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: <i className="bi bi-house-door-fill  fs-5"></i>,
    },
    {
      title: 'Create Customer',
      path: '/addCustomer',
      icon: <i className="bi bi-person-plus-fill  fs-5"></i>,
    },
    {
      title: 'Customer Details',
      path: '/customerDetails',
      icon: <i className="bi bi-person-lines-fill  fs-5"></i>,
    }
  ];
};
