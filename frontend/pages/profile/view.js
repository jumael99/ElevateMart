import { React, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBrithday] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [picture, setpicture] = useState("/images/defaultUser.png");
  const [picturePreview, setpicturePreview] = useState(
    "/images/defaultUser.png"
  );


  const handleImageChange = (e) => {
    setpicturePreview(e.target.value);
  };


  return (
    <div className="flex justify-center px-5 pb-5 bg-gray-100 min-h-screen">
      <div className="w-11/12">
      <div className="flex justify-between py-4">
        {/* search and search icon  */}
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  color: "#9c9c9c",
                  left: "24px",
                  padding: "15px",
                  pointerEvents: "none",
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 py-2 border rounded-xl"
            />
          </div>
        </div>
        {/* profile pic and name */}
        <div className="flex items-center gap-2">
          <Image src={picture} width={35} height={20} />
          <p className="text-gray-600">name</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {/* form */}
        <div className="flex-grow">
        <form
          className=" justify-center bg-white border rounded-lg p-10 mb-6"
        >
          <h3 className="text-gray-600 text-xl font-bold pb-3">
            General Information
          </h3>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">
                First Name
              </label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Name</p>
              
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Last Name</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Name</p>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Birthday</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Date</p>
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Gender</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Gender</p>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Email</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Email</p>
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Phone</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Phone</p>
            </div>
          </div>

          <h3 className="text-gray-600 text-xl font-bold pt-6">Address</h3>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Address</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Address</p>
            </div>
            <div className="flex-grow flex-wrap">
              <label className="pt-3 pb-2 block text-gray-600">Number</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">Number</p>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">City</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">City</p>
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">ZIP</label>
              <p className="text-gray-700 font-semibold text-lg pb-1">ZIP</p>
            </div>
          </div>
      
        </form>
        <Link
          href="/profile/edit"
          className="py-3 px-6 bg-gray-900 text-white font-bold rounded hover:bg-gray-600"
        >
          Edit Profile
        </Link>
        {/* <button
          type="submit"
          className="my-4 py-3 px-6 bg-gray-900 text-white font-bold rounded hover:bg-gray-600"
        >
          Edit Profile
        </button> */}
        </div>
        {/* card and photo selection */}
  
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 bg-white pt-16 pb-16 justify-center items-center text-center border rounded-lg">
            <Image src={picture} width={120} height={50} className="round" />
            <div>
              <h4 className="text-gray-600 text-2xl font-bold py-1">name</h4>
              <p className="text-gray-500  py-1">Email</p>
              <p className="text-gray-500 py-1">Address</p>
            </div>
          </div>
          <div className="bg-white p-4 border rounded-lg">
            <label className="text-gray-600 text-lg">
              Select profile photo
            </label>
            <div className="flex items-center gap-4 px-2 py-3">
              <Image
                src={picturePreview}
                width={60}
                height={40}
                className="border rounded"
              />
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faPaperclip}
                  size="xl"
                  style={{
                    color: "#212121",
                    position: "relative",
                    pointerEvents: "none",
                  }}
                />
                <div>
                  <label className="cursor-pointer text-gray-500">
                    <p>Choose Image</p>
                    <p className="text-sm">JPG, GIF or PNG. Max size of 800K</p>
                  </label>
                  <input
                    type="file"
                    id="profile-photo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default Profile;
