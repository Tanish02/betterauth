"use Client";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const signUp = () => {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Form submitted:", { name, email, password });

    // Better-Auth Submit Logic
    const { data, error } = await authClient.signUp.email(
      {
        name: name,
        email: email,
        password: password,
        callbackURL: "/dashboard",
        // after user signUp redirect to dashboard
      },
      {
        onRequest: (ctx) => {
          console.log("Request Started:", ctx);
        },
        onSuccess: (ctx) => {
          redirect: "/dashboard";
          console.log("Request Success:", ctx);
        },
        onError: (ctx) => {
          // alert(ctx.error.message);
          console.log("Request Error:", ctx);
        },
      }
    );

    console.log("SignUp Response:", { data: data, error: error });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        className="flex flex-col gap-5 p-7 bg-zinc-600 text-white w-96 rounded shadow-md mx-auto"
        onSubmit={handleSubmit}
      >
        <h1> SignUp </h1>
        <input
          className="border-white-600 p-2 rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border-white-600 p-2 rounded"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-white-600 p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default signUp;

// end code
