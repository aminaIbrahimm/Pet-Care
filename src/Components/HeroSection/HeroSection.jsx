import React, { useState } from 'react';
import dogImage from '../../assets/dog.png';

export default function HeroSection() {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section id="home" className="bg-linear-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Personalized Care Plans for Every Pet
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get a custom care plan tailored to your pet's breed, age, weight, and unique needs. 
                Our expert team creates comprehensive health, nutrition, and wellness plans just for your furry friend.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#care-plan" className="bg-blue-600 text-white px-8 py-3 cursor-pointer rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Create My Pet's Plan
              </a>
              <a href="#how-it-works" className="cursor-pointer border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
                Learn More
              </a>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5000+</div>
                <div className="text-gray-600">Personalized Plans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-end items-end -mb-20">
            {!imageError ? (
              <img 
                src={dogImage}
                alt="Happy dog representing personalized pet care"
                className="w-full max-w-md h-auto object-contain block"
                onError={handleImageError}
                onLoad={() => console.log('Image loaded successfully')}
              />
            ) : (
              <div className="w-full max-w-md h-64 bg-linear-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-48 h-48 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 6h-2l-1.27-1.27A2.49 2.49 0 0 0 16 4h-2.5A2.5 2.5 0 0 0 11 6.5V7H9.5A2.5 2.5 0 0 0 7 9.5v.5H5.5A2.5 2.5 0 0 0 3 12.5V15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM9 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3 4.5c-1.38 0-2.5-1.12-2.5-2.5h5c0 1.38-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}