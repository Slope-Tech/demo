import Overlay from './Overlay';
import SlopeFinanceProgram from './SlopeFinanceProgram';


const SvgComponent = () => {
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
        {/* href to point to the screenshot of the website you're demo'ing*/}
      <image href="background.png" x="0" y="0" width="1920" height="1080" />
      
      {/* White background rectangle that covers the center of the page */}
      <rect x="0" y="140" width="1920" height="750" fill="#ffffff" fillOpacity="1" />
    </svg>
  );
};

export default SvgComponent;