import AccountSignIn from "@/components/AccountSignIn";
import LightDarkSwitch from "@/components/LightDarkSwitch";
import PersonalInformation from "@/components/PersonalInformation";
import ProfilePictureAndName from "@/components/ProfilePictureAndName";

const SettingsPage = () => {
  return (
    <div className="px-10">
      <h1 className="text-xl text-black dark:text-white">Account Management</h1>
      <ProfilePictureAndName />
      <div className="flex content-end justify-end gap-4">
        <PersonalInformation />
        <AccountSignIn />
      </div>
      <LightDarkSwitch />
    </div>
  );
};

export default SettingsPage;
