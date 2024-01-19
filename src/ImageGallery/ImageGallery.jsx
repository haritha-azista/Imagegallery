import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import './Image.css'

const ImageGallery = () => {
  const fileInputRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUploadFiles = (event) => {
    const files = event.target.files;
    setImageFiles(Array.from(files));
    setCurrentIndex(0);
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageFiles.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((nextIndex) => (nextIndex === imageFiles.length - 1 ? 0 : nextIndex + 1));
  };

  const handleImageShow = (index) => {
    setCurrentIndex(index);
  };

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
            multiple
          />
        </div>
        <Button
          variant='info'
          size='sm'
          className='uploadButton'
          onClick={() => fileInputRef.current.click()}
        >
          Upload
        </Button>
        <br />
        <div className='imageGalleryContainer'>
          <div className='imageListC'>
            <h6 className='ImgListHeading'>Images</h6>
            {imageFiles.map((file, index) => (
              <div key={index}>
                <p
                  className='imageList'
                  style={{ fontSize: 'small' }}
                  onClick={() => handleImageShow(index)}
                >
                  {file.name}
                </p>
              </div>
            ))}
          </div>
          <div className='ImageSlideContainer'>
            <Button
              as="input"
              type="button"
              value="<"
              size='sm'
              variant="secondary"
              style={{ marginRight: '10px' }}
              onClick={previousSlide}
            />
            {imageFiles.length > 0 && (
              <img
                src={URL.createObjectURL(imageFiles[currentIndex])}
                alt={imageFiles[currentIndex].name}
                width='70%'
                height='50%'
              />
            )}
            <Button
              as="input"
              type="button"
              value=">"
              size='sm'
              variant="secondary"
              style={{ marginLeft: '10px' }}
              onClick={nextSlide}
            />
            <p>{currentIndex + 1}/{imageFiles.length}</p>
            {imageFiles.length > 0 && (
              <p>{imageFiles[currentIndex].name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
