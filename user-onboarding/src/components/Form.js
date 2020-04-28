import React from 'react';

const Form = () => {
    return (
        <div>
            <h1>Form Component</h1>

            <form>
                <label htmlFor = "name">
                    Name
                    <input id = "name" type = "text" name = "name" placeholder = "Enter full name" />
                </label>

                <label htmlFor = "email">
                    Email
                    <input id = "email" type = "email" name = "email" placeholder = "Enter email address" />
                </label>

                <label htmlFor = "password">
                    Password
                    <input id = "password" type = "password" name = "password" placeholder = "Enter Password" />
                </label>

                <label htmlFor = "terms">
                    <input id = "terms" type = "checkbox" name = "terms" />
                    Terms of Service
                </label>

                <button type = "submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;