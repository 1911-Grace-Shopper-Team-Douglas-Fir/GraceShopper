import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import {addReview} from '../store/singleProduct'

class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewsVisible: false,
      modalVisible: false,
      title: '',
      content: '',
      rating: 0
    }
  }

  handleOpenModal = () => {
    this.setState({modalVisible: true})
  }

  handleCloseModal = () => {
    this.setState({modalVisible: false})
  }

  handleChange = evt => {
    return evt.target.name === 'title'
      ? this.setState({title: evt.target.value})
      : evt.target.name === 'content'
        ? this.setState({content: evt.target.value})
        : evt.target.name === 'rating'
          ? this.setState({rating: evt.target.value})
          : null
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const review = {
      title: this.state.title,
      content: this.state.content,
      userId: this.props.user.id,
      productId: this.props.singleProduct.id,
      rating: this.state.rating
    }
    this.props.addReview(review)
    this.setState({modalVisible: false})
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div className="reviews-container">
        {this.state.reviewsVisible ? (
          <div>
            <p
              className="reviews-title"
              onClick={() => this.setState({reviewsVisible: false})}
            >
              Reviews ^
            </p>

            {this.props.isLoggedIn && (
              <button onClick={this.handleOpenModal}>Leave a review</button>
            )}
            <Modal
              isOpen={this.state.modalVisible}
              id="review-modal"
              style={{
                content: {border: 'none', outline: 'none', borderRadius: 0}
              }}
            >
              <button onClick={this.handleCloseModal}>Close</button>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="title">TITLE</label>
                <input type="text" name="title" onChange={this.handleChange} />
                <label htmlFor="review">REVIEW</label>
                <input
                  type="text"
                  name="content"
                  onChange={this.handleChange}
                />
                <label htmlFor="rating">RATING</label>
                <input
                  type="number"
                  name="rating"
                  onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            </Modal>

            {product.reviews
              ? product.reviews.map(review => {
                  return (
                    <div>
                      <h3>{review.title}</h3>
                      <p>{review.content}</p>
                      <p>{review.rating}</p>
                    </div>
                  )
                })
              : null}
          </div>
        ) : (
          <div>
            <p
              className="reviews-title"
              onClick={() => this.setState({reviewsVisible: true})}
            >
              Reviews ...
            </p>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    addReview: review => {
      dispatch(addReview(review))
    }
  }
}

export default connect(mapState, mapDispatch)(Reviews)
