'use client'

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const Meeting = ({params:{id}}:{params:{id:"string"}}) => {
  const {user , isLoaded} = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState (false)
  const {call , isCallLoading} = useGetCallById(id);

  // console.log("call====>>",call)

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <StreamCall call={call}>
      <StreamTheme>
        {
          !isSetupComplete ? (
            <MeetingSetup
            setIsSetupComplete={setIsSetupComplete}
            /> 
          ):(
            <MeetingRoom/>
          )
        }
      </StreamTheme>
    </StreamCall>
  )
} 

export default Meeting