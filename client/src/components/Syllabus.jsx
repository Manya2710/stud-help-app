import React, { useState } from "react";
import axios from "axios";

const Syllabus = () => {
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUploadedFile(res.data.file);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 border rounded max-w-md mx-auto">
            <h2 className="text-xl mb-4 font-semibold">Upload a File</h2>
            <form action="/upload" method="POST" encType="multipart/form-data">
                <input type="file" name="profileImage" className="mb-4" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
            </form> 

            {uploadedFile && (
                <div className="mt-4">
                    <p>Uploaded File:</p>
                    <a
                        href={`http://localhost:5000/file/${uploadedFile.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {uploadedFile.filename}
                    </a>
                </div>
            )}
        </div>
    );
};

export default Syllabus;
