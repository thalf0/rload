import { useEffect } from "react"
import { useState } from "react"

export default function App() {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);

      // ${count === 0 ? 0 : count *20}

      const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count *20}`);

      const result = await response.json();

      if(result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }

      console.log(result);
    } catch(e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  },[count]);

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true)
  }, [products]);

  if(loading) {
    return <div>Loading data... Please wait...</div>
  }

  return (
    <div className="load-more-container">
      <h1>Item Catalogue</h1>
      <div className="product-container">
        {
          products && products.length 
          ? products.map(item => <div className="product" key={item.id}>
            <img src={item.thumbnail} alt={item.title}/>
            <p>{item.title} at ${item.price}</p>
            <small>{item.description}</small>
          </div>)
          : null
        }
      </div>
      <div className="button-container">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load More Products</button>
        {
          disableButton ? <small>You've reached the end of catalogue</small> : null
        }
      </div>
    </div>
  )
}