import { useState, useEffect } from 'react';
import SvgComponent from '../components/rfp_demo_svg_viewbox_components/SvgComponent';
import Overlay from '../components/rfp_demo_svg_viewbox_components/Overlay';
import SlopeFinanceProgram from '../components/rfp_demo_svg_viewbox_components/SlopeFinanceProgram';

const OverlayPage: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(true); // Show overlay immediately
  }, []);

  return (
    <>
      {showOverlay && (
        <>
          {/* Full-Screen Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#FFFFFF', // Adjust background color
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgComponent />
          </div>

          {/* Floating Overlay Content */}
          <Overlay>
            
          </Overlay>
        </>
      )}
    </>
  );
};

export default OverlayPage;