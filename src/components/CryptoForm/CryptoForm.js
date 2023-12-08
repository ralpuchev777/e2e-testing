import React, { useState, useEffect } from "react";
import cryptoServices from "../../services/crypto";

const CryptoForm = () => {
  const [cryptoCoins, setCryptoCoins] = useState(null);
  const [savedCryptos, setSavedCryptos] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const { fetchCryptoInfo, getSaveCryptoInfo, saveCryptoInfo } = cryptoServices;

  const getCryptoCoins = async () => {
    const cryptos = await fetchCryptoInfo();
    setCryptoCoins(cryptos);
  };

  useEffect(() => {
    if (!cryptoCoins) {
      getCryptoCoins();
    }
  }, [cryptoCoins]);

  const getSavedCrypto = async () => {
    const cryptos = await getSaveCryptoInfo();
    setSavedCryptos(cryptos);
  };

  useEffect(() => {
    if (!savedCryptos) {
      getSavedCrypto();
    }
  }, [savedCryptos]);

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  const handleBuyPriceChange = (event) => {
    setBuyPrice(event.target.value);
  };

  const handleSellPriceChange = (event) => {
    setSellPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      cryptoId: selectedCrypto,
      buyPrice: parseFloat(buyPrice),
      sellPrice: parseFloat(sellPrice),
    };

    try {
      const response = await saveCryptoInfo(data);

      if (response) {
        console.log("Respuesta del servidor:", response);
        setSavedCryptos(null);
      } else {
        console.error("Error al enviar los datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const validData = selectedCrypto && buyPrice && sellPrice;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="crypto">Selecciona una criptomoneda: </label>
          {!cryptoCoins && <span id="cryto-loading">Cargando ...</span>}
          {cryptoCoins && (
            <select
              id="crypto"
              value={selectedCrypto}
              onChange={handleCryptoChange}
            >
              <option value="">Selecciona:</option>
              {cryptoCoins.map(({ cryptoId, symbol }) => (
                <option key={cryptoId} value={cryptoId}>
                  {symbol}
                </option>
              ))}
            </select>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="buyPrice">Precio de compra: $</label>
          <input
            type="number"
            id="buyPrice"
            value={buyPrice}
            onChange={handleBuyPriceChange}
          />
        </div>
        <div>
          <label htmlFor="sellPrice">Precio de venta: $</label>
          <input
            type="number"
            id="sellPrice"
            value={sellPrice}
            onChange={handleSellPriceChange}
          />
        </div>
        <br />
        <button type="submit" disabled={!validData}>
          Guardar
        </button>
      </form>
      <ul>
        {savedCryptos &&
          savedCryptos.map(({ cryptoId, buyPrice, sellPrice }) => (
            <li key={`${cryptoId}-${buyPrice}-${sellPrice}`}>
              <span>{cryptoId.toUpperCase()}</span> ::{" "}
              <span>Compra: ${buyPrice}</span> -{" "}
              <span>Venta: ${sellPrice}</span>
            </li>
          ))}
        {!savedCryptos && <span>Cargando ...</span>}
      </ul>
    </>
  );
};

export default CryptoForm;
