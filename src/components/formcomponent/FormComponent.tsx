"use client";
import React, { useState, useEffect } from 'react';
import { formConfig } from '../../contant/FormConstant';
import './FormComponent.css';

const FormComponent = () => {
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    const initialFields = formConfig.fields.map(field => ({
      name: field.name,
      value: field.type === 'select' || field.type === 'checkbox' ? '' : '',
    }));
    setFields(initialFields);
  }, []);

  const handleFieldChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updatedValues = [...fields];
    if (event.target.type === 'checkbox') {
      updatedValues[index].value = event.target.checked;
    } else {
      updatedValues[index].value = event.target.value;
    }
    setFields(updatedValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.fields.map((fieldConfig, index) => (
        <div key={index} className="field-container">
          <label>
            {fieldConfig.name}:
            {fieldConfig.type === 'text' ? (
              <input
                type="text"
                name={fieldConfig.name}
                placeholder={`Enter ${fieldConfig.name}`}
                value={fields[index]?.value || ''}
                onChange={(e) => handleFieldChange(index, e)}
              />
            ) : fieldConfig.type === 'select' ? (
              <select
                name={fieldConfig.name}
                value={fields[index]?.value || ''}
                onChange={(e) => handleFieldChange(index, e)}
              >
                <option value="">Select {fieldConfig.name}</option>
                {fieldConfig.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : fieldConfig.type === 'radio' ? (
              <div className="radio-container">
                {fieldConfig.options.map((option, idx) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={fieldConfig.name}
                      value={option}
                      checked={fields[index]?.value === option}
                      onChange={(e) => handleFieldChange(index, e)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : fieldConfig.type === 'checkbox' ? (
              <label>
                <input
                  type="checkbox"
                  name={fieldConfig.name}
                  checked={fields[index]?.value || false}
                  onChange={(e) => handleFieldChange(index, e)}
                />
                {fieldConfig.options[0]}
              </label>
            ) : null}
          </label>
        </div>
      ))}
      <button  className="submit-btn" type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
