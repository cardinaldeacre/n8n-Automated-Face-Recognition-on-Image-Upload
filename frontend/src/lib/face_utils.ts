
import { type Results } from "@mediapipe/face_mesh";

export type FaceDirection = "FRONT" | "LEFT" | "RIGHT" | "TOO_UP" | "TOO_DOWN" | "UNKNOWN";

const LANDMARKS = {
    NOSE_TIP: 1,
    LEFT_CHEEK: 234,
    RIGHT_CHEEK: 454,
    CHIN: 152,
    MID_EYES: 168,
}

export const detectFaceDirection = (results: Results): FaceDirection => {
    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
        throw new Error("No face landmarks detected");
    }

    const landmarks = results.multiFaceLandmarks[0];
    const nose = landmarks[LANDMARKS.NOSE_TIP];
    const leftCheek = landmarks[LANDMARKS.LEFT_CHEEK];
    const rightCheek = landmarks[LANDMARKS.RIGHT_CHEEK];
    const chin = landmarks[LANDMARKS.CHIN];
    const midEyes = landmarks[LANDMARKS.MID_EYES];

    const distToLeft = Math.abs(nose.x - leftCheek.x);
    const distToRight = Math.abs(nose.x - rightCheek.x);
    const yawRatio = distToLeft / distToRight;

    const distNoseToChin = Math.abs(nose.y - chin.y);
    const distNoseToMidEyes = Math.abs(nose.y - midEyes.y);

    const pitchRatio = distNoseToMidEyes / distNoseToChin;

    // stricter thresholds to avoid misclassification
    const PITCH_LOWER_LIMIT = 1.5;
    const PITCH_UPPER_LIMIT = 3.0;

    if (pitchRatio < PITCH_LOWER_LIMIT) {
        return "TOO_UP";
    } else if (pitchRatio > PITCH_UPPER_LIMIT) {
        return "TOO_DOWN";
    }

    // yaw thresholds
    if (yawRatio < 0.35) return "LEFT";
    if (yawRatio > 2.5) return "RIGHT";

    if (yawRatio > 0.8 && yawRatio < 1.2) return "FRONT";

    return "UNKNOWN";
}

export const dataURLtoFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}