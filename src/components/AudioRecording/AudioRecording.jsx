import { useEffect, useState } from 'react'
import styles from './AudioRecording.module.css'
import { AiFillAudio } from 'react-icons/ai'
import { BsFillRecordCircleFill } from 'react-icons/bs'

const AudioRecording = () => {
    const [isRecording, setIsRecording] = useState(false)
    const [audioChunks, setAudioChunks] = useState([])
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [stream, setStream] = useState(null)
    const [audio, setAudio] = useState(null)

    useEffect(() => {
        console.log("LOS CHUNKOOOS ==>", audioChunks)
    }, [audioChunks])

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.addEventListener('dataavailable', (event) => {
                console.log("EL EVENTDATA", event.data)
                setAudioChunks(prevAudioChunks => [...prevAudioChunks, event.data])
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
                console.log("CUAL ES EL SIIIIZE ==>", audioBlob.size)
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);
                setAudioChunks([]);
                setIsRecording(false);
            });

            setMediaRecorder(mediaRecorder);
            setStream(stream);
            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error(error);
        }
    }

    function stopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop();
            stream.getTracks().forEach(track => track.stop());
            setMediaRecorder(null);
            setStream(null);
        }
    }

    return (
        isRecording ?
            <BsFillRecordCircleFill onClick={stopRecording} size={40} color='#bc002d' />
            :
            <>
                <AiFillAudio onClick={startRecording} size={40} />
                {
                    audio &&
                    <audio key={audio} controls onCanPlay={(e) => console.log(e.target.duration)}>
                        <source src={audio} type="audio/webm;codecs=opus" />
                    </audio>
                }
            </>

    )
}

export default AudioRecording