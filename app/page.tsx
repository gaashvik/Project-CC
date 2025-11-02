'use client'
import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import SideBar from "@/components/sidebar/sidebar";
import MainView from "@/components/view/main";

export default function Home() {
  const { user,isLoading,error } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading){
    return <div>Loading...</div>
  }

   if (error) {
    return <div>User is  {error.message}</div>;
  }


  return (
    <>
    <Header/>
    <div className="flex">
      <SideBar/>
       <div className="w-full flex-1 rounded-2xl p-3">
        <MainView/>
      </div>
    </div>
    </>
  );
}
