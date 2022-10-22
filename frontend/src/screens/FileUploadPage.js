import React, { useState } from 'react'
import axios from 'axios';
import './fileUploadPage.css';

export default function FileUploadPage() {

    const [selectedFile, setSelectedFile] = useState();
    const [showProductUploadAlert, setShowProductUploadAlert] = useState(false);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const notes = [
        { title: "Name", note: "Name must be string" },
        { title: "Category", note: "Name must be string" },
        { title: "Brand", note: "Brand must be string" },
        { title: "Price", note: "Price must be a number." },
        { title: "Stock", note: "Stock must be a total number of products available in stock" },
        { title: "InStock", note: "In stock must be either true or false" },
        { title: "Description", note: "Description must be string" },
        { title: "Image", note: "Image must be in url format" },
    ]

    const changeHandler = (e) => {

        if (e.target.files[0].type !== "text/csv") {
            return alert("Select a csv file only")
        }

        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const uploadFileUrl = "https://bulk-upload-system-by-jitendra.herokuapp.com/products/csv"


    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('file', selectedFile);

        axios.post(uploadFileUrl, formData)
            .then((res) => {
                setShowProductUploadAlert(true);
                setMessage(res.data.message);
                console.log("response from backend to frontend == ", res.data)
            }).catch(e => {
                setShowProductUploadAlert(false);
                setError(e.message);
            });
    }


    return (
        <div className='file-upload-container'>
            <h2>Bulk upload products from csv file</h2>
            <input type="file" name='file' onChange={changeHandler} accept=".csv" />

            <div>
                <h2>-- Note -- </h2>
                <ul className="notes">
                    {notes.map((item) => (
                        <li className="note" key={item.title}>{item.title}: {item.note}</li>
                    ))}
                </ul>
            </div>

            <button disabled={!isFilePicked} className="submit-btn" onClick={handleSubmission}>Submit</button>

            {
                showProductUploadAlert && message && (
                    <div className='success-message'>
                        <h2 className='message-text'>{message}</h2>
                    </div>
                )
            }

            {
                error && (
                    <div className='error-message'>
                        <h2 className='message-text'>{error}</h2>
                    </div>
                )
            }

        </div>
    )
}