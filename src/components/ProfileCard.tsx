"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import imageDefault from "@/../public/assets/imageDefault.svg"

const ProfileCard = () => {
    const {data: session} = useSession()
    const userImage = session?.user?.image || imageDefault;
    return (
        <div className="w-full pb-8">
            <div className="bg-zinc-200 align-middle">
                <Image src={userImage} alt={`${session?.user?.email} image`} width={100} height={100}/>
            </div>
            <div>{session?.user?.name}</div>
        </div>
    )
}

export default ProfileCard