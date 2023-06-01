import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [product,setProducts]=useState([]);
  const [page,setPage]=useState(1)

 

 async function fetchProducts(){
   const response= await fetch('https://dummyjson.com/products?limit=100');
   const data=await response.json();
   if(data && data.proudcts !==''){
    setProducts(data.products)
   }
   
  } 
  
  

  useEffect(()=>{
         fetchProducts();
  },[])

  function selectPage(selectedPages){
    if(selectedPages>=1 && selectedPages<=product.length/10 && selectedPages !== page){
       setPage(selectedPages)
    }
   

  }


  return (
    <>
  
      {
        product?.length > 0 && <div className='products'>
        {
          //login how to page 1 to 10
          product.slice(page*10-10,page*10).map((prod)=>(
            <span className='products_single' key={prod.id}>
              <img src={prod.thumbnail}  alt={prod.title}/>
              <span>{prod.title}</span>
            </span>

          ))
        }
        </div>
    

     }
     {
      product.length >0 && <div className='pagination'>   
       <span onClick={()=>selectPage(page-1)}>⬅️</span>
       {
        [...Array(product.length/10)].map((item,i)=>{
          return <span className={page === i+1 ? 'pagination_select':''}
           onClick={()=>selectPage(i+1)} key={i}>{i+1}</span>
        })
       }
     
       <span onClick={()=>selectPage(page+1)}>➡️</span>
       </div>
     }
    
    </>
  )
}

export default App
