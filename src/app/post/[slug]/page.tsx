import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

// ✅ Must be async for Next.js App Router dynamic pages
export default async function PostPage({ params }: Props) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src/app/stories', `${slug}.md`);

  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  return (
    <main className="min-h-screen w-full bg-black text-white p-8 flex flex-col items-center">
      <article className="prose prose-invert max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-red-500 mb-2">{data.title}</h1>
        <h2 className="text-lg text-red-300 mb-4">By {data.author}</h2>
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </main>
  );
}
