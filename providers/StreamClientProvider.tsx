'use client'

import { useUser } from "@clerk/nextjs";
import {
    StreamVideoClient,
    StreamVideo
  } from "@stream-io/video-react-sdk";
import {  ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "../actions/stream.actions";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  
  
const StremVideoProvider = ({children}:{children:ReactNode}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()
    const router = useRouter()

    const {user , isLoaded}=useUser();
    

    

    useEffect(() => {
      if (!isLoaded || !user) {
        return router.push('/sign-in')
      };
      
      if (!apiKey) {
          console.error("API Key is missing");
          return;
      }
  
      try {
          const client = new StreamVideoClient({
              apiKey,
              user: {
                  id: user?.id,
                  name: user.username || user?.id,
                  image: user.imageUrl
              },
              tokenProvider
          });
  
          setVideoClient(client);
      } catch (error) {
          console.error("Error creating StreamVideoClient:", error);
      }
  }, [user, isLoaded]);
  if(!isLoaded) return <Loader/>
  
    
    if(!videoClient) return <Loader/>


    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

  export default StremVideoProvider