import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { AppstoreOutlined, AudioOutlined } from '@ant-design/icons';
import BlogDetails from './BlogDetails';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

export const BlogPage = () => {
  // You could add state for active categories/tags
  // const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'business', label: 'Business', icon: <AppstoreOutlined /> },
    { key: 'podcast', label: 'Podcast', icon: <AudioOutlined /> },
  ];

  const tags = ['Business', 'Podcast', 'Entrepreneurship', 'Ethiopia'];

  return (
    <Layout className="min-h-screen">
      <Header className="bg-gray-50 flex items-center px-4">
        <Title level={2} className="mx-auto mb-0 text-gray-900">
          Blogs
        </Title>
      </Header>
      
      <Layout>
        <Content className="bg-black text-white p-6 md:p-8">
          <div className="max-w-4xl">
            <Title 
              level={1} 
              className="text-white font-bold relative pb-2 mb-4"
              style={{
                textDecoration: 'none',
              }}
            >
              Blogs
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-red-500"></div>
            </Title>
            
            <Paragraph className="text-gray-300 text-lg leading-relaxed mb-8">
              This page shares a summary of our Wednesday's podcast, featuring the brightest
              business minds in Ethiopia. Learn what it takes to build a great company from
              the most successful entrepreneurs who are changing the face of Ethiopia!
            </Paragraph>
            
            <BlogDetails />
          </div>
        </Content>
        
        <Sider 
          width={280} 
          className="bg-gray-900 p-6 hidden lg:block"
          breakpoint="lg"
          collapsedWidth="0"
        >
          {/* Categories Section */}
          <div className="mb-8">
            <Title level={4} className="text-white mb-4 font-semibold">
              Categories
            </Title>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  type="default"
                  icon={category.icon}
                  className="w-full text-left text-white bg-gray-800 border-none hover:bg-gray-700 hover:text-white h-auto py-3 flex items-center"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          
          <hr className="border-gray-700 my-6" />
          
          {/* Tags Section */}
          <div>
            <Title level={4} className="text-white mb-4 font-semibold">
              Tags
            </Title>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-600 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
};

 