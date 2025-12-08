import { useEffect, useState } from "react";
import { GetAbout } from "../../services/about";
import { Link } from 'react-router-dom';
import { Bio, WorkExperience } from '../../types';
import { TypeAnimation } from 'react-type-animation';

import {  
  CodeOutlined,  
  TrophyOutlined,
  CalendarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  GlobalOutlined
} from '@ant-design/icons';

// --- Local fallback JSON ---
const localBio: Bio = {
  name: "Dear",
  intro: `Hi there! Thanks for stopping by. I'm Dear, a software engineer, tech enthusiast, 
          and product creator with a passion for building innovative tools and solutions. 
          With experience across a wide range of technologies, I've worked on projects of 
          all sizes, from small prototypes to large-scale systems.`,
  blogLink: "#",
};

const localWorkExperiences: WorkExperience[] = [
  {
    role: "Technical Writer",
    company: "Ramonito",
    duration: "May 2022 - Present",
    responsibilities: [
      "Developed comprehensive documentation for software products.",
      "Collaborated with developers to create user-friendly guides and API references.",
      "Improved documentation processes reducing review time by 40%",
    ],
  },
  {
    role: "Software Engineer",
    company: "Chainrisk",
    duration: "April 2025 - Present",
    responsibilities: [
      "Designed and implemented scalable software solutions.",
      "Participated in code reviews and mentored junior developers.",
      "Built microservices architecture handling 10K+ daily requests",
    ],
  },
];

const About: React.FC = () => {
  const [bio, setBio] = useState<Bio>(localBio);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(localWorkExperiences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await GetAbout();
        const aboutData = Array.isArray(data) ? data[0] : data;

        if (aboutData?.bio) {
          setBio(aboutData.bio);
        }
        if (aboutData?.workExperiences) {
          setWorkExperiences(aboutData.workExperiences);
        }
      } catch (error) {
        console.error("Failed to fetch About data:", error);
        // Optionally, you can set an error state here to display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Crafting amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Hello, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-white">{bio.name}</span>
            </h1>
            <TypeAnimation
              sequence={['Developer', 1500, 'Designer', 1500, 'Creator', 1500]}
              speed={50}
              repeat={Infinity}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:transform hover:scale-105 transition-all duration-300">
              <CodeOutlined className="text-blue-400 text-2xl mb-3 mx-auto" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-gray-400 text-sm">Projects Completed</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:transform hover:scale-105 transition-all duration-300">
              <CalendarOutlined className="text-green-400 text-2xl mb-3 mx-auto" />
              <div className="text-2xl font-bold text-white">3+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:transform hover:scale-105 transition-all duration-300">
              <TeamOutlined className="text-purple-400 text-2xl mb-3 mx-auto" />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:transform hover:scale-105 transition-all duration-300">
              <TrophyOutlined className="text-orange-400 text-2xl mb-3 mx-auto" />
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-gray-400 text-sm">Technologies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-gray-700/50 shadow-2xl">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <GlobalOutlined className="text-blue-400 text-xl" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                  My Journey
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {bio.intro}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
              <p className="text-gray-200 text-lg">
                I regularly share my insights and experiences on my{" "}
                <Link 
                  to={bio.blogLink} 
                  className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors duration-300"
                >
                  blog
                </Link>
                , where I discuss everything from technical deep dives to lessons
                learned in development and marketing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Work <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Building amazing products and solving complex challenges
          </p>
        </div>

        <div className="space-y-6">
          {workExperiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline line */}
              {index !== workExperiences.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 -z-10"></div>
              )}
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-[1.02] group-hover:border-blue-500/30">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <ThunderboltOutlined className="text-white text-lg" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
                          {exp.company}
                        </span>
                        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-600">
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {exp.responsibilities.map((task, i) => (
                        <li key={i} className="flex items-start space-x-3 text-gray-200">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-center shadow-2xl">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life with cutting-edge technology and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start a Project
            </Link>
            <Link 
              to="/projects" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default About;
