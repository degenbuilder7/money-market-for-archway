"use client";
import { useState } from "react";
import { connectKeplr } from "../lib/kepler";
import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

export interface ISigningCosmWasmClientContext {
  walletAddress: string;
  client: CosmWasmClient | null;
  signingClient: SigningCosmWasmClient | null;
  loading: boolean;
  error: any;
  connectWallet: any;
  disconnect: any;
}

const PUBLIC_RPC_ENDPOINT = "https://rpc.constantine.archway.io";
const PUBLIC_CHAIN_ID = "constantine-3";

export const useSigningCosmWasmClient = (): ISigningCosmWasmClientContext => {
  const [client, setClient] = useState<CosmWasmClient | null>(null);
  const [signingClient, setSigningClient] =
    useState<SigningCosmWasmClient | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    console.log("Keplr successfully connected");
    setLoading(true);

    try {
      await connectKeplr();

      // enable website to access kepler
      await (window as any).keplr.enable(PUBLIC_CHAIN_ID);

      // get offline signer for signing txs
      const offlineSigner = await (window as any).getOfflineSigner(
        PUBLIC_CHAIN_ID
      );

      // make client
      setClient(await CosmWasmClient.connect(PUBLIC_RPC_ENDPOINT));

      // make client
      setSigningClient(
        await SigningCosmWasmClient.connectWithSigner(
          PUBLIC_RPC_ENDPOINT,
          offlineSigner
        )
      );

      // get user address
      const [{ address }] = await offlineSigner.getAccounts();
      setWalletAddress(address);

      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  };

  const disconnect = () => {
    if (signingClient) {
      signingClient.disconnect();
    }
    setWalletAddress("");
    setSigningClient(null);
    setLoading(false);
  };

  return {
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client,
  };
};
