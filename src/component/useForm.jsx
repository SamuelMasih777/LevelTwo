import { useState, useEffect } from 'react';

const useForm = (initialState, validate, onSubmitSuccess) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('Form is valid! Submitting...', values);
        onSubmitSuccess(values);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting, values, onSubmitSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        const [category, skill] = name.split('.');
        setValues({
          ...values,
          [category]: {
            ...values[category],
            [skill]: checked,
          },
        });
      } else {
        setValues({
          ...values,
          [name]: value,
        });
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleReset = () => {
    setValues(initialState);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    handleChange,
    handleSubmit,
    handleReset, // Include the handleReset function in the return object
    values,
    errors,
    isSubmitting,
  };
};

export default useForm;
