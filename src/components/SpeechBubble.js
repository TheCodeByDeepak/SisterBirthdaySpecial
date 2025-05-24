// SpeechBubble.js
import React from "react";
import "./SpeechBubble.css";

const SpeechBubble = ({ speaker, text }) => {
  return (
    <div className={`speech-bubble ${speaker === "You" ? "you" : "karishma"}`}>
      <strong>{speaker}:</strong> {text}
    </div>
  );
};

export default SpeechBubble;
