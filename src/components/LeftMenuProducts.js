import RangeSlider from './RangeSlider'
import { useState } from "react";


function LeftMenuProducts(props) {

    const { pState } = props
    const brands = [{ brand: "تلویزیون" }, { brand: "تصویه آب" }, { brand: "empty" }, { brand: "empty" },]
    const seller= [{ brand: "Amazon" }, { brand: "Deawo" }]

  let key; let urlMinPrice; let urlMaxPrice; let urlSort; let cat

  const search = window.location.search;
  const arr = search.split("&")
  for(let k in arr){
    if(arr[k].includes("k")) key = arr[k].split("=")[1]
    if(arr[k].includes("sort")) urlSort = arr[k].split("=")[1]
    if(arr[k].includes("cat")) cat = arr[k].split("=")[1]
    if(arr[k].includes("min_price")) urlMinPrice = arr[k].split("=")[1]
    if(arr[k].includes("max_price")) urlMaxPrice = arr[k].split("=")[1]
  }


  const [sort, setSort] = useState(urlSort)
  const [minPrice, setMinPrice] = useState(urlMinPrice)
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice)
//   const user = JSON.parse(localStorage.getItem("user"));  


    // console.log("key=",key, "sort=", sort, "cat=", cat, "minPrice=", minPrice, "maxPrice=", maxPrice);
const goHandler = (ev) => {
        // const {minPrice, maxPrice} = ev
    
    if(!sort && !minPrice) return
    
    if (!sort && !cat && minPrice ) window.location.href = `/s?k=${key}&min_price=${minPrice}&max_price=${maxPrice}`
    if (sort && !cat && !minPrice ) window.location.href = `/s?k=${key}&sort=${sort}`
    if (sort && !cat && minPrice ) window.location.href = `/s?k=${key}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`
    if (!sort && cat && !minPrice ) window.location.href = `/s?k=${key}&cat=${cat}`
    if (!sort && cat && minPrice ) window.location.href = `/s?k=${key}&cat=${cat}&min_price=${minPrice}&max_price=${maxPrice}`
    if (sort && cat && minPrice ) window.location.href = `/s?k=${key}&cat=${cat}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`
    if (sort && cat && !minPrice ) window.location.href = `/s?k=${key}&cat=${cat}&sort=${sort}`

  };

    return (
        <div className='left-menu-products container'>



    <select value={sort} onChange={(ev) => setSort(ev.target.value)}>
        <option value={''}>Select Sort</option>
        <option value="price">price - low to high</option>
        <option value="-price">price - high to low</option>
        <option value="name">name </option>
        <option value="-name">name (reverse) </option>
        <option value="createdAt">recent </option>
    </select>





<input type="number" placeholder={(minPrice) ? minPrice : "Min Price"} onChange={ev => setMinPrice(ev.target.value)} />
<input type="number" placeholder={(maxPrice) ? maxPrice : "Max Price"} onChange={ev => setMaxPrice(ev.target.value)} />
<button onClick={() => goHandler()}>GO</button>

 



            <h6>Price</h6>
            <RangeSlider min={urlMinPrice} max={urlMaxPrice} goP={(ev) => goHandler(ev)}  />

















            {/* <div className='d-grid'>
                <h6>Category</h6>
            </div>

            <div className='d-grid py-3'>

                <h6 style={{ marginBottom: '-5px' }}>Brand</h6>
                {pState.map((ev) => (
                    <div key={ev._id} className='d-flex p-l-10' style={{ marginBottom: '-25px' }}>
                        <input type='checkbox' />
                        <p className='my-3'>&nbsp; {ev.brand}</p>
                    </div>
                ))}

            </div>

            <h6 className="my-3" >Customer Review</h6>
            <p style={{ fontSize: "30px", color: "yellow" }}>&#9733;&#9733;&#9733;&#9733;&#9733;</p>

           

            <h6 style={{ marginTop: "33px" }} >Seller</h6>
            {seller.map((ev, id) => (
                <div key={id} className='d-flex p-l-10' style={{ marginBottom: '-25px' }}>
                    <input type='checkbox' />
                    <p className='my-3'>&nbsp; {ev.brand}</p>
                </div>
            ))} */}

        </div>
    )
}

export default LeftMenuProducts





