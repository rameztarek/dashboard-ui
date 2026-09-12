"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";


const LoginPage = () => {
  return (
    <div className=" h-screen flex items-center bg-lama-sky justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12  rounded-md flex flex-col gap-2 shadow-2xl "
        >
          <h1 className={"text-xl font-bold flex items-center gap-2"}>
            <Image  src="/logo.png" alt="" width={24} height={24}/>
            Lama School
          </h1>
          <h2 className="text-gray-400">Signin In To Your Account</h2>

          <Clerk.GlobalError className="block text-sm text-red-600" />
          <Clerk.Field name="identifier">
            <Clerk.Label>User Name</Clerk.Label>
            <Clerk.Input type="text" required />
            <Clerk.FieldError />
          </Clerk.Field>
          <Clerk.Field name="password">
            <Clerk.Label>Password</Clerk.Label>
            <Clerk.Input type="password" required />
            <Clerk.FieldError />
          </Clerk.Field>
          <SignIn.Action submit>Sign In</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
