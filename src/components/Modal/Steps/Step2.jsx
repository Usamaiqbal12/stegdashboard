import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { useFormContext } from 'react-hook-form';

function Step2(props) {
  const {
    register,
    // formState: { isDirty },
    errors,
  } = useFormContext();
  const [selectedImages, setSelectedImages] = useState([]);

  const imageHandleChange = (e) => {
    // console.log(e.target.files)

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);

      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const removeMe = (source, e) => {
    e.preventDefault();
    // console.log();
    setSelectedImages(
      selectedImages.filter((preSource) => preSource !== source)
    );
  };
  const renderPhotos = (source) => {
    return source.map((photo, ind) => {
      return (
        <div className="images-div">
          <img src={photo} key={photo} alt={'preview' + ind} />
          <button className="del-btn" onClick={(e) => removeMe(photo, e)}>
            {' '}
            X
          </button>
        </div>
      );
    });
  };

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <div className="step2">
      <p className="step2-p1">Upload an image of your product</p>
      <div
        className="file-upload-div"
        style={{ height: selectedImages.length === 0 ? '100%' : '50%' }}
      >
        <label
          htmlFor="file"
          className="custom-file-upload"
          style={{
            backgroundColor:
              selectedImages.length === 0 ? '#f5f5f5' : '#fef3ea',
            border:
              selectedImages.length === 0
                ? '1px dashed  #bababa'
                : ' 1px dashed #0060f0     ',
          }}
        >
          <p>
            <FontAwesomeIcon icon={faPaperclip} />
            <span>Browse files</span> or drop files here
          </p>

          <p className="step2-p2"> Supports:PNG</p>
          <input
            className="form-control"
            id="file"
            name="myImage"
            ref={register({ required: true })}
            type="file"
            accept="image/png"
            multiple
            placeholder="Enter username"
            onChange={imageHandleChange}
          />
          {errors.myImage && errors.myImage.type === 'required' && (
            <span>This is required</span>
          )}
        </label>
      </div>

      <div className="images">{renderPhotos(selectedImages)}</div>
    </div>
  );
}
export { Step2 };
