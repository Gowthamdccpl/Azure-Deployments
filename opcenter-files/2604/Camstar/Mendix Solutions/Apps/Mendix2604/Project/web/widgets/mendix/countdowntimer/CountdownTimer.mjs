import x, { useRef, useState, useCallback, useEffect, useLayoutEffect, createElement, memo } from 'react';

var G = typeof window == "undefined" ? useEffect : useLayoutEffect,
  I = ({
    isPlaying: o,
    duration: e,
    startAt: n = 0,
    updateInterval: t = 0,
    onComplete: s,
    onUpdate: r
  }) => {
    let [i, c] = useState(n),
      m = useRef(0),
      p = useRef(n),
      f = useRef(n * -1e3),
      u = useRef(null),
      a = useRef(null),
      h = useRef(null),
      w = g => {
        let l = g / 1e3;
        if (a.current === null) {
          a.current = l, u.current = requestAnimationFrame(w);
          return;
        }
        let d = l - a.current,
          C = m.current + d;
        a.current = l, m.current = C;
        let k = p.current + (t === 0 ? C : (C / t | 0) * t),
          R = p.current + C,
          v = typeof e == "number" && R >= e;
        c(v ? e : k), v || (u.current = requestAnimationFrame(w));
      },
      $ = () => {
        u.current && cancelAnimationFrame(u.current), h.current && clearTimeout(h.current), a.current = null;
      },
      y = useCallback(g => {
        $(), m.current = 0;
        let l = typeof g == "number" ? g : n;
        p.current = l, c(l), o && (u.current = requestAnimationFrame(w));
      }, [o, n]);
    return G(() => {
      if (r == null || r(i), e && i >= e) {
        f.current += e * 1e3;
        let {
          shouldRepeat: g = !1,
          delay: l = 0,
          newStartAt: d
        } = (s == null ? void 0 : s(f.current / 1e3)) || {};
        g && (h.current = setTimeout(() => y(d), l * 1e3));
      }
    }, [i, e]), G(() => (o && (u.current = requestAnimationFrame(w)), $), [o, e, t]), {
      elapsedTime: i,
      reset: y
    };
  };
var A = (o, e, n) => {
    let t = o / 2,
      s = e / 2,
      r = t - s,
      i = 2 * r,
      c = n === "clockwise" ? "1,0" : "0,1",
      m = 2 * Math.PI * r;
    return {
      path: `m ${t},${s} a ${r},${r} 0 ${c} 0,${i} a ${r},${r} 0 ${c} 0,-${i}`,
      pathLength: m
    };
  },
  T = (o, e) => o === 0 || o === e ? 0 : typeof e == "number" ? o - e : 0,
  B = o => ({
    position: "relative",
    width: o,
    height: o
  }),
  P = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  };
var F = (o, e, n, t, s) => {
    if (t === 0) return e;
    let r = (s ? t - o : o) / t;
    return e + n * r;
  },
  W = o => {
    var e, n;
    return (n = (e = o.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (t, s, r, i) => `#${s}${s}${r}${r}${i}${i}`).substring(1).match(/.{2}/g)) == null ? void 0 : e.map(t => parseInt(t, 16))) != null ? n : [];
  },
  j = (o, e) => {
    var u;
    let {
      colors: n,
      colorsTime: t,
      isSmoothColorTransition: s = !0
    } = o;
    if (typeof n == "string") return n;
    let r = (u = t == null ? void 0 : t.findIndex((a, h) => a >= e && e >= t[h + 1])) != null ? u : -1;
    if (!t || r === -1) return n[0];
    if (!s) return n[r];
    let i = t[r] - e,
      c = t[r] - t[r + 1],
      m = W(n[r]),
      p = W(n[r + 1]),
      f = !!o.isGrowing;
    return `rgb(${m.map((a, h) => F(i, a, p[h] - a, c, f) | 0).join(",")})`;
  },
  S = o => {
    let {
        duration: e,
        initialRemainingTime: n,
        updateInterval: t,
        size: s = 180,
        strokeWidth: r = 12,
        trailStrokeWidth: i,
        isPlaying: c = !1,
        isGrowing: m = !1,
        rotation: p = "clockwise",
        onComplete: f,
        onUpdate: u
      } = o,
      a = useRef(),
      h = Math.max(r, i != null ? i : 0),
      {
        path: w,
        pathLength: $
      } = A(s, h, p),
      {
        elapsedTime: y
      } = I({
        isPlaying: c,
        duration: e,
        startAt: T(e, n),
        updateInterval: t,
        onUpdate: typeof u == "function" ? l => {
          let d = Math.ceil(e - l);
          d !== a.current && (a.current = d, u(d));
        } : void 0,
        onComplete: typeof f == "function" ? l => {
          var R;
          let {
            shouldRepeat: d,
            delay: C,
            newInitialRemainingTime: k
          } = (R = f(l)) != null ? R : {};
          if (d) return {
            shouldRepeat: d,
            delay: C,
            newStartAt: T(e, k)
          };
        } : void 0
      }),
      g = e - y;
    return {
      elapsedTime: y,
      path: w,
      pathLength: $,
      remainingTime: Math.ceil(g),
      rotation: p,
      size: s,
      stroke: j(o, g),
      strokeDashoffset: F(y, 0, $, e, m),
      strokeWidth: r
    };
  };
var D = o => {
  let {
      children: e,
      strokeLinecap: n,
      trailColor: t,
      trailStrokeWidth: s
    } = o,
    {
      path: r,
      pathLength: i,
      stroke: c,
      strokeDashoffset: m,
      remainingTime: p,
      elapsedTime: f,
      size: u,
      strokeWidth: a
    } = S(o);
  return x.createElement("div", {
    style: B(u)
  }, x.createElement("svg", {
    viewBox: `0 0 ${u} ${u}`,
    width: u,
    height: u,
    xmlns: "http://www.w3.org/2000/svg"
  }, x.createElement("path", {
    d: r,
    fill: "none",
    stroke: t != null ? t : "#d9d9d9",
    strokeWidth: s != null ? s : a
  }), x.createElement("path", {
    d: r,
    fill: "none",
    stroke: c,
    strokeLinecap: n != null ? n : "round",
    strokeWidth: a,
    strokeDasharray: i,
    strokeDashoffset: m
  })), typeof e == "function" && x.createElement("div", {
    style: P
  }, e({
    remainingTime: p,
    elapsedTime: f,
    color: c
  })));
};
D.displayName = "CountdownCircleTimer";

