define(['exports', 'react'], (function (exports, x) { 'use strict';

  var G = typeof window == "undefined" ? x.useEffect : x.useLayoutEffect,
    I = ({
      isPlaying: o,
      duration: e,
      startAt: n = 0,
      updateInterval: t = 0,
      onComplete: s,
      onUpdate: r
    }) => {
      let [i, c] = x.useState(n),
        m = x.useRef(0),
        p = x.useRef(n),
        f = x.useRef(n * -1e3),
        u = x.useRef(null),
        a = x.useRef(null),
        h = x.useRef(null),
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
        y = x.useCallback(g => {
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
        a = x.useRef(),
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
    return x.createElement("div", {
      className: "time-wrapper"
    }, x.createElement("div", {
      className: "time",
      style: {
        bottom: '90%'
      }
    }, x.createElement("div", {
      className: "task-name"
    }, "Task Time"), isOvershoot ? x.createElement("div", {
      className: "time-count time-count-overshoot"
    }, "+ ", minutes, ":", seconds, " min") : x.createElement("div", {
      className: "time-count"
    }, minutes, ":", seconds, " min"), timeDuration != 0 && allocatedTime != 0 || timeDuration == 0 && allocatedTime != 0 ? x.createElement("div", {
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
    const [isPlaying, setIsPlaying] = x.useState(true);
    const [time, setTime] = x.useState(timeDuration);
    const [timeStart, setTimeStart] = x.useState(startTime);
    const [key, setKey] = x.useState(0);
    const [xx, setXx] = x.useState(timeDuration);
    const [date, setDate] = x.useState(currentDateTime);
    const [defaultTime, setDefaultTime] = x.useState(Number.MAX_SAFE_INTEGER);
    const [allocatedTime, setAllocatedTime] = x.useState(timeDuration);
    const [countUpMode, setCountUpMode] = x.useState(false);
    const [isLoading, setIsLoading] = x.useState(true);
    x.useEffect(() => {
      setTime(timeDuration);
      setAllocatedTime(timeDuration);
    }, [timeDuration]);
    x.useEffect(() => {
      setTimeStart(startTime);
    }, [startTime]);
    x.useEffect(() => {
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
    }) => x.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: className
    }, x.createElement("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }), x.createElement("path", {
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
    }) => x.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: className
    }, x.createElement("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }), x.createElement("path", {
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
      return x.createElement("div", {
        className: "timer-container"
      }, x.createElement(D, {
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
        return x.createElement("span", null, x.createElement("button", {
          onClick: onPauseClickHandler,
          style: {
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          },
          className: "timer-button"
        }, isPlaying ? x.createElement(PauseIcon, {
          className: "timer-icon-button"
        }) : x.createElement(StartIcon, {
          className: "timer-icon-button"
        })), x.createElement("span", null, renderTime("seconds", elapsedTime, 0, allocatedTime, false)));
      }));
    } else {
      if (countUpMode) {
        // When AllocationTime > 0 && In case of overshoot
        return x.createElement("div", {
          className: "timer-container"
        }, x.createElement(D, {
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
          return x.createElement("span", null, x.createElement("button", {
            onClick: onPauseClickHandler,
            style: {
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            },
            className: "timer-button"
          }, isPlaying ? x.createElement(PauseIcon, {
            className: "timer-icon-button"
          }) : x.createElement(StartIcon, {
            className: "timer-icon-button"
          })), x.createElement("span", null, renderTime("seconds", elapsedTime > time ? elapsedTime - time : elapsedTime, 0, allocatedTime, true)));
        }));
      } else {
        // When AllocationTime > 0
        return x.createElement("div", {
          className: "timer-container"
        }, x.createElement(D, {
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
          return x.createElement("span", null, x.createElement("button", {
            onClick: onPauseClickHandler,
            style: {
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            },
            className: "timer-button"
          }, isPlaying ? x.createElement(PauseIcon, {
            className: "timer-icon-button"
          }) : x.createElement(StartIcon, {
            className: "timer-icon-button"
          })), x.createElement("span", null, renderTime("seconds", remainingTime, time, allocatedTime, false)));
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
  const CountdownTimer = x.memo(function CountdownTimer({
    timeDuration,
    currentValue,
    startTime,
    onPauseClickAction,
    currentDateTime
  }) {
    const [time, setTime] = x.useState(timeDuration);
    const [c, setC] = x.useState(currentValue);
    const [timeStart, setTimeStart] = x.useState(startTime);
    const [date, setDate] = x.useState(currentDateTime);
    x.useEffect(() => {
      // This will only run if timeDuration (prop) changes AND React.memo allowed a re-render
      setTime(timeDuration);
    }, [timeDuration]);
    x.useEffect(() => {
      setTimeStart(startTime);
    }, [startTime]);
    x.useEffect(() => {
      setC(currentValue);
    }, [currentValue]);
    x.useEffect(() => {
      setDate(currentDateTime);
    }, [currentDateTime]);
    if (time.status !== "available" || c.status !== "available" || timeStart.status !== "available" || date.status !== "available") {
      return x.createElement("div", null, "Loading...");
    } else {
      return x.createElement(CountdownTimerComponent, {
        timeDuration: time.value.toNumber(),
        currentValue: c,
        startTime: timeStart.value.toNumber(),
        onPauseClickAction: onPauseClickAction,
        currentDateTime: date.value
      });
    }
  }, areCountdownPropsEqual); // <-- Pass the custom comparison function here

  exports.CountdownTimer = CountdownTimer;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnRkb3duVGltZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1jb3VudGRvd24tY2lyY2xlLXRpbWVyL2xpYi9pbmRleC5tb2R1bGUuanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db3VudGRvd25UaW1lckNvbXBvbmVudC5qc3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvQ291bnRkb3duVGltZXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB4IGZyb21cInJlYWN0XCI7aW1wb3J0e3VzZVJlZiBhcyBVfWZyb21cInJlYWN0XCI7aW1wb3J0e3VzZVN0YXRlIGFzIEUsdXNlUmVmIGFzIGIsdXNlQ2FsbGJhY2sgYXMgcX1mcm9tXCJyZWFjdFwiO2ltcG9ydHt1c2VFZmZlY3QgYXMgTSx1c2VMYXlvdXRFZmZlY3QgYXMgTH1mcm9tXCJyZWFjdFwiO3ZhciBHPXR5cGVvZiB3aW5kb3c9PVwidW5kZWZpbmVkXCI/TTpMLEk9KHtpc1BsYXlpbmc6byxkdXJhdGlvbjplLHN0YXJ0QXQ6bj0wLHVwZGF0ZUludGVydmFsOnQ9MCxvbkNvbXBsZXRlOnMsb25VcGRhdGU6cn0pPT57bGV0W2ksY109RShuKSxtPWIoMCkscD1iKG4pLGY9YihuKi0xZTMpLHU9YihudWxsKSxhPWIobnVsbCksaD1iKG51bGwpLHc9Zz0+e2xldCBsPWcvMWUzO2lmKGEuY3VycmVudD09PW51bGwpe2EuY3VycmVudD1sLHUuY3VycmVudD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodyk7cmV0dXJufWxldCBkPWwtYS5jdXJyZW50LEM9bS5jdXJyZW50K2Q7YS5jdXJyZW50PWwsbS5jdXJyZW50PUM7bGV0IGs9cC5jdXJyZW50Kyh0PT09MD9DOihDL3R8MCkqdCksUj1wLmN1cnJlbnQrQyx2PXR5cGVvZiBlPT1cIm51bWJlclwiJiZSPj1lO2Modj9lOmspLHZ8fCh1LmN1cnJlbnQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHcpKX0sJD0oKT0+e3UuY3VycmVudCYmY2FuY2VsQW5pbWF0aW9uRnJhbWUodS5jdXJyZW50KSxoLmN1cnJlbnQmJmNsZWFyVGltZW91dChoLmN1cnJlbnQpLGEuY3VycmVudD1udWxsfSx5PXEoZz0+eyQoKSxtLmN1cnJlbnQ9MDtsZXQgbD10eXBlb2YgZz09XCJudW1iZXJcIj9nOm47cC5jdXJyZW50PWwsYyhsKSxvJiYodS5jdXJyZW50PXJlcXVlc3RBbmltYXRpb25GcmFtZSh3KSl9LFtvLG5dKTtyZXR1cm4gRygoKT0+e2lmKHI9PW51bGx8fHIoaSksZSYmaT49ZSl7Zi5jdXJyZW50Kz1lKjFlMztsZXR7c2hvdWxkUmVwZWF0Omc9ITEsZGVsYXk6bD0wLG5ld1N0YXJ0QXQ6ZH09KHM9PW51bGw/dm9pZCAwOnMoZi5jdXJyZW50LzFlMykpfHx7fTtnJiYoaC5jdXJyZW50PXNldFRpbWVvdXQoKCk9PnkoZCksbCoxZTMpKX19LFtpLGVdKSxHKCgpPT4obyYmKHUuY3VycmVudD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodykpLCQpLFtvLGUsdF0pLHtlbGFwc2VkVGltZTppLHJlc2V0Onl9fTt2YXIgQT0obyxlLG4pPT57bGV0IHQ9by8yLHM9ZS8yLHI9dC1zLGk9MipyLGM9bj09PVwiY2xvY2t3aXNlXCI/XCIxLDBcIjpcIjAsMVwiLG09MipNYXRoLlBJKnI7cmV0dXJue3BhdGg6YG0gJHt0fSwke3N9IGEgJHtyfSwke3J9IDAgJHtjfSAwLCR7aX0gYSAke3J9LCR7cn0gMCAke2N9IDAsLSR7aX1gLHBhdGhMZW5ndGg6bX19LFQ9KG8sZSk9Pm89PT0wfHxvPT09ZT8wOnR5cGVvZiBlPT1cIm51bWJlclwiP28tZTowLEI9bz0+KHtwb3NpdGlvbjpcInJlbGF0aXZlXCIsd2lkdGg6byxoZWlnaHQ6b30pLFA9e2Rpc3BsYXk6XCJmbGV4XCIsanVzdGlmeUNvbnRlbnQ6XCJjZW50ZXJcIixhbGlnbkl0ZW1zOlwiY2VudGVyXCIscG9zaXRpb246XCJhYnNvbHV0ZVwiLGxlZnQ6MCx0b3A6MCx3aWR0aDpcIjEwMCVcIixoZWlnaHQ6XCIxMDAlXCJ9O3ZhciBGPShvLGUsbix0LHMpPT57aWYodD09PTApcmV0dXJuIGU7bGV0IHI9KHM/dC1vOm8pL3Q7cmV0dXJuIGUrbipyfSxXPW89Pnt2YXIgZSxuO3JldHVybihuPShlPW8ucmVwbGFjZSgvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLCh0LHMscixpKT0+YCMke3N9JHtzfSR7cn0ke3J9JHtpfSR7aX1gKS5zdWJzdHJpbmcoMSkubWF0Y2goLy57Mn0vZykpPT1udWxsP3ZvaWQgMDplLm1hcCh0PT5wYXJzZUludCh0LDE2KSkpIT1udWxsP246W119LGo9KG8sZSk9Pnt2YXIgdTtsZXR7Y29sb3JzOm4sY29sb3JzVGltZTp0LGlzU21vb3RoQ29sb3JUcmFuc2l0aW9uOnM9ITB9PW87aWYodHlwZW9mIG49PVwic3RyaW5nXCIpcmV0dXJuIG47bGV0IHI9KHU9dD09bnVsbD92b2lkIDA6dC5maW5kSW5kZXgoKGEsaCk9PmE+PWUmJmU+PXRbaCsxXSkpIT1udWxsP3U6LTE7aWYoIXR8fHI9PT0tMSlyZXR1cm4gblswXTtpZighcylyZXR1cm4gbltyXTtsZXQgaT10W3JdLWUsYz10W3JdLXRbcisxXSxtPVcobltyXSkscD1XKG5bcisxXSksZj0hIW8uaXNHcm93aW5nO3JldHVybmByZ2IoJHttLm1hcCgoYSxoKT0+RihpLGEscFtoXS1hLGMsZil8MCkuam9pbihcIixcIil9KWB9LFM9bz0+e2xldHtkdXJhdGlvbjplLGluaXRpYWxSZW1haW5pbmdUaW1lOm4sdXBkYXRlSW50ZXJ2YWw6dCxzaXplOnM9MTgwLHN0cm9rZVdpZHRoOnI9MTIsdHJhaWxTdHJva2VXaWR0aDppLGlzUGxheWluZzpjPSExLGlzR3Jvd2luZzptPSExLHJvdGF0aW9uOnA9XCJjbG9ja3dpc2VcIixvbkNvbXBsZXRlOmYsb25VcGRhdGU6dX09byxhPVUoKSxoPU1hdGgubWF4KHIsaSE9bnVsbD9pOjApLHtwYXRoOncscGF0aExlbmd0aDokfT1BKHMsaCxwKSx7ZWxhcHNlZFRpbWU6eX09SSh7aXNQbGF5aW5nOmMsZHVyYXRpb246ZSxzdGFydEF0OlQoZSxuKSx1cGRhdGVJbnRlcnZhbDp0LG9uVXBkYXRlOnR5cGVvZiB1PT1cImZ1bmN0aW9uXCI/bD0+e2xldCBkPU1hdGguY2VpbChlLWwpO2QhPT1hLmN1cnJlbnQmJihhLmN1cnJlbnQ9ZCx1KGQpKX06dm9pZCAwLG9uQ29tcGxldGU6dHlwZW9mIGY9PVwiZnVuY3Rpb25cIj9sPT57dmFyIFI7bGV0e3Nob3VsZFJlcGVhdDpkLGRlbGF5OkMsbmV3SW5pdGlhbFJlbWFpbmluZ1RpbWU6a309KFI9ZihsKSkhPW51bGw/Ujp7fTtpZihkKXJldHVybntzaG91bGRSZXBlYXQ6ZCxkZWxheTpDLG5ld1N0YXJ0QXQ6VChlLGspfX06dm9pZCAwfSksZz1lLXk7cmV0dXJue2VsYXBzZWRUaW1lOnkscGF0aDp3LHBhdGhMZW5ndGg6JCxyZW1haW5pbmdUaW1lOk1hdGguY2VpbChnKSxyb3RhdGlvbjpwLHNpemU6cyxzdHJva2U6aihvLGcpLHN0cm9rZURhc2hvZmZzZXQ6Rih5LDAsJCxlLG0pLHN0cm9rZVdpZHRoOnJ9fTt2YXIgRD1vPT57bGV0e2NoaWxkcmVuOmUsc3Ryb2tlTGluZWNhcDpuLHRyYWlsQ29sb3I6dCx0cmFpbFN0cm9rZVdpZHRoOnN9PW8se3BhdGg6cixwYXRoTGVuZ3RoOmksc3Ryb2tlOmMsc3Ryb2tlRGFzaG9mZnNldDptLHJlbWFpbmluZ1RpbWU6cCxlbGFwc2VkVGltZTpmLHNpemU6dSxzdHJva2VXaWR0aDphfT1TKG8pO3JldHVybiB4LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7c3R5bGU6Qih1KX0seC5jcmVhdGVFbGVtZW50KFwic3ZnXCIse3ZpZXdCb3g6YDAgMCAke3V9ICR7dX1gLHdpZHRoOnUsaGVpZ2h0OnUseG1sbnM6XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wifSx4LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse2Q6cixmaWxsOlwibm9uZVwiLHN0cm9rZTp0IT1udWxsP3Q6XCIjZDlkOWQ5XCIsc3Ryb2tlV2lkdGg6cyE9bnVsbD9zOmF9KSx4LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse2Q6cixmaWxsOlwibm9uZVwiLHN0cm9rZTpjLHN0cm9rZUxpbmVjYXA6biE9bnVsbD9uOlwicm91bmRcIixzdHJva2VXaWR0aDphLHN0cm9rZURhc2hhcnJheTppLHN0cm9rZURhc2hvZmZzZXQ6bX0pKSx0eXBlb2YgZT09XCJmdW5jdGlvblwiJiZ4LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIix7c3R5bGU6UH0sZSh7cmVtYWluaW5nVGltZTpwLGVsYXBzZWRUaW1lOmYsY29sb3I6Y30pKSl9O0QuZGlzcGxheU5hbWU9XCJDb3VudGRvd25DaXJjbGVUaW1lclwiO2V4cG9ydHtEIGFzIENvdW50ZG93bkNpcmNsZVRpbWVyLFMgYXMgdXNlQ291bnRkb3dufTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENvdW50ZG93bkNpcmNsZVRpbWVyIH0gZnJvbSAncmVhY3QtY291bnRkb3duLWNpcmNsZS10aW1lcidcblxuY29uc3QgcmVuZGVyVGltZSA9IChkaW1lbnNpb24sIHRpbWUsIHRpbWVEdXJhdGlvbiwgYWxsb2NhdGVkVGltZSwgaXNPdmVyc2hvb3QpID0+IHtcbiAgY29uc3QgZHVyYXRpb24gPSBNYXRoLnJvdW5kKGFsbG9jYXRlZFRpbWUpO1xuIFxuICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lIC8gNjApLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGgudHJ1bmMoKHRpbWUgJSA2MCkpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTs7XG4gXG4gIC8vT25seSB1c2VkIGZvciBkaXNwbGF5LlxuICBjb25zdCBmb3JtYXRlZEhvdXJzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIDM2MDApLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgZm9ybWF0ZWRtaW51dGVzID0gTWF0aC5mbG9vcigoZHVyYXRpb24gJSAzNjAwKSAvIDYwKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG5cbiBcbiAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZS13cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIiBzdHlsZT17eyBib3R0b206ICc5MCUnIH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2stbmFtZVwiPlRhc2sgVGltZTwvZGl2PlxuICAgICAgICB7aXNPdmVyc2hvb3Q/KDxkaXYgY2xhc3NOYW1lPVwidGltZS1jb3VudCB0aW1lLWNvdW50LW92ZXJzaG9vdFwiPisge21pbnV0ZXN9OntzZWNvbmRzfSBtaW48L2Rpdj4pOig8ZGl2IGNsYXNzTmFtZT1cInRpbWUtY291bnRcIj57bWludXRlc306e3NlY29uZHN9IG1pbjwvZGl2Pil9XG4gICAgICAgIHsoKHRpbWVEdXJhdGlvbiAhPSAwICYmIGFsbG9jYXRlZFRpbWUgIT0gMCkgfHwgKHRpbWVEdXJhdGlvbiA9PSAwICYmIGFsbG9jYXRlZFRpbWUgIT0gMCkpID8gKDxkaXYgY2xhc3NOYW1lPVwidGFzay1uYW1lXCI+L3tmb3JtYXRlZEhvdXJzfTp7Zm9ybWF0ZWRtaW51dGVzfSBoPC9kaXY+KSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gQ291bnRkb3duVGltZXJDb21wb25lbnQoeyB0aW1lRHVyYXRpb24sIGN1cnJlbnRWYWx1ZSwgc3RhcnRUaW1lLCBvblBhdXNlQ2xpY2tBY3Rpb24sIGN1cnJlbnREYXRlVGltZSB9KSB7XG5cbiAgY29uc3QgW2lzUGxheWluZywgc2V0SXNQbGF5aW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbdGltZSwgc2V0VGltZV0gPSB1c2VTdGF0ZSh0aW1lRHVyYXRpb24pO1xuICBjb25zdCBbdGltZVN0YXJ0LCBzZXRUaW1lU3RhcnRdID0gdXNlU3RhdGUoc3RhcnRUaW1lKTtcbiAgY29uc3QgW2tleSwgc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbeHgsIHNldFh4XSA9IHVzZVN0YXRlKHRpbWVEdXJhdGlvbik7XG4gIGNvbnN0IFtkYXRlLCBzZXREYXRlXSA9IHVzZVN0YXRlKGN1cnJlbnREYXRlVGltZSk7XG4gIGNvbnN0IFtkZWZhdWx0VGltZSwgc2V0RGVmYXVsdFRpbWVdID0gdXNlU3RhdGUoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuICBjb25zdCBbYWxsb2NhdGVkVGltZSwgc2V0QWxsb2NhdGVkVGltZV0gPSB1c2VTdGF0ZSh0aW1lRHVyYXRpb24pO1xuICBjb25zdCBbY291bnRVcE1vZGUsIHNldENvdW50VXBNb2RlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0VGltZSh0aW1lRHVyYXRpb24pXG4gICAgc2V0QWxsb2NhdGVkVGltZSh0aW1lRHVyYXRpb24pXG4gIH0sIFt0aW1lRHVyYXRpb25dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFRpbWVTdGFydChzdGFydFRpbWUpXG4gIH0sIFtzdGFydFRpbWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldERhdGUoY3VycmVudERhdGVUaW1lKVxuICAgIHNldEtleShrZXkgKyAxKVxuICAgIHNldElzUGxheWluZyh0cnVlKVxuICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgaWYgKHN0YXJ0VGltZSA+IHRpbWVEdXJhdGlvbikgIC8vIEluIGNhc2Ugb2Ygb3ZlcnNob290IHNldCB0aGUgQ291bnRVcE1vZGU9IHRydWVcbiAgICAgIHNldENvdW50VXBNb2RlKHRydWUpXG4gICAgZWxzZSBcbiAgICAgIHNldENvdW50VXBNb2RlKGZhbHNlKVxuICB9LCBbY3VycmVudERhdGVUaW1lXSk7XG5cbiAgY29uc3QgaGFuZGxlQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgc2V0Q291bnRVcE1vZGUodHJ1ZSk7XG4gICAgcmV0dXJuIHsgc2hvdWxkUmVwZWF0OiBmYWxzZSB9OyAvLyBwcmV2ZW50IGF1dG8tcmVwZWF0XG4gIH07XG5cbiAgY29uc3QgUGF1c2VJY29uID0gKHsgY2xhc3NOYW1lID0gXCJ0aW1lci1pY29uXCIsIGNvbG9yID0gJ2N1cnJlbnRDb2xvcicgfSkgPT4gKFxuICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICA8cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgLz5cbiAgICAgICBcbiAgICAgIDxwYXRoIGQ9XCJNNiA1aDR2MTRINlY1em04IDBoNHYxNGgtNFY1elwiXG4gICAgICAgIGZpbGw9XCJ0cmFuc3BhcmVudFwiICAvLyBNYWtlIGZpbGwgdHJhbnNwYXJlbnRcbiAgICAgICAgc3Ryb2tlPXtjb2xvcn0gICAgIC8vIEFkZCBzdHJva2UgY29sb3JcbiAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIiAgLy8gQWRkIHN0cm9rZSB3aWR0aFxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKTtcblxuICBjb25zdCBTdGFydEljb24gPSAoeyBjbGFzc05hbWUgPSBcInRpbWVyLWljb25cIiwgY29sb3IgPSAnY3VycmVudENvbG9yJyB9KSA9PiAoXG4gICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgIFxuICAgICAgPHBhdGggZmlsbD1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIC8+XG4gICAgICAgIDxwYXRoIGQ9XCJNOCA1djE0bDExLTd6XCJcbiAgICAgICAgZmlsbD1cInRyYW5zcGFyZW50XCIgIC8vIE1ha2UgZmlsbCB0cmFuc3BhcmVudFxuICAgICAgICBzdHJva2U9e2NvbG9yfSAgICAgLy8gQWRkIHN0cm9rZSBjb2xvclxuICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiICAvLyBBZGQgc3Ryb2tlIHdpZHRoXG5cbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICk7XG5cbiAgY29uc3Qgb25QYXVzZUNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAoaXNQbGF5aW5nKSB7XG4gICAgICBpZiAob25QYXVzZUNsaWNrQWN0aW9uICYmIG9uUGF1c2VDbGlja0FjdGlvbi5jYW5FeGVjdXRlKSB7XG4gICAgICAgIG9uUGF1c2VDbGlja0FjdGlvbi5leGVjdXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNldElzUGxheWluZygocHJldikgPT4gIXByZXYpO1xuICB9XG5cbiAgaWYgKHRpbWUgPT0gMCkgeyAgICAvLyBXaGVuIEFsbG9jYXRpb25UaW1lID0gMFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVyLWNvbnRhaW5lclwiPlxuICAgICAgICA8Q291bnRkb3duQ2lyY2xlVGltZXJcbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICBpc1BsYXlpbmc9e2lzUGxheWluZ31cbiAgICAgICAgICBkdXJhdGlvbj17ZGVmYXVsdFRpbWV9XG4gICAgICAgICAgdHJhaWxDb2xvcj17aXNQbGF5aW5nID8gXCIjMEY3RUE1XCIgOlwiIzg4ODg4OFwifVxuICAgICAgICAgIGNvbG9ycz17aXNQbGF5aW5nID8gXCIjMEY3RUE1XCIgOlwiIzg4ODg4OFwifVxuICAgICAgICAgIHNpemU9ezQwfVxuICAgICAgICAgIGluaXRpYWxSZW1haW5pbmdUaW1lPXtkZWZhdWx0VGltZSAtIHRpbWVTdGFydH1cbiAgICAgICAgICBzdHJva2VXaWR0aD17NX1cbiAgICAgICAgICBzdHJva2VMaW5lY2FwPVwic3F1YXJlXCJcbiAgICAgICAgICBvblVwZGF0ZT17KGVsYXBzZWRUaW1lKSA9PiB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgTWVuZGl4IHZhbHVlIG9uIHRpbWVyIHVwZGF0ZVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZT8uc3RhdHVzID09PSBcImF2YWlsYWJsZVwiKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHIgPSBwYXJzZUZsb2F0KGVsYXBzZWRUaW1lKTtcbiAgICAgICAgICAgICAgY29uc3QgZCA9IHBhcnNlRmxvYXQoZGVmYXVsdFRpbWUpO1xuICAgICAgICAgICAgICBjdXJyZW50VmFsdWUuc2V0VGV4dFZhbHVlKFwiXCIgKyAoKGQtcikvODY0MDApLnRvRml4ZWQoOCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgID5cblxuICAgICAgICAgIHsoeyBlbGFwc2VkVGltZSB9KSA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25QYXVzZUNsaWNrSGFuZGxlcn0gc3R5bGU9e3sgYm9yZGVyOiAnbm9uZScsIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsIGN1cnNvcjogJ3BvaW50ZXInIH19IGNsYXNzTmFtZT1cInRpbWVyLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAge2lzUGxheWluZyA/XG4gICAgICAgICAgICAgICAgICAgICg8UGF1c2VJY29uIGNsYXNzTmFtZT1cInRpbWVyLWljb24tYnV0dG9uXCIgLz4pXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgKDxTdGFydEljb24gY2xhc3NOYW1lPVwidGltZXItaWNvbi1idXR0b25cIiAvPil9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8c3BhbiA+XG4gICAgICAgICAgICAgICAgICB7cmVuZGVyVGltZShcInNlY29uZHNcIiwgZWxhcHNlZFRpbWUsIDAsIGFsbG9jYXRlZFRpbWUsIGZhbHNlKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPC9Db3VudGRvd25DaXJjbGVUaW1lcj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoY291bnRVcE1vZGUpIHsgICAvLyBXaGVuIEFsbG9jYXRpb25UaW1lID4gMCAmJiBJbiBjYXNlIG9mIG92ZXJzaG9vdFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lci1jb250YWluZXJcIj5cbiAgICAgICAgICA8Q291bnRkb3duQ2lyY2xlVGltZXJcbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgaXNQbGF5aW5nPXtpc1BsYXlpbmd9XG4gICAgICAgICAgICBkdXJhdGlvbj17ZGVmYXVsdFRpbWV9XG4gICAgICAgICAgICB0cmFpbENvbG9yPXtcIiNEQzAwMDBcIn1cbiAgICAgICAgICAgIGNvbG9ycz17XCIjREMwMDAwXCJ9XG4gICAgICAgICAgICBzaXplPXs0MH1cbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPXs1fVxuICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInNxdWFyZVwiXG4gICAgICAgICAgICBpbml0aWFsUmVtYWluaW5nVGltZT17KE1hdGgucm91bmQoc3RhcnRUaW1lKSA+IE1hdGgucm91bmQodGltZSkpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGRlZmF1bHRUaW1lIC0gdGltZVN0YXJ0KSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRUaW1lfVxuICAgICAgICAgICAgb25VcGRhdGU9eyhlbGFwc2VkVGltZSkgPT4ge1xuICAgICAgICAgICAgICAvLyBVcGRhdGUgTWVuZGl4IHZhbHVlIG9uIHRpbWVyIHVwZGF0ZVxuICAgICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlPy5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gcGFyc2VGbG9hdCh0aW1lKTtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gcGFyc2VGbG9hdChlbGFwc2VkVGltZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IHBhcnNlRmxvYXQoZGVmYXVsdFRpbWUpO1xuICAgICAgICAgICAgICAgIGlmKE1hdGgucm91bmQoc3RhcnRUaW1lKSA+IE1hdGgucm91bmQodGltZSkpXG4gICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlLnNldFRleHRWYWx1ZShcIlwiICsgKChkLXIpLzg2NDAwKS50b0ZpeGVkKDgpKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUuc2V0VGV4dFZhbHVlKFwiXCIgKyAoKGQtcikvODY0MDApLnRvRml4ZWQoOCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cblxuICAgICAgICAgICAgeyh7IGVsYXBzZWRUaW1lIH0pID0+IHtcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvblBhdXNlQ2xpY2tIYW5kbGVyfSBzdHlsZT17eyBib3JkZXI6ICdub25lJywgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JywgY3Vyc29yOiAncG9pbnRlcicgfX0gY2xhc3NOYW1lPVwidGltZXItYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpc1BsYXlpbmcgP1xuICAgICAgICAgICAgICAgICAgICAgICg8UGF1c2VJY29uIGNsYXNzTmFtZT1cInRpbWVyLWljb24tYnV0dG9uXCIgLz4pXG4gICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICg8U3RhcnRJY29uIGNsYXNzTmFtZT1cInRpbWVyLWljb24tYnV0dG9uXCIgLz4pfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgIDxzcGFuID5cbiAgICAgICAgICAgICAgICAgICAge3JlbmRlclRpbWUoXCJzZWNvbmRzXCIsIChlbGFwc2VkVGltZSA+IHRpbWUpPyhlbGFwc2VkVGltZS10aW1lKTplbGFwc2VkVGltZSwgMCwgYWxsb2NhdGVkVGltZSx0cnVlKX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIDwvQ291bnRkb3duQ2lyY2xlVGltZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHsgICAgICAgICAgICAgIC8vIFdoZW4gQWxsb2NhdGlvblRpbWUgPiAwXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxDb3VudGRvd25DaXJjbGVUaW1lclxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpc1BsYXlpbmc9e2lzUGxheWluZ31cbiAgICAgICAgICAgIGR1cmF0aW9uPXt0aW1lfVxuICAgICAgICAgICAgY29sb3JzPXtpc1BsYXlpbmcgPyBbXCIjMEY3RUE1XCIsIFwiIzBGN0VBNVwiLCBcIiMwRjdFQTVcIiwgXCIjMEY3RUE1XCJdIDogXCIjODg4ODg4XCJ9XG4gICAgICAgICAgICBjb2xvcnNUaW1lPXtbdGltZSwgdGltZSAvIDIsIDMwLCAwXX1cbiAgICAgICAgICAgIHNpemU9ezQwfVxuICAgICAgICAgICAgaW5pdGlhbFJlbWFpbmluZ1RpbWU9e3RpbWVTdGFydH1cbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPXs1fVxuICAgICAgICAgICAgdHJhaWxDb2xvcj17aXNQbGF5aW5nID8gXCIjQzBEM0RCXCIgOiBcIiNjY2NjY2NcIn1cbiAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJzcXVhcmVcIlxuICAgICAgICAgICAgb25Db21wbGV0ZT17aGFuZGxlQ29tcGxldGV9XG4gICAgICAgICAgPlxuXG5cbiAgICAgICAgICAgIHsoeyByZW1haW5pbmdUaW1lIH0pID0+IHtcblxuICAgICAgICAgICAgICBpZiAoeHggIT09IHJlbWFpbmluZ1RpbWUpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFh4KHJlbWFpbmluZ1RpbWUpLCAwKTsgLy8gYXZvaWQgc2V0dGluZyBzdGF0ZSBkdXJpbmcgcmVuZGVyXG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHBhcnNlRmxvYXQocmVtYWluaW5nVGltZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IHBhcnNlRmxvYXQodGltZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlLnNldFRleHRWYWx1ZShcIlwiICsgKChkLXIpLzg2NDAwKS50b0ZpeGVkKDgpKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uUGF1c2VDbGlja0hhbmRsZXJ9IHN0eWxlPXt7IGJvcmRlcjogJ25vbmUnLCBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLCBjdXJzb3I6ICdwb2ludGVyJyB9fSBjbGFzc05hbWU9XCJ0aW1lci1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAge2lzUGxheWluZyA/IDxQYXVzZUljb24gY2xhc3NOYW1lPVwidGltZXItaWNvbi1idXR0b25cIiAvPiA6IDxTdGFydEljb24gY2xhc3NOYW1lPVwidGltZXItaWNvbi1idXR0b25cIiAvPn1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJUaW1lKFwic2Vjb25kc1wiLCByZW1haW5pbmdUaW1lLCB0aW1lLCBhbGxvY2F0ZWRUaW1lLCBmYWxzZSl9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfX1cblxuICAgICAgICAgIDwvQ291bnRkb3duQ2lyY2xlVGltZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cblxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCBtZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IENvdW50ZG93blRpbWVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9Db3VudGRvd25UaW1lckNvbXBvbmVudFwiO1xuaW1wb3J0IFwiLi91aS9Db3VudGRvd25UaW1lci5jc3NcIjtcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNvbXBhcmUgTWVuZGl4LWxpa2Ugb2JqZWN0cyAoc3RhdHVzIGFuZCB2YWx1ZSlcbmNvbnN0IGFyZU1lbmRpeFByb3BzRXF1YWwgPSAocHJldiwgbmV4dCkgPT4ge1xuICBpZiAoIXByZXYgfHwgIW5leHQpIHJldHVybiBwcmV2ID09PSBuZXh0O1xuICBpZiAocHJldi5zdGF0dXMgIT09IG5leHQuc3RhdHVzKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHByZXYudmFsdWUgaW5zdGFuY2VvZiBEYXRlICYmIG5leHQudmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIHByZXYudmFsdWUuZ2V0VGltZSgpID09PSBuZXh0LnZhbHVlLmdldFRpbWUoKTtcbiAgfVxuICAvLyBGb3IgbnVtYmVycywgc3RyaW5ncywgZXRjLlxuICByZXR1cm4gcHJldi52YWx1ZSA9PT0gbmV4dC52YWx1ZTtcbn07XG5cbi8vIEN1c3RvbSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBSZWFjdC5tZW1vXG5jb25zdCBhcmVDb3VudGRvd25Qcm9wc0VxdWFsID0gKHByZXZQcm9wcywgbmV4dFByb3BzKSA9PiB7XG5cbiAgaWYgKHByZXZQcm9wcy50aW1lRHVyYXRpb24uc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiIHx8IHByZXZQcm9wcy5jdXJyZW50VmFsdWUuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiIHx8IHByZXZQcm9wcy5zdGFydFRpbWUuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiXG4gICB8fCBwcmV2UHJvcHMuY3VycmVudERhdGVUaW1lLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBcbiAgLy8gQ29tcGFyZSBlYWNoIE1lbmRpeC1saWtlIHByb3AgdXNpbmcgeW91ciBoZWxwZXJcbiAgY29uc3QgY3VycmVudERhdGVUaW1lQ2hhbmdlZCA9ICFhcmVNZW5kaXhQcm9wc0VxdWFsKHByZXZQcm9wcy5jdXJyZW50RGF0ZVRpbWUsIG5leHRQcm9wcy5jdXJyZW50RGF0ZVRpbWUpO1xuICAvLyBJZiB0cnVlLCBpdCBtZWFucyBhIHByb3AgaGFzIGNoYW5nZWQsIHNvIHJldHVybiBmYWxzZSAobWVhbmluZyByZS1yZW5kZXIpXG4gIGlmIChjdXJyZW50RGF0ZVRpbWVDaGFuZ2VkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIElmIG5vIHJlbGV2YW50IHByb3AgaGFzIGNoYW5nZWQsIHJldHVybiB0cnVlIChtZWFuaW5nIERPIE5PVCByZS1yZW5kZXIpXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG5leHBvcnQgY29uc3QgQ291bnRkb3duVGltZXIgPSBtZW1vKGZ1bmN0aW9uIENvdW50ZG93blRpbWVyKHtcbiAgdGltZUR1cmF0aW9uLFxuICBjdXJyZW50VmFsdWUsXG4gIHN0YXJ0VGltZSxcbiAgb25QYXVzZUNsaWNrQWN0aW9uLFxuICBjdXJyZW50RGF0ZVRpbWVcbn0pIHtcbiAgY29uc3QgW3RpbWUsIHNldFRpbWVdID0gdXNlU3RhdGUodGltZUR1cmF0aW9uKTtcbiAgY29uc3QgW2MsIHNldENdID0gdXNlU3RhdGUoY3VycmVudFZhbHVlKTtcbiAgY29uc3QgW3RpbWVTdGFydCwgc2V0VGltZVN0YXJ0XSA9IHVzZVN0YXRlKHN0YXJ0VGltZSk7XG4gIGNvbnN0IFtkYXRlLCBzZXREYXRlXSA9IHVzZVN0YXRlKGN1cnJlbnREYXRlVGltZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBUaGlzIHdpbGwgb25seSBydW4gaWYgdGltZUR1cmF0aW9uIChwcm9wKSBjaGFuZ2VzIEFORCBSZWFjdC5tZW1vIGFsbG93ZWQgYSByZS1yZW5kZXJcbiAgICBzZXRUaW1lKHRpbWVEdXJhdGlvbik7XG4gIH0sIFt0aW1lRHVyYXRpb25dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFRpbWVTdGFydChzdGFydFRpbWUpO1xuICB9LCBbc3RhcnRUaW1lXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRDKGN1cnJlbnRWYWx1ZSk7XG4gIH0sIFtjdXJyZW50VmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldERhdGUoY3VycmVudERhdGVUaW1lKTtcbiAgfSwgW2N1cnJlbnREYXRlVGltZV0pO1xuXG4gIGlmICh0aW1lLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCBjLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCB0aW1lU3RhcnQuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiIHx8IGRhdGUuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiKSB7XG4gICAgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvdW50ZG93blRpbWVyQ29tcG9uZW50XG4gICAgICAgIHRpbWVEdXJhdGlvbj17dGltZS52YWx1ZS50b051bWJlcigpfVxuICAgICAgICBjdXJyZW50VmFsdWU9e2N9XG4gICAgICAgIHN0YXJ0VGltZT17dGltZVN0YXJ0LnZhbHVlLnRvTnVtYmVyKCl9XG4gICAgICAgIG9uUGF1c2VDbGlja0FjdGlvbj17b25QYXVzZUNsaWNrQWN0aW9ufVxuICAgICAgICBjdXJyZW50RGF0ZVRpbWU9e2RhdGUudmFsdWV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn0sIGFyZUNvdW50ZG93blByb3BzRXF1YWwpOyAvLyA8LS0gUGFzcyB0aGUgY3VzdG9tIGNvbXBhcmlzb24gZnVuY3Rpb24gaGVyZSJdLCJuYW1lcyI6WyJHIiwid2luZG93IiwiTSIsIkwiLCJJIiwiaXNQbGF5aW5nIiwibyIsImR1cmF0aW9uIiwiZSIsInN0YXJ0QXQiLCJuIiwidXBkYXRlSW50ZXJ2YWwiLCJ0Iiwib25Db21wbGV0ZSIsInMiLCJvblVwZGF0ZSIsInIiLCJpIiwiYyIsIkUiLCJtIiwiYiIsInAiLCJmIiwidSIsImEiLCJoIiwidyIsImciLCJsIiwiY3VycmVudCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImQiLCJDIiwiayIsIlIiLCJ2IiwiJCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJUaW1lb3V0IiwieSIsInEiLCJzaG91bGRSZXBlYXQiLCJkZWxheSIsIm5ld1N0YXJ0QXQiLCJzZXRUaW1lb3V0IiwiZWxhcHNlZFRpbWUiLCJyZXNldCIsIkEiLCJNYXRoIiwiUEkiLCJwYXRoIiwicGF0aExlbmd0aCIsIlQiLCJCIiwicG9zaXRpb24iLCJ3aWR0aCIsImhlaWdodCIsIlAiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwibGVmdCIsInRvcCIsIkYiLCJXIiwicmVwbGFjZSIsInN1YnN0cmluZyIsIm1hdGNoIiwibWFwIiwicGFyc2VJbnQiLCJqIiwiY29sb3JzIiwiY29sb3JzVGltZSIsImlzU21vb3RoQ29sb3JUcmFuc2l0aW9uIiwiZmluZEluZGV4IiwiaXNHcm93aW5nIiwiam9pbiIsIlMiLCJpbml0aWFsUmVtYWluaW5nVGltZSIsInNpemUiLCJzdHJva2VXaWR0aCIsInRyYWlsU3Ryb2tlV2lkdGgiLCJyb3RhdGlvbiIsIlUiLCJtYXgiLCJjZWlsIiwibmV3SW5pdGlhbFJlbWFpbmluZ1RpbWUiLCJyZW1haW5pbmdUaW1lIiwic3Ryb2tlIiwic3Ryb2tlRGFzaG9mZnNldCIsIkQiLCJjaGlsZHJlbiIsInN0cm9rZUxpbmVjYXAiLCJ0cmFpbENvbG9yIiwieCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInZpZXdCb3giLCJ4bWxucyIsImZpbGwiLCJzdHJva2VEYXNoYXJyYXkiLCJjb2xvciIsImRpc3BsYXlOYW1lIiwicmVuZGVyVGltZSIsImRpbWVuc2lvbiIsInRpbWUiLCJ0aW1lRHVyYXRpb24iLCJhbGxvY2F0ZWRUaW1lIiwiaXNPdmVyc2hvb3QiLCJyb3VuZCIsIm1pbnV0ZXMiLCJmbG9vciIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJzZWNvbmRzIiwidHJ1bmMiLCJmb3JtYXRlZEhvdXJzIiwiZm9ybWF0ZWRtaW51dGVzIiwiY2xhc3NOYW1lIiwiYm90dG9tIiwiQ291bnRkb3duVGltZXJDb21wb25lbnQiLCJjdXJyZW50VmFsdWUiLCJzdGFydFRpbWUiLCJvblBhdXNlQ2xpY2tBY3Rpb24iLCJjdXJyZW50RGF0ZVRpbWUiLCJzZXRJc1BsYXlpbmciLCJ1c2VTdGF0ZSIsInNldFRpbWUiLCJ0aW1lU3RhcnQiLCJzZXRUaW1lU3RhcnQiLCJrZXkiLCJzZXRLZXkiLCJ4eCIsInNldFh4IiwiZGF0ZSIsInNldERhdGUiLCJkZWZhdWx0VGltZSIsInNldERlZmF1bHRUaW1lIiwiTnVtYmVyIiwiTUFYX1NBRkVfSU5URUdFUiIsInNldEFsbG9jYXRlZFRpbWUiLCJjb3VudFVwTW9kZSIsInNldENvdW50VXBNb2RlIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwidXNlRWZmZWN0IiwiaGFuZGxlQ29tcGxldGUiLCJQYXVzZUljb24iLCJTdGFydEljb24iLCJvblBhdXNlQ2xpY2tIYW5kbGVyIiwiY2FuRXhlY3V0ZSIsImV4ZWN1dGUiLCJwcmV2IiwiQ291bnRkb3duQ2lyY2xlVGltZXIiLCJzdGF0dXMiLCJwYXJzZUZsb2F0Iiwic2V0VGV4dFZhbHVlIiwidG9GaXhlZCIsIm9uQ2xpY2siLCJib3JkZXIiLCJiYWNrZ3JvdW5kIiwiY3Vyc29yIiwiYXJlTWVuZGl4UHJvcHNFcXVhbCIsIm5leHQiLCJ2YWx1ZSIsIkRhdGUiLCJnZXRUaW1lIiwiYXJlQ291bnRkb3duUHJvcHNFcXVhbCIsInByZXZQcm9wcyIsIm5leHRQcm9wcyIsImN1cnJlbnREYXRlVGltZUNoYW5nZWQiLCJDb3VudGRvd25UaW1lciIsIm1lbW8iLCJzZXRDIiwidG9OdW1iZXIiXSwibWFwcGluZ3MiOiI7O0VBQXlLLElBQUlBLENBQUMsR0FBQyxPQUFPQyxNQUFNLElBQUUsV0FBVyxHQUFDQyxXQUFDLEdBQUNDLGlCQUFDO0VBQUNDLEVBQUFBLENBQUMsR0FBQ0EsQ0FBQztFQUFDQyxJQUFBQSxTQUFTLEVBQUNDLENBQUM7RUFBQ0MsSUFBQUEsUUFBUSxFQUFDQyxDQUFDO01BQUNDLE9BQU8sRUFBQ0MsQ0FBQyxHQUFDLENBQUM7TUFBQ0MsY0FBYyxFQUFDQyxDQUFDLEdBQUMsQ0FBQztFQUFDQyxJQUFBQSxVQUFVLEVBQUNDLENBQUM7RUFBQ0MsSUFBQUEsUUFBUSxFQUFDQyxDQUFBQTtFQUFDLEdBQUMsS0FBRztNQUFDLElBQUcsQ0FBQ0MsQ0FBQyxFQUFDQyxDQUFDLENBQUMsR0FBQ0MsVUFBQyxDQUFDVCxDQUFDLENBQUM7RUFBQ1UsTUFBQUEsQ0FBQyxHQUFDQyxRQUFDLENBQUMsQ0FBQyxDQUFDO0VBQUNDLE1BQUFBLENBQUMsR0FBQ0QsUUFBQyxDQUFDWCxDQUFDLENBQUM7RUFBQ2EsTUFBQUEsQ0FBQyxHQUFDRixRQUFDLENBQUNYLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQztFQUFDYyxNQUFBQSxDQUFDLEdBQUNILFFBQUMsQ0FBQyxJQUFJLENBQUM7RUFBQ0ksTUFBQUEsQ0FBQyxHQUFDSixRQUFDLENBQUMsSUFBSSxDQUFDO0VBQUNLLE1BQUFBLENBQUMsR0FBQ0wsUUFBQyxDQUFDLElBQUksQ0FBQztRQUFDTSxDQUFDLEdBQUNDLENBQUMsSUFB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NEosSUFBSSxDQUFDLEdBQUcvQyxVQUFRLENBQUNMLFlBQVksQ0FBQyxDQUFBO0lBQ3hDLE1BQU0sQ0FBQ08sU0FBUyxFQUFFQyxZQUFZLENBQUMsR0FBR0gsVUFBUSxDQUFDSixTQUFTLENBQUMsQ0FBQTtJQUNyRCxNQUFNLENBQUNZLElBQUksRUFBRUMsT0FBTyxDQUFDLEdBQUdULFVBQVEsQ0FBQ0YsZUFBZSxDQUFDLENBQUE7RUFFakRxQixFQUFBQSxXQUFTLENBQUMsTUFBTTtFQUNkO01BQ0FsQixPQUFPLENBQUNyQixZQUFZLENBQUMsQ0FBQTtFQUN2QixHQUFDLEVBQUUsQ0FBQ0EsWUFBWSxDQUFDLENBQUMsQ0FBQTtFQUVsQnVDLEVBQUFBLFdBQVMsQ0FBQyxNQUFNO01BQ2RoQixZQUFZLENBQUNQLFNBQVMsQ0FBQyxDQUFBO0VBQ3pCLEdBQUMsRUFBRSxDQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBRWZ1QixFQUFBQSxXQUFTLENBQUMsTUFBTTtNQUNkNEIsSUFBSSxDQUFDcEQsWUFBWSxDQUFDLENBQUE7RUFDcEIsR0FBQyxFQUFFLENBQUNBLFlBQVksQ0FBQyxDQUFDLENBQUE7RUFFbEJ3QixFQUFBQSxXQUFTLENBQUMsTUFBTTtNQUNkVixPQUFPLENBQUNYLGVBQWUsQ0FBQyxDQUFBO0VBQzFCLEdBQUMsRUFBRSxDQUFDQSxlQUFlLENBQUMsQ0FBQyxDQUFBO0lBRXJCLElBQUluQixJQUFJLENBQUNpRCxNQUFNLEtBQUssV0FBVyxJQUFJekksQ0FBQyxDQUFDeUksTUFBTSxLQUFLLFdBQVcsSUFBSTFCLFNBQVMsQ0FBQzBCLE1BQU0sS0FBSyxXQUFXLElBQUlwQixJQUFJLENBQUNvQixNQUFNLEtBQUssV0FBVyxFQUFFO01BQzlILE9BQU8zRCxlQUFBLENBQUssS0FBQSxFQUFBLElBQUEsRUFBQSxZQUFlLENBQUMsQ0FBQTtFQUM5QixHQUFDLE1BQU07TUFDTCxPQUNFQSxlQUFBLENBQUN5Qix1QkFBdUIsRUFBQTtFQUN0QmQsTUFBQUEsWUFBWSxFQUFFRCxJQUFJLENBQUMyRCxLQUFLLENBQUNVLFFBQVEsRUFBRztFQUNwQ3JELE1BQUFBLFlBQVksRUFBRXhHLENBQUU7RUFDaEJ5RyxNQUFBQSxTQUFTLEVBQUVNLFNBQVMsQ0FBQ29DLEtBQUssQ0FBQ1UsUUFBUSxFQUFHO0VBQ3RDbkQsTUFBQUEsa0JBQWtCLEVBQUVBLGtCQUFtQjtRQUN2Q0MsZUFBZSxFQUFFVSxJQUFJLENBQUM4QixLQUFBQTtFQUFNLEtBQzdCLENBQUMsQ0FBQTtFQUVOLEdBQUE7RUFDRixDQUFDLEVBQUVHLHNCQUFzQixFQUFFOzs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
