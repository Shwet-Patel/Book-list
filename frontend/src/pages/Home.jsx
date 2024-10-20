import React , {useState , useEffect} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import '../index.css';

import { MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';
import {BiInfoCircle} from 'react-icons/bi';
import {AiOutlineEdit} from 'react-icons/ai';

function Home() {
  const [books , setBooks] = useState([]);
  const [loading , setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:3000/books')
    .then((response)=>{
      console.log(response);
      setLoading(false);
      setBooks(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    });
  },[]);


  return (
    <div className='min-h-screen custom-background px-16 py-8 '>
      <div className='flex justify-between items-center'>
        <h1 className='text-5xl my-8 text-sky-800'>Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      
      { loading ? (
        <div>
          <Spinner/>
        </div>
      ) : 
      (
        <div className=' grid grid-cols-3 gap-4'>
          {
            books.map((book)=>{
              return(
                <div className=' bg-sky-50 rounded-lg shadow-sm p-4'>
                  <h1 className='text-xl capitalize py-2'>{book.title}</h1>
                  <h2 className=' text-gray-500 text-lg capitalize py-1'>Author: {book.author}</h2>
                  <h3 className=' text-gray-500 text-lg capitalize py-1'>Publication year: {book.publishYear}</h3>
                  <div className='flex py-2 gap-x-2'>
                    <Link to={`/books/details/${book._id}`}>
                      <BiInfoCircle className='text-xl text-sky-700' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-xl text-sky-700' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-xl text-sky-700' />
                    </Link>
                  </div>
                </div>
              );
            })
          }
        </div>
      )}

    </div>
  )
}

export default Home;