import './index.css';
import Spinner from "react-spinkit";
import {useState, useRef, useCallback } from 'react';
import SearchHook from './SearchHook';
import {IoBookSharp} from 'react-icons/io5'

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
    <p style={{float:"center", color:"white"}}>Results:{books.length}</p>
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
          {
            books.map((book, index)=>{
              if(books.length === index+1){
                return (
                  <>
                  <Item key={book} ref={lastBookRef} item={book}>{book}</Item>
                  <center>
                  <Spinner name="wordpress" style={{ width: 100, height: 100, color:"#8cd3ff"}}/>
                  </center>
                  </>
                )
              }else{
                return (
                  <>
                  <Item key={book} item={book}>{book}</Item>
                  </>
            
                )
              }
            })
          }
          {/* <div style={{background:"whitesmoke", width:"100vw", height:"100%"}}>
          </div> */}
        </section>
      )
    }
    </>
  );
}

const Item = (props)=>{
  console.log("props:",props)
  
  return (
      <div className="Item">
        <IoBookSharp style={{width:"3vw", height:"3vh"}}/>
        <h3>{props.item}</h3>
      </div>

  )}


export default App;
