
import React from 'react';
import { Button } from './ui/button';

interface BlogPostProps {
  image: string;
  title: string;
  description: string;
  titleHighlight: string;
  isReversed?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({
  image,
  title,
  description,
  titleHighlight,
  isReversed = false
}) => {
  // Split the title around the highlighted portion
  const titleParts = title.split(titleHighlight);
  const beforeHighlight = titleParts[0];
  const afterHighlight = titleParts[1] || '';

  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
      <div className="w-full md:w-1/2">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover rounded-sm"
        />
      </div>
      
      <div className="w-full md:w-1/2 text-left md:px-4">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-playfair text-white leading-tight mb-4">
          {beforeHighlight && <span>{beforeHighlight}</span>}
          {titleHighlight && <span className="text-[#C9AD7E]">{titleHighlight}</span>}
          {afterHighlight && <span>{afterHighlight}</span>}
        </h3>
        
        <p className="text-gray-400 font-montserrat mb-8 leading-relaxed">
          {description}
        </p>
        
        <Button variant="outline" className="border-[#C9AD7E] text-[#C9AD7E] hover:bg-[#C9AD7E]/10 hover:text-[#C9AD7E] transition-all duration-300">
          Read Article
        </Button>
      </div>
    </div>
  );
};

export default BlogPost;
