'use client'
import * as React from 'react'
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/canvas/App').then((mod) => mod.App), {
  ssr: false,
});

interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}


export default function HomePage({ searchParams }: HomePageProps) {
  return <React.Suspense><App /></React.Suspense>
}