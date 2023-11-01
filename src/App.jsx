import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SERVER_SECRET } from "./constant";

export default function App() {
  // const roomID = getUrlParams().get("roomID") || randomID(5);
  const roomID = "PW";
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = APP_ID;
    const serverSecret = SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "Guest"
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      useFrontFacingCamera: true,
      showTurnOffRemoteMicrophoneButton: true,
      showTurnOffRemoteCameraButton: true,
      showRoomTimer: true,
      showInviteToCohostButton: true,
    });
  };

  return (
    <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
  );
}
