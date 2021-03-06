import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import ButtonToCart from '../components/ButtonToCart';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetail: {},
    };
    this.searchProduct = this.searchProduct.bind(this);
  }

  componentDidMount() {
    this.searchProduct();
  }

  async searchProduct() {
    const { match: { params: { id } } } = this.props;
    fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((response) => {
        response.json().then((result) => {
          this.setState({ productDetail: result });
        });
      });
  }

  render() {
    const { addCart } = this.props;
    const { productDetail: { title, price, thumbnail, id, categoryId } } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <h1>{price}</h1>
        <img src={ thumbnail } alt={ title } />
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addCart(categoryId, title, id) }
        >
          ADICIONAR AO CARRINHO
        </button>
        <form>
          <label htmlFor="rating">
            <input
              id="rating"
              type="number"
              max={ 5 }
              min={ 0 }
              required
            />
          </label>
          <br />
          <label htmlFor="comment">
            <textarea
              id="comment"
              data-testid="product-detail-evaluation"
              rows="10"
              cols="50"
            />
          </label>
        </form>
        <Link data-testid="shopping-cart-button" to="/cart">VER CARRINHO</Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  addCart: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
