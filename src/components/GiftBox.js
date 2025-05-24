import React, { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

const gradients = [
  "linear-gradient(135deg, #f9d5e5, #fcbad3)",
  "linear-gradient(135deg, #d6e6f2, #9eb9d4)",
  "linear-gradient(135deg, #fceabb, #f8b500)",
];

const emojiMap = {
  1: "🎂",
  2: "🎁",
  3: "🎉",
  4: "📸", // example for photo gift emoji
};

const GiftBox = ({ gift, isOpen, onToggle }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const audioRef = useRef(null);

  // If no dialogue, make empty array to avoid errors
  const dialogue = gift.dialogue || [];

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#ff3c78", "#ff69b4", "#ffc1e3", "#f9d5e5"],
      });
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      setTypingIndex(0);
      setDisplayedText("");
    } else {
      setDisplayedText("");
      setTypingIndex(0);
    }
  }, [isOpen]);

  // Typing effect for dialogue text (only if no photo)
  useEffect(() => {
    if (!isOpen) return;
    if (gift.photo) return; // skip typing effect if photo present
    if (typingIndex >= dialogue.length) return;

    const currentText = dialogue[typingIndex].text;
    let charIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + currentText[charIndex]);
      charIndex++;
      if (charIndex === currentText.length) {
        clearInterval(interval);
        setTimeout(() => setTypingIndex((prev) => prev + 1), 1200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [typingIndex, isOpen, dialogue, gift.photo]);

  return (
    <div
      className={`gift-box ${isOpen ? "open" : ""}`}
      onClick={() => !isOpen && onToggle()}
      style={{
        background: gradients[(gift.id - 1) % gradients.length],
        width: 200,
        height: 260,
        borderRadius: 20,
        boxShadow: isOpen
          ? "0 0 20px 6px #ff69b4"
          : "0 5px 15px rgba(0,0,0,0.1)",
        cursor: isOpen ? "default" : "pointer",
        perspective: 600,
        position: "relative",
        userSelect: "none",
      }}
    >
      <div
        className="gift-box-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 20,
          transformStyle: "preserve-3d",
          transition: "transform 0.8s",
          transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className="gift-front"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 48,
            color: "#fff",
            userSelect: "none",
          }}
        >
          {emojiMap[gift.id] || "🎁"}
        </div>

        {/* Back side */}
        <div
          className="gift-back"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#fff",
            borderRadius: 20,
            padding: 20,
            boxSizing: "border-box",
            transform: "rotateY(180deg)",
            overflowY: "auto",
            fontFamily: "'Comic Sans MS', cursive",
            fontSize: 14,
            color: "#444",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ flexGrow: 1, whiteSpace: "pre-wrap" }}>
            {gift.photo ? (
              <img
                src={gift.photo}
                alt={gift.title || "Gift Photo"}
                style={{ width: "100%", borderRadius: 12, marginTop: 10 }}
              />
            ) : (
              <>
                {dialogue.slice(0, typingIndex).map((d, i) => (
                  <p key={i}>
                    <strong>{d.speaker}:</strong> {d.text}
                  </p>
                ))}
                {/* Partial typing line */}
                {typingIndex < dialogue.length && (
                  <p>
                    <strong>{dialogue[typingIndex].speaker}:</strong>{" "}
                    {displayedText}
                    <span className="blinking-cursor">|</span>
                  </p>
                )}
              </>
            )}
          </div>

          <button
            onClick={onToggle}
            style={{
              alignSelf: "flex-end",
              padding: "5px 12px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(45deg, #ff3c78, #ff69b4)",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 3px 6px #ff69b4aa",
              userSelect: "none",
              marginTop: "10px",
            }}
          >
            ✕ Close
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        preload="auto"
      />
      <style>{`
        .blinking-cursor {
          animation: blink 1s infinite;
          font-weight: 900;
          color: #ff69b4;
        }
        @keyframes blink {
          0%, 50% {opacity: 1;}
          51%, 100% {opacity: 0;}
        }
      `}</style>
    </div>
  );
};

export default GiftBox;
