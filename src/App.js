import './index.css';
import Spinner from "react-spinkit";
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setBooks } from './redux/actions/bookActions';
import { data } from './data.js';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const Images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setBooks(data.books))
  })

  const Books = useSelector((state)=>state.books.books)


  return (
    <>
    <nav className='title'>Library Managment</nav>
    {
      Books.length === 0
      ?(
        <center style={{padding:"10%"}}>
          <Spinner name="cube-grid" style={{ width: 100, height: 100,  color:"whitesmoke"}}/>
        </center>
      )
      :(
        <section className='Items_List'>
          {
            Books.map((item)=>{
              return(
                <Item item={item}></Item>
              )
            })
          }
        </section>
      )
    }
    </>
  );
}


const Item = (props)=>{
  const {author,country, imageLink, language, link, pages,title, year} = props.item
  let imgName = imageLink.split('/');
  return(
    <div className='Item'>
      <img src={Images[imgName[1]]}/>
      <h1>{title}</h1>
    </div>
  )
}


export default App;
