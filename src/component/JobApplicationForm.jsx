import React, { useState } from 'react';
import useForm from './useForm';
import { Link } from 'react-router-dom';

const initialState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  relevantExperience: '',
  portfolioURL: '',
  managementExperience: '',
  skills: {
    javascript: false,
    css: false,
    python: false,
  },
  interviewTime: '',
};

const JobApplicationForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const validate = (values) => {
    let errors = {};

    // Full Name validation
    if (!values.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    // Phone Number validation
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }

    // Position validation
    if (!values.position) {
      errors.position = 'Position is required';
    }

    // Relevant Experience validation
    if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if (values.relevantExperience && parseInt(values.relevantExperience) <= 0) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0';
    }

    // Portfolio URL validation
    if (values.position === 'Designer' && !values.portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (values.portfolioURL && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL must be a valid URL';
    }

    // Management Experience validation
    if (values.position === 'Manager' && !values.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }

    // Skills validation
    if (!Object.values(values.skills).some(Boolean)) {
      errors.skills = 'At least one skill must be selected';
    }

    // Interview Time validation
    if (!values.interviewTime) {
      errors.interviewTime = 'Preferred Interview Time is required';
    }

    return errors;
  };

  const onSubmitSuccess = (data) => {
    setSubmittedData(data);
  };

  const { handleChange, handleSubmit, handleReset, values, errors, isSubmitting } = useForm(initialState, validate, onSubmitSuccess);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 mt-5">
    <div className="w-full max-w-xl bg-gray-950 p-8 border border-gray-700 rounded-md shadow-lg">
      <h1 className="text-3xl text-center font-bold mb-4 text-white">Job Application Form</h1>
      {!submittedData ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-200">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="w-full p-2 border text-gray-200 font-bold rounded bg-gray-900 border-gray-700"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full p-2 text-gray-200 font-bold border rounded bg-gray-900 border-gray-700"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-200">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 text-gray-200 font-bold border rounded bg-gray-900 border-gray-700"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-200">Applying for Position</label>
            <select
              name="position"
              value={values.position}
              onChange={handleChange}
              className="w-full p-2 text-gray-200 font-bold border rounded bg-gray-900 border-gray-700"
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
          </div>

          {(values.position === 'Developer' || values.position === 'Designer') && (
            <div>
              <label className="block mb-1 text-gray-200">Relevant Experience (years)</label>
              <input
                type="number"
                name="relevantExperience"
                value={values.relevantExperience}
                onChange={handleChange}
                className="w-full p-2 text-gray-200 font-bold border rounded bg-gray-900 border-gray-700"
              />
              {errors.relevantExperience && <p className="text-red-500 text-sm mt-1">{errors.relevantExperience}</p>}
            </div>
          )}

          {values.position === 'Designer' && (
            <div>
              <label className="block mb-1 text-gray-200">Portfolio URL</label>
              <input
                type="url"
                name="portfolioURL"
                value={values.portfolioURL}
                onChange={handleChange}
                className="w-full p-2 text-gray-200 font-bold border rounded bg-gray-900 border-gray-700"
              />
              {errors.portfolioURL && <p className="text-red-500 text-sm mt-1">{errors.portfolioURL}</p>}
            </div>
          )}

          {values.position === 'Manager' && (
            <div>
              <label className="block mb-1 text-gray-200">Management Experience</label>
              <textarea
                name="managementExperience"
                value={values.managementExperience}
                onChange={handleChange}
                className="w-full p-2 text-gray-200 font-bold border rounded bg-gray-900 border-gray-700"
              />
              {errors.managementExperience && <p className="text-red-500 text-sm mt-1">{errors.managementExperience}</p>}
            </div>
          )}

          <div>
            <label className="block mb-1 text-gray-200">Additional Skills</label>
            <div className="space-y-2">
              <label className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  name="skills.javascript"
                  checked={values.skills.javascript}
                  onChange={handleChange}
                  className="mr-2 bg-gray-900 border-gray-700"
                />
                JavaScript
              </label>
              <label className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  name="skills.css"
                  checked={values.skills.css}
                  onChange={handleChange}
                  className="mr-2 bg-gray-900 border-gray-700"
                />
                CSS
              </label>
              <label className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  name="skills.python"
                  checked={values.skills.python}
                  onChange={handleChange}
                  className="mr-2 bg-gray-900 border-gray-700"
                />
                Python
              </label>
            </div>
            {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-200">Preferred Interview Time</label>
            <input
              type="datetime-local"
              name="interviewTime"
              value={values.interviewTime}
              onChange={handleChange}
              className="w-full p-2 text-gray-200 font-bold border rounded bg-gray-900 border-gray-700"
            />
            {errors.interviewTime && <p className="text-red-500 text-sm mt-1">{errors.interviewTime}</p>}
          </div>

          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-white text-center">Application Summary</h2>
          <div className="border border-gray-700 p-4 rounded text-gray-200">
            <p className='font-bold' ><strong>Full Name: {submittedData.fullName}</strong></p>
            <p className='font-bold'><strong>Email: {submittedData.email}</strong></p>
            <p className='font-bold'><strong>Phone Number: {submittedData.phoneNumber}</strong></p>
            <p className='font-bold'><strong>Position: {submittedData.position}</strong></p>
            {submittedData.relevantExperience && (
              <p><strong>Relevant Experience: {submittedData.relevantExperience}</strong> years</p>
            )}
            {submittedData.portfolioURL && (
              <p><strong>Portfolio URL: <Link to={submittedData.portfolioURL} target='_blank'>{submittedData.portfolioURL}</Link></strong></p>
            )}
            {submittedData.managementExperience && (
              <p><strong>Management Experience: {submittedData.managementExperience}</strong></p>
            )}
            <p><strong>Skills: {Object.entries(submittedData.skills).filter(([skill, checked]) => checked).map(([skill]) => skill).join(', ')}</strong></p>
            <p><strong>Preferred Interview Time: {submittedData.interviewTime}</strong></p>
          </div>
          <button
            onClick={() => {
              handleReset();
              setSubmittedData(null);
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Back
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default JobApplicationForm;
