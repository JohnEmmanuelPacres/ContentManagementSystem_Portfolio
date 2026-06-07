'use client';

import { useState, useEffect } from 'react';

type TypewriterProps = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
};

export default function Typewriter({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 30,
  delayBetweenPhrases = 2000,
  className = "",
}: TypewriterProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        // Pause before deleting
        timer = setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
        return;
      } else if (isDeleting && text === '') {
        // Move to next phrase
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(() => {}, 500); // small pause before typing next
        return;
      }
      
      timer = setTimeout(handleTyping, typingSpeedState);
    };

    timer = setTimeout(handleTyping, typingSpeedState);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases, typingSpeedState]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse border-r-2 border-blue-400 ml-1 h-full inline-block align-middle -mt-1" style={{ height: '1.2em' }}></span>
    </span>
  );
}
