import React, { useState } from "react";
import Layout from "../components/Layout";
import { assets } from "../assets/assets";

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
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", resume: null });
  const [showPopup, setShowPopup] = useState(false);

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setSelectedJob(null);
    }, 300000); 
  };

  return (
    <Layout className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl w-full mt-4 text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Join ShopifyMusic</h1>
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
                onClick={() => handleApply(job)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Application Form */}
        {selectedJob && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md text-left">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                placeholder="Why do you want to join us?"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              {/* Resume Upload Input */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
              />

              <button 
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Submit Application
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Success Popup */}
      {showPopup && (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black text-lg font-semibold px-6 py-4 rounded-lg shadow-lg z-50">
    <div className="text-center">
      <img src={assets.accept} alt="" className="w-32 h-32 mx-auto mb-4"/>
      🎉 Congratulations {form.name}! Your form has been submitted successfully.
    </div>
  </div>
)}
    </Layout>
  );
};

export default Career;
