
"use client";
import React, { useState } from 'react';
import FormComponent from '../../components/formcomponent/FormComponent';
import { formConfig } from '@/constant/FormConstant';

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
      
      
      {showForm && <FormComponent formConfig={formConfig}/>}
    </div>
  );
};

export default Category;
