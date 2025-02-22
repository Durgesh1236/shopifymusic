import React, { useState } from 'react'
import Layout from '../components/Layout'
import { assets } from "../assets/assets";
import { UserData } from '../context/User';
import { useNavigate } from 'react-router-dom';

const ApplyFormJob = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "", resume: null });
    const {selectedJob, setSelectedJob} = UserData();
    const navigate = useNavigate()
      const handleSubmit = (e) => {
        e.preventDefault();
         setShowPopup(true);
          setTimeout(() => {
          setShowPopup(false);
          setSelectedJob(null);
          navigate('/career');
        }, 3000); 
      };
      
  return (
    <Layout>
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
  )
}

export default ApplyFormJob
