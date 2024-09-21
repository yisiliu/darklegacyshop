import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HomeContent() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center bg-[url('/images/background-image.png')] bg-cover bg-center">
      <h1 className="sticky top-0 z-10 text-2xl md:text-4xl font-bold text-pink-200 mb-8 shadow-pink-200/50 drop-shadow-md py-4">
        SIGN IN / SIGN UP
      </h1>
      <div className="mt-auto">
        <Card className="w-full max-w-md border-2 border-gray-700 bg-gray-600 overflow-hidden backdrop-blur-sm mx-auto">
          <CardHeader className="bg-white border-b-0">
            <CardTitle className="text-2xl text-grey-600 text-center">
              Start Check-in Now
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center bg-white rounded-b-lg overflow-hidden">
            <Link href="/tasks" passHref>
              <Button
                size="lg"
                className="text-xl px-12 py-8 bg-pink-300 hover:bg-pink-200 text-gray-800 rounded-full shadow-lg shadow-[#f3b8e1]/50 transform transition-all duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Connect Wallet
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="text-white p-4 text-center text-sm border-t-0">
            <p className="mx-auto">
              Account will be created for new connected user
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
