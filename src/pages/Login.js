import React, { useState } from 'react'
import { Button } from "react-bootstrap"
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { login } from "../features/user/userSlice"
import { ToastContainer } from 'react-toastify'
import { Spinner } from 'react-bootstrap'

function Login() {
  const dispatch = useDispatch()
  const [spinner, setSpinner] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))

  const schema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: (v) => {
      setSpinner(true)
      dispatch(login(v))
    }
  })

  setInterval(() => {
    setSpinner(false)
  }, 2000);

  const outHandler = () => {
    localStorage.clear('user')
    window.location.reload()
  }

  return (
    <div className='login-signOut'>

      {user ?
        <div className='p-5'>
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwAgQMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwEDBAUGAgj/xABIEAABAwICBQcIBQcNAAAAAAABAAIDBBEFEwYSITFRB0FSYXGB0RQiMmKRk6GxRXKCksEXM0NUg7LhIyRCRGNzhJSio9Lw8f/EABkBAQADAQEAAAAAAAAAAAAAAAACBAUBA//EACARAQACAQUBAQEBAAAAAAAAAAABAhEDBBIhMSJRIxP/2gAMAwEAAhEDEQA/AJxREQEREBc7pFpVTYQ/yWFnlVfa+S12q1g5i939EdxJ4L3pnjpwPCw6n1TW1DsunDhcA87iOAG3r2DnUViQi5c973ucXPe913Pcd7iecqvra3DqPXrp6fLuW/rNIcVrr+UV8kTD+io/5FoH1trz7R2LWyGOX8+wTf3znSH/AFErCErnSMijY+WV/oRxjWc7u/FepTNBO+nqoXwTssXRvIJsdxuNhHZ1qja959lZisR4yWNp4zeKnhjPGNuofa2y2NFjeJULgaTEJrD9FUOM8Z7nHWHc5aTNTNSL2jyXZrE+wk7RzSqDFZBSVUYpa61xHr6zJeJY7n7CAR8V0Y3KDXSXAs5zC0hzXNNi1w3EHmKlLQvHnY3hh8oLfLaZ2XUaosHbNjwODht6jccyvaOtz6n1W1NPj3DoURFYeIiIgIiICIiAiIgiPlExA1WlMkOteOihbC0cHO89x7wWfdWjoKapxKsbSUQGYRrPe70Y29I/gOf2rxpVUE6SYvI8kkVcg2c9jYfABd1ovhIwrDWtkb/OpbPnd63R7Bu/9WVrW+5lf0a5iIZeC4PS4TDqQNLpX/nJ5Nr5O08w6hsXnSPAmYxSgxER1sIJglO7rafVPw3rZsV9ihV62jrCH5TLBO+CpidDPH6cT9hb4jr3Fec1SzieFUGKxBmIUzJrei47HN7HDaO5czUaBUReTT19ZE07mO1Hgd5F/aSpTDz7cZmrodAcRNHpVTRkkR1jHQPHNcAuaT90j7S2Emg9AKR7I6ipNUdrJ3v2A8NUWFu6/WuQwZ81LpFhzJGlk0VfFG9vA5gafxXdOcWjCN6/PafkVAqrVURERAREQEREBCiIIUxHDHnlOmpJ2eY6qNUPWZbXHx2dxXftKzdI8OpnVNJiJiHlUWtC2Qb9RwuQeO0fPisBpWPuY46mGptu9PLIYVeaVjNKuhyhWydoX9ZeHFeNZULlObIxV5cVw1fQBnKXhJDfMq5o5besy9/3QV2zivOHYbBV6QUtfM3WloopDF1F9m39gI700ZzqxDmtH85l1aIEWwyxERAREQEREBERBg41GZMPltvZ547tvyXPcy65wvvXK1VOaSofDbzRtj+r/wB2LO32nPV4X9nf2jy0q4HKyq3VCJwuzC9rKhcresqErvJziq5y2mARG089vSIY3u/ifgtSA5zmsjGs9xs0cSuoo4G01NHC031RtPE85VvZU5X5firu7xFOP6voiLUZwiIgIiICIiAiIgLDxGjbVw2J1ZGm7H8P4LxiON4VhYviWI0lLzATzNYT2AlaibTDDqkPgw01E0pbslFO9sY+24AHuuoXiOM58SpnlHH1hska5zmXGs0kEA/Je1rfarjZ5W7Na/aFhY/G2zl5fI2MXcbBYhnmPOB2BWiSTckk8SmDMOpwKmYYW1btr3ghvqDxW4C5HDdJcNwuFtLiMk0Trlwk8ne6O3W8AgHqJW8w7H8GxPZh2KUVSQbFsM7XEHgQDcFbWhERpxhj6+f9Jy2SKl1VezyEREBERAWh0o0po9H2Nje11RWyi8VMwgEjpOO5res9wK2mJ10OG4fU11S7Vhp4nSvI4AXUB1WIVGIVc9dWuJqal+vJtuG8GDqaNg7EHXVWnmOVBOpPSUbCPQp4TI5p+u82P3FpqrF6ysv5ZXV1TfmkqS1p+wzVb8Fpc1M1Bn08zKUWo4YKYf2MQafbvXvyuXMbIZHl7TcEm5C1uamah47fC8XhrGtjkc2Obok7D2LdRw621RdmrKhxatgAEVVK0DcNa4+KpX2cTOayu03fWLQkt0NhtWqxLEaWhaQ+QOk5mNO1cVLjFfKLSVcpHU63yWJm33lcrs+/qS276+YbabEZpah02Y5jndFxFlanqBVN1auKGobwmja/5ha7NTNV2IiIxCnMzM5ltqSvkowBRzVNIG7m01S+No+zct+C29JpnjtKW6uJCoaDtbWwNdccNZmqR22PYuSzUzV1xNGimldNj4fC+PyWvjbrSU5frAjpMds1m32bgRzgXC6NfPFNX1NDVwVtE61TTv147mwJ52nqI2HtU+YVXwYphlLX0pJhqYmysuLGxF9vWgy0REHF8rdaaXRIwgkGrqY4dnAXefgwqGs1Shy4SFuD4WBuNYT/ALbvFRBm9aDPzUzVgZqZqDPzUzVgZqZqDPzUzVgZqZqDPzUzVgZqZqDPzUzVgZqZqDPzUzVgZqZqDPzetTDyQ1xqdGH0znXNJUvjF+i6zx+8fYoPzVKXIbUF0mNwE+aBBIB1nXB+QQSsiXRByum+i7dK6CnpZap9MYJs1r2sDr+aRa3euLPJCwfTMp/w4/5KXlSw4IIfdyStH0vL/lx4q27kpA+lJfcDxUyFo4LzqN4IIZdyW2+kpfcjxVs8mJH0hMf2I8VNWW3ohUMbOiEEJnkzfzV03uh4qn5NX/rk3uh4qbMpnRCplR9EIIT/ACayfrsvuh4r0OTOQ/16b3I8VNWVH0Qgij6IQQw3kxJ34hMP2Q8VcbyXA78Rm9yPFTKImdEexVy2dEIIebyVMO/E5/cjxV1nJNCd+K1HuWqXNRvAKoaOCCJ28kVMd+L1XumrptCtC49FKiqmgrZqjyljWubIwDV1SSLW7V2dhwVbILHnKqvWRB//2Q==" />
          <p>{user?.name}</p>
          <p>{user?.email}</p>
          <div className='text-danger c-p' onClick={outHandler}>Sign Out</div>
        </div>
        :

        <form className='login'>
          Sign in
          <div className='text-danger'>{formik.errors.email}</div>
          <input type='email' onChange={formik.handleChange("email")} value={formik.values.email} placeholder='email' />
          <div className='text-danger'>{formik.errors.password}</div>
          <input type='password' placeholder='password' onChange={formik.handleChange("password")} value={formik.values.password} />
          <Button onClick={formik.handleSubmit} >
            {spinner ? <Spinner /> : <p className='p-1'>Login</p>}
          </Button>
          <ToastContainer />
          <a href={`/register`}>register</a>

        </form>

      }


    </div>
  )
}

export default Login