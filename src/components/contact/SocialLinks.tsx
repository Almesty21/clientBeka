// src/components/Contact/SocialLinks.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TwitterOutlined, LinkedinOutlined } from "@ant-design/icons";

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-semibold text-white">Or</h2>
      <p className="text-gray-300 text-center">
        Message me on{" "}
        <Link
          to="https://twitter.com"
          className="mx-2 text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined /> Twitter
        </Link>{" "}
        or{" "}
        <Link
          to="https://linkedin.com"
          className="mx-2 text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined /> LinkedIn
        </Link>
      </p>
    </div>
  );
};