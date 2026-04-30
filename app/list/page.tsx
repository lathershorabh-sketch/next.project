"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function ApplicationsPage() {
  const [data, setData] = useState<{ id: string; [key: string]: unknown }[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "drivers"));

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(list);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Applications Data
        </h1>

        {data.length === 0 ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Vehicle Type</th>
                  <th className="text-left p-3">Vehicle Number</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="p-3 text-sm text-gray-700">{String(item.id)}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {String(item.vehicleType)}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {String(item.vehicleNumber)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
