'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Avatar from "react-avatar";


const Profile = () => {
  const router = useRouter();
  const userId = "66015c8f8dfd0daff4571cf5";

  const [userData, setUserData] = useState<any>({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('https://flexstay-backend.onrender.com/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    if (token) {
      fetchUserDetails();
    }
  }, [token]);
  
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div>
          <div className=" h-40 overflow-hidden bg-gradient-to-tr from-slate-300 via-neutral-800" />
          <div className="flex justify-center px-5 -mt-12">
            <Avatar
              color="#5064ae"
              size="100"
              round={true}
              name={`${userData.firstName} ${userData.lastName}`}
            />
          </div>
        </div>
            <div className="flex items-center">

              <h1 className="font-bold text-xl">{userData.firstName}, {userData.lastName}</h1>
            </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
