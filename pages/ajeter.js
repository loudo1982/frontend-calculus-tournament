

 import * as Yup from "yup";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import React from "react";

const NestedExample = () => (
  <div>
    <h3></h3>
    <hr />
    <Formik
      initialValues={{
        users: [{
          nombre: "",
          email: "",
          matricula:''
        },
        {
            nombre: "",
            email: "",
            matricula:''
        }

      ],
        organizationnombre: []
      }}
      validationSchema={Yup.object({
        organizationName: Yup.string().required(
          "Organization Name is required"
        ),
        users: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string()
              .required("email required")
              .email("Enter valid email"),
            matricula: Yup.string().required("La matricula es obligatoria"),
          })
        )
      })}
      onSubmit={values => console.log(values)}
      
      render={({ values }) => (
        <Form>
            <h5>Form </h5>
          <Field placeholder="Organization name" name={`organizationName`} />
          <ErrorMessage name={`organizationName`} />
          <h5>Organzation users </h5>
          <FieldArray
            name="users"
            render={arrayHelpers => {
              const users = values.users;
              return (
                <div>
                  {users && users.length > 0
                    ? users.map((user, index) => (
                        <div key={index}>
                          <Field
                            placeholder="Nombre del jugador 1"
                            name={`users.${index}.nombre`}
                          />
                          <ErrorMessage name={`users.${index}.nombre`} />

                          <Field
                            placeholder="Matricula"
                            name={`users.${index}.matricula`}
                          />
                          <ErrorMessage name={`users.${index}.matricula`} />
                        

                          <Field
                            placeholder="user email"
                            name={`users.${index}.email`}
                          />
                          <ErrorMessage name={`users.${index}.email`} />

                          <br />

                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <br />
                          <br />
                        </div>
                      ))
                    : null}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        name: "",
                        email: ""
                      })
                    } // insert an empty string at a position
                  >
                    add a User
                  </button>
                  <br />
                  <br />
                  <br />
                  <div>
                    <button type="submit">Form Submit</button>
                  </div>
                </div>
              );
            }}
          />
          <hr />
        </Form>
      )}
    />
  </div>
);

 export default NestedExample;