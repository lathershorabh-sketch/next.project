"use client";
import { useState } from "react";
import { Gallery, UpperArrow } from "./common/Icons";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../lib/firebase";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleNumber: "",

    frontLicense: null,
    backLicense: null,

    vanInsuranceFile: null,
    vanStartDate: "",
    vanEndDate: "",

    goodsInsuranceFile: null,
    goodsStartDate: "",
    goodsEndDate: "",

    liabilityInsuranceFile: null,
    liabilityStartDate: "",
    liabilityEndDate: "",

    termsAccepted: false,
  });
  const handleChange = (e: any) => {
    const { name, value, type, files, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Upload files and get URLs
      const frontLicenseUrl = formData.frontLicense
        ? await uploadFile(
            formData.frontLicense,
            `licenses/${Date.now()}_front_${(formData.frontLicense as File).name}`,
          )
        : null;
      const backLicenseUrl = formData.backLicense
        ? await uploadFile(
            formData.backLicense,
            `licenses/${Date.now()}_back_${(formData.backLicense as File).name}`,
          )
        : null;
      const vanInsuranceUrl = formData.vanInsuranceFile
        ? await uploadFile(
            formData.vanInsuranceFile,
            `insurances/${Date.now()}_van_${(formData.vanInsuranceFile as File).name}`,
          )
        : null;
      const goodsInsuranceUrl = formData.goodsInsuranceFile
        ? await uploadFile(
            formData.goodsInsuranceFile,
            `insurances/${Date.now()}_goods_${(formData.goodsInsuranceFile as File).name}`,
          )
        : null;
      const liabilityInsuranceUrl = formData.liabilityInsuranceFile
        ? await uploadFile(
            formData.liabilityInsuranceFile,
            `insurances/${Date.now()}_liability_${(formData.liabilityInsuranceFile as File).name}`,
          )
        : null;

      // 🔹 1. Firestore me save karo
      const docRef = await addDoc(collection(db, "drivers"), {
        vehicleType: formData.vehicleType,
        vehicleNumber: formData.vehicleNumber,

        frontLicenseUrl,
        backLicenseUrl,

        vanInsuranceUrl,
        vanStartDate: formData.vanStartDate,
        vanEndDate: formData.vanEndDate,

        goodsInsuranceUrl,
        goodsStartDate: formData.goodsStartDate,
        goodsEndDate: formData.goodsEndDate,

        liabilityInsuranceUrl,
        liabilityStartDate: formData.liabilityStartDate,
        liabilityEndDate: formData.liabilityEndDate,

        termsAccepted: formData.termsAccepted,
        createdAt: new Date(),
      });

      console.log("Firestore ID:", docRef.id);

      // 🔹 2. Resend API call (EMAIL SEND)
      const emailRes = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleType: formData.vehicleType,
          vehicleNumber: formData.vehicleNumber,
          vanStartDate: formData.vanStartDate,
          vanEndDate: formData.vanEndDate,
          goodsStartDate: formData.goodsStartDate,
          goodsEndDate: formData.goodsEndDate,
          liabilityStartDate: formData.liabilityStartDate,
          liabilityEndDate: formData.liabilityEndDate,
        }),
      });

      const emailData = await emailRes.json();
      console.log("Email Response:", emailData);

      alert("Form submitted + Email sent ✅");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };
  // fake delay (API call simulate)
  // real API ke liye:
  // await fetch(...)
  // setLoading(false);

  return (
    <section className=" text-[#4B014B] flex gap-12">
      <div className="-mt-45.75 bg-white max-w-187.5 w-full p-12   ml-[72]">
        <div className="flex justify-between">
          <div>
            <h1 className="text-[48px] font-medium">Sign Up as a Driver</h1>
            <p className=" mt-4">
              Get paid in 7days!!! Payments direct to your account.
            </p>
          </div>
          <div>
            <button className="bg-[#E9E1E9] py-1.5 px-4 rounded-[29px]">
              <a href="#">2. Vehicle Info</a>
            </button>
          </div>
        </div>
        <div className="flex max-w-163.5 bg-[#F6C8F6] w-full mt-8 rounded-[10px]">
          <div className="bg-[#4B014B] h-2 w-[calc(50%)] rounded-[10px]"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full justify-between mt-8">
            <div className=" max-w-80 w-full flex flex-col">
              <label htmlFor="">Vehicle type *</label>
              <select
                className="border mt-1 rounded-lg py-4.5 px-4"
                required
                onChange={handleChange}
                name="vehicleType"
                id="cars"
              >
                <option value="">Select Vehicle type </option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="max-w-80 w-full flex flex-col">
              <label htmlFor="">Vehicle registration no * </label>
              <select
                onChange={handleChange}
                className="border rounded-lg mt-1 py-4.5 px-4"
                name="vehicleNumber"
              >
                <option value="">Select vehicle registration no</option>
                <option value="HR26AB1234">HR26 AB 1234</option>
                <option value="DL01CD5678">DL01 CD 5678</option>
                <option value="UP14EF9012">UP14 EF 9012</option>
                <option value="RJ45GH3456">RJ45 GH 3456</option>
              </select>
            </div>
          </div>
          <div className="flex w-full justify-between mt-8">
            <div className=" max-w-80 w-full flex flex-col">
              <label htmlFor="">Front Of Driving Licence *</label>
              <div className="text-center relative border-dashed border-2 border-[#4B014B] rounded-lg p-4 mt-1">
                <input
                  className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0"
                  type="file"
                  onChange={handleChange}
                  name="frontLicense"
                />
                <div className="mx-auto w-fit">
                  <Gallery />
                </div>
                <p>Click to Upload Front Side of Card</p>
                <p> (Max. File size: 25 MB)</p>
              </div>
            </div>
            <div className="max-w-80 w-full flex flex-col">
              <label htmlFor="">Back Of Driving Licence *</label>
              <div className="text-center relative border-dashed border-2 border-[#4B014B] rounded-lg p-4 mt-1">
                <input
                  className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0"
                  type="file"
                  onChange={handleChange}
                  name="backLicense"
                />
                <div className="mx-auto w-fit">
                  <Gallery />
                </div>
                <p>Click to Upload Back Side of Card</p>
                <p> (Max. File size: 25 MB)</p>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-6 mb-5">
            <p className="max-w-57.5 h-px w-full bg-[#4B014B]"></p>
            <p className="px-4">Van Insurance</p>
            <p className="max-w-57.5 h-px w-full bg-[#4B014B]"></p>
          </div>
          <div>
            <div className=" w-full flex flex-col">
              <label htmlFor="">Van Insurance Copy *</label>
              <div className="text-center relative border-dashed border-2 border-[#4B014B] rounded-lg p-4 mt-1">
                <input
                  className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0"
                  type="file"
                  onChange={handleChange}
                  name="vanInsuranceFile"
                />
                <div className="mx-auto w-fit">
                  <Gallery />
                </div>
                <p>Click to Upload Back Side of Card</p>
                <p> (Max. File size: 25 MB)</p>
              </div>
            </div>
            <div className="flex">
              <div className="mt-5 flex w-full  flex-col">
                <label htmlFor="">Start Date *</label>
                <input
                  type="date"
                  name="vanStartDate"
                  required
                  onChange={handleChange}
                  id="vanStartDate"
                  className="border rounded-lg mt-1 py-4.5 px-4 w-full max-w-80"
                ></input>
              </div>
              <div className="mt-5 flex w-full  flex-col">
                <label htmlFor="">End Date*</label>
                <input
                  type="date"
                  name="vanEndDate"
                  required
                  onChange={handleChange}
                  id="vanEndDate"
                  className="border rounded-lg mt-1 py-4.5 px-4 w-full max-w-80"
                ></input>
              </div>
            </div>
          </div>
          <div>
            <div className=" w-full flex flex-col">
              <label htmlFor="">Goods In Transit Insurance Copy *</label>
              <div className="text-center relative border-dashed border-2 border-[#4B014B] rounded-lg p-4 mt-1">
                <input
                  className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0"
                  type="file"
                  onChange={handleChange}
                  name="goodsInsuranceFile"
                />
                <div className="mx-auto w-fit">
                  <Gallery />
                </div>
                <p>Click to Upload Back Side of Card</p>
                <p> (Max. File size: 25 MB)</p>
              </div>
            </div>
            <div className="flex">
              <div className="mt-5 flex w-full  flex-col">
                <label htmlFor="">Start Date *</label>
                <input
                  type="date"
                  name="goodsStartDate"
                  required
                  onChange={handleChange}
                  id="goodsStartDate"
                  className="border rounded-lg mt-1 py-4.5 px-4 w-full max-w-80"
                ></input>
              </div>
              <div className="mt-5 flex w-full  flex-col">
                <label htmlFor="">End Date*</label>
                <input
                  type="date"
                  name="goodsEndDate"
                  onChange={handleChange}
                  required
                  id="goodsEndDate"
                  className="border rounded-lg mt-1 py-4.5 px-4 w-full max-w-80"
                ></input>
              </div>
            </div>
          </div>
          <div>
            <div className=" w-full flex flex-col">
              <label htmlFor="">Public Liability Insurance Copy *</label>
              <div className="text-center relative border-dashed border-2 border-[#4B014B] rounded-lg p-4 mt-1">
                <input
                  className="absolute cursor-pointer top-0 left-0 w-full h-full opacity-0"
                  type="file"
                  onChange={handleChange}
                  name="liabilityInsuranceFile"
                />
                <div className="mx-auto w-fit">
                  <Gallery />
                </div>
                <p>Click to Upload Back Side of Card</p>
                <p> (Max. File size: 25 MB)</p>
              </div>
            </div>
            <div className="flex">
              <div className="mt-5 flex w-full  flex-col">
                <label htmlFor="">Start Date *</label>
                <input
                  required
                  type="date"
                  name="liabilityStartDate"
                  onChange={handleChange}
                  id="liabilityStartDate"
                  className="border rounded-lg mt-1 py-4.5 px-4 w-full max-w-80"
                ></input>
              </div>
              <div className="mt-5 flex w-full  flex-col">
                <label htmlFor="">End Date*</label>
                <input
                  required
                  type="date"
                  onChange={handleChange}
                  name="liabilityEndDate"
                  id="liabilityEndDate"
                  className="border rounded-lg mt-1 py-4.5 px-4 w-full max-w-80"
                ></input>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <input
              required
              type="checkbox"
              id="terms"
              onChange={handleChange}
              name="termsAccepted"
            />
            <label htmlFor="terms" className="ml-2">
              By clicking the submit button, I agree that I have read and
              understood the Terms And Conditions.
            </label>
          </div>
          <button
            type="submit"
            disabled={loading} // 🔥 optional (double click prevent)
            className="cursor-pointer border flex items-center gap-2 bg-[#4B014B] text-white py-4 px-8 rounded-[12px] mt-8"
          >
            {loading ? "Loading..." : "Submit Application"}
            {!loading && <UpperArrow />}
          </button>
        </form>
      </div>
      <div className="max-w-123.75 w-full text-[#505561] text-center mt-15 text-[18px]">
        <p>
          Earn as you drive The more you drive, the more you earn! You get paid
          weekly.
        </p>
        <p className="py-7">
          Drive when you want, based on where you are, we simply provide the
          jobs.
        </p>
        <p>
          No more quoting or bidding for jobs-Movexpress offers transparent
          pricing with great rates of pay. The pay you see on the job alerts is
          the exact amount that will be paid into your account.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
