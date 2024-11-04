// hooks/useForm.js
import { useState } from 'react';

const useForm = (initialValues, validationRules) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    Object.keys(validationRules).forEach((field) => {
      const errorMessage = validationRules[field](formData[field]);
      if (errorMessage) newError[field] = errorMessage;
    });

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return { formData, setFormData, error, setError, validate, handleChange };
};

export default useForm;
