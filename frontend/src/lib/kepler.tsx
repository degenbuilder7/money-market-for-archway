import { convertFromMicroDenom } from "../lib/utils";

// extend window with CosmJS and Keplr properties
interface CosmosKeplrWindow extends Window {
  keplr: any;
  getOfflineSigner: Function;
}

declare let window: CosmosKeplrWindow;

export const connectKeplr = async () => {
  // Keplr extension injects the offline signer that is compatible with cosmJS.
  // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
  // And it also injects the helper function to `window.keplr`.
  // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
  if (!window.getOfflineSigner || !window.keplr) {
    alert("Please install keplr extension");
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
        // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
        // cosmoshub-3 is integrated to Keplr so the code should return without errors.
        // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
        // If the user approves, the chain will be added to the user's Keplr extension.
        // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
        // If the same chain id is already registered, it will resolve and not require the user interactions.
        await window.keplr.experimentalSuggestChain({
          // Chain-id of the Cosmos SDK chain.
          chainId: "constantine-3",
          // The name of the chain to be displayed to the user.
          chainName: "Constantine Testnet",
          // RPC endpoint of the chain.
          rpc: "https://rpc.constantine.archway.io",
          // REST endpoint of the chain.
          rest: "https://api.constantine.archway.io",
          // Staking coin information
          stakeCurrency: {
            // Coin denomination to be displayed to the user.
            coinDenom: "CONST",
            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
            coinMinimalDenom: "aconst",
            // # of decimal points to convert minimal denomination to user-facing denomination.
            coinDecimals: 18,
            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
            // coinGeckoId: ""
          },
          // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
          // The 'stake' button in Keplr extension will link to the webpage.
          // walletUrlForStaking: "",
          // The BIP44 path.
          bip44: {
            // You can only set the coin type of BIP44.
            // 'Purpose' is fixed to 44.
            coinType: 118,
          },
          // Bech32 configuration to show the address to user.
          bech32Config: {
            bech32PrefixAccAddr: "archway",
            bech32PrefixAccPub: "archwaypub",
            bech32PrefixValAddr: "archwayvaloper",
            bech32PrefixValPub: "archwayvaloperpub",
            bech32PrefixConsAddr: "archwayvalcons",
            bech32PrefixConsPub: "archwayvalconspub",
          },
          // List of all coin/tokens used in this chain.
          currencies: [
            {
              coinDenom: "CONST",
              coinMinimalDenom: "aconst",
              coinDecimals: 18,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "CONST",
              coinMinimalDenom: "aconst",
              coinDecimals: 18,
            },
          ],
          coinType: 118,
          gasPriceStep: { low: 0, average: 0.1, high: 0.2 },
          features: ["cosmwasm"],
        });
      } catch {
        alert("Failed to suggest the chain");
      }
    } else {
      alert("Please use the recent version of keplr extension");
    }
  }
};
