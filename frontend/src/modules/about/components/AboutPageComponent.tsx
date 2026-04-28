import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function AboutPageComponent() {
  const cardClass =
    "bg-gradient-to-br from-pink-950 via-orange-900 to-purple-800 text-gray-300 hover:scale-105 transition duration-300";

  return (
    <div className="bg-gradient-to-br  text-white py-16 px-6">
      
      <div id="about-us" className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl font-bold">About Us</h1>

          <p className="text-gray-300 leading-relaxed">
            We are building a modern, AI-powered local marketplace designed to 
            connect buyers and sellers in a faster, smarter, and more reliable way.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Our platform simplifies discovery, enables direct communication, 
            and creates a trusted space for secure transactions.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Whether you want to buy, sell, or explore, we provide a seamless 
            and user-friendly experience for everyone.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Fast Hiring</CardTitle>
            </CardHeader>
            <CardContent>
              Quickly connect with the right service providers without delays.
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Direct Communication</CardTitle>
            </CardHeader>
            <CardContent>
              Chat directly with buyers and sellers without middlemen.
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Trusted Platform</CardTitle>
            </CardHeader>
            <CardContent>
              Secure and verified environment for safe transactions.
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Local Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              Find products and services near you easily.
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              Personalized suggestions based on your interests.
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              Clean and simple interface for everyone.
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default AboutPageComponent;