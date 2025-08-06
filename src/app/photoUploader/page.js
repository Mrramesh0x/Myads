"use client";
import React, { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const PhotoUploader = ({ onUpload }) => {
  const [images, setImages] = useState(Array(20).fill(null));
    const [files, setFiles] = useState([]);


  const fileInputRefs = useRef([]);




  const handleImageSelect = (index, e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    onUpload(selected);
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = reader.result;
      setImages(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  const handleBoxClick = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array(20).fill(null);
    const nonNullImages = images.filter((img) => img !== null);

    const dragged = nonNullImages[result.source.index];
    nonNullImages.splice(result.source.index, 1);
    nonNullImages.splice(result.destination.index, 0, dragged);

    for (let i = 0; i < nonNullImages.length; i++) {
      reorderedImages[i] = nonNullImages[i];
    }

    setImages(reorderedImages);
  };

  return (
    <div>
      <p className="upload-label">Upload up to 20 photos</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="photos" direction="horizontal">
          {(provided) => (
            <div
              className="photo-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((img, index) => (
        <Draggable
  key={index}
  draggableId={`img-${index}`}
  index={index}
  isDragDisabled={!img}
>
  {(provided, snapshot) => (
    <div
      className={`photo-box ${snapshot.isDragging ? "dragging" : ""}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => handleBoxClick(index)}
    >
      <div className="photo-box-content">
        {img ? (
          <>
            <img
              src={img}
              alt={`Uploaded ${index + 1}`}
              className="uploaded-image"
            />
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
            >
              ✕
            </button>
            {index === 0 && <div className="cover-label">Cover</div>}
          </>
        ) : (
          <span className="plus-sign">+</span>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={(el) => (fileInputRefs.current[index] = el)}
          onChange={(e) => handleImageSelect(index, e)}

        />
      </div>
    </div>
  )}
</Draggable>

              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PhotoUploader;
