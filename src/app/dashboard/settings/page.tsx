import AccountSignIn from "@/components/AccountSignIn"
import PersonalInformation from "@/components/PersonalInformation"
import ProfilePictureAndName from "@/components/ProfilePictureAndName"


const SettingsPage = () => {
    return (
        <div>Account Management
            <div>
                <ProfilePictureAndName></ProfilePictureAndName>
            </div>
            <div>
                <PersonalInformation></PersonalInformation>
            </div>
            <div>
                <AccountSignIn></AccountSignIn>
            </div>
        </div>
    )
}

export default SettingsPage