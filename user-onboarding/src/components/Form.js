import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from "axios";
import { Form as FormContainer, FormGroup, Label, CustomInput, Input, FormFeedback, Button, Col, Table } from "reactstrap";

const Form = () => {
    const initialState = {
        name: "",
        age: "",
        email: "",
        password: "",
        role: "",
        terms: false
    };
    const [userInfo, setUserInfo] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [users, setUsers] = useState([]);


    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a name"),
        age: yup
                .number()
                .typeError("Age must be a number")
                .positive("Must be greater than 0")
                .min(18, "Need to be over 18 to sign up.")
                .required("Please enter age"),
        email: yup
            .string()
            .email("Please enter a valid email address")
            .test("email", "That email is already taken.", val => {
                if (users.length > 0) {
                    return users.map(user => user.email !== val)[0];
                }
                return true;
            })
            .required("Please enter an email address"),
        password: yup.string().matches(/\d{4}$/, "Please enter a 4 digit pin, only numbers").required(),
        role: yup.string(),
        terms: yup.boolean().oneOf([true], "Please read and accept terms and conditions")
    });

    const validateInput = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.type === "checkbox" ? e.target.checked : e.target.value)
            .then(valid => {
                setErrors({ ...errors, [e.target.name]: e.target.type === "checkbox" ? false : "" });
            })
            .catch(err => {
                setErrors({ ...errors, [e.target.name]: err.errors[0] });
            });

    };

    useEffect(() => {
        formSchema.isValid(userInfo)
            .then(valid => {
                setIsBtnDisabled(!valid);
            })
    }, [userInfo, formSchema])

    const inputChange = e => {

        e.persist();

        

        const newUserInfo = {
            ...userInfo,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        
        validateInput(e);

        setUserInfo(newUserInfo);
    }

    const formSubmit = e => {
        e.preventDefault();

        formSchema.isValid(userInfo)
            .then(valid => {
                if(valid) {
                    axios.post("https://reqres.in/api/users", userInfo)
                        .then(response => {
                            console.log(response.data);
                            setUsers([...users, response.data]);
                            setUserInfo(initialState);
                        })
                        .catch(err => console.log(err));
                }
            });
        


    }




    return (
        <div>
            <FormContainer onSubmit={formSubmit}>
                <FormGroup row>
                    <Label htmlFor="name" sm="3">Name:</Label>
                    <Col sm="9">
                        <Input id="name" type="text" name="name" value={userInfo.name} placeholder="Enter full name" onChange={inputChange} invalid={errors.name.length > 0 ? true : null} data-cy="name"/>
                        <FormFeedback>{errors.name}</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="age" sm="3">Age:</Label>
                    <Col sm="9">
                        <Input id="age" type="text" name="age" value={userInfo.age} placeholder="Enter age" onChange={inputChange} invalid={errors.age ? true : null} data-cy="age" />
                        <FormFeedback>{errors.age}</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="email" sm="3">Email:</Label>
                    <Col sm="9">
                        <Input id="email" type="email" name="email" value={userInfo.email} placeholder="Enter email address" onChange={inputChange} invalid={errors.email.length > 0 ? true : null} data-cy="email" />
                        <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="password" sm="3">Password:</Label>
                    <Col sm="9">
                        <Input id="password" type="password" name="password" value={userInfo.password} placeholder="Enter a 4 digit Pin" onChange={inputChange} maxLength="4" invalid={errors.password.length > 0 ? true : null} data-cy="password" />
                        <FormFeedback>{errors.password}</FormFeedback>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="role" sm="3">Role:</Label>
                    <Col sm="9">
                        <CustomInput id="role" type="select" name="role" value={userInfo.role} onChange={inputChange} data-cy="role" >
                            <option value = "">Select a role</option>
                            <option>Customer Service</option>
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Manager</option>
                            <option>Tech Support</option>
                        </CustomInput>
                        
                    </Col>
                </FormGroup>

                <Label htmlFor="terms">
                    I agree to the Terms of Service
                    <Input id="terms" type="checkbox" name="terms" checked={userInfo.terms} onChange={inputChange} invalid={errors.email.length > 0 ? null : true} data-cy="terms" />



                    <FormFeedback>{errors.terms}</FormFeedback>

                </Label>

                <FormGroup >
                    <Button disabled={isBtnDisabled} type="submit">Submit</Button>
                </FormGroup>

            </FormContainer>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Pin</th>
                        <th>Role</th>

                        <th>Accepted Terms</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {users.map((user, index) => (
                        <tr key = {index + 1}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>{user.terms ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
        </div>
    );
};

export default Form;