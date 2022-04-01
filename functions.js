class CardNumberAnalyzer {
  static #VISA_ID = "4";
  static #MASTER_ID = "5";
  static #AMERICAN_ID = "3";
  
  static #VISA_CARD_LENGTH = 16;
  static #MASTER_CARD_LENGTH = 15;
  static #AMERICAN_CARD_LENGTH = 16;
  
  static #VISA_SECURITY_LENGTH = 3;
  static #MASTER_SECURITY_LENGTH = 3;
  static #AMERICAN_SECURITY_LENGTH = 4;
  


  constructor(cardNumber) {
    cardNumber = cardNumber.replaceAll(" ", "");

    let primerDigito = cardNumber.charAt(0);
    ///////////////////primer error/////////////////////////////

    if (
      primerDigito != CardNumberAnalyzer.#AMERICAN_ID &&
      primerDigito != CardNumberAnalyzer.#VISA_ID &&
      primerDigito != CardNumberAnalyzer.#MASTER_ID
    ) {
      throw new ExcepcionTarjetaNoReconocida();
    }

    function ExcepcionTarjetaNoReconocida() {
      this.mensaje = "Marca de tarjeta desconocida";
      return this.mensaje;
    }
    ////////////////segundo error////////////////////////// expresiones regulares
    // const visa = /^4\d{3}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4}$/;
    // const american = /^3\d{3}[ ]?\d{6}[ ]?\d{5}$/;
    // const master = /^5\d{3}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4}$/;

    const patron = /^\d+$/;
    console.log(cardNumber);
    if (
      //   !visa.test(cardNumber) &&
      //   !american.test(cardNumber) &&
      //   !master.test(cardNumber)
      !patron.test(cardNumber)
    ) {
      throw new ExcepcionNumeroDeTarjetaInvalido();
    }

    function ExcepcionNumeroDeTarjetaInvalido() {
      this.mensaje = "No es un numero de tarjeta valido";
      return this.mensaje;
    }
    this.cardNumber = cardNumber;
    ///////////////////////////////////////
  }

  hasValidCardNumberLength() {
    let primerDigito = this.cardNumber.charAt(0);
    switch (primerDigito) {
      case CardNumberAnalyzer.#AMERICAN_ID:
        return this.cardNumber.length == CardNumberAnalyzer.#AMERICAN_CARD_LENGTH;
      case CardNumberAnalyzer.#VISA_ID:
        return this.cardNumber.length == CardNumberAnalyzer.#VISA_CARD_LENGTH;
      case CardNumberAnalyzer.#MASTER_ID:
        return this.cardNumber.length == CardNumberAnalyzer.#MASTER_CARD_LENGTH;
    }
  }
  getCardDetails() {
    let primerDigito = this.cardNumber.charAt(0);
    let brand;
    let location;
    let expectedLength;
    let expectedCardLength;

    switch (primerDigito) {
      case CardNumberAnalyzer.#AMERICAN_ID:
        brand = "american express";
        location = "front";
        expectedLength = CardNumberAnalyzer.#AMERICAN_SECURITY_LENGTH;
        expectedCardLength = CardNumberAnalyzer.#AMERICAN_CARD_LENGTH;
        break;
      case CardNumberAnalyzer.#VISA_ID:
        brand = "visa";
        location = "back";
        expectedLength = CardNumberAnalyzer.#VISA_SECURITY_LENGTH;
        expectedCardLength = CardNumberAnalyzer.#VISA_CARD_LENGTH;
        break;
      case CardNumberAnalyzer.#MASTER_ID:
        brand = "master card";
        location = "back";
        expectedLength = CardNumberAnalyzer.#MASTER_SECURITY_LENGTH;
        expectedCardLength = CardNumberAnalyzer.#MASTER_CARD_LENGTH;
        break;
    }

    return {
      card: {
        number: `${this.cardNumber}`,
        bin: `${this.cardNumber.substr(0, 6)}`,
        brand: `${brand}`,
        expectedLenght: `${expectedCardLength}`,
        isValid: `${this.hasValidCardNumberLength()}`,
      },
      securityCode: {
        location: `${location}`,
        expectedLength: `${expectedLength}`,
      },
    };
  }
}
//FRONT
function enviar() {
  input = document.getElementById("cardNumber").value;
  const card = new CardNumberAnalyzer(input);
  const info = card.getCardDetails();

  object.innerHTML = [
    info.card.number,
    info.card.bin,
    info.card.brand,
    info.card.expectedLenght,
    info.card.isValid,
  ];
  console.log(info);
}

cardNumber.oninput = function () {
  num.innerHTML = cardNumber.value;
};
let cardNumber2 = cardNumber.value;
console.log(cardNumber2);
