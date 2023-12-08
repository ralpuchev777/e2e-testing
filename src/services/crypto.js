const cryptoServices = {
  fetchCryptoInfo: async function () {
    const cryptoData = [
      { cryptoId: "bitcoin", symbol: "BTC" },
      { cryptoId: "ethereum", symbol: "ETH" },
      { cryptoId: "ripple", symbol: "XRP" },
    ];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return cryptoData;
  },

  saveCryptoInfo: async function (cryptoData) {
    const saved = JSON.parse(localStorage.getItem(SAVED_CRYPTOS_KEY)) ?? [];
    saved.push(cryptoData);
    localStorage.setItem(SAVED_CRYPTOS_KEY, JSON.stringify(saved));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return cryptoData;
  },

  getSaveCryptoInfo: async function () {
    const saved = JSON.parse(localStorage.getItem(SAVED_CRYPTOS_KEY)) ?? [];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return saved;
  },
};

const SAVED_CRYPTOS_KEY = "SAVED_CRYPTOS";

export default cryptoServices;
