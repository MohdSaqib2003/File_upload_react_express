import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './progress';


const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('');

    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChangeHandler = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                    );
                    console.log('progressEvent : ',progressEvent);
                    console.log('progress Loaded : ',progressEvent.loaded);
                    console.log('progress Total : ',progressEvent.total);
                    console.log('Progrss : ',Math.round((progressEvent.loaded * 100) / progressEvent.total));
                }
            });

            setTimeout(() => setUploadPercentage(0), 10000);

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            setMessage('File uploaded');
            

        } catch (err) {
            // setMessage('File not uploaded');
            if (err.response.status === 500) {
                setMessage('There was a problem with server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    }
    return (
        <>
            {message ? <Message msg={message} /> : null}
            <form action="" onSubmit={onSubmit}>
                <div className="mb-1 mt-2">
                    <input className="form-control" type="file" id="formFile" onChange={onChangeHandler} />
                </div>
                
                {message === "File uploaded" ? <Progress percentage={uploadPercentage} /> : <Progress percentage={0} />}

                <div className="row">
                    <input type="submit" value="Upload" className="btn btn-primary mt-4 col-12" />
                </div>
            </form>

            {
                message==="File uploaded" ? <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{uploadedFile.fileName}</h3>
                        <img style={{ width: '100%', border: '1px solid black' }} src={uploadedFile.filePath} alt="" />
                    </div>
                </div> : null
            }
            <br />
        </>
    );
}
export default FileUpload;