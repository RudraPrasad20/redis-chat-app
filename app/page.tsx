import { redis } from "@/lib/db";


import React from 'react'

const page = async () => {
  //set
   redis.set("foo", "key")
   //read
   const data = await redis.get("foo")
   console.log(data)
  return (
    <div>page</div>
  )
}

export default page