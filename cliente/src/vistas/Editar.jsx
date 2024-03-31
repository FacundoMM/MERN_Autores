import React from 'react'
import useAxios from "../hooks/useAxios.js"
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';


const validationSchema = Yup.object({
    name: Yup.string()
        .required('Debe agregarle un nombre')
        .min(3, 'Debe tener al menos 3 caracteres')
})



const Detalles = () => {
    const { id } = useParams();
    const { datos } = useAxios(`http://localhost:8000/api/Autores/${id}`)

    const navegate = useNavigate()
    const initialValues = {
        name: "",
    }
    const handleSubmit = (values) => {

        console.log(values)
        axios.put(`http://localhost:8000/api/Autores/update/${id}`, values)
            .then((res) => {
                navegate("/")
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: `El autor fue agregado`,
                });
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: `${err}`,
                });
            })
    }

    return <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {({ isSubmitting }) => (
            <Form className='text-center'>
                <h1 className='text-center'>Editar autor</h1>
                <div className="my-3">
                    <label>Name: </label>
                    <Field type="text" name="name" className="ms-2" placeholder={`${datos.name}`} />
                    <ErrorMessage name="name" component="div" className="text-danger" />

                </div>
                <button type="button" className="btn btn-success "><NavLink to='/' style={{ textDecoration: 'none', color: 'white' }} >Cancelar</NavLink></button>
                <button type="submit" className="btn btn-primary ms-2">Editar autor</button>
            </Form>
        )}
    </Formik>
}

export default Detalles
