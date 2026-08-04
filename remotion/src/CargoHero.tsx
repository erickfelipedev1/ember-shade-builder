import type { FC } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const NAVY_DARK = "#0E1331";
const NAVY_DEEP = "#11101E";
const GOLD_DEEP = "#C44C00";

const CONTAINER_COLORS = ["#F96706", "#1E5AA8", "#C44C00", "#2E8B57", "#B8302E", "#3A6EA5"];

export const CargoHero: FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const progress = frame / durationInFrames;

  const glowPulse = 0.85 + 0.15 * Math.sin(progress * Math.PI * 2);

  const shipWidth = 460;
  const shipX = interpolate(progress, [0, 1], [-shipWidth, width + shipWidth], {
    easing: Easing.inOut(Easing.ease),
  });
  const shipBob = Math.sin(progress * Math.PI * 2 * 3) * 4;

  const planeProgress = (progress + 0.15) % 1;
  const planeWidth = 130;
  const planeX = interpolate(planeProgress, [0, 1], [-planeWidth * 2.4, width + planeWidth]);
  const planeY = interpolate(planeProgress, [0, 1], [height * 0.17, height * 0.1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* SKY */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, ${NAVY_DARK} 38%, #3a2416 62%, ${GOLD_DEEP} 78%)`,
        }}
      />

      {/* SUN GLOW */}
      <div
        style={{
          position: "absolute",
          left: width * 0.5 - 260,
          top: height * 0.56,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,178,102,${0.9 * glowPulse}) 0%, rgba(249,103,6,${0.55 * glowPulse}) 32%, rgba(249,103,6,0) 70%)`,
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: width * 0.5 - 70,
          top: height * 0.615,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,225,180,${glowPulse}) 0%, rgba(255,178,90,${glowPulse}) 55%, rgba(249,103,6,0) 100%)`,
        }}
      />

      {/* OCEAN */}
      <div style={{ position: "absolute", top: height * 0.66, width, height: height * 0.34, overflow: "hidden" }}>
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, rgba(58,36,22,0.9) 0%, ${NAVY_DARK} 55%, ${NAVY_DEEP} 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: width * 0.5 - 90,
            top: 0,
            width: 180,
            height: "100%",
            background: `linear-gradient(180deg, rgba(255,178,90,${0.55 * glowPulse}) 0%, rgba(255,178,90,${0.15 * glowPulse}) 60%, rgba(255,178,90,0) 100%)`,
            filter: "blur(6px)",
          }}
        />
        {Array.from({ length: 7 }).map((_, i) => {
          const yy = 20 + i * 26;
          const waveShift = ((progress * 260 + i * 47) % 260) - 130;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: waveShift,
                top: yy,
                width: width + 260,
                height: 1,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          );
        })}
      </div>

      {/* CARGO SHIP */}
      <div style={{ position: "absolute", left: shipX, top: height * 0.62 + shipBob, width: shipWidth }}>
        <ShipSilhouette width={shipWidth} />
      </div>

      {/* CARGO PLANE */}
      <div style={{ position: "absolute", left: planeX, top: planeY, width: planeWidth * 2.4 }}>
        <PlaneSilhouette width={planeWidth} />
      </div>

      {/* HAZE / VIGNETTE */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 35%, rgba(10,10,20,0.35) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(14,19,49,0.25) 0%, rgba(14,19,49,0) 25%, rgba(14,19,49,0) 70%, rgba(14,19,49,0.5) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

function ShipSilhouette({ width }: { width: number }) {
  const h = width * 0.34;
  const containers = 9;
  const contW = width * 0.072;
  const contH = h * 0.38;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      <path
        d={`M ${width * 0.02} ${h * 0.86} L ${width * 0.06} ${h * 0.66} L ${width * 0.94} ${h * 0.66} L ${width * 0.98} ${h * 0.86} L ${width * 0.9} ${h * 0.98} L ${width * 0.1} ${h * 0.98} Z`}
        fill="#0a0f24"
        opacity={0.92}
      />
      <rect x={width * 0.06} y={h * 0.6} width={width * 0.88} height={h * 0.06} fill="#141b3d" />
      <rect x={width * 0.83} y={h * 0.28} width={width * 0.13} height={h * 0.34} rx={3} fill="#0a0f24" />
      <rect x={width * 0.85} y={h * 0.34} width={width * 0.025} height={h * 0.06} fill="#F96706" opacity={0.85} />
      <rect x={width * 0.89} y={h * 0.34} width={width * 0.025} height={h * 0.06} fill="#F96706" opacity={0.85} />
      {Array.from({ length: containers }).map((_, i) => {
        const x = width * 0.08 + i * (contW + width * 0.005);
        const colorA = CONTAINER_COLORS[i % CONTAINER_COLORS.length];
        const colorB = CONTAINER_COLORS[(i + 3) % CONTAINER_COLORS.length];
        return (
          <g key={i}>
            <rect x={x} y={h * 0.6 - contH} width={contW} height={contH} fill={colorA} opacity={0.88} />
            <rect x={x} y={h * 0.6 - contH * 2 - 2} width={contW} height={contH} fill={colorB} opacity={0.85} />
          </g>
        );
      })}
    </svg>
  );
}

function PlaneSilhouette({ width }: { width: number }) {
  const h = width * 0.4;
  return (
    <svg width={width * 2.4} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="contrailGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
        </linearGradient>
      </defs>
      <line x1={0} y1={h * 0.5} x2={width * 0.95} y2={h * 0.5} stroke="url(#contrailGrad)" strokeWidth={2.5} strokeLinecap="round" />
      <g transform={`translate(${width}, ${h * 0.5})`}>
        <ellipse cx={0} cy={0} rx={width * 0.22} ry={width * 0.045} fill="rgba(8,12,26,0.8)" />
        <rect x={-width * 0.06} y={-width * 0.14} width={width * 0.09} height={width * 0.28} rx={width * 0.02} fill="rgba(8,12,26,0.8)" transform="rotate(20)" />
        <polygon points={`${width * 0.14},0 ${width * 0.22},${-width * 0.03} ${width * 0.22},${width * 0.03}`} fill="rgba(8,12,26,0.8)" />
      </g>
    </svg>
  );
}
