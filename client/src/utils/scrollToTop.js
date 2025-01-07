import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // גלילה לראש העמוד
  }, [pathname]); // הפעלת האפקט בכל פעם ש-pathname משתנה

  return null;
};

export default ScrollToTop;
