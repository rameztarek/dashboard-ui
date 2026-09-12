"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const LoginPage = () => {

const { isLoaded , isSignedIn , user } = useUser()

const router = useRouter()

  useEffect(()=>{
    const role = user?.publicMetadata.role;


    if(role){
      router.push("/role")
    }
  },[user , router])

  return (
    <div className=" h-screen flex items-center bg-lama-sky justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12  rounded-md flex flex-col gap-2 shadow-2xl "
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image  src="/logo.png" alt="" width={24} height={24}/>
            Lama School
          </h1>
          <h2 className="text-gray-400">Signin In To Your Account</h2>

          <Clerk.GlobalError className="block text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2 ">
            <Clerk.Label className="text-xs text-gray-500">User Name</Clerk.Label>
            <Clerk.Input type="text" required className="p-2 rounded-md ring-1 ring-gray-300"/>
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <Clerk.Field name="password"  className="flex flex-col gap-2 ">
            <Clerk.Label className="text-xs text-gray-500">Password</Clerk.Label>
            <Clerk.Input type=" " required  className="p-2 rounded-md ring-1 ring-gray-300" />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action submit className="bg-blue-500 text-white my-1 text-sm rounded-md p-[10px]">Sign In</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
