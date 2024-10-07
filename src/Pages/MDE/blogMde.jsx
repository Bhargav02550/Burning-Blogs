// import React, { useState, useRef, useCallback, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import "../../assets/scss/MDE.scss";
// import { NavLink, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// const BlogEditor = () => {
//   const quillRef = useRef(null);
//   const [editorHtml, setEditorHtml] = useState("");
//   const [editorText, setEditorText] = useState("");
//   const [title, setTitle] = useState("Title");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const apiUrl = "http://localhost:4050/api/upload_post";

//   useEffect(() => {
//     const savedHtml = localStorage.getItem("editorHtml");
//     const savedTitle = localStorage.getItem("editorTitle");
//     if (savedHtml) {
//       setEditorHtml(savedHtml);
//     }
//     if (savedTitle) {
//       setTitle(savedTitle);
//     }
//   }, []);

//   const handlePreview = () => {
//     if (editorHtml.length == 0) {
//       toast.error("Please write something for Preview");
//     } else {
//       navigate("/post-preview", { state: editorHtml });
//     }
//   };

//   const handleChange = (content, delta, source, editor) => {
//     setEditorHtml(content);
//     setEditorText(editor.getText());
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//     e.target.style.height = "auto";
//     e.target.style.height = `${e.target.scrollHeight}px`;
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://localhost:4050/api/upload_image",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data.url;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const imageHandler = useCallback(() => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);

//       const url = await uploadImage(file);
//       if (url && quillRef.current) {
//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection(true);
//         quill.insertEmbed(range.index, "image", url);
//       }
//     };
//   }, []);

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: "1" }],
//         ["bold", "italic", "underline"],
//         ["link", "image"],
//         ["blockquote", "code-block"],
//       ],
//       handlers: {
//         image: imageHandler,
//       },
//     },
//   };

//   const formats = [
//     "header",
//     "font",
//     "list",
//     "bullet",
//     "bold",
//     "italic",
//     "underline",
//     "link",
//     "image",
//     "align",
//     "clean",
//     "code-block",
//     "blockquote",
//   ];

//   const handleSave = () => {
//     axios
//       .post(apiUrl, {
//         title: title,
//         content_html: editorHtml,
//         content_text: editorText,
//         author: "Bhargav",
//       })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="Mde">
//       <div className="Mde-Editor-container">
//         <div className="BlogTitle">
//           {/* <textarea
//             className="BlogTitleInput"
//             type="text"
//             value={title === "Title" ? "" : title}
//             onChange={handleTitleChange}
//             placeholder="Title"
//             maxLength={200}
//             style={{ overflow: "hidden", resize: "none" }}
//           /> */}
//         </div>

//         {imagePreview && (
//           <div className="image-preview-container">
//             <img
//               src={imagePreview}
//               className={`image-preview ${!isImageUploaded ? "blurred" : ""}`}
//               alt="Preview"
//             />
//             {isLoading && <div className="loader"></div>}
//           </div>
//         )}

//         <ReactQuill
//           style={{ paddingTop: "77px", paddingBottom: "77px" }}
//           ref={quillRef}
//           value={editorHtml}
//           onChange={handleChange}
//           modules={modules}
//           formats={formats}
//           theme="snow"
//           placeholder="Start writing something awesome..."
//         />
//       </div>

//       <div className="Mde-Tittle-Thumbnail">
//         <Toaster
//           position="top-right"
//           reverseOrder={false}
//           gutter={8}
//           toastOptions={{
//             className: "",
//             duration: 3000,
//             style: {
//               background: "white",
//               color: "black",
//             },
//             icon: "⚠️",
//             error: {
//               duration: 3000,
//               theme: {
//                 primary: "red",
//                 secondary: "white",
//                 error: "red",
//               },
//             },
//           }}
//         />
//         ;
//         <button
//           className="preview-button"
//           onClick={() => {
//             handlePreview();
//           }}
//         >
//           Preview Post
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BlogEditor;
import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "../../assets/scss/MDE.scss";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AddCircleIcon, PencilEdit01Icon } from "hugeicons-react";

const BlogEditor = () => {
  const navigate = useNavigate();

  const quillRef = useRef(null);
  const inputRef = useRef(null);
  const [editorHtml, setEditorHtml] = useState("");
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("Title");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tittleLength, setTittleLength] = useState(0);

  const apiUrl = "http://localhost:4050/api/upload_post";

  useEffect(() => {
    const savedDraft = localStorage.getItem("blog-draft");
    const savedTitle = localStorage.getItem("blog-title");
    const savedThumbnail = localStorage.getItem("blog-thumbnail");

    if (savedDraft) {
      setEditorHtml(savedDraft);
    }
    if (savedTitle) {
      setTitle(savedTitle);
    }
    if (savedThumbnail) {
      setThumbnailUrl(savedThumbnail);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
      toast.success("Draft saved");
    }, 2000);
    return () => clearTimeout(timer);
  }, [editorHtml, title, thumbnailUrl]);

  function saveDraft() {
    localStorage.setItem("blog-draft", editorHtml);
    localStorage.setItem("blog-title", title);
    localStorage.setItem("blog-thumbnail", thumbnailUrl);
  }

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      setThumbnailUrl(url);
      localStorage.setItem("blog-thumbnail", url);
    }
  };

  const handleChange = (content, delta, source, editor) => {
    if (isEditable) {
      setEditorHtml(content);
      setEditorText(editor.getText());
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    localStorage.setItem("blog-title", e.target.value);
  };

  const handlePostPreview = () => {
    if (editorHtml.length === 0) {
      toast.error("Please write something in the editor");
    } else {
      navigate("/post-preview", {
        state: {
          html: editorHtml,
          title: title,
          thumbnail: thumbnailUrl,
        },
      });
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      setIsEditable(false);
      const response = await axios.post(
        "http://localhost:4050/api/upload_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setIsLoading(false);
      setIsEditable(true);
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
      if (url && quillRef.current) {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", url);
        quill.insertText(range.index + 1, "\n");
        setEditorHtml(quill.root.innerHTML);
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }],
        ["bold", "italic", "underline"],
        ["link", "image"],
        ["blockquote", "code-block"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <>
      <div className="Mde-Mobile-container">Hi</div>
      <div className="Mde">
        <div className="Mde-Editor-container">
          <Toaster position="top-right" />
          {isLoading && (
            <div className="loading-overlay">
              <div className="loader"></div>
            </div>
          )}
          <ReactQuill
            style={{ paddingTop: "77px", paddingBottom: "77px" }}
            ref={quillRef}
            value={editorHtml}
            onChange={handleChange}
            modules={modules}
            theme="snow"
            readOnly={!isEditable}
            placeholder="Start writing something awesome..."
          />
        </div>

        <div className="Mde-Tittle-Thumbnail">
          <div className="BlogTitle">
            <div className="heading">Title</div>
            <textarea
              value={title}
              onChange={(e) => {
                handleTitleChange(e);
                setTittleLength(e.target.value.length);
              }}
              placeholder="Enter your blog post title here"
            />
          </div>
          <div className="tittle-length">{tittleLength} / 200</div>
          <div className="thumbnail">
            <div className="heading">Thumbnail</div>
            {/* Hidden input for thumbnail upload */}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleThumbnailChange}
            />
            {thumbnailUrl ? (
              <div
                className="thumbnail-preview-container"
                style={{ position: "relative" }}
              >
                <img
                  src={thumbnailUrl}
                  className="thumbnail-preview"
                  alt="Thumbnail Preview"
                  style={{ width: "100%", height: "auto" }}
                />
                <PencilEdit01Icon
                  style={{
                    cursor: "pointer",
                    color: "#000",
                    zIndex: 1000,
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                />
              </div>
            ) : (
              <div className="thumbnail-upload">
                <AddCircleIcon
                  color="#000"
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                />
                <div style={{ color: "#000" }}>
                  Upload Image from your device
                </div>
              </div>
            )}
          </div>
          <button
            className="preview-button"
            onClick={() => handlePostPreview()}
          >
            Preview Post
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogEditor;
