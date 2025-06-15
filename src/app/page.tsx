"use client";

import StoryCard from '@/Components/card';
import { useEffect, useState } from 'react';
import './globals.css';
import { fetchStories } from './lib/fetchStories';

interface Story {
  _id: string;
  title: string;
  author: string;
  slug: string;
  snippet: string;
}

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStories()
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load stories');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main className="min-h-screen w-full bg-red-900">
        <div id="text" className="h-full w-full p-3 flex flex-col justify-around items-center sm:text-1xl md:text-2xl lg:text-3xl 2xl:text-4xl gap-4">
          <h2 className="font-bold text-yellow-500">Hello Reader!</h2>
          <p className="text-bold underline text-yellow-300 italic">Here are some best horror stories wrote by Ahum</p>
        </div>
        {loading && <div className="text-center text-yellow-200">Loading...</div>}
        {error && <div className="text-center text-red-400">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 justify-center p-6 w-full">
          {stories.slice(0, 7).map((story) => (
            <StoryCard
              key={story.slug}
              title={story.title}
              author={story.author}
              snippet={story.snippet}
              slug={story.slug}
            />
          ))}
        </div>
      </main>
      <footer className="w-full h-full flex-col gap-2 items-center p-2 justify-around bg-red-800">
        <p className="text-yellow-300 font-medium italic">This website was created on father&apos;s day , happy father&apos;s day 2025!</p>
        <p className="text-yellow-400 font-bold">&copy;Copyright by Ahum Maitra. All rights reserved by Ahum Maitra</p>
      </footer>
    </>
  );
}
