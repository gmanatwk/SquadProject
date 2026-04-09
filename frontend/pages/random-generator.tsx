import dynamic from 'next/dynamic';
const RandomGeneratorPage = dynamic(() => import('../src/pages/RandomGeneratorPage'), { ssr: false });

export default RandomGeneratorPage;
