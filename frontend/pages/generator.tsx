import dynamic from 'next/dynamic';
const Generator = dynamic(() => import('../src/pages/Generator'), { ssr: false });

export default Generator;
