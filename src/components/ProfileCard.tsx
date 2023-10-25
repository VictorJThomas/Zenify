"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import imageDefault from "@/../public/assets/imageDefault.svg"

const ProfileCard = () => {
    const {data: session} = useSession()
    const userImage = session?.user?.image || imageDefault ;
    return (
        <div className="w-full text-center pb-8">
            <div className="pl-10">
                <Image priority className="bg-zinc-200  rounded-lg" src={userImage} alt={`${session?.user?.email} image`} width={100} height={100}/>
            </div>
            <div className="text-base font-medium pr-8 pt-6">{session?.user?.name}</div>
        </div>
    )
}

export default ProfileCard