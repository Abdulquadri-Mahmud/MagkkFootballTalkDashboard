import React, { useState } from 'react'

export default function Image() {
      const [base64, setBase64] = useState("");
      const [fileName, setFileName] = useState("");
    
      const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
          setFileName(file.name); // Save file name
          const reader = new FileReader();
    
          // Convert image to Base64 string
          reader.onload = () => {
            setBase64(reader.result); // Set Base64 string
          };
    
          reader.readAsDataURL(file); // Read the file as a Data URL
        }
      };

      // console.log(fileName);
      console.log(base64);
      
    
      return (
        <div>
          <h2>Image to Base64 Converter</h2>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {base64 && (
            <div><br />
              <h4>File Name: {fileName}</h4><br />
              <textarea
                rows="10"
                cols="50"
                value={base64}
                readOnly
                style={{ width: "100%" }}
              />
            </div>
          )}
          <img src={base64} alt="Preview" style={{ maxWidth: "100%", marginTop: "10px" }} />
        </div>
      );
}
