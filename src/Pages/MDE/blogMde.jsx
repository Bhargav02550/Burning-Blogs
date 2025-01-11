import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "../../assets/scss/MDE.scss";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AddCircleIcon, PencilEdit01Icon } from "hugeicons-react";
import { AppContext } from "../../ContextAPI/ContextAPI";
import { usePopUp } from "../../components/PopUp/PopUp";
import ReactDOM from "react-dom";
import { ProfileIcon, LogoutIcon } from "../../../public/Icons/Icons.jsx";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const [hadContent, setHadContent] = useState(false);

  const profilePlaceholder = "./profile-placeholder.jpg";

  const { logout, UserID, user } = useContext(AppContext);
  const { openMessagePopUp, openComponentPopUp } = usePopUp();
  const apiUrl = "http://localhost:4050/api/upload_post";

  const updateDropdownPosition = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        right: window.innerWidth - rect.right,
      });
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      updateDropdownPosition();
      window.addEventListener("resize", updateDropdownPosition);
    }

    openMessagePopUp(
      <div
        dangerouslySetInnerHTML={{
          __html:
            'Uploading Blogs is disabled for now. If you are interested in writing blogs, please contact me via email: <a href="mailto:kumarpenke460@gmail.com">kumarpenke460@gmail.com</a>.<br/>Thanks for your interest!',
        }}
      />
    );

    return () => window.removeEventListener("resize", updateDropdownPosition);
  }, [dropdownOpen]);

  useEffect(() => {
    const savedDraft = localStorage.getItem("blog-draft");
    const savedTitle = localStorage.getItem("blog-title");
    const savedThumbnail = localStorage.getItem("blog-thumbnail");

    const currentPage = window.location.pathname;

    if (currentPage === "/new-burn") {
      if (!UserID) {
        navigate("/login");
      }
    }

    if (currentPage === "/new-burn") {
      document.querySelector(".Header").style.display = "none";
      document.querySelector(".TopMargin").style.marginTop = "0";
    }

    if (savedDraft) setEditorHtml(savedDraft);
    if (savedTitle) setTitle(savedTitle);
    if (savedThumbnail) setThumbnailUrl(savedThumbnail);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
      document.querySelector(".Mde-Header-Saving-indicator").textContent =
        "Saved";
    }, 2000);
    document.querySelector(".Mde-Header-Saving-indicator").textContent =
      "Saving...";
    return () => clearTimeout(timer);
  }, [editorHtml, title, thumbnailUrl]);

  function saveDraft() {
    localStorage.setItem("blog-draft", editorHtml);
    localStorage.setItem("blog-title", title);
    localStorage.setItem("blog-thumbnail", thumbnailUrl);
    document.querySelector(".Mde-Header-Saving-indicator").textContent =
      "Saved";
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      if (editor.getText().length > 0) {
        setHadContent(true);
      }
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
      openMessagePopUp("Please write something in the editor");
    } else {
      const plainText = quillRef.current.getEditor().getText().trim();
      navigate("/post-preview", {
        state: {
          html: editorHtml,
          title: title,
          content: plainText,
          thumbnail: thumbnailUrl,
          author: user.firstname,
          authorId: UserID,
          authorProfilePic: user.profile_picture,
        },
      });
    }
  };

  const handlePostSubmission = async () => {
    if (editorHtml.length === 0) {
      toast.error("Please write something in the editor");
      openMessagePopUp("Please write something in the editor");
      return;
    }

    const postData = {
      title,
      content: editorHtml,
      thumbnail: thumbnailUrl,
      author: user.firstname,
      authorId: UserID,
      authorProfilePic: user.profile_picture,
    };

    try {
      const response = await axios.post(apiUrl, postData);
      if (response.status === 200) {
        toast.success("Post submitted successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Failed to submit post");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      setIsEditable(false);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_ONLINE}/upload_image`,
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

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  const handlePopUp = () => {
    openComponentPopUp(() => (
      <div className="">
        <div className="BlogTitle">
          <div className="heading">Title</div>
          <textarea
            maxLength={200}
            value={title}
            onChange={(e) => {
              handleTitleChange(e);
              setTittleLength(e.target.value.length);
            }}
            placeholder="Eg: Blog Title"
          />
        </div>
        <div className="tittle-length">{tittleLength} / 200</div>
        <div className="thumbnail">
          <div className="heading">Thumbnail</div>
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
                  borderRadius: "10px",
                  padding: "5px",
                }}
                onClick={() => inputRef.current?.click()}
              />
            </div>
          ) : (
            <div className="thumbnail-upload">
              <AddCircleIcon
                color="#000"
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => inputRef.current?.click()}
              />
              <div style={{ color: "#000" }}>Upload Image from your device</div>
            </div>
          )}
        </div>
        <button className="preview-button" onClick={handlePostPreview}>
          Preview Post
        </button>
        <button className="submit-button" onClick={handlePostSubmission}>
          Submit Post
        </button>
      </div>
    ));
  };

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

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const noUpload = () => {
    toast.error(
      "Uploading Blogs is disabled for now. If you are interested in writing blogs, please contact me via email:)"
    );
  };

  return (
    <>
      <div className="Mde-Page">
        <div className="Mde-Header">
          <div className="Mde-Header-logo" onClick={() => navigate("/")}>
            Burning Blogs
            <div className="Mde-Header-Saving-indicator">Saving ...</div>
          </div>
          <div className="Mde-Header-Right-Part">
            <button
              {...(hadContent
                ? { className: "Mde-Header-Burn-btn" }
                : { className: "Mde-Header-Burn-btn disabled" })}
              onClick={noUpload}
            >
              Burn
            </button>
            <div className="Profile-Dropdown" ref={profileRef}>
              {user && (
                <img
                  src={`./profilePics/${user.profile_picture}`}
                  alt={`${user.firstname}`}
                  width={32}
                  height={32}
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={handleProfileClick}
                />
              )}
              {!user && (
                <img
                  src={`./profilePics/${profilePlaceholder}`}
                  alt="Profile"
                  width={32}
                  height={32}
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={handleProfileClick}
                />
              )}
            </div>
          </div>
        </div>
        <div className="Mde-Content">
          <ReactQuill
            className="custom-quill"
            style={{ paddingBottom: "77px" }}
            ref={quillRef}
            value={editorHtml}
            onChange={handleChange}
            modules={modules}
            theme="snow"
            readOnly={!isEditable}
            placeholder="Burn something awesome..."
          />
        </div>
      </div>
      {dropdownOpen &&
        ReactDOM.createPortal(
          <div
            className="Mde-Dropdown-Menu-Outside"
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
            }}
          >
            {UserID && [
              <button key="profile">
                <ProfileIcon strokeWidth="1" />
                Profile
              </button>,
              <button key="logout" onClick={handleLogout}>
                <LogoutIcon strokeWidth="1" color="red" />
                Sign out
              </button>,
            ]}
            {!UserID && [
              <button key="login" onClick={() => navigate("/login")}>
                Sign In
              </button>,
              <button key="register" onClick={() => navigate("/register")}>
                Sign Up
              </button>,
            ]}
          </div>,
          document.getElementById("dropdown-container")
        )}
    </>
  );
};

export default BlogEditor;
