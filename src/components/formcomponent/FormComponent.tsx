"use client";
import React, { useState, useEffect } from 'react';
import './FormComponent.css';

const FormComponent = (props: any) => {
  const [fields, setFields] = useState<any[]>([]);
  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const initialFields = props.formConfig.fields.map((field: any) => ({
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

    const fieldName = props.formConfig.fields[index].name;
    const fieldConfig = props.formConfig.fields.find((field: any) => field.name === fieldName);

    if (fieldConfig && fieldConfig.apiOptions) {
      setSearchQuery(event.target.value);
    }
  };

  const handleProductSelection = (product: string, index: number) => {
    const updatedValues = [...fields];
    updatedValues[index].value = product;
    setFields(updatedValues);
    setIsDropdownVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(fields);
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products`);
          const data = await response.json();
          const filteredProducts = data
            .filter((product: any) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product: any) => product.title);
          setProductOptions(filteredProducts);
          setIsDropdownVisible(true);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    } else {
      setProductOptions([]);
      setIsDropdownVisible(false);
    }
  }, [searchQuery]);

  return (
    <form onSubmit={handleSubmit}>
      {props.formConfig.fields.map((fieldConfig: any, index: any) => (
        <div key={index} className="field-container">
          <label>
            {fieldConfig.name}:
            {fieldConfig.type === 'text' && !fieldConfig.apiOptions ? (
              <input
                type="text"
                name={fieldConfig.name}
                placeholder={`Enter ${fieldConfig.name}`}
                value={fields[index]?.value || ''}
                onChange={(e) => handleFieldChange(index, e)}
              />
            ) : fieldConfig.apiOptions ? (
              <div>
                <input
                  type="text"
                  name={fieldConfig.name}
                  placeholder={`Search for ${fieldConfig.name}`}
                  value={fields[index]?.value || ''}
                  onChange={(e) => handleFieldChange(index, e)}
                />
                {isDropdownVisible && productOptions.length > 0 && (
                  <div className="custom-dropdown">
                    {productOptions.map((product, idx) => (
                      <div
                        key={idx}
                        className="dropdown-item"
                        onClick={() => handleProductSelection(product, index)}
                      >
                        {product}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
      <button className="submit-btn" type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
