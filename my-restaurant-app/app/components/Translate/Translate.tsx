'use client'
import React, { useEffect } from "react";
declare var google: any;

declare global {
    interface Window {
        google: any;
    }
}

declare global {
    interface Window {
      googleTranslateElementInit: () => any;
    }
}

const Translate: React.FC = () => {

  

  const googleTranslateElementInit = () => {

    return new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );
  };

  useEffect(() => {
    let addScript = document.createElement('script');
    console.log('useEffect called');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );

    document.body.appendChild(addScript);

    window.googleTranslateElementInit = googleTranslateElementInit;

  },[]);
  

  return (
    <div  id="google_translate_element"></div>
  );
};

export default Translate;
