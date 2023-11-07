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
        </div>
    )
}

export default SettingsPage