"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { useRouter } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const router = useRouter()
  // await db.set("hellow", "wold")
  return (
    <div>
      <Button onClick={()=> router.push("/login")}>login</Button>
    </div>
  )
}

export default Home