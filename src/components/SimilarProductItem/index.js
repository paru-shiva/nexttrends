// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {imageUrl, rating, brand, price, title} = productDetails
  return (
    <li className="similarProductItem">
      <img className="productIcon" alt='similar product' src={imageUrl} />
      <p>{title}</p>
      <p className="brandPara">{`by ${brand}`}</p>
      <div className="priceRating">
        <p>{price}</p>
        <div className="ratingsdiv">
          <p className="ratingsPara">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
