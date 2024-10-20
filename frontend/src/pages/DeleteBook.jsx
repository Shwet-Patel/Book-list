import React, { useState , useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '..//components/Spinner';
import axios from 'axios';

function DeleteBook() {
  const id = useParams().id;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleDelete = ()=>{
    setLoading(true);
    axios.delete(`http://localhost:3000/books/${id}`)
    .then((response)=>{
      console.log(response);
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    });
  }

  return (
    <div className='p-8'>
      <BackButton />
      <h1 className='text-3xl capitalize my-4'>Delete Book</h1>
      {
        loading ? <Spinner /> :
          <div className=' flex flex-col w-[60vw]  border-2 border-black rounded-md p-4 my-8 mx-auto'>
            <div className='text-lg my-4'>Are you sure???</div>
            <div>
              <button onClick={handleDelete} className='px-4 py-2 bg-black text-white rounded-xl'>Yes</button>
              <button onClick={() =>{ navigate('/')}} className=' ml-4 px-4 py-2 bg-black text-white rounded-xl'>No, Go back</button>
            </div>
          </div>
      }
    </div>
  )
}

export default DeleteBook;