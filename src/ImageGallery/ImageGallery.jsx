import React, { useState } from 'react'
import './Image.css'
import { Button } from 'react-bootstrap'
import { useRef } from 'react';
const ImageGallery = () => {

  const fileInputRef = useRef(null);
  const [imageFile, setimageFile] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageNO, setImageNo] = useState(1);
  var imageArray = [];

  const handleUploadFiles = () => {
    const files = fileInputRef.current.files;
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      imageArray.push(files[i]);
    }
    console.log(imageArray);
    setimageFile(imageArray);
  };
  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1));
    console.log(imageFile[currentIndex]);
    setImageNo((currentIndex))
  };

  const nextSlide = () => {
    setCurrentIndex((nextIndex) => (nextIndex === imageArray.length - 1 ? 0 : nextIndex + 1));
    setImageNo(currentIndex + 2);
  };

  const handleImageshow = (i) => {
    setCurrentIndex(i);
    setImageNo(i + 1);
  }

  return (
    <div>
      <div className='mainContainer'>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            webkitdirectory="true"
            onChange={handleUploadFiles}
            style={{ display: 'none' }}
          />
        </div>
        <Button variant='info' size='sm' className='uploadButton' onClick={() => fileInputRef.current.click()}>Upload</Button>
        <br />
        <div className='imageGalleryContainer'>

          <div className='imageListC'>
            <h6 className='ImgListHeading'>Images</h6>
            {imageFile.map((File, index) => (
              <div key={index}>
                <p className='imageList' style={{ fontSize: 'small' }} onClick={() => { handleImageshow(index) }}>{File.name}</p>
              </div>
            ))}
          </div>

          <div className='ImageSlideContainer'>
           
            <Button as="input" type="button" value="<" size='sm' variant="secondary"
              style={{ marginRight: '10px' }}
              onClick={() => { previousSlide() }}
            />

            {imageFile.length > 0 && (
              <img
                src={`static/media/ImageFolder/${imageFile[currentIndex].webkitRelativePath}`}
                alt={imageFile[currentIndex].name}
                width='70%'
                height='50%'
              />
            )}

            <Button as="input" type="button" value=">" size='sm' variant="secondary"
              style={{ marginLeft: '10px' }}
              onClick={() => { nextSlide() }}
            />

            <p>{imageNO}/{imageFile.length}</p>

            {imageFile.length > 0 && (
              <p>{imageFile[currentIndex].name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery