import {useState, useEffect} from 'react'
import getAllProduct from '../../services/getAllProduct.'
import CardList from '../../CardList/CardList'

export default function ProductPage() {
  const [product, setProduct] = useState([])
  useEffect(() => {
    let allProduct = getAllProduct()
    allProduct = allProduct.length > 0 ? allProduct : []
    setProduct(allProduct)
  }, [])
  return (
    <section className='container px-24 py-4'>
      <main className='grid grid-cols-4 gap-4'>
        <CardList product={product}/>
      </main>
    </section>
  )
}
