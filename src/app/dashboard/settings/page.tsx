import AccountSignIn from "@/components/AccountSignIn";
import PersonalInformation from "@/components/PersonalInformation";
import ProfilePictureAndName from "@/components/ProfilePictureAndName";

const SettingsPage = () => {
  return (
    <div className="px-10">
      <h1 className="text-xl text-black dark:text-white">Gestión de la cuenta</h1>
      <ProfilePictureAndName />
      <div className="flex content-end justify-end gap-4">
        <PersonalInformation />
        <AccountSignIn />
      </div>
    </div>
  );
};

export default SettingsPage;
