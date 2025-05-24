import React, { useState, useEffect, useRef } from "react";
import GiftBox from "./components/GiftBox";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const gifts = [
  {
    id: 1,
    title: "Happy Birthday Didi! 🎉",
    dialogue: [
      { speaker: "You", text: "Happy Birthday Didi! Cake kidhar hai? 🍰" },
      {
        speaker: "Karishma",
        text: "Village mein hoon… par revenge global hai! Pehle apne birthday ka cake yaad kar!",
      },
    ],
  },
  {
    id: 2,
    title: "Gift Request 🎁",
    dialogue: [
      { speaker: "You", text: "Tumne toh mujhe cake dene ke bajaye gift maanga tha!" },
      {
        speaker: "Karishma",
        text: "Wahi toh! Main sab kuch leti hoon — cake bhi, gift bhi, insult bhi free mein deti hoon!",
      },
    ],
  },
  {
    id: 3,
    title: "Feelings Traffic Jam 🚦",
    dialogue: [
      {
        speaker: "You",
        text: "Main Mumbai mein hoon… Feelings ka traffic jam ho gaya!",
      },
      {
        speaker: "Karishma",
        text: 'Cake ka GPS ab bhi confuse hai… "Tum deserve nahi karte," keh ke route hi change kar diya!',
      },
    ],
  },
  {
    id: 4,
    title: "Photo Surprise 📸",
    photo: "/images/photo2.jpg", // <-- put your photo path here
  },
];

function App() {
  const [openGiftId, setOpenGiftId] = useState(null);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    const playMusic = () => {
      const audio = bgMusicRef.current;
      if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            console.log("Autoplay blocked. Waiting for user interaction.");
          });
        }
      }
    };

    playMusic();

    const handleUserInteraction = () => {
      playMusic();
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    return () => document.removeEventListener("click", handleUserInteraction);
  }, []);

  return (
    <div
      style={{
        padding: "3rem",
        background: "linear-gradient(135deg, #fff7f9, #ffe6f0)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "'Comic Sans MS', cursive",
          color: "#ff3c78",
          marginBottom: "2rem",
          fontSize: "1.9rem",
          textShadow: "2px 2px 6px #ffc1e3",
        }}
      >
        🎉 Happy Birthday Madam Karishma 🎉
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          maxWidth: 900,
        }}
      >
        {gifts.map((gift) => (
          <GiftBox
            key={gift.id}
            gift={gift}
            isOpen={openGiftId === gift.id}
            onToggle={() => setOpenGiftId(openGiftId === gift.id ? null : gift.id)}
          />
        ))}
      </div>

      {/* Funny Sister-Style Special Message */}
      <div
        style={{
          marginTop: "3rem",
          fontFamily: "'Comic Sans MS', cursive",
          color: "#ff3c78",
          fontSize: "1.4rem",
          textAlign: "center",
          maxWidth: 600,
          padding: "1.5rem 2rem",
          border: "3px dashed #ff3c78",
          borderRadius: "15px",
          background: "#ffe6f0",
          boxShadow: "0 0 10px #ffbad2",
          userSelect: "none",
          whiteSpace: "pre-wrap",
          lineHeight: "1.5",
        }}
        title="Birthday Love & Laughter"
      >
        {`🎉 Hey Sis! 🎉

No need to reveal your age — 
you're forever young at heart and forever the boss of our family! 💖
`}
      </div>

      <audio ref={bgMusicRef} src="/sounds/happy-birthday.mp3" loop preload="auto" />
    </div>
  );
}

export default App;
