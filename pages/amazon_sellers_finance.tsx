import Head from 'next/head';
import SvgComponent from '../components/rfp_demo_svg_viewbox_components/SvgComponent';

const FinanceDemo: React.FC = () => {
  return (
    <>
      <Head>
        <title>Amazon Sellers Finance</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <SvgComponent />
      </div>
    </>
  );
};

export default FinanceDemo;