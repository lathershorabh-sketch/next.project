"use client";
import { useState } from "react";
import { Apple, Photo, Playstore, UpperArrow } from "./common/Icons";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    phone: "",
    email: "",
    dob: "",
    language: "",
    address: "",
    postcode: "",
    criminalRecord: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };

  // ✅ FIXED (only one handleSubmit)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-324 w-full justify-between mx-auto text-[#4B014B] flex">
      <div className="max-w-186.25 w-full   -mt-46.25 bg-white mb-8">
        <div className="flex max-w-162.25 w-full p-12  justify-between">
          <div>
            <h1 className="text-[48px] leading-[100%]">Sign Up as a Driver</h1>
            <p className="text-[px] mt-4">
              Get paid in 7days!!! Payments direct to your account.
            </p>
          </div>
          <button className="text-[12px] bg-[#E9E1E9] h-fit py-1.5 px-4 rounded-[29px]">
            <a className="text-[12px]" href="/">
              1. Personal Info
            </a>
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} action="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2  font-medium">First name *</label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border  focus:outline-none focus:ring-2 "
                />
              </div>

              <div>
                <label className="block mb-2  font-medium">Surname *</label>
                <input
                  required
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border  focus:outline-none focus:ring-2 "
                />
              </div>

              <div>
                <label className="block mb-2  font-medium">Phone No *</label>
                <input
                  type="number"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border  "
                />
              </div>

              <div>
                <label className="block mb-2  font-medium">E-mail *</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border"
                />
              </div>

              <div>
                <label className="block mb-2  font-medium">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border "
                />
              </div>

              <div>
                <label className="block mb-2  font-medium">
                  Language of preference in english *
                </label>
                <input
                  type="text"
                  required
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border "
                />
              </div>

              <div className="md:col-span-1">
                <label className="block mb-2  font-medium">Address *</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border "
                />
              </div>

              <div>
                <label className="block mb-2  font-medium">Postcode *</label>
                <input
                  type="text"
                  required
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border"
                />
              </div>
            </div>

            <p className="max-w-[373px]! w-full mt-6 mb-3">
              Do you have any previous criminal convictions? *
            </p>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  required
                  name="criminalRecord"
                  value="yes"
                  onChange={handleChange}
                  checked={formData.criminalRecord === "yes"}
                  className=" w-4 h-4"
                />
                <span className="text-gray-700">Yes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  required
                  name="criminalRecord"
                  value="no"
                  checked={formData.criminalRecord === "no"}
                  onChange={handleChange}
                  className=" w-4 h-4"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>

            <div className="w-full max-w-xl  mt-6">
              <label className="block text-sm font-medium mb-2">
                Photo of your selfie *
              </label>

              <div className="border-2 border-dashed  rounded-lg py-11 px-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-200 transition">
                <input
                  type="file"
                  id="selfieUpload"
                  name="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <label htmlFor="selfieUpload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                      <Photo />
                    </div>

                    <p className="text-sm  font-medium">
                      Click to Upload Front Side of Card
                    </p>

                    <p className="text-xs text-gray-500">
                      (Max. file size: 25 MB)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#4B014B] min-w-[134px] hover:bg-white cursor-pointer hover:border duration-300 text-white hover:text-[#4B014B] flex items-center py-4 px-8.5 rounded-xl mt-8 gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Submit
                  <UpperArrow className="stroke-black" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-125 text-center mt-12.5 text-black">
        <p>
          Earn as you drive The more you drive, the more you earn! You get paid
          weekly.
        </p>

        <p className="mt-10">
          Drive when you want, based on where you are, we simply provide the
          jobs.
        </p>

        <p className="mt-10">
          No more quoting or bidding for jobs-Movexpress offers transparent
          pricing with great rates of pay.
        </p>

        <p className="mt-13">Get the apps for a better experience</p>

        <div className="flex gap-4 mt-6">
          <div className="min-w-[196px] bg-black w-fit flex items-center rounded-full py-4 gap-2.5 px-8">
            <Apple />
            <div className="text-white text-left">
              <p>Download on the</p>
              <p>App Store</p>
            </div>
          </div>

          <div className="min-w-[196px] bg-black text-white flex items-center rounded-full py-4 gap-2.5 px-8">
            <Playstore />
            <div className="text-left">
              <p>GET IT ON</p>
              <p>Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
