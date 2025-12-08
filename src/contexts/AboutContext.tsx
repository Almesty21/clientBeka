import { useEffect,createContext, useContext, ReactNode } from 'react';
import { Bio, WorkExperience } from '../types';
import { GetAbout } from '../services/about';

interface AboutContextType {
  bio: Bio;
  workExperiences: WorkExperience[];
  loading: boolean;
  error: string | null;
  refetchAbout: () => Promise<void>;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

// Fallback data
const fallbackBio: Bio = {
  name: "Dear",
  intro: `Hi there! Thanks for stopping by. I'm Dear, a software engineer, tech enthusiast, 
          and product creator with a passion for building innovative tools and solutions. 
          With experience across a wide range of technologies, I've worked on projects of 
          all sizes, from small prototypes to large-scale systems.`,
  blogLink: "#",
};

const fallbackWorkExperiences: WorkExperience[] = [
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
    duration: "April 2024 - Present",
    responsibilities: [
      "Designed and implemented scalable software solutions.",
      "Participated in code reviews and mentored junior developers.",
      "Built microservices architecture handling 10K+ daily requests",
    ],
  },
];

// Create fallback context value
const fallbackContextValue: AboutContextType = {
  bio: fallbackBio,
  workExperiences: fallbackWorkExperiences,
  loading: false,
  error: null,
  refetchAbout: async () => {
    console.log('Refetch called but no provider available');
  },
};

interface AboutProviderProps {
  children: ReactNode;
}

export const AboutProvider: React.FC<AboutProviderProps> = ({ children }) => {
  const [bio, setBio] = React.useState<Bio>(fallbackBio);
  const [workExperiences, setWorkExperiences] = React.useState<WorkExperience[]>(fallbackWorkExperiences);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const refetchAbout = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetAbout();
      const aboutData = Array.isArray(data) ? data[0] : data;

      if (aboutData?.bio) {
        setBio(aboutData.bio);
      }
      if (aboutData?.workExperiences) {
        setWorkExperiences(aboutData.workExperiences);
      }
    } catch (err) {
      setError('Failed to fetch about data');
      console.error('Failed to fetch About data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchAbout();
  }, []);

  const value = {
    bio,
    workExperiences,
    loading,
    error,
    refetchAbout,
  };

  return (
    <AboutContext.Provider value={value}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = (): AboutContextType => {
  const context = useContext(AboutContext);
  
  // Return fallback if no provider is found
  if (context === undefined) {
    console.warn('useAbout used without AboutProvider. Using fallback data.');
    return fallbackContextValue;
  }
  
  return context;
};