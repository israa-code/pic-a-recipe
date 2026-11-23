import { useEffect, useRef, useState} from 'react';

const describeError = (error) => {
  switch (error?.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Camera permission was blocked. Allow camera access in your browser settings, then try again.';
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return 'No camera was found on this device.';
    case 'NotReadableError':
    case 'TrackStartError':
      return 'The camera is being used by another app. Close it and try again.';
    default:
      return 'Could not start the camera.'
  }
};

//Show live camera feed
const CameraCapture = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(true); 

  useEffect(() => {
    let stream;
    let cancelled = false;

    const start = async () => {
      //insecure context, exiting early, avoid registering the camera
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('Try opening this page in Chrome or Safari.');
        setStarting(false);
        return; 
      }

      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' } 
        });

        //cleanup already ran before stream arrived, so stop the tracks  
        if (cancelled) { 
          s.getTracks().forEach((track) => track.stop());
          return;
        }

          stream = s;
          videoRef.current.srcObject = s;
        } catch (error) {
          console.error('Camera error:', error.name, error.message);
          if (!cancelled) setError(describeError(error));
        } finally {
          if (!cancelled) setStarting(false);
        }
    }

    start();
    
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

    return (
      <div>
        <video ref={videoRef} autoPlay playsInline muted />
        {starting && !error && <p>Starting Camera...</p>}
        {error && <p role='alert'>{error}</p>}
      </div>
  );
};

export default CameraCapture;
