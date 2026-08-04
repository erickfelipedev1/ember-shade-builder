import type { FC } from "react";
import { Composition } from "remotion";
import { CargoHero } from "./CargoHero";

export const Root: FC = () => {
  return (
    <Composition
      id="CargoHero"
      component={CargoHero}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
