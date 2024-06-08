// @ts-nocheck
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function l() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <ArchiveIcon className="h-6 w-6" />
          <span className="sr-only">Arch Defi</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            target="_blank"
            prefetch={false}
          >
            GitHub
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f4f8]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#1a2e45]">
                    Unlock the Power of Decentralized Finance
                  </h1>
                  <p className="max-w-[600px] text-[#475569] md:text-xl">
                    Arch Defi is a cutting-edge money market protocol that empowers users to deposit, borrow, and earn
                    on their digital assets.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#3b82f6] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#2563eb] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#e2e8f0] bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#f0f4f8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#1a2e45]">
                  Powerful Features for Decentralized Finance
                </h2>
                <p className="max-w-[900px] text-[#475569] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Arch Defi offers a suite of tools to help you manage your digital assets and participate in the
                  decentralized finance ecosystem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-6">
                  <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="rounded-full bg-[#f0f4f8] p-3">
                      <CheckIcon className="h-6 w-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2e45]">Deposit</h3>
                      <p className="text-[#475569]">Securely deposit your digital assets and earn interest.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="rounded-full bg-[#f0f4f8] p-3">
                      <DeleteIcon className="h-6 w-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2e45]">Withdraw</h3>
                      <p className="text-[#475569]">Withdraw your deposited assets at any time.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="rounded-full bg-[#f0f4f8] p-3">
                      <CreditCardIcon className="h-6 w-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2e45]">Provide Collateral</h3>
                      <p className="text-[#475569]">Provide collateral to borrow against your assets.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="rounded-full bg-[#f0f4f8] p-3">
                      <BookmarkIcon className="h-6 w-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2e45]">Borrow</h3>
                      <p className="text-[#475569]">Borrow digital assets using your collateral.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="rounded-full bg-[#f0f4f8] p-3">
                      <ReceiptIcon className="h-6 w-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2e45]">Repay</h3>
                      <p className="text-[#475569]">Repay your borrowed assets and reclaim your collateral.</p>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f4f8]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e2e8f0] px-3 py-1 text-sm">About Arch Defi</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-[#1a2e45]">
                  Revolutionizing Decentralized Finance
                </h2>
                <p className="mx-auto max-w-[700px] text-[#475569] md:text-xl/relaxed">
                  Arch Defi is a cutting-edge money market protocol built on the Archway blockchain. We empower users to
                  deposit, borrow, and earn on their digital assets in a secure and decentralized environment.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#2563eb] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-[#e2e8f0] px-3 py-1 text-sm">Security</div>
                <p className="mx-auto max-w-[700px] text-[#475569] md:text-xl/relaxed">
                  Arch Defi is built on the Archway blockchain, which provides a secure and scalable infrastructure for
                  decentralized finance. Our protocol is designed with robust security measures to protect your assets
                  and ensure the integrity of your transactions.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-[#f0f4f8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1a2e45]">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-[#475569] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions or need support? Our team is here to help.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Contact Us</Button>
              </form>
              <p className="text-xs text-[#475569]">We will get back to you as soon as possible.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#f0f4f8]">
        <p className="text-xs text-[#475569]">&copy; 2024 Arch Defi. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-[#3b82f6]"
            target="_blank"
            prefetch={false}
          >
            GitHub
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#3b82f6]" prefetch={false}>
            Documentation
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#3b82f6]" prefetch={false}>
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function ArchiveIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  )
}


function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}


function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function DeleteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  )
}


function ReceiptIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </svg>
  )
}
