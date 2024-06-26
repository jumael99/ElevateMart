import { React, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleImageChange = (e) => {
    setpicturePreview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-10 pb-5 bg-gray-100 ">
      <div className="flex justify-between py-4">
        {/* search and search icon  */}
        <div className="flex items-center">
          <div className="relative w-full">
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
        <form
          className="flex-grow bg-white border rounded p-7"
          onSubmit={handleSubmit}
        >
          <h3 className="text-gray-600 text-xl font-bold pb-3">
            General Information
          </h3>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">
                First Name
              </label>
              <input
                placeholder=" Enter your first name "
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Last Name</label>
              <input
                placeholder="Also your last name"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Birthday</label>
              <input
                type="date"
                className="text-black w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setBrithday(e.target.value)}
                required
              />
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Gender</label>
              <select
                className="w-full p-2 text-black border border-gray-300 rounded"
                onChange={handleGenderChange}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Email</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Phone</label>
              <input
                placeholder="+8801*********"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <h3 className="text-gray-600 text-xl font-bold pt-6">Address</h3>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">Address</label>
              <input
                placeholder="  Enter your home address "
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="flex-grow flex-wrap">
              <label className="pt-3 pb-2 block text-gray-600">Number</label>
              <input
                placeholder=" No. "
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">City</label>
              <input
                placeholder=" City "
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="flex-grow">
              <label className="pt-3 pb-2 block text-gray-600">ZIP</label>
              <input
                placeholder="ZIP "
                className="w-full p-2  border border-gray-300 rounded"
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="my-4 p-2 bg-gray-900 text-white font-bold rounded hover:bg-blue-700"
          >
            Save All
          </button>
        </form>
        {/* card and photo selection */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-7 bg-white pt-20 pb-16 justify-center items-center text-center border rounded">
            <Image src={picture} width={120} height={50} className="round" />
            <div>
              <h4 className="text-gray-600 text-2xl font-bold py-1">name</h4>
              <p className="text-gray-500  py-1">Email</p>
              <p className="text-gray-500 py-1">Address</p>
            </div>
          </div>
          <div className="bg-white p-4 border rounded">
            <label className="text-gray-600 text-lg">
              Select profile photo
            </label>
            <div className="flex items-center gap-5 p-4">
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
                <div className="">
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
  );
};

export default Profile;
