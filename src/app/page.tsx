'use client'
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/canvas/App').then((mod) => mod.App), {
  ssr: false,
});

export default function HomePage() {
  return <App />
}