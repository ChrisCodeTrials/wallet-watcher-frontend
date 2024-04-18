import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3003");


const Crypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    socket.on("cryptoUpdates", (cryptoUpdates) => {
      setCryptos(cryptoUpdates.data.tokens);
    });

    return () => {
      socket.off("cryptoUpdates");
    };
  }, []);


  useEffect(() => { 
    const loadCoins = async () => {

        const options = {
            method: "GET",
            headers: {
                "x-chain": "ethereum",
                "X-API-KEY": "79434a86bf46406cb9d7788bb57e0a22",
            },
        };
        const res = await fetch(
            'https://public-api.birdeye.so/defi/tokenlist?sort_by=v24hUSD&sort_type=desc&offset=100&limit=30', options
        );
        const coins = await res.json()
        console.log(coins)
        setCryptos(coins.data.tokens)
    }
    loadCoins()
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <h1>Crypto Stats</h1>
      <h2
        style={{
          marginBottom: "50px",
          marginTop: 10,
          padding: 5,
        }}
      >
        Last Updated: {new Date().toLocaleTimeString()}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          rowGap: 40,
        }}
      >
        {cryptos.length > 0 &&
          cryptos.map((crypto) => (
            <div key={crypto.address}>
              <img src={`${crypto.logoURI}`} alt={crypto.name} />
              <h3>Name: {crypto.name}</h3>
              <p>Symbol: {crypto.symbol}</p>
              <p>{crypto.v24hChangePercent ? `24h Price Change: ${crypto.v24hChangePercent}`: null }</p>
              <p>Liquidity: ${crypto.liquidity > 1000000 ? `${(crypto.liquidity / 1000000).toFixed(2)}M` : crypto.liquidity > 1000 ? `${(crypto.liquidity / 1000).toFixed(2)}K` : crypto.liquidity}</p>
              {}<button onClick={() => addToWatchlist(crypto.address)}>Add to Watchlist</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Crypto;