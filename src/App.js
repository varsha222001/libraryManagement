import './index.css';
import Spinner from "react-spinkit";
import {useState, useRef, useCallback } from 'react';
import SearchHook from './SearchHook';


function App() {
  const dialouge="Please enter the title of the book or the author or the genre of the book in the search available at the top right corner of the page."
  const [query, setQuery] = useState("")
  const [pageNo, setPageNo] = useState(1)
  const {books, hasMore, loading, error} = SearchHook(query, pageNo)
  const observer = useRef()
  const lastBookRef = useCallback(ele =>{
    if(loading) return 
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPageNo(prevPageNo=>prevPageNo+1)
      }
    })
    if(ele) observer.current.observe(ele)
  }, [loading, hasMore])

  return (
    <>
    <nav className='title'>Library Managment
    <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Book Title / Author / Subject"></input>
    </nav>
    {
      books.length===0
      ?(
        <center style={{paddingTop:"5vh"}}>
          <div className='Dialouge'>
            <table>
              <tbody>
                <tr>
                  <th><Spinner name='chasing-dots' style={{ width: 100, height: 100 }}/></th>
                  <th>{dialouge}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </center>
      )
      :(
        <section className='Items_List'>
          <div style={{background:"whitesmoke", width:"100vw", height:"100%"}}>
          {
            books.map((book, index)=>{
              if(books.length === index+1){
                return (
                  <>
                  <div key={book} ref={lastBookRef}>{book}</div>
                  <Spinner name="wordpress" style={{ width: 100, height: 100, color:"#8cd3ff"}}/>
                  </>
                )
              }else{
                return (
                  <div key={book}>{book}</div>
                )
              }
            })
          }
          </div>
        </section>
      )
    }
    </>
  );
}


export default App;
