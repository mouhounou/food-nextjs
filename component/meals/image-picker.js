"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

function ImagePicker({ label, name }) {
   const imageInputRef = useRef();
   const [pickedPic, setPickedPic] = useState();

   function handlePickClick() {
		imageInputRef.current.click();
   }

   function handleImageChange(event) {
		const file = event.target.files[0];

		if (!file) {
			setPickedPic(null);
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = () => {
			setPickedPic(fileReader.result);
		};

		fileReader.readAsDataURL(file);
   }
 

   return (
      <div className={classes.picker}>
         <label htmlFor={name}>{label}</label>
         <div className={classes.controls}>
         <div className={classes.preview}>
            {!pickedPic && <p>No image picked yet</p>}
            {pickedPic && (
               <Image
               src={pickedPic}
               alt="The image selected by the user"
               fill
               />
            )}
         </div>

         <input
            className={classes.input}
            type="file"
            id={name}
            accept="image/png, image/jpeg, image/jpg"
            name={name}
            ref={imageInputRef}
            onChange={handleImageChange}
            required
         />
         <button
            className={classes.button}
            type="button"
            onClick={handlePickClick}
         >
            Pick an image
         </button>
         </div>
      </div>
   );
}

export default ImagePicker;