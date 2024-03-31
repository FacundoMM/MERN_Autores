import axios from 'axios'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'



const validationSchema = Yup.object({
    name: Yup.string()
        .required('Debe agregarle un nombre')
        .min(3, 'Debe tener al menos 3 caracteres'),
})

const Agregar = () => {
    const navegate = useNavigate()
    const initialValues = {
        name: ""
    }
    const handleSubmit = (values) => {

        console.log(values)
        axios.post('http://localhost:8000/api/Autores/new', values)
            .then((res) => {
                navegate("/")
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text:  `El autor fue editado`,
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
                <h1 className='text-center'>Agregar Autores</h1>
                <div className="my-3">
                    <label>Nombre: </label>
                    <Field type="text" name="name" className="ms-2" />
                    <ErrorMessage name="name" component="div" className="text-danger" />

                </div>
                <button type="submit" className="btn btn-primary">Agregar Autor</button>
            </Form>
        )}
    </Formik>
}

export default Agregar
