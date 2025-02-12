import { useEffect, useReducer, useState } from 'react'
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
  const [edit, setEdit] = useState(null)

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

  const update = (id, userEdit) => {
    request({
      url: baseUrl + `users/${id}`,
      method: 'PUT',
      body: userEdit
    })
  }

  const remove = (id) => {
    request({
      url: baseUrl + `users/${id}`,
      method: 'DELETE',
      id
    })
  }

  const handleChange = ({name, value}) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleEdit = (user) => {
    setEdit(user.id)
    setValues(user)
  }

  const handleCancel = () => {
    setEdit(null)
    setValues(initialValues)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(edit) {
      update(edit, values)
      setEdit(null)
    } else {
      add(values)
    }
    setValues(initialValues)
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
      
        <button
          type='submit'
          className={edit ? 'btn bg-amber-400 ' : 'btn bg-blue-500 text-white'}>
          {edit ? 'Edit' : 'Create'}
        </button>
        {edit &&
          <button
            onClick={handleCancel}
            className='btn bg-black text-white ml-2'>
            Cancel
          </button>}

      </form>

      {error && <p className='mt-5 px-4 text-red-500'>{error}</p>}

      {pending ? <p>Loading...</p> : 
        <div>
          <ul className='mt-5 px-4'>
            {users && users.map(user => 
              <li key={user.id} className='mb-3'>{user.first_name}
                <button
                  onClick={() => handleEdit(user)} 
                  className='btn bg-amber-300 mx-2'>
                  Edit
                </button>
                <button 
                  onClick={() => remove(user.id)}
                  className='btn bg-red-500 text-white'>
                  Delete
                </button>
              </li>
              
            )}
          </ul>
          

        </div>
      }

      {users.length === 0 &&
        <p className='mt-5 px-4'>Empty List</p>}

      </div>
  )
}

export default App
