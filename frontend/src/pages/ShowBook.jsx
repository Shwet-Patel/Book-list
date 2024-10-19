import React from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function ShowBook() {
  const [books , setBooks] = useState({});
  const [loading , setLoading] = useState(true);
  const id = useParams().id;

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`)
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
}

export default ShowBook