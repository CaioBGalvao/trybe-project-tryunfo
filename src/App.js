import React from 'react';
import { v4 as uuid } from 'uuid';
import Form from './components/Form';
import Card from './components/Card';
import AllCards from './components/AllCards';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      cardList: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
      } = this.state;

      const valor210 = 210;
      const valor90 = 90;

      const arrayVerificadorString = [
        cardName.length > 0,
        cardDescription.length > 0,
        cardRare.length > 0,
        cardImage.length > 0,
        Number(cardAttr1) <= valor90
        && Number(cardAttr1) >= 0
        && Number(cardAttr2) <= valor90
        && Number(cardAttr2) >= 0
        && Number(cardAttr3) <= valor90
        && Number(cardAttr3) >= 0
        && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= valor210,
      ];

      this.setState({
        isSaveButtonDisabled: !arrayVerificadorString.every((teste) => teste === true),
      });
    });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      cardList,
    } = this.state;

    const card = [<Card
      key={ cardList.length + 1 }
      cardName={ cardName }
      cardDescription={ cardDescription }
      cardAttr1={ cardAttr1 }
      cardAttr2={ cardAttr2 }
      cardAttr3={ cardAttr3 }
      cardImage={ cardImage }
      cardRare={ cardRare }
      cardTrunfo={ cardTrunfo }
    />, {
      id: uuid(),
      cardTrunfo,
    }];
    this.setState((previewState) => ({
      cardList: [...previewState.cardList, card],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      isSaveButtonDisabled: true,
    }), () => {
      if (cardTrunfo === true) {
        this.setState({ hasTrunfo: true, cardTrunfo: false });
      }
    });
  }

  excludCard = (id) => {
    const {
      cardList,
    } = this.state;
    const newList = cardList.filter((arrayCard) => arrayCard[1].id !== id.id);
    this.setState({
      cardList: newList,
    });
    const theCard = cardList.find((cards) => cards[1].id === id.id);
    if (theCard[1].cardTrunfo === true) {
      this.setState({
        hasTrunfo: false,
      });
    }
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      cardList,
    } = this.state;
    return (
      <>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <hr />
        <AllCards
          cardList={ cardList }
          excludCard={ this.excludCard }
        />
      </>
    );
  }
}
