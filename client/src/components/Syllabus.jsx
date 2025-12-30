import React, { useState, useEffect } from "react";
import axios from "axios";

const Syllabus = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const token = localStorage.getItem("token");


    const fetchFiles = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/upload", {headers: {Authorization: `Bearer ${token}`},});
            setUploadedFiles(res.data);
            console.log("fetched files:", res.data)
        } catch (err) {
            console.error("Error fetching files:", err);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            const res = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            setMessage(res.data.message || "File uploaded successfully!");
            fetchFiles(); // refresh list after upload
        } catch (err) {
            console.error(err);
            setMessage("Error uploading file.");
        }
    };

    return (
        <div className="p-4  bg-sky-200 rounded max-w-screen  mx-auto">
            <div className="border rounded-sm flex flex-col gap-y-5 items-center justify-center h-120">
            <h2 className="text-xl mb-4 font-semibold">Upload a PDF</h2>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                    className="mb-4 border-black rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Upload
                </button>
            </form>

            {message && <p className="mt-4">{message}</p>}

            <h3 className="mt-6 font-semibold">Uploaded Files:</h3>
            <ul>{uploadedFiles.map(file => (
                    <li key={file._id}>
                    <a
                        href={`http://localhost:5000/api/upload/${file._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {file.originalname}
                    </a>
                    </li>
                ))}
            </ul>
            </div>

        </div>
    );
};

export default Syllabus;
