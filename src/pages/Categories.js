import back2 from "../images/back2.jpg"
import soon2 from '../images/soon2.webp'


function Categories() {

  return (
    <div className='container-fluid body' >

      <img src={back2} width="100%" alt='background' draggable={false} />

      <div className='body-all-boxes' >

        <div className='body-box' >
          <h5>Refrigerator</h5>
          <img src={"https://dkstatics-public.digikala.com/digikala-products/3a7b568fd437b77be10fb952ea8684540128c67d_1662275830.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"} alt='box' />
          <a href={`/category?cat=refrigerator`}><h6> Explore now </h6></a>
        </div>


        <div className='body-box' >
          <h5>Dishwasher</h5>
          <img src={"https://dkstatics-public.digikala.com/digikala-products/6ee2bdf01852e97b46b9a01be7a1465e5714bcee_1702881396.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"} alt='box' />
          <a href={`/category?cat=dishwasher`}><h6> Explore now </h6></a>
        </div>

        <div className='body-box' >
          <h5>Microwave</h5>
          <img src={"https://dkstatics-public.digikala.com/digikala-products/3961754.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80"} alt='box' />
          <a href={`/category?cat=microwave`}><h6> Explore now </h6></a>
        </div>

   

        <div className='body-box' >
          <h5>Get fit at home</h5>
          <img src={soon2} alt='box' />
          <h6> Explore now </h6>
        </div>

        <div className='body-box' >
          <h5>Get fit at home</h5>
          <img src={soon2} alt='box' />
          <h6> Explore now </h6>
        </div>

        <div className='body-box' >
          <h5>Get fit at home</h5>
          <img src={soon2} alt='box' />
          <h6> Explore now </h6>
        </div>

        <div className='body-box' >
          <h5>Get fit at home</h5>
          <img src={soon2} alt='box' />
          <h6> Explore now </h6>
        </div>

        <div className='body-box' >
          <h5>Get fit at home</h5>
          <img src={soon2} alt='box' />
          <h6> Explore now </h6>
        </div>

      </div>
    </div>

  )
}

export default Categories