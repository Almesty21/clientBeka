import { useState } from "react";
import { Button, Typography, Divider } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import RecentBlogs from "./RecentBlogs";

const { Paragraph, Text } = Typography;

interface ReadMoreProps {
  children: string;
  maxLength?: number;
  showRecentBlogs?: boolean;
  blogId?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ 
  children, 
  maxLength = 300,
  showRecentBlogs = true,
  blogId 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fixed: Handle null/undefined children
  const safeChildren = children || '';
  const needsTruncation = safeChildren.length > maxLength;
  
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Fixed: Better text truncation logic
  const displayText = isExpanded 
    ? safeChildren 
    : needsTruncation 
      ? `${safeChildren.slice(0, maxLength).trim()}...` 
      : safeChildren;

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Content Section */}
      <div style={{ marginBottom: showRecentBlogs ? 32 : 0 }}>
        <Paragraph 
          style={{ 
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: '#333',
            marginBottom: 16,
            whiteSpace: 'pre-line',
            wordBreak: 'break-word' // Fixed: Better text wrapping
          }}
        >
          {displayText}
        </Paragraph>

        {needsTruncation && (
          <div style={{ textAlign: 'left' }}> {/* Fixed: Better button alignment */}
            <Button
              type="link"
              onClick={toggleReadMore}
              icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
              style={{ 
                padding: 0,
                height: 'auto',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#1890ff' // Fixed: Consistent link color
              }}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </Button>
          </div>
        )}
      </div>

      {/* Recent Blogs Section */}
      {showRecentBlogs && (
        <>
          <Divider style={{ margin: '32px 0' }} /> {/* Fixed: Better spacing */}
          <div style={{ marginTop: 24 }}>
            <Text 
              strong 
              style={{ 
                fontSize: '1.2rem', 
                marginBottom: 16, 
                display: 'block',
                color: '#1f1f1f' // Fixed: Better contrast
              }}
            >
              Recent Blogs
            </Text>
            <RecentBlogs 
              currentBlogId={blogId} 
              limit={3} // Fixed: Added reasonable limit
              showImages={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReadMore;