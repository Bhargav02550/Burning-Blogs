// // src/components/BlogEditor.jsx
// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "../../assets/scss/Themes/blogEditor.scss";

// const BlogEditor = () => {
//   const [editorHtml, setEditorHtml] = useState("");
//   const [tittle, settittle] = useState("Tittle");

//   const handleChange = (html) => {
//     setEditorHtml(html);
//   };

//   return (
//     <div className="Mde-Editor-container">
//       <div className="Blogtittle">
//         <input
//           type="text"
//           placeholder={tittle === "" ? "Tittle" : tittle}
//           onChange={(e) => settittle(e.target.value)}
//         />
//       </div>
//       <ReactQuill
//         value={editorHtml}
//         onChange={handleChange}
//         modules={BlogEditor.modules}
//         formats={BlogEditor.formats}
//         placeholder="Start writing something awesome..."
//       />
//       <div>
//         {/* <h3>Output:</h3> */}
//         {/* <div dangerouslySetInnerHTML={{ __html: editorHtml }} /> */}
//       </div>
//     </div>
//   );
// };

// const imageHandler = () => {
//   const input = document.createElement("input");
//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "image/*");
//   input.click();

//   input.onchange = async () => {
//     const file = input.files[0];
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("/api/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const publicUrl = response.data.url;
//       const quill = quillRef.current.getEditor(); // Correctly get the Quill instance
//       const range = quill.getSelection();
//       quill.insertEmbed(range.index, "image", publicUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };
// };

// BlogEditor.modules = {
//   toolbar: [
//     [{ header: "1" }],
//     ["bold", "italic", "underline"],
//     ["link", "image"],
//   ],
// };

// BlogEditor.formats = [
//   "header",
//   "font",
//   "list",
//   "bullet",
//   "bold",
//   "italic",
//   "underline",
//   "link",
//   "image",
//   "align",
//   "clean",
// ];

import React, { useState, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "../../assets/scss/blogEditor.scss";

const BlogEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [title, setTitle] = useState("Title");
  const quillRef = useRef(null);

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:4050/api/upload_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload response:", response.data);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const url = await uploadImage(file);
      console.log("Image URL:", url);
      if (url && quillRef.current) {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", url);
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }],
        ["bold", "italic", "underline"],
        ["link", "image"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    "header",
    "font",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "align",
    "clean",
  ];

  return (
    <div className="Mde-Editor-container">
      <div className="BlogTitle">
        <input
          type="text"
          value={title === "Title" ? "" : title}
          onChange={handleTitleChange}
          placeholder={title === "" ? "Title" : title}
        />
      </div>
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Start writing something awesome..."
      />
    </div>
  );
};

export default BlogEditor;

// export default BlogEditor;
// import React, { useRef } from "react";
// import Quill from "quill";
// import ImageUploader from "quill-image-uploader";
// import "quill-image-uploader/dist/quill.imageUploader.min.css";

// Quill.register("modules/imageUploader", ImageUploader);

// const QuillEditor = () => {
//   const editorRef = useRef(null);

//   React.useEffect(() => {
//     if (editorRef.current) {
//       const quill = new Quill(editorRef.current, {
//         theme: "snow",
//         modules: {
//           toolbar: [
//             [{ header: "1" }, { header: "2" }],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["bold", "italic", "underline"],
//             ["link", "image"],
//             [{ align: [] }],
//             [{ color: [] }, { background: [] }],
//           ],
//           imageUploader: {
//             upload: (file) => {
//               return new Promise((resolve, reject) => {
//                 const formData = new FormData();
//                 formData.append("file", file);

//                 fetch("http://localhost:4050/api/upload_image", {
//                   method: "POST",
//                   body: formData,
//                 })
//                   .then((response) => response.json())
//                   .then((data) => {
//                     resolve(data.url);
//                   })
//                   .catch((error) => {
//                     console.error("Error uploading image:", error);
//                     reject("Upload failed");
//                   });
//               });
//             },
//           },
//         },
//       });
//     }
//   }, []);

//   return <div ref={editorRef} style={{ height: "400px" }}></div>;
// };

// export default QuillEditor;
