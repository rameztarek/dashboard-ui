"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

const LoginPage = () => {
  return (
    <div className=" h-screen flex items-center bg-lama-sky justify-center">
      <SignIn.Root>
      <SignIn.Step name: "start" className="bg-wihte p-12  rounded-md flex flex-col gap-2  ">

      </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
