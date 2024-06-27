import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import './WebcamCapture.css';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [text, setText] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  useEffect(() => {
    const recognizeText = async () => {
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const screenshot = webcamRef.current.getScreenshot();
        const cropped = await cropImage(screenshot, { x: 200, y: 240, width: 300, height: 50 }); // Adjust coordinates based on your image
        setCroppedImage(cropped);

        Tesseract.recognize(
          cropped,
          'eng',
          {
            logger: (m) => console.log(m),
          }
        ).then(({ data: { text } }) => {
          const name = extractName(text);
          setText(name);
          fetchTimeSlot(name);
        }).catch(err => {
          console.error('Error recognizing text:', err);
        });
      }
    };

    const interval = setInterval(recognizeText, 5000); 

    return () => clearInterval(interval);
  }, []);

  const cropImage = (base64Image, crop) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = base64Image;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
        resolve(canvas.toDataURL('image/jpeg'));
      };
    });
  };

  const extractName = (text) => {
    return text.trim();
  };

  const fetchTimeSlot = (name) => {
    const url = `https://nms-cafeteria-management-system.onrender.com/getTimeSlot?q=${encodeURIComponent(name)}`;
    axios.get(url)
      .then(response => {
        console.log(response);
        if (response.data.success) {
          setTimeSlot(response.data.message);
        } else {
          setTimeSlot('No available time slot found.');
        }
      })
      .catch(error => {
        console.error('Error fetching time slot:', error);
        setTimeSlot('Error fetching time slot.');
      });
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <div>
        <h2>Detected Name:</h2>
        <div>{text}</div>
      </div>
      <div>
        <h2>Assigned Time Slot:</h2>
        <div>{timeSlot}</div>
      </div>
    </div>
  );
};

export default WebcamCapture