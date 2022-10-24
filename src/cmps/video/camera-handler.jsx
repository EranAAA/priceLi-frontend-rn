import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import { useContext } from "react"
import { StoreContext } from "../../App"

import Quagga from '@ericblade/quagga2';

import { utilService } from '../../services/util.service'

export const CameraHandler = ({ getFilterdPrices }) => {

   const priceStore = useContext(StoreContext)
   const listItemsCode = priceStore.getItemsCodeList

   const navigate = useNavigate()

   const [videoInit, setVideoInit] = useState(false);
   const [videoError, setVideoError] = useState(false);
   const [isCameraSupported, setCameraSupported] = useState(false);
   const [isCameraEnabled, setCameraEnabled] = useState(false);
   const [code, setCode] = useState('');
   const [codeForDisplay, setCodeForDisplay] = useState(0);
   const [codeAccurate, setCodeAccurate] = useState(0);

   useEffect(() => {
      if (isCameraPermissionGranted) {
         setCameraSupported(true);
      } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia({ audio: false, video: true })) {
         setCameraSupported(true);
      }
      cameraPermissionGranted()
      setCameraEnabled(true);

      return () => {
         setCameraEnabled(false)
      }
   }, [])

   useEffect(() => {
      console.log(code);
      if (code) {
         getFilterdPrices({ priceNumber: code })
         navigate(`/item/${code}`)
      }
   }, [code])

   useEffect(() => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
         Quagga.init({
            inputStream: {
               name: "Live",
               type: "LiveStream",
               target: document.querySelector('#video')
            },
            numOfWorkers: 1,
            locate: true,
            halfSample: true,
            patchSize: "small", // x-small, small, medium, large, x-large

            decoder: {
               readers: ['ean_reader', 'code_128_reader', 'ean_8_reader']
            }
         }, (err) => {

            if (err) {
               setVideoError(true);
               return;
            }
            onInitSuccess();
         });
         Quagga.onDetected(onDetected);
         return () => Quagga.stop();
      }
      return undefined;
   }, []);

   const onInitSuccess = () => {
      Quagga.start();
      setVideoInit(true);
   }

   const onDetected = (result) => {
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);

      console.log('********************************');
      console.log(`Quagga is at least ${(1 - err).toFixed(2)}% certain that it read correctly with the code ${result.codeResult.code}`);
      console.log('********************************');

      setCodeAccurate((1 - err).toFixed(2) * 100)
      setCodeForDisplay(result.codeResult.code)

      const isInCodeList = utilService.getBinarySearch(listItemsCode, parseInt(result.codeResult.code), 0, listItemsCode.length - 1)
      // console.log(isInCodeList);
      // const codeCheck = result.codeResult.code
      // console.log('********************************');
      // console.log('barcode', result.codeResult.code);
      // console.log('number', codeCheck.slice(0, 3));
      // console.log('length', codeCheck.length);
      // console.log('********************************');

      // if (codeCheck.length === 13 && codeCheck.slice(0, 3) === '729') {
      // if ((1 - err) >= 0.90) {
      //    Quagga.offDetected(onDetected);
      //    setCode(result.codeResult.code)
      //    setCameraEnabled(false)
      // }

      if (isInCodeList) {
         Quagga.offDetected(onDetected);
         setCode(result.codeResult.code)
         setCameraEnabled(false)
      }
   }

   const cameraPermissionGranted = () => {
      localStorage.setItem('CAM_PERMISSION', 'true');
   }

   const isCameraPermissionGranted = () => {
      return localStorage.getItem('CAM_PERMISSION') !== null;
   }

   const getMedianOfCodeErrors = (decodedCodes) => {
      const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
      const medianOfErrors = getMedian(errors);
      return medianOfErrors;
   }

   const getMedian = (arr) => {
      arr.sort((a, b) => a - b);
      const half = Math.floor(arr.length / 2);
      if (arr.length % 2 === 1) {
         return arr[half];
      }
      return (arr[half - 1] + arr[half]) / 2;
   }

   console.log('code', code);

   return (
      <>
         <div className="video-container">
            {!videoError && <div className="video" id="video" />}
         </div>

         <div className='code'>
            <span>ברקוד:</span>
            <div >{`${codeForDisplay} עם דיוק של ${codeAccurate}%`}</div>
         </div>

      </>

   );
}
