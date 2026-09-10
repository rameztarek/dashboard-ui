"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import React from 'react';

const TableSerach = () => {
  const router = useRouter();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const value = (e.currentTarget[0] as HTMLInputElement).value




    const params = new URLSearchParams(window.location.search);
    params.set("search",value);
    router.push(`${window.location.pathname}?${params}`);
  };
  };

  return ();


export default TableSerach;