const renderTime = (dimension, time, timeDuration, allocatedTime, isOvershoot) => {
  const duration = Math.round(allocatedTime);
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = Math.trunc(time % 60).toString().padStart(2, '0');

  //Only used for display.
  const formatedHours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const formatedminutes = Math.floor(duration % 3600 / 60).toString().padStart(2, '0');
  return createElement("div", {
    className: "time-wrapper"
  }, createElement("div", {
    className: "time",
    style: {
      bottom: '90%'
    }
  }, createElement("div", {
    className: "task-name"
  }, "Task Time"), isOvershoot ? createElement("div", {
    className: "time-count time-count-overshoot"
  }, "+ ", minutes, ":", seconds, " min") : createElement("div", {
    className: "time-count"
  }, minutes, ":", seconds, " min"), timeDuration != 0 && allocatedTime != 0 || timeDuration == 0 && allocatedTime != 0 ? createElement("div", {
    className: "task-name"
  }, "/", formatedHours, ":", formatedminutes, " h") : null));
};
function CountdownTimerComponent({
  timeDuration,
  currentValue,
  startTime,
  onPauseClickAction,
  currentDateTime
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(timeDuration);
  const [timeStart, setTimeStart] = useState(startTime);
  const [key, setKey] = useState(0);
  const [xx, setXx] = useState(timeDuration);
  const [date, setDate] = useState(currentDateTime);
  const [defaultTime, setDefaultTime] = useState(Number.MAX_SAFE_INTEGER);
  const [allocatedTime, setAllocatedTime] = useState(timeDuration);
  const [countUpMode, setCountUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTime(timeDuration);
    setAllocatedTime(timeDuration);
  }, [timeDuration]);
  useEffect(() => {
    setTimeStart(startTime);
  }, [startTime]);
  useEffect(() => {
    setDate(currentDateTime);
    setKey(key + 1);
    setIsPlaying(true);
    setIsLoading(false);
    if (startTime > timeDuration)
      // In case of overshoot set the CountUpMode= true
      setCountUpMode(true);else setCountUpMode(false);
  }, [currentDateTime]);
  const handleComplete = () => {
    setCountUpMode(true);
    return {
      shouldRepeat: false
    }; // prevent auto-repeat
  };
  const PauseIcon = ({
    className = "timer-icon",
    color = 'currentColor'
  }) => createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    className: className
  }, createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), createElement("path", {
    d: "M6 5h4v14H6V5zm8 0h4v14h-4V5z",
    fill: "transparent" // Make fill transparent
    ,
    stroke: color // Add stroke color
    ,
    strokeWidth: "1.5" // Add stroke width
  }));
  const StartIcon = ({
    className = "timer-icon",
    color = 'currentColor'
  }) => createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    className: className
  }, createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), createElement("path", {
    d: "M8 5v14l11-7z",
    fill: "transparent" // Make fill transparent
    ,
    stroke: color // Add stroke color
    ,
    strokeWidth: "1.5" // Add stroke width
  }));
  const onPauseClickHandler = () => {
    if (isPlaying) {
      if (onPauseClickAction && onPauseClickAction.canExecute) {
        onPauseClickAction.execute();
      }
    }
    setIsPlaying(prev => !prev);
  };
  if (time == 0) {
    // When AllocationTime = 0
    return createElement("div", {
      className: "timer-container"
    }, createElement(D, {
      key: key,
      isPlaying: isPlaying,
      duration: defaultTime,
      trailColor: isPlaying ? "#0F7EA5" : "#888888",
      colors: isPlaying ? "#0F7EA5" : "#888888",
      size: 40,
      initialRemainingTime: defaultTime - timeStart,
      strokeWidth: 5,
      strokeLinecap: "square",
      onUpdate: elapsedTime => {
        // Update Mendix value on timer update
        if (currentValue?.status === "available") {
          const r = parseFloat(elapsedTime);
          const d = parseFloat(defaultTime);
          currentValue.setTextValue("" + ((d - r) / 86400).toFixed(8));
        }
      }
    }, ({
      elapsedTime
    }) => {
      return createElement("span", null, createElement("button", {
        onClick: onPauseClickHandler,
        style: {
          border: 'none',
          background: 'transparent',
          cursor: 'pointer'
        },
        className: "timer-button"
      }, isPlaying ? createElement(PauseIcon, {
        className: "timer-icon-button"
      }) : createElement(StartIcon, {
        className: "timer-icon-button"
      })), createElement("span", null, renderTime("seconds", elapsedTime, 0, allocatedTime, false)));
    }));
  } else {
    if (countUpMode) {
      // When AllocationTime > 0 && In case of overshoot
      return createElement("div", {
        className: "timer-container"
      }, createElement(D, {
        key: key,
        isPlaying: isPlaying,
        duration: defaultTime,
        trailColor: "#DC0000",
        colors: "#DC0000",
        size: 40,
        strokeWidth: 5,
        strokeLinecap: "square",
        initialRemainingTime: Math.round(startTime) > Math.round(time) ? defaultTime - timeStart : defaultTime,
        onUpdate: elapsedTime => {
          // Update Mendix value on timer update
          if (currentValue?.status === "available") {
            const r = parseFloat(elapsedTime);
            const d = parseFloat(defaultTime);
            if (Math.round(startTime) > Math.round(time)) currentValue.setTextValue("" + ((d - r) / 86400).toFixed(8));else currentValue.setTextValue("" + ((d - r) / 86400).toFixed(8));
          }
        }
      }, ({
        elapsedTime
      }) => {
        return createElement("span", null, createElement("button", {
          onClick: onPauseClickHandler,
          style: {
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          },
          className: "timer-button"
        }, isPlaying ? createElement(PauseIcon, {
          className: "timer-icon-button"
        }) : createElement(StartIcon, {
          className: "timer-icon-button"
        })), createElement("span", null, renderTime("seconds", elapsedTime > time ? elapsedTime - time : elapsedTime, 0, allocatedTime, true)));
      }));
    } else {
      // When AllocationTime > 0
      return createElement("div", {
        className: "timer-container"
      }, createElement(D, {
        key: key,
        isPlaying: isPlaying,
        duration: time,
        colors: isPlaying ? ["#0F7EA5", "#0F7EA5", "#0F7EA5", "#0F7EA5"] : "#888888",
        colorsTime: [time, time / 2, 30, 0],
        size: 40,
        initialRemainingTime: timeStart,
        strokeWidth: 5,
        trailColor: isPlaying ? "#C0D3DB" : "#cccccc",
        strokeLinecap: "square",
        onComplete: handleComplete
      }, ({
        remainingTime
      }) => {
        if (xx !== remainingTime) {
          setTimeout(() => setXx(remainingTime), 0); // avoid setting state during render
          const r = parseFloat(remainingTime);
          const d = parseFloat(time);
          currentValue.setTextValue("" + ((d - r) / 86400).toFixed(8));
        }
        return createElement("span", null, createElement("button", {
          onClick: onPauseClickHandler,
          style: {
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          },
          className: "timer-button"
        }, isPlaying ? createElement(PauseIcon, {
          className: "timer-icon-button"
        }) : createElement(StartIcon, {
          className: "timer-icon-button"
        })), createElement("span", null, renderTime("seconds", remainingTime, time, allocatedTime, false)));
      }));
    }
  }
}

// Helper function to compare Mendix-like objects (status and value)
const areMendixPropsEqual = (prev, next) => {
  if (!prev || !next) return prev === next;
  if (prev.status !== next.status) return false;
  if (prev.value instanceof Date && next.value instanceof Date) {
    return prev.value.getTime() === next.value.getTime();
  }
  // For numbers, strings, etc.
  return prev.value === next.value;
};

// Custom comparison function for React.memo
const areCountdownPropsEqual = (prevProps, nextProps) => {
  if (prevProps.timeDuration.status !== "available" || prevProps.currentValue.status !== "available" || prevProps.startTime.status !== "available" || prevProps.currentDateTime.status !== "available") {
    return false;
  }
  // Compare each Mendix-like prop using your helper
  const currentDateTimeChanged = !areMendixPropsEqual(prevProps.currentDateTime, nextProps.currentDateTime);
  // If true, it means a prop has changed, so return false (meaning re-render)
  if (currentDateTimeChanged) {
    return false;
  }
  // If no relevant prop has changed, return true (meaning DO NOT re-render)
  return true;
};
const CountdownTimer = memo(function CountdownTimer({
  timeDuration,
  currentValue,
  startTime,
  onPauseClickAction,
  currentDateTime
}) {
  const [time, setTime] = useState(timeDuration);
  const [c, setC] = useState(currentValue);
  const [timeStart, setTimeStart] = useState(startTime);
  const [date, setDate] = useState(currentDateTime);
  useEffect(() => {
    // This will only run if timeDuration (prop) changes AND React.memo allowed a re-render
    setTime(timeDuration);
  }, [timeDuration]);
  useEffect(() => {
    setTimeStart(startTime);
  }, [startTime]);
  useEffect(() => {
    setC(currentValue);
  }, [currentValue]);
  useEffect(() => {
    setDate(currentDateTime);
  }, [currentDateTime]);
  if (time.status !== "available" || c.status !== "available" || timeStart.status !== "available" || date.status !== "available") {
    return createElement("div", null, "Loading...");
  } else {
    return createElement(CountdownTimerComponent, {
      timeDuration: time.value.toNumber(),
      currentValue: c,
      startTime: timeStart.value.toNumber(),
      onPauseClickAction: onPauseClickAction,
      currentDateTime: date.value
    });
  }
}, areCountdownPropsEqual); // <-- Pass the custom comparison function here

