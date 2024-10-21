import React, { useState , useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '..//components/Spinner';
import axios from 'axios';
import { BaseURL } from '../BaseURL';

function EditBook() {
  const id = useParams().id;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    axios.get( BaseURL + `/books/${id}`)
    .then((response)=>{
      console.log(response);
      setLoading(false);
      setTitle(response.data.data.title);
      setAuthor(response.data.data.author);
      setPublishYear(response.data.data.publishYear);
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    });
  },[]);

  const handleEditBook = () => {
    
    const data = { title, author, publishYear };

    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert("an error occured");
        console.log("an error occured.");
      });
  }


  return (
    <div className='p-8'>
      <BackButton />
      <h1 className='text-3xl capitalize my-4'>Edit Book</h1>
      {
        loading ? <Spinner /> :
          <div className=' flex flex-col w-[60vw]  border-2 border-black rounded-md p-4 my-8 mx-auto'>
            <div className='text-lg'>Kindly fill in the details.</div>
            <div className='my-4'>
              <label className='text-lg'>Title</label>
              <input type='text' value={title} onChange={(e) => { setTitle(e.target.value) }} 
                  className= 'border-black border-2 rounded-lg px-2 py-2 w-full' />
            </div>
            <div  className='my-4'>
              <label className='text-lg'>author</label>
              <input type='text' value={author} onChange={(e) => { setAuthor(e.target.value) }} 
                  className= 'border-black border-2 rounded-lg px-2 py-2 w-full' />
            </div>
            <div className='my-4'>
              <label className='text-lg'>publishYear</label>
              <input type='text' value={publishYear} onChange={(e) => { setPublishYear(e.target.value) }} 
                  className= 'border-black border-2 rounded-lg px-2 py-2 w-full' />
            </div>
            <div>
              <button onClick={handleEditBook} className='px-4 py-2 bg-black text-white rounded-xl'>Submit</button>
            </div>
          </div>
      }
    </div>
  )
}

export default EditBook