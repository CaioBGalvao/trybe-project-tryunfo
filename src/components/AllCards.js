import React from 'react';
import PropTypes from 'prop-types';

export default class AllCards extends React.Component {
  render() {
    const { cardList, excludCard } = this.props;
    return (
      <section>
        {cardList.map(([cardComponents, id], index) => (
          <div key={ index }>
            <div>{cardComponents}</div>
            <button
              type="button"
              data-testid="delete-button"
              onClick={ () => excludCard(id) }
            >
              Excluir

            </button>
          </div>
        ))}
      </section>
    );
  }
}

AllCards.propTypes = {
  cardList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  excludCard: PropTypes.func.isRequired,
};
