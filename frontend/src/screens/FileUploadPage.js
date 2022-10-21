import React, { useState } from 'react'
import axios from 'axios';

function FileUploadPage() {

    const [selectedFile, setSelectedFile] = useState();
    const [showProductUploadAlert, setShowProductUploadAlert] = useState(false);
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
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

            <button style={{ marginTop: 10, paddingRight: 20, paddingLeft: 20, paddingTop: 10, paddingBottom: 10, fontSize: 16 }} onClick={handleSubmission}>Submit</button>

            {
                showProductUploadAlert && message && (
                    <div style={{ width: "80%", padding: 20, marginTop: 30, backgroundColor: "lightgreen", borderRadius: 10 }}>
                        <h2 style={{ textAlign: "center", color: "lavenderblush" }}>{message}</h2>
                    </div>
                )
            }

            {
                error && (
                    <div style={{ width: "80%", padding: 20, marginTop: 30, backgroundColor: "red", borderRadius: 10 }}>
                        <h2 style={{ textAlign: "center", color: "lavenderblush" }}>{error}</h2>
                    </div>
                )
            }

        </div>
    )
}

export default FileUploadPage