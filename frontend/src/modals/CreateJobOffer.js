import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';

const CreateJobOffer = ({ handleClose }) => {
  const [jobsData, setJobsData] = useState({
    title: '',
    location: '',
    arrangement: [],
    hourlyPay: '',
    employment: [],
    description: ''
  });
 
  const [arrangementOptions, setArrangementOptions] = useState([]);
  const [employmentOptions, setEmploymentOptions] = useState([]);

  useEffect(() => {
    const formatOptions = (data) => {
      return data.map(option => ({ value: option, label: option }));
    };
    const fetchData = async () => {
      try {
        const arrangementResponse = await fetch('http://localhost:8000/arrangements');
        const arrangementData = await arrangementResponse.json();
        const formattedArrangementOptions = formatOptions(arrangementData);
        setArrangementOptions(formattedArrangementOptions);
    
        const employmentResponse = await fetch('http://localhost:8000/employemnttypes');
        const employmentData = await employmentResponse.json();
        const formattedEmploymentOptions = formatOptions(employmentData);
        setEmploymentOptions(formattedEmploymentOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobsData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreate = async () => {
    await fetch(`http://localhost:8000/Jobs/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(jobsData),
    });
  };


  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Job Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Job Title"
              name="title"
              value={jobsData.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicArrangement">
            <Form.Label>Arrangement</Form.Label>
            <Select
              options={arrangementOptions}
              isMulti
              name="arrangement"
              value={jobsData.arrangement}
              onChange={(selectedOptions) => setJobsData({ ...jobsData, arrangement: selectedOptions })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmployment">
            <Form.Label>Employment</Form.Label>
            <Select
              options={employmentOptions}
              isMulti
              name="employment"
              value={jobsData.employment}
              onChange={(selectedOptions) => setJobsData({ ...jobsData, employment: selectedOptions })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmployment">
          <Form.Label>Hourly Pay</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter hourly pay"
            name="hourlyPay"
            value={jobsData.hourlyPay}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              name="location"
              value={jobsData.location}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter job description"
              name="description"
              value={jobsData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateJobOffer;
