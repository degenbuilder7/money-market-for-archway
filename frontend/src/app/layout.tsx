"use client";

import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSigningClient } from "../contexts/cwcontext";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { walletAddress, connectWallet, disconnect } = useSigningClient();
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      console.log("Connecting Wallet");
      connectWallet();
    } else {
      disconnect();
    }
  };

  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black`}>
        <Providers>
          <section>
            <Button
              className="block btn btn-outline btn-primary w-full max-w-full truncate"
              onClick={handleConnect}
            >
              {walletAddress || "Connect Wallet"}
            </Button>
            <main className="container flex min-h-screen flex-col items-center justify-between">
              <div className="absolute top-5 right-5">
                <ModeToggle />
              </div>


                  {children}
                <p className="text-md mt-3 text-center text-zinc-600">
                  Powered by{" "}
                  <a
                    className="font-bold"
                    target="_blank"
                    href="https://archway.io/"
                  >
                    Archway Network
                  </a>
                </p>

            </main>
            </section>
        </Providers>
      </body>
    </html>
  );
}
