function Card({users, pending, handleEdit, remove}) {
  return (
    <div className='container'>
      
      {pending ? <p>Loading...</p> : 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
            {users && users.map(user => 

              <div key={user.id} className='item mb-3 font-bold'>

{/* <div class="card text-bg-light mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Light card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */}

                <p className="image">{user.image_url ? <img src={user.image_url} /> : <img src='/src/resources/blank-profile-picture-973460_1280.webp'/> }</p>
                <h2 className="text-xl font-semibold pb-4">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-600 text-xs mb-1">CORREO: </p>
                <p className=" text-base">{user.email}</p>
                
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
              </div>


            )}

        </div>
}
    </div>
  )
}

export default Card
