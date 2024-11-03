// hooks/useForm.js
import { useState } from 'react';

const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    if (!formData.name) newError.name = 'Nome é obrigatório';
    if (!formData.email) newError.email = 'Email é obrigatório';
    if (!formData.password) newError.password = 'Senha é obrigatória';

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
