"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import imageDefaultUser from "@/../public/assets/imageDefaultUser.svg"

const ProfileCard = () => {
    const {data: session} = useSession()
    const userImage = session?.user?.image || imageDefaultUser ;
    return (
        <div className="w-full flex-1 items-center text-center pb-8 ">
            <div className="pl-12">
                <Image priority className="bg-zinc-200 rounded-full" src={userImage} alt={`${session?.user?.email} image`} width={100} height={100}/>
            </div>
            <div className="text-base font-medium pr-8 pt-6 max-w-5">{session?.user?.name}</div>
        </div>
    )
}

export default ProfileCard