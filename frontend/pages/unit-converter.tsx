import dynamic from 'next/dynamic';
const UnitConverterPage = dynamic(() => import('../src/pages/UnitConverterPage'), { ssr: false });

export default UnitConverterPage;
