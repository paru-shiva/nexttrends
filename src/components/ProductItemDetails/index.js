// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    fetchStatus: 'initial',
    productDetails: {},
    similarProducts: [],
    productsCount: 1,
  }

  componentDidMount() {
    this.getData()
  }

  decreaseProductCount = () => {
    if (this.state.productsCount > 1) {
      this.setState(prevState => ({
        productsCount: prevState.productsCount - 1,
      }))
    }
  }

  increaseProductCount = () => {
    this.setState(prevState => ({
      productsCount: prevState.productsCount + 1,
    }))
  }

  getData = async () => {
    const {match} = this.props
    const pathParam = match.params.id
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${pathParam}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    this.setState({fetchStatus: 'fetching'})
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log()

      const productData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews,
      }

      const similars = data.similar_products.map(eachItem => ({
        imageUrl: eachItem.image_url,
        brand: eachItem.brand,
        rating: eachItem.rating,
        title: eachItem.title,
        price: eachItem.price,
      }))

      this.setState({
        fetchStatus: 'fetched',
        productDetails: productData,
        similarProducts: similars,
      })
    } else {
      this.setState({fetchStatus: 'failed'})
    }
  }

  renderRelatedProducts = () => {
    const {similarProducts} = this.state
    return (
      <ul className="relatedProductsUl" type="none">
        {similarProducts.map(eachItem => (
          <SimilarProductItem key={eachItem.title} productDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderProductItemDetails = () => {
    const {productDetails, similarProducts, productsCount} = this.state
    console.log(productDetails, similarProducts)
    return (
      <div className="individualProductShow">
        <div className="productItemDetails">
          <img
            className="productImage"
            alt="product"
            src={productDetails.imageUrl}
          />
          <div className="productFullDetails">
            <h1>{productDetails.title}</h1>
            <p className="pricePara">{`Rs ${productDetails.price}/-`}</p>
            <div className="reviewsAndRatings">
              <div className="ratingsdiv">
                <p className="ratingsPara">{productDetails.rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="reviewsPara">{`${productDetails.totalReviews} Reviews`}</p>
            </div>
            <p className="productDescription">{productDetails.description}</p>
            <p className="smallParas">Available: </p>
            <p>{productDetails.availability}</p>
            <p className="smallParas">Brand: </p>
            <p className="fontColor">{productDetails.brand}</p>

            <hr className="hRule" />
            <div className="countButtons">
              <button
                data-testid="minus"
                type="button"
                onClick={this.decreaseProductCount}
                className="countBtn"
              >
                <BsDashSquare />
              </button>
              <p className="countPara">{productsCount}</p>
              <button
                data-testid="plus"
                type="button"
                onClick={this.increaseProductCount}
                className="countBtn"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button" className="addToCartButton">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="relatedProducts">{this.renderRelatedProducts()}</div>
      </div>
    )
  }

  continueClick = () => {
    const {history} = this.props
    history.push('/products')
  }

  renderFailureView = () => (
    <div className="failureView">
      <img
        className="errorImage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button
        onClick={this.continueClick}
        type="button"
        className="continueButton"
      >
        Continue Shopping
      </button>
    </div>
  )

  displayProductItemDetails = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case 'fetching':
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        )
      case 'fetched':
        return this.renderProductItemDetails()
      case 'failed':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="productItemDetailsComponent">
        <Header />
        <div className="productDetails">{this.displayProductItemDetails()}</div>
      </div>
    )
  }
}

export default ProductItemDetails
