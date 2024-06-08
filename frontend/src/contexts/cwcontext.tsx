import { createContext, useContext, ReactNode } from "react";
import {
  useSigningCosmWasmClient,
  ISigningCosmWasmClientContext,
} from "../hooks/cosmwasm";

let CosmWasmContext: any = null;

let { Provider } = (CosmWasmContext =
  createContext<ISigningCosmWasmClientContext>({
    walletAddress: "",
    client: null,
    signingClient: null,
    loading: false,
    error: null,
    connectWallet: () => {},
    disconnect: () => {},
  }));

export const useSigningClient = (): any => useContext(CosmWasmContext);

export const SigningCosmWasmProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSigningCosmWasmClient();
  return <Provider value={value}>{children}</Provider>;
};
