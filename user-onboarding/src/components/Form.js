import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import { FormGroup, Label, Input, FormFeedback,  Button } from "reactstrap";

const Form = () => {
    const initialState = {
        name: "",
        email: "",
        password: "",
        terms: false
    };
    const [userInfo, setUserInfo] = useState(initialState);
    const [errors, setErrors] = useState(initialState);


    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a name"),
        email: yup
            .string()
            .email("Please enter a valid email address")
            .required("Please enter an email address"),
        password: yup.string().matches(/\d{4}$/, "Please enter a 4 digit pin").required(),
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


    return (
        <div>
            <h1>Form Component</h1>

            <form>
                <FormGroup>
                    <Label htmlFor="name">
                        Name
                        <Input id="name" type="text" name="name" value={userInfo.name} placeholder="Enter full name" onChange={inputChange} invalid = {errors.name.length > 0 ? "invalid" : null}/>
                        
                        <FormFeedback>{errors.name}</FormFeedback>
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="email">
                        Email
                        <Input id="email" type="email" name="email" value={userInfo.email} placeholder="Enter email address" onChange={inputChange} invalid = {errors.email.length > 0 ? "invalid" : null}/>
                        <FormFeedback>{errors.email}</FormFeedback>
                    </Label>
                </FormGroup>

                <FormGroup>
                <Label htmlFor="password">
                        Password
                        <Input id="password" type="password" name="password" value={userInfo.password} placeholder="Enter a 4 digit Pin" onChange={inputChange} maxLength = "4" invalid = {errors.password.length > 0 ? "invalid" : null}/>
                        <FormFeedback>{errors.password}</FormFeedback>
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="terms">
                        <Input id="terms" type="checkbox" name="terms" checked={userInfo.terms} onChange={inputChange} invalid = {errors.email.length > 0 ? "invalid" : null}/>
                        Terms of Service
                        <FormFeedback>{errors.terms}</FormFeedback>
                    </Label>
                </FormGroup>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Form;