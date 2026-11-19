import { useEffect, useRef} from 'react';

//Show live camera feed
const CameraCapture = () => {

  const videoRef = useRef(null);

  useEffect(() => {
  
    let stream;
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } }) 
      .then((s) => {
        //cleanup already ran before stream arrived, so stop the tracks  
        if (cancelled) { 
          s.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = s;
        videoRef.current.srcObject = s;
      })
      .catch((err) => 
        console.error('Camera error:', err.name, err.message)
      );
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());}

  }, []);
    return (
      <div>
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
  );
}

export default CameraCapture;
