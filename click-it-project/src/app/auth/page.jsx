"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RotatingText from "@/components/ui/rotating-text";
import InfiniteScroll from "@/components/ui/scroll-infinite";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession(); // Gunakan NextAuth session
  const router = useRouter();

  // Jika sudah login, redirect ke /notes
  useEffect(() => {
    console.log("Session Data:", session); // Debugging
    if (session) {
        router.push("/notes");
    }
  }, [session, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Authentication failed");
        }

        const data = await res.json();
        console.log("Response:", data);

        if (data.token && data.user) {
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user)); // Simpan user sebagai JSON

            router.push("/notes"); // Redirect setelah login
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Authentication error:", error);
        alert(error.message || "Authentication failed");
    }
};


  return (
    <div className="flex flex-row h-screen overflow-hidden font-Instrument_Sans">
      {/* Left Section with Infinite Scroll */}
      <div className="h-full flex justify-center flex-col items-start w-1/2 bg-gray-300 p-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <InfiniteScroll
            items={[
              { content: "Project 1" },
              { content: <p>Learn Go</p> },
              { content: "Learn Math" },
              { content: <p>Finish Java Assignment</p> },
              { content: "Aisyah Birthday" },
              { content: <p>Work out 30 Minutes</p> },
            ]}
            isTilted={true}
            tiltDirection="left"
            autoplay={true}
            autoplaySpeed={0.1}
            autoplayDirection="down"
            pauseOnHover={true}
          />
        </div>
        <h1 className="text-[30px] font-bold flex items-center relative z-10">
          Plan The{" "}
          <span className="inline-block">
            <RotatingText
              texts={["Project", "Study", "Work", "Moment!"]}
              mainClassName="px-2 bg-transparent overflow-hidden rounded-lg text-indigo-400"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
          With A Click
        </h1>
        <p className="text-[20px] font-medium relative z-10">
          Create Productive Things Every Day
        </p>
      </div>

      {/* Right Section */}
      <div className="h-full w-1/2 flex justify-center items-center bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute inset-0 dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1]"></div>
        <div className="absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Login/Register Form */}
        <div className="w-full max-w-xs p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md relative z-10">
          <h2 className="text-2xl font-bold text-center mb-4">
            {isRegister ? "Register" : "Login"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md hover:shadow-inner duration-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md hover:shadow-inner duration-300"
              required
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          {/* Google Login Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/notes" })}
            className="bg-red-500 text-white p-2 rounded-md w-full mt-3 hover:bg-red-600 flex justify-center items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M21.8 10.23h-9.54v3.92h5.6c-.5 2.1-2.13 3.61-4.06 3.61-2.55 0-4.65-2.1-4.65-4.66s2.1-4.65 4.65-4.65c1.27 0 2.4.5 3.23 1.34l2.83-2.83C18.36 4.36 16.35 3.5 14.1 3.5c-4.88 0-8.84 3.97-8.84 8.85s3.96 8.85 8.84 8.85c4.88 0 8.75-3.97 8.75-8.85 0-.54-.04-1.08-.11-1.61z"
              />
            </svg>
            Login with Google
          </button>

          <p className="text-center mt-3">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-indigo-400 hover:text-indigo-500"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
