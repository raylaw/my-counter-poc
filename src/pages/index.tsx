import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Roboto } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import {
  map,
  of,
  scan,
  startWith,
  switchMap,
  takeWhile,
  tap,
  timer,
} from "rxjs";
import anime from "animejs";
import _ from "lodash";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

function mapRange(number:number, fromLeft:number, fromRight:number, toLeft:number, toRight:number) {
  return toLeft + (number - fromLeft) / (fromRight - fromLeft) * (toRight - toLeft)
}

export default function Home() {
  //const [number , setNumber] = useState(931475012);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {

 

    _.range(0,10).forEach(v=>{

      const name = `.coin-${v}`
      const scale = _.random(0.6, 1); 
      anime.remove(name)
      anime({
        targets: name,
        opacity: [{ value: 0, duration: 0 },{ value: 1, duration: 100 }],
        scaleX: [{ value: scale, duration: 0 }],
        scaleY: [{ value: scale, duration: 0 }],
        translateX: [{ value: _.random(-80, 80) + "%", duration: 0 }],
        translateY: [
          { value: _.random(-30, 0), duration: 0 },
          { value: mapRange(scale,0.4,0.8,160,100) , duration: _.random(300, 500) },
        ],
        delay: _.random(0,500),
        loop: true,
        easing: "easeInOutSine",
      });
  
    })

    _.range(0,10).forEach(v=>{

      const name = `.water-${v}`
      const scale = _.random(0.6, 1); 
      const d = _.random(1300, 1500);
      anime.remove(name)
      anime({
        targets: name,
        opacity: [{ value: 0, duration: 0 },{ value: 1, duration: d*0.7 },{ value: 0, duration: 500 }],
        scaleX: [{ value: scale, duration: 0 }],
        scaleY: [{ value: scale, duration: 0 }],
        translateX: [{ value: _.random(-100, 100) + "%", duration: 0 }],
        translateY: [
          { value: _.random(-30, 0), duration: 0 },
          { value: mapRange(scale,0.4,0.8,300,200) , duration: d },
        ],
        delay: _.random(0,8000),
        loop: true,
        easing: "easeInOutSine",
      });
  
    })
   
    let targetNumber = 931475012;
    let currentNumber = Math.round(targetNumber * 0.99);

    const sub$ = of(targetNumber)
      .pipe(
        switchMap((endRange) => {
          return timer(0, 20).pipe(
            map(() => 1),
            startWith(currentNumber),
            scan((acc, curr) => {
              return acc + curr;
            }),
            takeWhile((val) => val <= endRange)
          );
        }),
        tap((v) => (currentNumber = v)),
        startWith(currentNumber)
      )
      .subscribe((v) => {
        if (counterRef.current && counterRef2.current) {
          counterRef.current.innerHTML = `$${Number(v).toLocaleString(
            "en-US"
          )}`;

          counterRef2.current.innerHTML = `$${Number(v).toLocaleString(
            "en-US"
          )}`;
        }
      });

    return () => {
      sub$.unsubscribe();
    };
  }, []);

  return (
    <div id="container" className={roboto.className}>
      <div id="counter-wrapper">
        <div id="counter" ref={counterRef}></div>
        <div id="image">
          {/* <Image src="/9150052.png" width={200} height={200} alt="" />
          <div id="coin-wrapper">
            {_.range(0, 10).map((v, i) => (
              <div className={`coin-${i} coin`} key={i}>
                <Image src="/2529396.png" width={40} height={40} alt="" />
              </div>
            ))}
          </div> */}
          <Image src="/2246747.png" width={200} height={200} alt="" />
          <div id="coin-wrapper">
            {_.range(0, 10).map((v, i) => (
              <div className={`coin-${i} coin`} key={i}>
                <Image src="/1490853.png" width={40} height={40} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="counter-wrapper">
        <div id="counter" ref={counterRef2}></div>
        <div id="image">
          <Image src="/1892747.png" width={200} height={200} alt="" />
          <div id="coin-wrapper">
            {_.range(0, 10).map((v, i) => (
              <div className={`water-${i} water`} key={i}>
                <Image src="/616546.png" width={40} height={40} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
