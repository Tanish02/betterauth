"use client";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // redirect if user is logged in and cannot access signin page
  // const {
  //   data: session,
  //   isPending, //loading state
  //   error, //error object
  //   refetch, //refetch the session
  // } = authClient.useSession();

  // useEffect(() => {
  //   if (session) {
  //     redirect("/dashboard");
  //   }
  // }, [session]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    // SUBMIT LOGIC

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: true,
      callbackURL: "/dashboard",
    });
    console.log("data", data);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        className="flex flex-col gap-5 p-7 bg-zinc-600 text-white w-96 rounded shadow-md mx-auto"
        onSubmit={handleSubmit}
      >
        <h1> SignIn </h1>
        {/* <input
          className="bg-zinc-700 border text-white-600 p-2 rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <input
          className="bg-zinc-700 border text-white-600 p-2 rounded"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-zinc-700 border text-white-600 p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          SignIn
        </button>
      </form>
    </div>
  );
};

export default SignIn;

// end code
