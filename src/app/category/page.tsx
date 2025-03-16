
"use client";
import React, { useState } from 'react';
import FormComponent from '../../components/formcomponent/FormComponent';

const Category = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div>
      <div className='btn-create-close'>
      <button className='btn-create-close-innerbtn' onClick={handleToggleForm}>

{showForm ? 'Close Category Form' : 'Create Category'}
</button>
      </div>
      
      
      {showForm && <FormComponent />}
    </div>
  );
};

export default Category;
