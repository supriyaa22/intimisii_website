
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";

// Breadcrumb component
const ArticleBreadcrumb = () => {
  return (
    <Breadcrumb className="mb-12">
      <BreadcrumbList className="text-gray-500">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="hover:text-[#C9AD7E]">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/blog" className="hover:text-[#C9AD7E]">Blog</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-white font-medium">
            The Art Of Candle Burning
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Circular number component
const NumberCircle = ({ number }: { number: number }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#161616] text-[#C9AD7E] font-serif mr-6">
      <span className="text-xl">{number}</span>
    </div>
  );
};

const ArticleDetail = () => {
  const { slug } = useParams();
  
  // For simplicity in this implementation we're just rendering the candle burning article
  // In a more complex implementation, you would fetch the article data based on the slug

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] bg-opacity-90 bg-[url('/lovable-uploads/3f7fadb9-649e-4d7f-b636-4bae9d7d34f9.png')] bg-blend-overlay">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ArticleBreadcrumb />
          
          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center mb-12">
            The Art Of <span className="text-[#C9AD7E]">Candle Burning</span>
          </h1>
          
          {/* Hero Image with Gold Border */}
          <div className="mb-12 mx-auto p-1 border border-[#C9AD7E]/70 max-w-3xl">
            <img 
              src="/lovable-uploads/41b4dcd0-4a0d-4d31-b3e3-feb5395ecae6.png"
              alt="The Art Of Candle Burning" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Introduction Paragraph */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-gray-400 leading-relaxed font-serif tracking-wide text-lg">
              Luxury candles are more than just decorative accents they create an ambiance, <span className="text-[#C9AD7E] font-medium">evoke emotions</span>, and infuse spaces with <span className="text-[#C9AD7E] font-medium">captivating fragrances</span>. To fully enjoy the experience, it's essential to <span className="text-[#C9AD7E] font-medium">burn them correctly</span>. Here's how to ensure your luxury candles burn beautifully and last longer.
            </p>
          </div>
          
          {/* Tips Section */}
          <div className="space-y-10 max-w-3xl mx-auto">
            {/* Tip 1 */}
            <div className="flex">
              <NumberCircle number={1} />
              <div>
                <h3 className="text-white font-serif text-xl mb-2">The First Burn:</h3>
                <p className="text-gray-400 leading-relaxed">
                  Setting the foundation. The first time you light your candle is crucial. Allow it to burn until the entire surface melts into a full, even wax pool. This prevents tunneling, where wax builds up around the wick, reducing the burn time and fragrance throw.
                </p>
              </div>
            </div>
            
            {/* Tip 2 */}
            <div className="flex">
              <NumberCircle number={2} />
              <div>
                <h3 className="text-white font-serif text-xl mb-2">Trimming the Wick:</h3>
                <p className="text-gray-400 leading-relaxed">
                  The key to a Clean Burn Before each use, trim the wick to about 1/4 inch (6 mm). A properly trimmed wick ensures a steady flame, reduces soot, and prevents excessive flickering or smoking. Long or untrimmed wicks can create an uneven burn and leave black residue on the container.
                </p>
              </div>
            </div>
            
            {/* Tip 3 */}
            <div className="flex">
              <NumberCircle number={3} />
              <div>
                <h3 className="text-white font-serif text-xl mb-2">Burn Time:</h3>
                <p className="text-gray-400 leading-relaxed">
                  Finding the Balance In Luxury candles should ideally burn for 2-4 hours at a time. Burning too briefly can cause tunneling, while burning for more than four hours may overheat the wax, leading to an uneven burn and potential safety hazards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
