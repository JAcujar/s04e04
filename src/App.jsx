import { useEffect, useState } from 'react'
import useCrudApi from './hooks/useCrudApi'
import './App.css' 
// https://users-crud-api-production-9c59.up.railway.app/api/v1/users

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birthday: '',
  image_url: ''
}
const baseUrl = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/'

function App() {
  const {data: users, pending, error, request} = useCrudApi()
  const [values, setValues] = useState(initialValues)

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [birthday, setBirthday] = useState('')
  // const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    request({url: baseUrl + 'users'})
  },[])

  const add = (user) => {
    request({
      url: baseUrl + 'users',
      method: 'POST',
      body: user
    })
  }

  const handleChange = ({name, value}) => {
    // console.log(name, value)
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    add(values)
  }

  return (
    <div>
      <form className='w-64 px-4 mt-5' onSubmit={handleSubmit}>

        <div className='mb-4'>
          <label className="label">
            First Name
            <input
              className='input'
              type="text"
              name="first_name"
              value={values.first_name}
              onChange={(e) => handleChange(e.target)}/>
          </label>
        </div>

        <div className='mb-4'>
          <label className="label">
            Last Name
            <input
              className='input'
              type="text"
              name="last_name"
              value={values.last_name}
              onChange={(e) => handleChange(e.target)}/>
          </label>
        </div>

        <div className='mb-4'>
          <label className="label">
            Email
            <input
              className='input'
              type="email"
              name='email'
              value={values.email}
              onChange={(e) => handleChange(e.target)}
              />
          </label>
        </div>

        <div className='mb-4'>
          <label className="label">
            Password
            <input
              className='input'
              type="password"
              name='password'
              value={values.password}
              onChange={(e) => handleChange(e.target)}/>
          </label>
        </div>

        <div className='mb-4'>
          <label className="label">
            Birthday
            <input
              className='input'
              type="date"
              name='birthday'
              value={values.birthday}
              onChange={(e)=>handleChange(e.target)}/>
          </label>
        </div>

        <div className='mb-4'>
          <label className="label">
            Image URL
            <input
              className='input'
              type="text"
              name='image_url'
              value={values.image_url}
              onChange={(e) => handleChange(e.target)}/>
          </label>
        </div>
      
        <button type='submit' className='btn bg-blue-500 text-white'>
          Create
        </button>

      </form>

      {users && 
        <pre>
          {JSON.stringify(users, null, 2)}  
        </pre>
      }

      </div>
  )
}

export default App
