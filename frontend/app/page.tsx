import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import React, { useEffect, useState } from 'react';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { coin as StargateCoin } from '@cosmjs/stargate';


export default function IndexPage() {

const REGISTRY_CONTRACT = "archway1275jwjpktae4y4y0cdq274a2m0jnpekhttnfuljm6n59wnpyd62qppqxq0";
const CW721_CONTRACT = "archway1cf5rq0amcl5m2flqrtl4gw2mdl3zdec9vlp5hfa9hgxlwnmrlazsdycu4l";

const Blockchain = {
  chainId: "archway-1",
  chainName: "Archway",
  rpc: "https://rpc.mainnet.archway.io",
  stakeCurrency: { coinDenom: "ARCH", coinMinimalDenom: "aarch", coinDecimals: 6 },
  bech32Config: {
    bech32PrefixAccAddr: "archway",
    bech32PrefixAccPub: "archwaypub",
    bech32PrefixValAddr: "archwayvaloper",
    bech32PrefixValPub: "archwayvaloperpub",
    bech32PrefixConsAddr: "archwayvalcons",
    bech32PrefixConsPub: "archwayvalconspub"
  },
  currencies: [{ coinDenom: "ARCH", coinMinimalDenom: "aarch", coinDecimals: 18 }],
  feeCurrencies: [{
    coinDenom: "ARCH",
    coinMinimalDenom: "aarch",
    coinDecimals: 18,
    gasPriceStep: { low: 0, average: 0.1, high: 0.2 }
  }],
  features: ['cosmwasm']
};

async function getClient() {
  await globalThis.keplr.experimentalSuggestChain(Blockchain);
  await globalThis.keplr.enable(Blockchain.chainId);
  globalThis.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
  const signer = await globalThis.getOfflineSignerAuto(Blockchain.chainId);
  const client = await SigningArchwayClient.connectWithSigner(Blockchain.rpc, signer);
  return client;
}

async function getAccounts() {
  const signer = await globalThis.getOfflineSignerAuto(Blockchain.chainId);
  const accounts = signer.getAccounts();
  return accounts;
}

async function resolveRecord(name = null) {
  if (!name) return;
  let client = await getClient();
  try {
    let entrypoint = {
      resolve_record: {
        name: name
      }
    };
    let query = await client.queryClient.wasm.queryContractSmart(
      REGISTRY_CONTRACT,
      entrypoint
    );
    return query;
  } catch(e) {
    return { error: e };
  }
}

async function tokenMetadata(tokenId = null) {
  if (!tokenId) return;
  let client = await getClient();
  try {
    let entrypoint = {
      nft_info: {
        token_id: tokenId
      }
    };
    let query = await client.queryClient.wasm.queryContractSmart(
      CW721_CONTRACT,
      entrypoint
    );
    return query;
  } catch (e) {
    return { error: e };
  }
}

  const [client, setClient] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [resolvedRecord, setResolvedRecord] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const newClient = await getClient();
      setClient(newClient);
      const newAccounts = await getAccounts();
      setAccounts(newAccounts);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function resolve() {
      const result = await resolveRecord('archid.arch');
      setResolvedRecord(result);
    }
    resolve();
  }, []);

  useEffect(() => {
    async function fetchTokenMetadata() {
      const tokenData = await tokenMetadata('kamal.arch');
      setTokenInfo(tokenData);
    }
    fetchTokenMetadata();
  }, []);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Pay with ArchID directly <br className="hidden sm:inline" />
          to anyone, anytime.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
      <div>
      <h1>Pay with ArchID</h1>
      <p>Client: {JSON.stringify(client)}</p>
      <p>Accounts: {JSON.stringify(accounts)}</p>
      <p>Resolved Record: {JSON.stringify(resolvedRecord)}</p>
      <p>Token Metadata: {JSON.stringify(tokenInfo)}</p>
    </div>
    </section>
  )
}
