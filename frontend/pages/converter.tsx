import dynamic from 'next/dynamic';
const Converter = dynamic(() => import('../src/pages/Converter'), { ssr: false });

export default Converter;
