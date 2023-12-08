import React from "react";
import cryptoServices from "../../services/crypto";
import CryptoForm from "./CryptoForm";

const MOCKED_CRYPTOS = [
  { cryptoId: "mockedBitcoin", symbol: "MOCKBTC" },
  { cryptoId: "mockedEthereum", symbol: "MOCKETH" },
];

describe("<CryptoForm /> with Cypress Component Testing", () => {
  it("shows 'Cargando ...' while no crypto data fetched", () => {
    cy.stub(cryptoServices, "fetchCryptoInfo").resolves(null);
    cy.mount(<CryptoForm />);

    cy.get('select[id="crypto"]').should("not.exist");
    cy.get('span[id="cryto-loading"]').should("exist").contains("Cargando ...");
  });

  it("renders and displays cryptos from mocked fetchCryptoInfo", () => {
    cy.stub(cryptoServices, "fetchCryptoInfo").resolves(MOCKED_CRYPTOS);
    cy.mount(<CryptoForm />);

    cy.get('select[id="crypto"]')
      .should("exist")
      .find("option")
      .should("have.length", 3);
  });

  it("disabled button when not all fields are filled", () => {
    cy.stub(cryptoServices, "fetchCryptoInfo").resolves(MOCKED_CRYPTOS);
    cy.mount(<CryptoForm />);

    cy.get("button").should("be.disabled");
  });

  it("enables button when all fields are filled", () => {
    cy.stub(cryptoServices, "fetchCryptoInfo").resolves(MOCKED_CRYPTOS);
    cy.mount(<CryptoForm />);

    cy.get('select[id="crypto"]').select("mockedBitcoin");
    cy.get('input[id="buyPrice"]').type("50000");
    cy.get('input[id="sellPrice"]').type("55000");
    cy.get("button").should("not.be.disabled");
  });

  it("submits data and then fetches saved cryptos if save was successful", () => {
    cy.stub(cryptoServices, "fetchCryptoInfo").resolves(MOCKED_CRYPTOS);

    const saveStub = cy.stub(cryptoServices, "saveCryptoInfo").resolves({
      cryptoId: "mockedBitcoin",
      buyPrice: 50000,
      sellPrice: 55000,
    });

    const getStub = cy.stub(cryptoServices, "getSaveCryptoInfo").resolves([
      {
        cryptoId: "mockedBitcoin",
        buyPrice: 50000,
        sellPrice: 55000,
      },
    ]);

    cy.mount(<CryptoForm />);
    cy.get('select[id="crypto"]').select("mockedBitcoin");
    cy.get('input[id="buyPrice"]').type("50000");
    cy.get('input[id="sellPrice"]').type("55000");

    cy.get("button").click();

    cy.wrap(saveStub).should("have.been.calledOnceWithExactly", {
      cryptoId: "mockedBitcoin",
      buyPrice: 50000,
      sellPrice: 55000,
    });

    cy.wrap(getStub).should("have.been.calledTwice");
  });

  it('shows "Cargando ..." when savedCryptos is null', () => {
    cy.stub(cryptoServices, "getSaveCryptoInfo").resolves(null);

    cy.mount(<CryptoForm />);

    cy.get("ul").should("contain", "Cargando ...");
  });

  it("shows saved cryptos after a delay", () => {
    const mockCryptos = [
      { cryptoId: "bitcoin", buyPrice: 50000, sellPrice: 55000 },
      { cryptoId: "ethereum", buyPrice: 1500, sellPrice: 1800 },
      { cryptoId: "ripple", buyPrice: 0.65, sellPrice: 0.75 },
    ];

    cy.stub(cryptoServices, "getSaveCryptoInfo").callsFake(() => {
      return new Cypress.Promise((resolve) => {
        setTimeout(() => {
          resolve(mockCryptos);
        }, 3000);
      });
    });

    cy.mount(<CryptoForm />);

    cy.get("ul").should("contain", "Cargando ...");

    mockCryptos.forEach(({ cryptoId, buyPrice, sellPrice }) => {
      cy.get("ul").should(
        "contain",
        `${cryptoId.toUpperCase()} :: Compra: $${buyPrice} - Venta: $${sellPrice}`
      );
    });
  });
});