export { CountdownTimer };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnRkb3duVGltZXIubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtY291bnRkb3duLWNpcmNsZS10aW1lci9saWIvaW5kZXgubW9kdWxlLmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ291bnRkb3duVGltZXJDb21wb25lbnQuanN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL0NvdW50ZG93blRpbWVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeCBmcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VSZWYgYXMgVX1mcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VTdGF0ZSBhcyBFLHVzZVJlZiBhcyBiLHVzZUNhbGxiYWNrIGFzIHF9ZnJvbVwicmVhY3RcIjtpbXBvcnR7dXNlRWZmZWN0IGFzIE0sdXNlTGF5b3V0RWZmZWN0IGFzIEx9ZnJvbVwicmVhY3RcIjt2YXIgRz10eXBlb2Ygd2luZG93PT1cInVuZGVmaW5lZFwiP006TCxJPSh7aXNQbGF5aW5nOm8sZHVyYXRpb246ZSxzdGFydEF0Om49MCx1cGRhdGVJbnRlcnZhbDp0PTAsb25Db21wbGV0ZTpzLG9uVXBkYXRlOnJ9KT0+e2xldFtpLGNdPUUobiksbT1iKDApLHA9YihuKSxmPWIobiotMWUzKSx1PWIobnVsbCksYT1iKG51bGwpLGg9YihudWxsKSx3PWc9PntsZXQgbD1nLzFlMztpZihhLmN1cnJlbnQ9PT1udWxsKXthLmN1cnJlbnQ9bCx1LmN1cnJlbnQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHcpO3JldHVybn1sZXQgZD1sLWEuY3VycmVudCxDPW0uY3VycmVudCtkO2EuY3VycmVudD1sLG0uY3VycmVudD1DO2xldCBrPXAuY3VycmVudCsodD09PTA/QzooQy90fDApKnQpLFI9cC5jdXJyZW50K0Msdj10eXBlb2YgZT09XCJudW1iZXJcIiYmUj49ZTtjKHY/ZTprKSx2fHwodS5jdXJyZW50PXJlcXVlc3RBbmltYXRpb25GcmFtZSh3KSl9LCQ9KCk9Pnt1LmN1cnJlbnQmJmNhbmNlbEFuaW1hdGlvbkZyYW1lKHUuY3VycmVudCksaC5jdXJyZW50JiZjbGVhclRpbWVvdXQoaC5jdXJyZW50KSxhLmN1cnJlbnQ9bnVsbH0seT1xKGc9PnskKCksbS5jdXJyZW50PTA7bGV0IGw9dHlwZW9mIGc9PVwibnVtYmVyXCI/ZzpuO3AuY3VycmVudD1sLGMobCksbyYmKHUuY3VycmVudD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodykpfSxbbyxuXSk7cmV0dXJuIEcoKCk9PntpZihyPT1udWxsfHxyKGkpLGUmJmk+PWUpe2YuY3VycmVudCs9ZSoxZTM7bGV0e3Nob3VsZFJlcGVhdDpnPSExLGRlbGF5Omw9MCxuZXdTdGFydEF0OmR9PShzPT1udWxsP3ZvaWQgMDpzKGYuY3VycmVudC8xZTMpKXx8e307ZyYmKGguY3VycmVudD1zZXRUaW1lb3V0KCgpPT55KGQpLGwqMWUzKSl9fSxbaSxlXSksRygoKT0+KG8mJih1LmN1cnJlbnQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHcpKSwkKSxbbyxlLHRdKSx7ZWxhcHNlZFRpbWU6aSxyZXNldDp5fX07dmFyIEE9KG8sZSxuKT0+e2xldCB0PW8vMixzPWUvMixyPXQtcyxpPTIqcixjPW49PT1cImNsb2Nrd2lzZVwiP1wiMSwwXCI6XCIwLDFcIixtPTIqTWF0aC5QSSpyO3JldHVybntwYXRoOmBtICR7dH0sJHtzfSBhICR7cn0sJHtyfSAwICR7Y30gMCwke2l9IGEgJHtyfSwke3J9IDAgJHtjfSAwLC0ke2l9YCxwYXRoTGVuZ3RoOm19fSxUPShvLGUpPT5vPT09MHx8bz09PWU/MDp0eXBlb2YgZT09XCJudW1iZXJcIj9vLWU6MCxCPW89Pih7cG9zaXRpb246XCJyZWxhdGl2ZVwiLHdpZHRoOm8saGVpZ2h0Om99KSxQPXtkaXNwbGF5OlwiZmxleFwiLGp1c3RpZnlDb250ZW50OlwiY2VudGVyXCIsYWxpZ25JdGVtczpcImNlbnRlclwiLHBvc2l0aW9uOlwiYWJzb2x1dGVcIixsZWZ0OjAsdG9wOjAsd2lkdGg6XCIxMDAlXCIsaGVpZ2h0OlwiMTAwJVwifTt2YXIgRj0obyxlLG4sdCxzKT0+e2lmKHQ9PT0wKXJldHVybiBlO2xldCByPShzP3QtbzpvKS90O3JldHVybiBlK24qcn0sVz1vPT57dmFyIGUsbjtyZXR1cm4obj0oZT1vLnJlcGxhY2UoL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSwodCxzLHIsaSk9PmAjJHtzfSR7c30ke3J9JHtyfSR7aX0ke2l9YCkuc3Vic3RyaW5nKDEpLm1hdGNoKC8uezJ9L2cpKT09bnVsbD92b2lkIDA6ZS5tYXAodD0+cGFyc2VJbnQodCwxNikpKSE9bnVsbD9uOltdfSxqPShvLGUpPT57dmFyIHU7bGV0e2NvbG9yczpuLGNvbG9yc1RpbWU6dCxpc1Ntb290aENvbG9yVHJhbnNpdGlvbjpzPSEwfT1vO2lmKHR5cGVvZiBuPT1cInN0cmluZ1wiKXJldHVybiBuO2xldCByPSh1PXQ9PW51bGw/dm9pZCAwOnQuZmluZEluZGV4KChhLGgpPT5hPj1lJiZlPj10W2grMV0pKSE9bnVsbD91Oi0xO2lmKCF0fHxyPT09LTEpcmV0dXJuIG5bMF07aWYoIXMpcmV0dXJuIG5bcl07bGV0IGk9dFtyXS1lLGM9dFtyXS10W3IrMV0sbT1XKG5bcl0pLHA9VyhuW3IrMV0pLGY9ISFvLmlzR3Jvd2luZztyZXR1cm5gcmdiKCR7bS5tYXAoKGEsaCk9PkYoaSxhLHBbaF0tYSxjLGYpfDApLmpvaW4oXCIsXCIpfSlgfSxTPW89PntsZXR7ZHVyYXRpb246ZSxpbml0aWFsUmVtYWluaW5nVGltZTpuLHVwZGF0ZUludGVydmFsOnQsc2l6ZTpzPTE4MCxzdHJva2VXaWR0aDpyPTEyLHRyYWlsU3Ryb2tlV2lkdGg6aSxpc1BsYXlpbmc6Yz0hMSxpc0dyb3dpbmc6bT0hMSxyb3RhdGlvbjpwPVwiY2xvY2t3aXNlXCIsb25Db21wbGV0ZTpmLG9uVXBkYXRlOnV9PW8sYT1VKCksaD1NYXRoLm1heChyLGkhPW51bGw/aTowKSx7cGF0aDp3LHBhdGhMZW5ndGg6JH09QShzLGgscCkse2VsYXBzZWRUaW1lOnl9PUkoe2lzUGxheWluZzpjLGR1cmF0aW9uOmUsc3RhcnRBdDpUKGUsbiksdXBkYXRlSW50ZXJ2YWw6dCxvblVwZGF0ZTp0eXBlb2YgdT09XCJmdW5jdGlvblwiP2w9PntsZXQgZD1NYXRoLmNlaWwoZS1sKTtkIT09YS5jdXJyZW50JiYoYS5jdXJyZW50PWQsdShkKSl9OnZvaWQgMCxvbkNvbXBsZXRlOnR5cGVvZiBmPT1cImZ1bmN0aW9uXCI/bD0+e3ZhciBSO2xldHtzaG91bGRSZXBlYXQ6ZCxkZWxheTpDLG5ld0luaXRpYWxSZW1haW5pbmdUaW1lOmt9PShSPWYobCkpIT1udWxsP1I6e307aWYoZClyZXR1cm57c2hvdWxkUmVwZWF0OmQsZGVsYXk6QyxuZXdTdGFydEF0OlQoZSxrKX19OnZvaWQgMH0pLGc9ZS15O3JldHVybntlbGFwc2VkVGltZTp5LHBhdGg6dyxwYXRoTGVuZ3RoOiQscmVtYWluaW5nVGltZTpNYXRoLmNlaWwoZykscm90YXRpb246cCxzaXplOnMsc3Ryb2tlOmoobyxnKSxzdHJva2VEYXNob2Zmc2V0OkYoeSwwLCQsZSxtKSxzdHJva2VXaWR0aDpyfX07dmFyIEQ9bz0+e2xldHtjaGlsZHJlbjplLHN0cm9rZUxpbmVjYXA6bix0cmFpbENvbG9yOnQsdHJhaWxTdHJva2VXaWR0aDpzfT1vLHtwYXRoOnIscGF0aExlbmd0aDppLHN0cm9rZTpjLHN0cm9rZURhc2hvZmZzZXQ6bSxyZW1haW5pbmdUaW1lOnAsZWxhcHNlZFRpbWU6ZixzaXplOnUsc3Ryb2tlV2lkdGg6YX09UyhvKTtyZXR1cm4geC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse3N0eWxlOkIodSl9LHguY3JlYXRlRWxlbWVudChcInN2Z1wiLHt2aWV3Qm94OmAwIDAgJHt1fSAke3V9YCx3aWR0aDp1LGhlaWdodDp1LHhtbG5zOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIn0seC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtkOnIsZmlsbDpcIm5vbmVcIixzdHJva2U6dCE9bnVsbD90OlwiI2Q5ZDlkOVwiLHN0cm9rZVdpZHRoOnMhPW51bGw/czphfSkseC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtkOnIsZmlsbDpcIm5vbmVcIixzdHJva2U6YyxzdHJva2VMaW5lY2FwOm4hPW51bGw/bjpcInJvdW5kXCIsc3Ryb2tlV2lkdGg6YSxzdHJva2VEYXNoYXJyYXk6aSxzdHJva2VEYXNob2Zmc2V0Om19KSksdHlwZW9mIGU9PVwiZnVuY3Rpb25cIiYmeC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse3N0eWxlOlB9LGUoe3JlbWFpbmluZ1RpbWU6cCxlbGFwc2VkVGltZTpmLGNvbG9yOmN9KSkpfTtELmRpc3BsYXlOYW1lPVwiQ291bnRkb3duQ2lyY2xlVGltZXJcIjtleHBvcnR7RCBhcyBDb3VudGRvd25DaXJjbGVUaW1lcixTIGFzIHVzZUNvdW50ZG93bn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDb3VudGRvd25DaXJjbGVUaW1lciB9IGZyb20gJ3JlYWN0LWNvdW50ZG93bi1jaXJjbGUtdGltZXInXG5cbmNvbnN0IHJlbmRlclRpbWUgPSAoZGltZW5zaW9uLCB0aW1lLCB0aW1lRHVyYXRpb24sIGFsbG9jYXRlZFRpbWUsIGlzT3ZlcnNob290KSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gTWF0aC5yb3VuZChhbGxvY2F0ZWRUaW1lKTtcbiBcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodGltZSAvIDYwKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IHNlY29uZHMgPSBNYXRoLnRydW5jKCh0aW1lICUgNjApKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7O1xuIFxuICAvL09ubHkgdXNlZCBmb3IgZGlzcGxheS5cbiAgY29uc3QgZm9ybWF0ZWRIb3VycyA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyAzNjAwKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IGZvcm1hdGVkbWludXRlcyA9IE1hdGguZmxvb3IoKGR1cmF0aW9uICUgMzYwMCkgLyA2MCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuXG4gXG4gIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWUtd3JhcHBlclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lXCIgc3R5bGU9e3sgYm90dG9tOiAnOTAlJyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLW5hbWVcIj5UYXNrIFRpbWU8L2Rpdj5cbiAgICAgICAge2lzT3ZlcnNob290Pyg8ZGl2IGNsYXNzTmFtZT1cInRpbWUtY291bnQgdGltZS1jb3VudC1vdmVyc2hvb3RcIj4rIHttaW51dGVzfTp7c2Vjb25kc30gbWluPC9kaXY+KTooPGRpdiBjbGFzc05hbWU9XCJ0aW1lLWNvdW50XCI+e21pbnV0ZXN9OntzZWNvbmRzfSBtaW48L2Rpdj4pfVxuICAgICAgICB7KCh0aW1lRHVyYXRpb24gIT0gMCAmJiBhbGxvY2F0ZWRUaW1lICE9IDApIHx8ICh0aW1lRHVyYXRpb24gPT0gMCAmJiBhbGxvY2F0ZWRUaW1lICE9IDApKSA/ICg8ZGl2IGNsYXNzTmFtZT1cInRhc2stbmFtZVwiPi97Zm9ybWF0ZWRIb3Vyc306e2Zvcm1hdGVkbWludXRlc30gaDwvZGl2PikgOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIENvdW50ZG93blRpbWVyQ29tcG9uZW50KHsgdGltZUR1cmF0aW9uLCBjdXJyZW50VmFsdWUsIHN0YXJ0VGltZSwgb25QYXVzZUNsaWNrQWN0aW9uLCBjdXJyZW50RGF0ZVRpbWUgfSkge1xuXG4gIGNvbnN0IFtpc1BsYXlpbmcsIHNldElzUGxheWluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3RpbWUsIHNldFRpbWVdID0gdXNlU3RhdGUodGltZUR1cmF0aW9uKTtcbiAgY29uc3QgW3RpbWVTdGFydCwgc2V0VGltZVN0YXJ0XSA9IHVzZVN0YXRlKHN0YXJ0VGltZSk7XG4gIGNvbnN0IFtrZXksIHNldEtleV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3h4LCBzZXRYeF0gPSB1c2VTdGF0ZSh0aW1lRHVyYXRpb24pO1xuICBjb25zdCBbZGF0ZSwgc2V0RGF0ZV0gPSB1c2VTdGF0ZShjdXJyZW50RGF0ZVRpbWUpO1xuICBjb25zdCBbZGVmYXVsdFRpbWUsIHNldERlZmF1bHRUaW1lXSA9IHVzZVN0YXRlKE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcbiAgY29uc3QgW2FsbG9jYXRlZFRpbWUsIHNldEFsbG9jYXRlZFRpbWVdID0gdXNlU3RhdGUodGltZUR1cmF0aW9uKTtcbiAgY29uc3QgW2NvdW50VXBNb2RlLCBzZXRDb3VudFVwTW9kZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFRpbWUodGltZUR1cmF0aW9uKVxuICAgIHNldEFsbG9jYXRlZFRpbWUodGltZUR1cmF0aW9uKVxuICB9LCBbdGltZUR1cmF0aW9uXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRUaW1lU3RhcnQoc3RhcnRUaW1lKVxuICB9LCBbc3RhcnRUaW1lXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXREYXRlKGN1cnJlbnREYXRlVGltZSlcbiAgICBzZXRLZXkoa2V5ICsgMSlcbiAgICBzZXRJc1BsYXlpbmcodHJ1ZSlcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIGlmIChzdGFydFRpbWUgPiB0aW1lRHVyYXRpb24pICAvLyBJbiBjYXNlIG9mIG92ZXJzaG9vdCBzZXQgdGhlIENvdW50VXBNb2RlPSB0cnVlXG4gICAgICBzZXRDb3VudFVwTW9kZSh0cnVlKVxuICAgIGVsc2UgXG4gICAgICBzZXRDb3VudFVwTW9kZShmYWxzZSlcbiAgfSwgW2N1cnJlbnREYXRlVGltZV0pO1xuXG4gIGNvbnN0IGhhbmRsZUNvbXBsZXRlID0gKCkgPT4ge1xuICAgIHNldENvdW50VXBNb2RlKHRydWUpO1xuICAgIHJldHVybiB7IHNob3VsZFJlcGVhdDogZmFsc2UgfTsgLy8gcHJldmVudCBhdXRvLXJlcGVhdFxuICB9O1xuXG4gIGNvbnN0IFBhdXNlSWNvbiA9ICh7IGNsYXNzTmFtZSA9IFwidGltZXItaWNvblwiLCBjb2xvciA9ICdjdXJyZW50Q29sb3InIH0pID0+IChcbiAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgPHBhdGggZmlsbD1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIC8+XG4gICAgICAgXG4gICAgICA8cGF0aCBkPVwiTTYgNWg0djE0SDZWNXptOCAwaDR2MTRoLTRWNXpcIlxuICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIiAgLy8gTWFrZSBmaWxsIHRyYW5zcGFyZW50XG4gICAgICAgIHN0cm9rZT17Y29sb3J9ICAgICAvLyBBZGQgc3Ryb2tlIGNvbG9yXG4gICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCIgIC8vIEFkZCBzdHJva2Ugd2lkdGhcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICk7XG5cbiAgY29uc3QgU3RhcnRJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ0aW1lci1pY29uXCIsIGNvbG9yID0gJ2N1cnJlbnRDb2xvcicgfSkgPT4gKFxuICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICBcbiAgICAgIDxwYXRoIGZpbGw9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiAvPlxuICAgICAgICA8cGF0aCBkPVwiTTggNXYxNGwxMS03elwiXG4gICAgICAgIGZpbGw9XCJ0cmFuc3BhcmVudFwiICAvLyBNYWtlIGZpbGwgdHJhbnNwYXJlbnRcbiAgICAgICAgc3Ryb2tlPXtjb2xvcn0gICAgIC8vIEFkZCBzdHJva2UgY29sb3JcbiAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIiAgLy8gQWRkIHN0cm9rZSB3aWR0aFxuXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApO1xuXG4gIGNvbnN0IG9uUGF1c2VDbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKGlzUGxheWluZykge1xuICAgICAgaWYgKG9uUGF1c2VDbGlja0FjdGlvbiAmJiBvblBhdXNlQ2xpY2tBY3Rpb24uY2FuRXhlY3V0ZSkge1xuICAgICAgICBvblBhdXNlQ2xpY2tBY3Rpb24uZXhlY3V0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRJc1BsYXlpbmcoKHByZXYpID0+ICFwcmV2KTtcbiAgfVxuXG4gIGlmICh0aW1lID09IDApIHsgICAgLy8gV2hlbiBBbGxvY2F0aW9uVGltZSA9IDBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lci1jb250YWluZXJcIj5cbiAgICAgICAgPENvdW50ZG93bkNpcmNsZVRpbWVyXG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgaXNQbGF5aW5nPXtpc1BsYXlpbmd9XG4gICAgICAgICAgZHVyYXRpb249e2RlZmF1bHRUaW1lfVxuICAgICAgICAgIHRyYWlsQ29sb3I9e2lzUGxheWluZyA/IFwiIzBGN0VBNVwiIDpcIiM4ODg4ODhcIn1cbiAgICAgICAgICBjb2xvcnM9e2lzUGxheWluZyA/IFwiIzBGN0VBNVwiIDpcIiM4ODg4ODhcIn1cbiAgICAgICAgICBzaXplPXs0MH1cbiAgICAgICAgICBpbml0aWFsUmVtYWluaW5nVGltZT17ZGVmYXVsdFRpbWUgLSB0aW1lU3RhcnR9XG4gICAgICAgICAgc3Ryb2tlV2lkdGg9ezV9XG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInNxdWFyZVwiXG4gICAgICAgICAgb25VcGRhdGU9eyhlbGFwc2VkVGltZSkgPT4ge1xuICAgICAgICAgICAgLy8gVXBkYXRlIE1lbmRpeCB2YWx1ZSBvbiB0aW1lciB1cGRhdGVcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWU/LnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIikge1xuICAgICAgICAgICAgICBjb25zdCByID0gcGFyc2VGbG9hdChlbGFwc2VkVGltZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGQgPSBwYXJzZUZsb2F0KGRlZmF1bHRUaW1lKTtcbiAgICAgICAgICAgICAgY3VycmVudFZhbHVlLnNldFRleHRWYWx1ZShcIlwiICsgKChkLXIpLzg2NDAwKS50b0ZpeGVkKDgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICA+XG5cbiAgICAgICAgICB7KHsgZWxhcHNlZFRpbWUgfSkgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uUGF1c2VDbGlja0hhbmRsZXJ9IHN0eWxlPXt7IGJvcmRlcjogJ25vbmUnLCBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLCBjdXJzb3I6ICdwb2ludGVyJyB9fSBjbGFzc05hbWU9XCJ0aW1lci1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgIHtpc1BsYXlpbmcgP1xuICAgICAgICAgICAgICAgICAgICAoPFBhdXNlSWNvbiBjbGFzc05hbWU9XCJ0aW1lci1pY29uLWJ1dHRvblwiIC8+KVxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICg8U3RhcnRJY29uIGNsYXNzTmFtZT1cInRpbWVyLWljb24tYnV0dG9uXCIgLz4pfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPHNwYW4gPlxuICAgICAgICAgICAgICAgICAge3JlbmRlclRpbWUoXCJzZWNvbmRzXCIsIGVsYXBzZWRUaW1lLCAwLCBhbGxvY2F0ZWRUaW1lLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH19XG4gICAgICAgIDwvQ291bnRkb3duQ2lyY2xlVGltZXI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKGNvdW50VXBNb2RlKSB7ICAgLy8gV2hlbiBBbGxvY2F0aW9uVGltZSA+IDAgJiYgSW4gY2FzZSBvZiBvdmVyc2hvb3RcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgPENvdW50ZG93bkNpcmNsZVRpbWVyXG4gICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgIGlzUGxheWluZz17aXNQbGF5aW5nfVxuICAgICAgICAgICAgZHVyYXRpb249e2RlZmF1bHRUaW1lfVxuICAgICAgICAgICAgdHJhaWxDb2xvcj17XCIjREMwMDAwXCJ9XG4gICAgICAgICAgICBjb2xvcnM9e1wiI0RDMDAwMFwifVxuICAgICAgICAgICAgc2l6ZT17NDB9XG4gICAgICAgICAgICBzdHJva2VXaWR0aD17NX1cbiAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJzcXVhcmVcIlxuICAgICAgICAgICAgaW5pdGlhbFJlbWFpbmluZ1RpbWU9eyhNYXRoLnJvdW5kKHN0YXJ0VGltZSkgPiBNYXRoLnJvdW5kKHRpbWUpKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChkZWZhdWx0VGltZSAtIHRpbWVTdGFydCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0VGltZX1cbiAgICAgICAgICAgIG9uVXBkYXRlPXsoZWxhcHNlZFRpbWUpID0+IHtcbiAgICAgICAgICAgICAgLy8gVXBkYXRlIE1lbmRpeCB2YWx1ZSBvbiB0aW1lciB1cGRhdGVcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZT8uc3RhdHVzID09PSBcImF2YWlsYWJsZVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdCA9IHBhcnNlRmxvYXQodGltZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHBhcnNlRmxvYXQoZWxhcHNlZFRpbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBwYXJzZUZsb2F0KGRlZmF1bHRUaW1lKTtcbiAgICAgICAgICAgICAgICBpZihNYXRoLnJvdW5kKHN0YXJ0VGltZSkgPiBNYXRoLnJvdW5kKHRpbWUpKVxuICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5zZXRUZXh0VmFsdWUoXCJcIiArICgoZC1yKS84NjQwMCkudG9GaXhlZCg4KSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlLnNldFRleHRWYWx1ZShcIlwiICsgKChkLXIpLzg2NDAwKS50b0ZpeGVkKDgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG5cbiAgICAgICAgICAgIHsoeyBlbGFwc2VkVGltZSB9KSA9PiB7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25QYXVzZUNsaWNrSGFuZGxlcn0gc3R5bGU9e3sgYm9yZGVyOiAnbm9uZScsIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsIGN1cnNvcjogJ3BvaW50ZXInIH19IGNsYXNzTmFtZT1cInRpbWVyLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICB7aXNQbGF5aW5nID9cbiAgICAgICAgICAgICAgICAgICAgICAoPFBhdXNlSWNvbiBjbGFzc05hbWU9XCJ0aW1lci1pY29uLWJ1dHRvblwiIC8+KVxuICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAoPFN0YXJ0SWNvbiBjbGFzc05hbWU9XCJ0aW1lci1pY29uLWJ1dHRvblwiIC8+KX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICA8c3BhbiA+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJUaW1lKFwic2Vjb25kc1wiLCAoZWxhcHNlZFRpbWUgPiB0aW1lKT8oZWxhcHNlZFRpbWUtdGltZSk6ZWxhcHNlZFRpbWUsIDAsIGFsbG9jYXRlZFRpbWUsdHJ1ZSl9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA8L0NvdW50ZG93bkNpcmNsZVRpbWVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7ICAgICAgICAgICAgICAvLyBXaGVuIEFsbG9jYXRpb25UaW1lID4gMFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lci1jb250YWluZXJcIj5cbiAgICAgICAgICA8Q291bnRkb3duQ2lyY2xlVGltZXJcbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaXNQbGF5aW5nPXtpc1BsYXlpbmd9XG4gICAgICAgICAgICBkdXJhdGlvbj17dGltZX1cbiAgICAgICAgICAgIGNvbG9ycz17aXNQbGF5aW5nID8gW1wiIzBGN0VBNVwiLCBcIiMwRjdFQTVcIiwgXCIjMEY3RUE1XCIsIFwiIzBGN0VBNVwiXSA6IFwiIzg4ODg4OFwifVxuICAgICAgICAgICAgY29sb3JzVGltZT17W3RpbWUsIHRpbWUgLyAyLCAzMCwgMF19XG4gICAgICAgICAgICBzaXplPXs0MH1cbiAgICAgICAgICAgIGluaXRpYWxSZW1haW5pbmdUaW1lPXt0aW1lU3RhcnR9XG4gICAgICAgICAgICBzdHJva2VXaWR0aD17NX1cbiAgICAgICAgICAgIHRyYWlsQ29sb3I9e2lzUGxheWluZyA/IFwiI0MwRDNEQlwiIDogXCIjY2NjY2NjXCJ9XG4gICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwic3F1YXJlXCJcbiAgICAgICAgICAgIG9uQ29tcGxldGU9e2hhbmRsZUNvbXBsZXRlfVxuICAgICAgICAgID5cblxuXG4gICAgICAgICAgICB7KHsgcmVtYWluaW5nVGltZSB9KSA9PiB7XG5cbiAgICAgICAgICAgICAgaWYgKHh4ICE9PSByZW1haW5pbmdUaW1lKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRYeChyZW1haW5pbmdUaW1lKSwgMCk7IC8vIGF2b2lkIHNldHRpbmcgc3RhdGUgZHVyaW5nIHJlbmRlclxuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBwYXJzZUZsb2F0KHJlbWFpbmluZ1RpbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBwYXJzZUZsb2F0KHRpbWUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5zZXRUZXh0VmFsdWUoXCJcIiArICgoZC1yKS84NjQwMCkudG9GaXhlZCg4KSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvblBhdXNlQ2xpY2tIYW5kbGVyfSBzdHlsZT17eyBib3JkZXI6ICdub25lJywgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JywgY3Vyc29yOiAncG9pbnRlcicgfX0gY2xhc3NOYW1lPVwidGltZXItYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpc1BsYXlpbmcgPyA8UGF1c2VJY29uIGNsYXNzTmFtZT1cInRpbWVyLWljb24tYnV0dG9uXCIgLz4gOiA8U3RhcnRJY29uIGNsYXNzTmFtZT1cInRpbWVyLWljb24tYnV0dG9uXCIgLz59XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVyVGltZShcInNlY29uZHNcIiwgcmVtYWluaW5nVGltZSwgdGltZSwgYWxsb2NhdGVkVGltZSwgZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG5cbiAgICAgICAgICA8L0NvdW50ZG93bkNpcmNsZVRpbWVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgbWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBDb3VudGRvd25UaW1lckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvQ291bnRkb3duVGltZXJDb21wb25lbnRcIjtcbmltcG9ydCBcIi4vdWkvQ291bnRkb3duVGltZXIuY3NzXCI7XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBjb21wYXJlIE1lbmRpeC1saWtlIG9iamVjdHMgKHN0YXR1cyBhbmQgdmFsdWUpXG5jb25zdCBhcmVNZW5kaXhQcm9wc0VxdWFsID0gKHByZXYsIG5leHQpID0+IHtcbiAgaWYgKCFwcmV2IHx8ICFuZXh0KSByZXR1cm4gcHJldiA9PT0gbmV4dDtcbiAgaWYgKHByZXYuc3RhdHVzICE9PSBuZXh0LnN0YXR1cykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChwcmV2LnZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiBuZXh0LnZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBwcmV2LnZhbHVlLmdldFRpbWUoKSA9PT0gbmV4dC52YWx1ZS5nZXRUaW1lKCk7XG4gIH1cbiAgLy8gRm9yIG51bWJlcnMsIHN0cmluZ3MsIGV0Yy5cbiAgcmV0dXJuIHByZXYudmFsdWUgPT09IG5leHQudmFsdWU7XG59O1xuXG4vLyBDdXN0b20gY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgUmVhY3QubWVtb1xuY29uc3QgYXJlQ291bnRkb3duUHJvcHNFcXVhbCA9IChwcmV2UHJvcHMsIG5leHRQcm9wcykgPT4ge1xuXG4gIGlmIChwcmV2UHJvcHMudGltZUR1cmF0aW9uLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCBwcmV2UHJvcHMuY3VycmVudFZhbHVlLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCBwcmV2UHJvcHMuc3RhcnRUaW1lLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIlxuICAgfHwgcHJldlByb3BzLmN1cnJlbnREYXRlVGltZS5zdGF0dXMgIT09IFwiYXZhaWxhYmxlXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gXG4gIC8vIENvbXBhcmUgZWFjaCBNZW5kaXgtbGlrZSBwcm9wIHVzaW5nIHlvdXIgaGVscGVyXG4gIGNvbnN0IGN1cnJlbnREYXRlVGltZUNoYW5nZWQgPSAhYXJlTWVuZGl4UHJvcHNFcXVhbChwcmV2UHJvcHMuY3VycmVudERhdGVUaW1lLCBuZXh0UHJvcHMuY3VycmVudERhdGVUaW1lKTtcbiAgLy8gSWYgdHJ1ZSwgaXQgbWVhbnMgYSBwcm9wIGhhcyBjaGFuZ2VkLCBzbyByZXR1cm4gZmFsc2UgKG1lYW5pbmcgcmUtcmVuZGVyKVxuICBpZiAoY3VycmVudERhdGVUaW1lQ2hhbmdlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJZiBubyByZWxldmFudCBwcm9wIGhhcyBjaGFuZ2VkLCByZXR1cm4gdHJ1ZSAobWVhbmluZyBETyBOT1QgcmUtcmVuZGVyKVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IENvdW50ZG93blRpbWVyID0gbWVtbyhmdW5jdGlvbiBDb3VudGRvd25UaW1lcih7XG4gIHRpbWVEdXJhdGlvbixcbiAgY3VycmVudFZhbHVlLFxuICBzdGFydFRpbWUsXG4gIG9uUGF1c2VDbGlja0FjdGlvbixcbiAgY3VycmVudERhdGVUaW1lXG59KSB7XG4gIGNvbnN0IFt0aW1lLCBzZXRUaW1lXSA9IHVzZVN0YXRlKHRpbWVEdXJhdGlvbik7XG4gIGNvbnN0IFtjLCBzZXRDXSA9IHVzZVN0YXRlKGN1cnJlbnRWYWx1ZSk7XG4gIGNvbnN0IFt0aW1lU3RhcnQsIHNldFRpbWVTdGFydF0gPSB1c2VTdGF0ZShzdGFydFRpbWUpO1xuICBjb25zdCBbZGF0ZSwgc2V0RGF0ZV0gPSB1c2VTdGF0ZShjdXJyZW50RGF0ZVRpbWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gVGhpcyB3aWxsIG9ubHkgcnVuIGlmIHRpbWVEdXJhdGlvbiAocHJvcCkgY2hhbmdlcyBBTkQgUmVhY3QubWVtbyBhbGxvd2VkIGEgcmUtcmVuZGVyXG4gICAgc2V0VGltZSh0aW1lRHVyYXRpb24pO1xuICB9LCBbdGltZUR1cmF0aW9uXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRUaW1lU3RhcnQoc3RhcnRUaW1lKTtcbiAgfSwgW3N0YXJ0VGltZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QyhjdXJyZW50VmFsdWUpO1xuICB9LCBbY3VycmVudFZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXREYXRlKGN1cnJlbnREYXRlVGltZSk7XG4gIH0sIFtjdXJyZW50RGF0ZVRpbWVdKTtcblxuICBpZiAodGltZS5zdGF0dXMgIT09IFwiYXZhaWxhYmxlXCIgfHwgYy5zdGF0dXMgIT09IFwiYXZhaWxhYmxlXCIgfHwgdGltZVN0YXJ0LnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCBkYXRlLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIikge1xuICAgIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj47XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb3VudGRvd25UaW1lckNvbXBvbmVudFxuICAgICAgICB0aW1lRHVyYXRpb249e3RpbWUudmFsdWUudG9OdW1iZXIoKX1cbiAgICAgICAgY3VycmVudFZhbHVlPXtjfVxuICAgICAgICBzdGFydFRpbWU9e3RpbWVTdGFydC52YWx1ZS50b051bWJlcigpfVxuICAgICAgICBvblBhdXNlQ2xpY2tBY3Rpb249e29uUGF1c2VDbGlja0FjdGlvbn1cbiAgICAgICAgY3VycmVudERhdGVUaW1lPXtkYXRlLnZhbHVlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59LCBhcmVDb3VudGRvd25Qcm9wc0VxdWFsKTsgLy8gPC0tIFBhc3MgdGhlIGN1c3RvbSBjb21wYXJpc29uIGZ1bmN0aW9uIGhlcmUiXSwibmFtZXMiOlsiRyIsIndpbmRvdyIsIk0iLCJMIiwiSSIsImlzUGxheWluZyIsIm8iLCJkdXJhdGlvbiIsImUiLCJzdGFydEF0IiwibiIsInVwZGF0ZUludGVydmFsIiwidCIsIm9uQ29tcGxldGUiLCJzIiwib25VcGRhdGUiLCJyIiwiaSIsImMiLCJFIiwibSIsImIiLCJwIiwiZiIsInUiLCJhIiwiaCIsInciLCJnIiwibCIsImN1cnJlbnQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkIiwiQyIsImsiLCJSIiwidiIsIiQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImNsZWFyVGltZW91dCIsInkiLCJxIiwic2hvdWxkUmVwZWF0IiwiZGVsYXkiLCJuZXdTdGFydEF0Iiwic2V0VGltZW91dCIsImVsYXBzZWRUaW1lIiwicmVzZXQiLCJBIiwiTWF0aCIsIlBJIiwicGF0aCIsInBhdGhMZW5ndGgiLCJUIiwiQiIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJQIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsImxlZnQiLCJ0b3AiLCJGIiwiVyIsInJlcGxhY2UiLCJzdWJzdHJpbmciLCJtYXRjaCIsIm1hcCIsInBhcnNlSW50IiwiaiIsImNvbG9ycyIsImNvbG9yc1RpbWUiLCJpc1Ntb290aENvbG9yVHJhbnNpdGlvbiIsImZpbmRJbmRleCIsImlzR3Jvd2luZyIsImpvaW4iLCJTIiwiaW5pdGlhbFJlbWFpbmluZ1RpbWUiLCJzaXplIiwic3Ryb2tlV2lkdGgiLCJ0cmFpbFN0cm9rZVdpZHRoIiwicm90YXRpb24iLCJVIiwibWF4IiwiY2VpbCIsIm5ld0luaXRpYWxSZW1haW5pbmdUaW1lIiwicmVtYWluaW5nVGltZSIsInN0cm9rZSIsInN0cm9rZURhc2hvZmZzZXQiLCJEIiwiY2hpbGRyZW4iLCJzdHJva2VMaW5lY2FwIiwidHJhaWxDb2xvciIsIngiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJ2aWV3Qm94IiwieG1sbnMiLCJmaWxsIiwic3Ryb2tlRGFzaGFycmF5IiwiY29sb3IiLCJkaXNwbGF5TmFtZSIsInJlbmRlclRpbWUiLCJkaW1lbnNpb24iLCJ0aW1lIiwidGltZUR1cmF0aW9uIiwiYWxsb2NhdGVkVGltZSIsImlzT3ZlcnNob290Iiwicm91bmQiLCJtaW51dGVzIiwiZmxvb3IiLCJ0b1N0cmluZyIsInBhZFN0YXJ0Iiwic2Vjb25kcyIsInRydW5jIiwiZm9ybWF0ZWRIb3VycyIsImZvcm1hdGVkbWludXRlcyIsImNsYXNzTmFtZSIsImJvdHRvbSIsIkNvdW50ZG93blRpbWVyQ29tcG9uZW50IiwiY3VycmVudFZhbHVlIiwic3RhcnRUaW1lIiwib25QYXVzZUNsaWNrQWN0aW9uIiwiY3VycmVudERhdGVUaW1lIiwic2V0SXNQbGF5aW5nIiwidXNlU3RhdGUiLCJzZXRUaW1lIiwidGltZVN0YXJ0Iiwic2V0VGltZVN0YXJ0Iiwia2V5Iiwic2V0S2V5IiwieHgiLCJzZXRYeCIsImRhdGUiLCJzZXREYXRlIiwiZGVmYXVsdFRpbWUiLCJzZXREZWZhdWx0VGltZSIsIk51bWJlciIsIk1BWF9TQUZFX0lOVEVHRVIiLCJzZXRBbGxvY2F0ZWRUaW1lIiwiY291bnRVcE1vZGUiLCJzZXRDb3VudFVwTW9kZSIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsInVzZUVmZmVjdCIsImhhbmRsZUNvbXBsZXRlIiwiUGF1c2VJY29uIiwiU3RhcnRJY29uIiwib25QYXVzZUNsaWNrSGFuZGxlciIsImNhbkV4ZWN1dGUiLCJleGVjdXRlIiwicHJldiIsIkNvdW50ZG93bkNpcmNsZVRpbWVyIiwic3RhdHVzIiwicGFyc2VGbG9hdCIsInNldFRleHRWYWx1ZSIsInRvRml4ZWQiLCJvbkNsaWNrIiwiYm9yZGVyIiwiYmFja2dyb3VuZCIsImN1cnNvciIsImFyZU1lbmRpeFByb3BzRXF1YWwiLCJuZXh0IiwidmFsdWUiLCJEYXRlIiwiZ2V0VGltZSIsImFyZUNvdW50ZG93blByb3BzRXF1YWwiLCJwcmV2UHJvcHMiLCJuZXh0UHJvcHMiLCJjdXJyZW50RGF0ZVRpbWVDaGFuZ2VkIiwiQ291bnRkb3duVGltZXIiLCJtZW1vIiwic2V0QyIsInRvTnVtYmVyIl0sIm1hcHBpbmdzIjoiOztBQUF5SyxJQUFJQSxDQUFDLEdBQUMsT0FBT0MsTUFBTSxJQUFFLFdBQVcsR0FBQ0MsU0FBQyxHQUFDQyxlQUFDO0FBQUNDLEVBQUFBLENBQUMsR0FBQ0EsQ0FBQztBQUFDQyxJQUFBQSxTQUFTLEVBQUNDLENBQUM7QUFBQ0MsSUFBQUEsUUFBUSxFQUFDQyxDQUFDO0lBQUNDLE9BQU8sRUFBQ0MsQ0FBQyxHQUFDLENBQUM7SUFBQ0MsY0FBYyxFQUFDQyxDQUFDLEdBQUMsQ0FBQztBQUFDQyxJQUFBQSxVQUFVLEVBQUNDLENBQUM7QUFBQ0MsSUFBQUEsUUFBUSxFQUFDQyxDQUFBQTtBQUFDLEdBQUMsS0FBRztJQUFDLElBQUcsQ0FBQ0MsQ0FBQyxFQUFDQyxDQUFDLENBQUMsR0FBQ0MsUUFBQyxDQUFDVCxDQUFDLENBQUM7QUFBQ1UsTUFBQUEsQ0FBQyxHQUFDQyxNQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUNDLE1BQUFBLENBQUMsR0FBQ0QsTUFBQyxDQUFDWCxDQUFDLENBQUM7QUFBQ2EsTUFBQUEsQ0FBQyxHQUFDRixNQUFDLENBQUNYLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQztBQUFDYyxNQUFBQSxDQUFDLEdBQUNILE1BQUMsQ0FBQyxJQUFJLENBQUM7QUFBQ0ksTUFBQUEsQ0FBQyxHQUFDSixNQUFDLENBQUMsSUFBSSxDQUFDO0FBQUNLLE1BQUFBLENBQUMsR0FBQ0wsTUFBQyxDQUFDLElBQUksQ0FBQztNQUFDTSxDQUFDLEdBQUNDLENBQUMsSUFB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NEosSUFBSSxDQUFDLEdBQUcvQyxRQUFRLENBQUNMLFlBQVksQ0FBQyxDQUFBO0VBQ3hDLE1BQU0sQ0FBQ08sU0FBUyxFQUFFQyxZQUFZLENBQUMsR0FBR0gsUUFBUSxDQUFDSixTQUFTLENBQUMsQ0FBQTtFQUNyRCxNQUFNLENBQUNZLElBQUksRUFBRUMsT0FBTyxDQUFDLEdBQUdULFFBQVEsQ0FBQ0YsZUFBZSxDQUFDLENBQUE7QUFFakRxQixFQUFBQSxTQUFTLENBQUMsTUFBTTtBQUNkO0lBQ0FsQixPQUFPLENBQUNyQixZQUFZLENBQUMsQ0FBQTtBQUN2QixHQUFDLEVBQUUsQ0FBQ0EsWUFBWSxDQUFDLENBQUMsQ0FBQTtBQUVsQnVDLEVBQUFBLFNBQVMsQ0FBQyxNQUFNO0lBQ2RoQixZQUFZLENBQUNQLFNBQVMsQ0FBQyxDQUFBO0FBQ3pCLEdBQUMsRUFBRSxDQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBRWZ1QixFQUFBQSxTQUFTLENBQUMsTUFBTTtJQUNkNEIsSUFBSSxDQUFDcEQsWUFBWSxDQUFDLENBQUE7QUFDcEIsR0FBQyxFQUFFLENBQUNBLFlBQVksQ0FBQyxDQUFDLENBQUE7QUFFbEJ3QixFQUFBQSxTQUFTLENBQUMsTUFBTTtJQUNkVixPQUFPLENBQUNYLGVBQWUsQ0FBQyxDQUFBO0FBQzFCLEdBQUMsRUFBRSxDQUFDQSxlQUFlLENBQUMsQ0FBQyxDQUFBO0VBRXJCLElBQUluQixJQUFJLENBQUNpRCxNQUFNLEtBQUssV0FBVyxJQUFJekksQ0FBQyxDQUFDeUksTUFBTSxLQUFLLFdBQVcsSUFBSTFCLFNBQVMsQ0FBQzBCLE1BQU0sS0FBSyxXQUFXLElBQUlwQixJQUFJLENBQUNvQixNQUFNLEtBQUssV0FBVyxFQUFFO0lBQzlILE9BQU8zRCxhQUFBLENBQUssS0FBQSxFQUFBLElBQUEsRUFBQSxZQUFlLENBQUMsQ0FBQTtBQUM5QixHQUFDLE1BQU07SUFDTCxPQUNFQSxhQUFBLENBQUN5Qix1QkFBdUIsRUFBQTtBQUN0QmQsTUFBQUEsWUFBWSxFQUFFRCxJQUFJLENBQUMyRCxLQUFLLENBQUNVLFFBQVEsRUFBRztBQUNwQ3JELE1BQUFBLFlBQVksRUFBRXhHLENBQUU7QUFDaEJ5RyxNQUFBQSxTQUFTLEVBQUVNLFNBQVMsQ0FBQ29DLEtBQUssQ0FBQ1UsUUFBUSxFQUFHO0FBQ3RDbkQsTUFBQUEsa0JBQWtCLEVBQUVBLGtCQUFtQjtNQUN2Q0MsZUFBZSxFQUFFVSxJQUFJLENBQUM4QixLQUFBQTtBQUFNLEtBQzdCLENBQUMsQ0FBQTtBQUVOLEdBQUE7QUFDRixDQUFDLEVBQUVHLHNCQUFzQixFQUFFOzs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
