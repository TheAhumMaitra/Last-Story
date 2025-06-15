import fs from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const storiesDir = path.join(process.cwd(), 'src/app/stories');
  const files = fs.readdirSync(storiesDir);
  return files.map((file) => ({ slug: file.replace(/\.md$/, '') }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
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
