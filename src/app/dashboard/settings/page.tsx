import AccountSignIn from "@/components/AccountSignIn"
import PersonalInformation from "@/components/PersonalInformation"
import ProfilePictureAndName from "@/components/ProfilePictureAndName"


const SettingsPage = () => {
    return (
        <div>Account Management
                <ProfilePictureAndName/>
                <PersonalInformation/>
                <AccountSignIn/>
        </div>
    )
}

export default SettingsPage