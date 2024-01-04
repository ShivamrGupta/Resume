

import React, { useState } from 'react';
import { useEffect } from 'react';
import './ResumeForm.css'; 

import { TextField, Button, Container, Grid , MenuItem, InputLabel, Select , FormControl,
    Chip,
    Autocomplete,IconButton, Box } from '@mui/material';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from '@mui/icons-material/Add';

    const top100Skills = [
      'JavaScript',
      'React',
      'Node.js',
      'HTML',
      'CSS',
      'Python',
    ];
    

export function ResumeForm(){
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    portNumber: '',
    phone: '',
    education: '',
    experience: '',
    workExperience:[],
    skills: [],
    pincode:'',
    experiences:[],
    educations: [
      {
        education: '',
        cgpa: '',
        graduationYear: '',
      },
    ], 
    cgpa: '', 
    graduationYear: '', 
  });
  const [initialformData, setInitialFormData] = useState(() => {
    const storedData = localStorage.getItem('resumeFormData');
    return storedData ? JSON.parse(storedData) : formData;
  });

  useEffect(() => {
    localStorage.setItem('resumeFormData', JSON.stringify(initialformData));
  }, [initialformData]);
  useEffect(() => {
    const submittedData = localStorage.getItem('submittedFormData');
    const storedData = localStorage.getItem('resumeFormData');

    if (submittedData) {
      setFormData(JSON.parse(submittedData));
    } else if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phone' || name === 'pincode') && !/^\d*$/.test(value)) {
      alert(`${name === 'phone' ? 'Phone number' : 'Pin code'} should contain only numeric characters`);
      return;
    
    }
  
    setFormData({ ...formData, [name]: value });
  };
  const handleSkillsChange = (_, newSkills) => {
    setFormData({ ...formData, skills: newSkills });
  };
  const handleDateChange = (date, index) => {
    const updatedExperiences = [...formData.experiences];
  
    if (!updatedExperiences[index]) {
      updatedExperiences[index] = {};
    }
  
    updatedExperiences[index].startDate = date;
    setFormData({ ...formData, experiences: updatedExperiences });
  };
  
  const handleExperienceAdd = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        {
          startDate: '',
          endDate: '',
          jobRole: '',
          technology: '',
        },
      ],
    });
  };
  

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...formData.educations];
    updatedEducations[index] = { ...updatedEducations[index], [field]: value };
    setFormData({ ...formData, educations: updatedEducations });
  };
   
  const handleEducationAdd = () => {
    setFormData({
      ...formData,
      educations: [
        ...formData.educations,
        {
          education:"",
          cgpa: "",
          graduationYear:"",
        },
      ],
    });
  };
  



  const renderExperiencedFields = () => {
    if (formData.workExperience === 'experienced') {
      return (
        <>
        <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Starting Date"
                variant="outlined"
                fullWidth
                name="startDate"
                value={formData.startDate}
                onChange={handleDateChange}
                format="MM/dd/yyyy"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              variant="outlined"
              fullWidth
              name="endDate"
              value={formData.endDate}
              onChange={handleDateChange}
              format="MM/dd/yyyy"
              
            />
          </LocalizationProvider>
        </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="jobRole-label">Job Role</InputLabel>
              <Select
                labelId="jobRole-label"
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                label="Job Role"
              >
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="technology-label">Technology</InputLabel>
              <Select
                labelId="technology-label"
                id="technology"
                name="technology"
                value={formData.technology}
                onChange={handleChange}
                label="Technology"
              >
                <MenuItem value="web">Web Development</MenuItem>
                <MenuItem value="mobile">Mobile Development</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
      );
    }
    return null;   };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.email.trim() === '' ||
      formData.address.trim() === '' ||
      formData.city.trim() === '' ||
      formData.country.trim() === '' ||
      formData.phone.trim() === '' ||
      formData.education.trim() === '' ||
      (formData.workExperience === 'experienced' &&
        (formData.startDate === '' ||
          formData.jobRole.trim() === '' ||
          formData.technology.trim() === '')) 
      
    ) {
      alert('Please fill in all required fields.');
      return;
}
    console.log('Form submitted:', formData);
    // localStorage.setItem('resumeFormData', JSON.stringify(formData));
    const storedData = JSON.parse(localStorage.getItem('resumeFormSubmissions')) || [];

    storedData.push(formData);
  
    localStorage.setItem('resumeFormSubmissions', JSON.stringify(storedData));
  
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      country: '',
      portNumber: '',
      phone: '',
      education: '',
      experience: '',
      workExperience: [],
      skills: [],
      pincode: '',
      experiences: [],
      educations: [],
      cgpa: '',  
      graduationYear: '', 
    });
  };
  return (
    <Box>
      <form className="resume-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                label="City"
              >
                <MenuItem value="newyork">Indore</MenuItem>
                <MenuItem value="losangeles">Gwalior</MenuItem>
                <MenuItem value="chicago">Chicago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                label="Country"
              >
                <MenuItem value="usa">India</MenuItem>
                <MenuItem value="canada">Canada</MenuItem>
                <MenuItem value="uk">UK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="PinCode"
              variant="outlined"
              fullWidth
              type="tel"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </Grid>
         
          <Grid item xs={12} sm={4}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="education">Education</InputLabel>
      <Select
        label="Education"
        variant="outlined"
        fullWidth
        name="education"
        value={formData.education}
        onChange={handleChange}
      >
        <MenuItem value="highschool">MCA</MenuItem>
        <MenuItem value="associate">MBA</MenuItem>
        <MenuItem value="bachelor">M.Tech</MenuItem>
        <MenuItem value="master">BCA</MenuItem>
        <MenuItem value="doctorate">B.Tech</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="CGPA"
      variant="outlined"
      fullWidth
      name="cgpa"
      value={formData.cgpa}
      onChange={(e) => handleEducationChange('cgpa', e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={4}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id={`year-label`}>Year</InputLabel>
    <Select
      labelId={`year-label`}
      id={`year`}
      name={`year`}
      value={formData.education.graduationYear}
      onChange={(e) => handleEducationChange('graduationYear', e.target.value)}
      label="Year"
    >
      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
  <IconButton onClick={handleEducationAdd} color="primary" className="add-icon">
        <AddIcon />
      </IconButton>
      {formData.educations.map((education, index) => (
                <Grid container spacing={2} key={index} style={{marginTop:"10px" , marginLeft:'3px'}}>
                   <Grid item xs={12} sm={4}>
                   <FormControl fullWidth variant="outlined">
      <InputLabel id="education-label">Education</InputLabel>
      <Select
        labelId="education"
        id="education"
        variant="outlined"
        fullWidth
        name="education"
        value={education.education}
        onChange={(e) => handleEducationChange(index, 'education', e.target.value)}
      
      >
        <MenuItem value="highschool">MCA</MenuItem>
        <MenuItem value="associate">MBA</MenuItem>
        <MenuItem value="bachelor">M.Tech</MenuItem>
        <MenuItem value="master">BCA</MenuItem>
        <MenuItem value="doctorate">B.Tech</MenuItem>
      </Select>
    </FormControl>
          
          </Grid>

                  <Grid item xs={12} sm={4}>
                  <TextField
      label="CGPA"
      variant="outlined"
      fullWidth
      name="cgpa"
      value={education.cgpa}
      onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
    />
         
          </Grid>
                  
                  <Grid item xs={12} sm={4}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id={`year-label`}>Year</InputLabel>
    <Select
      labelId={`year-label`}
      id={`year`}
      name={`year`}
      value={formData.education.graduationYear}
      onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
      label="Year"
    >
      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
           
          </Grid>
              
              ))}
            
  
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="workExperience-label">Work Experience</InputLabel>
              <Select
                labelId="workExperience-label"
                id="workExperience"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                label="Work Experience"
              >
                <MenuItem value="fresher">Fresher</MenuItem>
                <MenuItem value="experienced">Experienced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {renderExperiencedFields()}
          
          {formData.workExperience === 'experienced' && (
            <>
              {formData.experiences.map((experience, index) => (
                <Grid container spacing={2} key={index} style={{marginTop:"10px" , marginLeft:'3px'}}>
                   <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Starting Date"
                variant="outlined"
                fullWidth
                name="startDate"
                value={formData.startDate}
                onChange={(date) => handleDateChange(date, index)}
                format="MM/dd/yyyy"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              variant="outlined"
              fullWidth
              name="endDate"
              value={formData.endDate}
              onChange={handleDateChange}
              format="MM/dd/yyyy"
            />
          </LocalizationProvider>
        </Grid>

                  <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="jobRole-label">Job Role</InputLabel>
              <Select
                labelId="jobRole-label"
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                label="Job Role"
              >
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
                  <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="technology-label">Technology</InputLabel>
              <Select
                labelId="technology-label"
                id="technology"
                name="technology"
                value={formData.technology}
                onChange={handleChange}
                label="Technology"
              >
                <MenuItem value="web">Web Development</MenuItem>
                <MenuItem value="mobile">Mobile Development</MenuItem>
              </Select>
            </FormControl>
          </Grid>
                </Grid>
              ))}
                <IconButton onClick={handleExperienceAdd} color="primary"  className="add-icon">
                <AddIcon />
              </IconButton>
        
            </>
          )}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="skills"
              options={top100Skills}
              freeSolo
              value={formData.skills}
              onChange={handleSkillsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  variant="outlined"
                  placeholder="Start typing to add skills"
                />
              )}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
  
};

