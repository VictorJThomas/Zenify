import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const SwitchButton = () => {
  const [client, setClient] = useState(false);
  const [psychologist, setPsychologist] = useState(false);

  const { data: session } = useSession();
  const id = session?.user.id;

  const handleSwitch = async () => {
    try {
      const response = await axios.put(`/api/settings/updateUserRole/${id}`, {
        newRole: client ? 'PSYCHOLOGIST' : 'CLIENT',
      });

      if (response.status === 200) {
        setClient((prevClient) => !prevClient);
        setPsychologist((prevPsychologist) => !prevPsychologist);
      } else {
        console.error('Failed to update user role', response);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  useEffect(() => {
    if (session?.user.role === 'CLIENT') {
      setClient(true);
    } else if (session?.user.role === 'PSYCHOLOGIST') {
      setPsychologist(true);
    }
  }, [session]);

  return (
    <div className="flex items-center">
      <div
        className={`${client ? 'bg-indigo-800' : 'bg-indigo-600'} h-6 w-12 rounded-full cursor-pointer`}
        onClick={handleSwitch}
      >
        <div
          className={`${client ? 'translate-x-6' : 'translate-x-0'} bg-white h-5 w-5 rounded-full shadow transform transition duration-200`}
        />
      </div>
      <div className="ml-3">
        <span className={`${psychologist ? 'text-gray-800' : 'text-gray-300'} font-medium`}>Psicologo</span>
        <span className={`${client ? 'text-gray-800' : 'text-gray-300'} font-medium ml-2`}>Usuario</span>
      </div>
    </div>
  );
};

export default SwitchButton;
