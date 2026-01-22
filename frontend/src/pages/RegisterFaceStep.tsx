import { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { Loader2, CheckCircle2, AlertTriangle, Camera as CameraIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { detectFaceDirection, dataURLtoFile } from "@/lib/face_utils";
import type { Results } from "@mediapipe/face_mesh";
import type { FaceDirection } from '@/lib/face_utils';

const STEPS = [
    { id: 'FRONT', label: 'Hadap Depan', instruction: 'Pastikan wajah Anda menghadap kamera secara langsung.' },
    { id: 'LEFT', label: 'Hadap Kiri', instruction: 'Putar wajah Anda ke kiri hingga profil kiri terlihat jelas.' },
    { id: 'RIGHT', label: 'Hadap Kanan', instruction: 'Putar wajah Anda ke kanan hingga profil kanan terlihat jelas.' },
]

interface RegisterFaceStepProps {
    onPhotosCaptured: (files: File[]) => void;
}

export const RegisterFaceStep: React.FC<RegisterFaceStepProps> = ({ onPhotosCaptured }) => {
    const webcamRef = useRef<Webcam>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [photos, setPhotos] = useState<File[]>([]);

    const [, setDirection] = useState<FaceDirection>('UNKNOWN');
    const [feedbackMessage, setFeedbackMessage] = useState("Memuat model AI...");
    const [progress, setProgress] = useState(0); // 0-100

    const stabiltyTimerRef = useRef<number | null>(null);
    const progressIntervalRef = useRef<number | null>(null);

    const onResults = useCallback((results: Results) => {
        setIsLoading(false);

        const detectedDir = detectFaceDirection(results);
        setDirection(detectedDir);

        const targetStep = STEPS[currentStepIndex];

        let isMatch = false;
        let message = "";

        if (detectedDir === "TOO_UP") {
            message = "Turunkan wajah Anda sedikit.";
        } else if (detectedDir === "TOO_DOWN") {
            message = "Angkat wajah Anda sedikit.";
        } else if (detectedDir === "UNKNOWN") {
            message = "Wajah tidak terdeteksi dengan jelas.";
        } else {
            if (targetStep.id === "FRONT") {
                if (detectedDir === "FRONT") {
                    isMatch = true;
                    message = "Bagus! Wajah Anda sudah menghadap depan.";
                } else {
                    message = `Mohon dapat depan (Terdeteksi: ${detectedDir}).`;
                }
            } else if (targetStep.id === "LEFT") {
                if (detectedDir === "LEFT") {
                    isMatch = true;
                    message = "Bagus! Profil kiri Anda sudah terlihat.";
                } else {
                    message = `Mohon putar ke kiri (Terdeteksi: ${detectedDir}).`;
                }
            } else if (targetStep.id === "RIGHT") {
                if (detectedDir === "RIGHT") {
                    isMatch = true;
                    message = "Bagus! Profil kanan Anda sudah terlihat.";
                } else {
                    message = `Mohon putar ke kanan (Terdeteksi: ${detectedDir}).`;
                }
            }
        }

        setFeedbackMessage(message);
        // auto capture photo
        if (isMatch) {
            if (!stabiltyTimerRef.current) {
                startCaptureTimer();
            }
        } else {
            resetCaptureTiemr();
        }
    }, [currentStepIndex]);

    const startCaptureTimer = () => {
        let p = 0;
        progressIntervalRef.current = window.setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            }
        }, 100);

        stabiltyTimerRef.current = setTimeout(() => {
            capturePhoto();
        }, 1200); // 1.2 detik
    }

    const resetCaptureTiemr = () => {
        if (stabiltyTimerRef.current) {
            clearTimeout(stabiltyTimerRef.current);
            stabiltyTimerRef.current = null;
        }
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }

        setProgress(0);
    }

    const capturePhoto = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            const stepId = STEPS[currentStepIndex].id;
            const file = dataURLtoFile(imageSrc, `photo_${stepId}.jpg`);

            const newPhotos = [...photos, file];
            setPhotos(newPhotos);
            resetCaptureTiemr();

            if (currentStepIndex < STEPS.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
            } else {
                onPhotosCaptured(newPhotos);
            }
        }
    }

    useEffect(() => {
        const faceMesh = new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(onResults);

        if (webcamRef.current && webcamRef.current.video) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (webcamRef.current?.video) {
                        await faceMesh.send({ image: webcamRef.current.video });
                    }
                    // await faceMesh.send({ image: webcamRef.current!.video! });
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }

        return () => {
            resetCaptureTiemr();
            faceMesh.close();
        }
    }, [onResults]);

    const currentStep = STEPS[currentStepIndex];

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative overflow-hidden bg-black rounded-xl w-auto h-full max-w-400px aspect-[4/3] shadow-md">
                {/* webcam */}
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="absolute inset-0 object-cover w-full h-full mirror-x"
                    style={{ transform: "scaleX(-1)" }}
                />

                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                        <Loader2 className="w-10 h-10 mb-4 animate-spin" />
                        <span className="text-lg">{feedbackMessage}</span>
                    </div>
                )}

                {/* overlay */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 rounded-3xl transition-colors duration-300 z-10 
                    ${progress > 0 ? 'border-green-500 bg-green-500/10' : 'border-white/50 border-dashed'}
                `}>
                    {/* garis  bantu */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20 -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2"></div>
                </div>

                {/* progress */}
                {progress > 0 && (
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
                        <div
                            className="h-full transition-all duration-100 ease-linear bg-green-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* intstruction */}
            <div className="space-y-2">
                <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
                    <CameraIcon className="w-6 h-6" />
                    Langkah {currentStepIndex + 1}/3: {currentStep.label}
                </h3>

                {/* alert */}
                <Alert className={`transition-all duration-300 ${progress > 0 ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                    {progress > 0 ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-blue-600" />}
                    <AlertTitle className={progress > 0 ? "text-green-700" : "text-blue-700"}>
                        {feedbackMessage}
                    </AlertTitle>
                    <AlertDescription className="text-xs text-gray-600">
                        {currentStep.instruction}
                    </AlertDescription>
                </Alert>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {STEPS.map((step, idx) => (
                    <div
                        key={step.id}
                        className={`h-2 w-12 rounded-full transition-colors ${idx < currentStepIndex ? 'bg-green-500' :
                            idx === currentStepIndex ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}