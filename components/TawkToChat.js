// components/TawkToChat.jsx
'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Tawk.to script ko load karne ka function
    const loadTawkTo = () => {
      // Check if script already exists
      if (document.getElementById('tawk-to-script')) {
        return;
      }

      var Tawk_API = Tawk_API || {};
      var Tawk_LoadStart = new Date();
      
      const script = document.createElement('script');
      script.id = 'tawk-to-script';
      script.async = true;
      script.src = 'https://embed.tawk.to/692d6c7fa794f2197c4c968f/1jbcmvllu';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
      
      // Make Tawk_API globally accessible
      window.Tawk_API = Tawk_API;
      window.Tawk_LoadStart = Tawk_LoadStart;
    };

    loadTawkTo();

    // Cleanup function
    return () => {
      // Optional: Remove script on component unmount
      const tawkScript = document.getElementById('tawk-to-script');
      if (tawkScript) {
        tawkScript.remove();
      }
      // Remove Tawk widget
      const tawkWidget = document.getElementById('tawk-bubble');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  return null; // Ye component kuch render nahi karta
}