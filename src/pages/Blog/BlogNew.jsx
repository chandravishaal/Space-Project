import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/common/PageWrapper';
import blogPosts from '../../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.id === slug);

  return (
    <PageWrapper>
      <section className="py-20 px-6 max-w-3xl mx-auto text-blue-400">
        {post ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-300">{post.content}</p>
          </>
        ) : (
          <p className="text-red-400">Post not found.</p>
        )}
      </section>
    </PageWrapper>
  );
};

export default BlogPost;
