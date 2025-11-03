import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { AppstoreOutlined, AudioOutlined } from '@ant-design/icons';
import BlogDetails from './BlogDetails';


const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const BlogPage = () => {
  return (
    <Layout>
      <Header className="bg-gray-50 flex items-center">
        <div className="text-black font-semibold text-2xl mx-auto">Articles</div>
      </Header>
      <Layout>
        <Content className="bg-black text-white p-8">
          <h1 className="text-white font-bold underline decoration-red-500">Articles</h1>
          <p className="text-white mt-4">
            This page shares a summary of our Wednesday's podcast, featuring the brightest
            business minds in Ethiopia. Learn what it takes to build a great company from
            the most successful entrepreneurs who are changing the face of Ethiopia!
          </p><br/><br/><br/><br/>
          <ArticleDetails/>
        </Content>
        <Sider width={200} height={100} className="bg-black p-4">
          <div className="text-white mb-4">
            <div className="font-bold mb-2">Categories</div>
            <Button
              type="default"
              icon={<AppstoreOutlined />}
              className="w-full mb-2 text-white bg-gray-800 border-none hover:bg-gray-700"
            >
              Business
            </Button>
            <Button
              type="default"
              icon={<AudioOutlined />}
              className="w-full text-white bg-gray-800 border-none hover:bg-gray-700"
            >
              Podcast
            </Button>
          </div>
          <hr/>
          <div className="p-4 text-white">
            <div className="font-bold">Tags</div>
            <div className="flex space-x-2 mt-2">
              <div className="bg-gray-700 px-2 py-1 rounded">Business</div>
              <div className="bg-gray-700 px-2 py-1 rounded">Podcast</div>
            </div>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default BlogPa