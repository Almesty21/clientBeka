// src/components/TestAPI.tsx
import React from 'react';
import { CreateContact } from '../services/contact';

export const TestAPI: React.FC = () => {
  const testAPI = async () => {
    try {
      const testData = {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Message",
        message: "This is a test message from the frontend"
      };
      
      console.log("🧪 Testing API connection...");
      const result = await CreateContact(testData);
      console.log("✅ API Test Success:", result);
      alert("API is working! Check console for details.");
    } catch (error: any) {
      console.error("❌ API Test Failed:", error);
      alert(`API Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={testAPI}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test API Connection
      </button>
    </div>
  );
};