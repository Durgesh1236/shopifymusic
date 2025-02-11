import React from "react";
import Layout from "../components/Layout";
import { UserData } from "../context/User";

const About = () => {
  const {user} = UserData()
  return (
    <Layout className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl text-center">
        <h2 className="text-3xl mt-5 font-bold mb-6 text-blue-400">About ShopifyMusic</h2>

        {/* Description inside a box in one line */}
        <div className="border border-blue-400 text-start rounded-lg p-4 mb-6 bg-gray-800">
          <p className="text-lg">
            <h2 className="font-semibold text-blue-300 text-2xl mb-2 whitespace-nowrap">
              Hello' {user.name},
            </h2>
            Welcome to <span className="font-semibold text-blue-300">ShopifyMusic</span>, your ultimate destination for discovering,
            streaming, and purchasing music from talented artists worldwide. We believe in empowering musicians
            and connecting them directly with fans through a seamless and engaging platform.
          </p>
        </div>

        <div className="border text-start border-blue-400 rounded-lg p-4 mb-6 bg-gray-800">
          <p className="text-lg">
            Our platform offers high-quality streaming, an intuitive shopping experience, and exclusive content
            tailored to music lovers and independent artists. Whether you're a listener or a creator, ShopifyMusic
            brings you closer to the music you love.
          </p>
        </div>

        {/* "Join us" section at the bottom */}
        <p className="text-lg font-semibold mt-8 text-blue-300">
          Join us on this journey and experience the future of digital music commerce like never before!
        </p>
      </div>
    </Layout>
  );
};

export default About;
