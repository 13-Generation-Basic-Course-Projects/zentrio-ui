'use client';
import { useEffect, useRef, useState } from 'react';
import "animate.css"

const AnimatedSection = ({ animation = 'animate__fadeInLeft', duration = '3s', children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const classes = `mt-16 ${visible ? `animate__animated ${animation}` : 'opacity-0'}`;
  const style = visible ? { animationDuration: duration } : {};

  return (
    <section ref={ref} className={classes} style={style}>
      {children}
    </section>
  );
};

export default AnimatedSection;