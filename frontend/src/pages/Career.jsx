import React from "react";
import Layout from "../components/Layout";
import { UserData } from "../context/User";
import { useNavigate } from "react-router-dom";


const careers = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for a talented Frontend Developer skilled in React and TailwindCSS.",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Remote",
    type: "Full-time",
    description: "Join our team to build scalable backend solutions using Node.js and MongoDB.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Remote",
    type: "Part-time",
    description: "Seeking a creative UI/UX Designer with experience in Figma and user research.",
  },
];

const Career = () => {

  const {handleApply} = UserData()
  const navigate = useNavigate();
  return (
    <Layout className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl w-full mt-4 text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Join Songhub</h1>
        <p className="text-sm mb-8">
          We're on a mission to revolutionize the music industry. Join us and help shape the future of music commerce.
        </p>

        {/* Job Listings */}
        <div className="space-y-6">
          {careers.map((job) => (
            <div key={job.id} className="bg-gray-800 p-6 rounded-lg shadow-md text-left">
              <h2 className="text-2xl font-semibold text-blue-300">{job.title}</h2>
              <p className="text-sm text-gray-400">{job.location} • {job.type}</p>
              <p className="mt-2">{job.description}</p>
              <button 
                onClick={() =>{ handleApply(job); navigate('/career/form')}}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
        </div>
    </Layout>
  );
};

export default Career;
