import React , {useState , useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ShowBook() {
  const [book , setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const id = useParams().id;

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`)
    .then((response)=>{
      console.log(response.data.data);
      
      setLoading(false);
      setBook(response.data.data);
    })
    .catch((err)=>{
      setLoading(false);
      console.log(err);
    });
  },[]);

  return (
    <div className='px-16 pt-8'>
      <BackButton/>
      <div className='text-3xl text-sky-400 py-8'>Book Details</div>
      {
        loading ? (
          <div>
            <Spinner/>
          </div>
        ) : (
          <div className='flex flex-col rounded-md shadow-md bg-sky-50 opacity-95 p-4'>
            <h1 className='text-2xl py-2'>Id: {book._id}</h1>
            <h1 className='text-2xl capitalize py-2'>Title: {book.title}</h1>
            <h1 className='text-2xl capitalize py-2'>Author: {book.author}</h1>
            <h1 className='text-2xl capitalize py-2'>Publish Year: {book.publishYear}</h1>
            <h1 className='text-2xl capitalize py-2'>Created at: {new Date(book.createdAt).toString()}</h1>
          </div>
        )
      }
    </div>
  )
}

export default ShowBook;