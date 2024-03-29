import { ReactElement, useEffect } from "react";
import BezierEasing from "bezier-easing";
import { prefersReducedMotion, randomInRange } from "~/utils";
import { Link } from "@remix-run/react";

/**
 * Get the current custom property value for the gradient angle.
 */
const getCurrentAngle = (): number => {
  const rawValue = getComputedStyle(document.documentElement).getPropertyValue(
    "--gradient-angle"
  );

  return Number(rawValue.replace("deg", ""));
};

/**
 * Ensures that a degree value falls in the 0-360 range.
 */
const toDegreeableValue = (value: number): number => {
  return ((value % 360) + 360) % 360;
};

/**
 * Given an angle, find the next range the logo should rotate toward.
 */
const selectRange = (angle: number): Array<any> => {
  const ranges = [
    [0, 20],
    [160, 180],
    [181, 200],
    [340, 360],
  ];

  const activeRangeIndex = ranges.findIndex((range) => {
    return range[0] <= angle && angle <= range[1];
  });

  // Ensure that the last index rolls over to the first range.
  return ranges[activeRangeIndex === 3 ? 0 : activeRangeIndex + 1];
};

type LogoProps = {
  asLink?: boolean;
  short?: boolean;
  children?: any;
};

const Logo = ({
  asLink = false,
  short = false,
  children = null,
}: LogoProps): ReactElement => {
  const defaultLogoText: string = short ? "AM" : "Alex MacArthur";

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    let rafId: number = 0;
    let startTime: number = 0;
    const startingAngle = getCurrentAngle();
    const range = selectRange(startingAngle);
    let destinationAngle: number = randomInRange(range[0], range[1]);
    destinationAngle =
      destinationAngle < startingAngle
        ? destinationAngle + 360
        : destinationAngle;

    const duration = 1250;
    const totalDegreesToTurn = destinationAngle - startingAngle;
    const easing = BezierEasing(0.5, 0, 0, 1);

    const gradientEffect = async () => {
      const turnGradient = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
        }

        const runTime = timestamp - startTime;
        const relativeProgress = runTime / duration;
        const easedProgress = easing(relativeProgress);
        const easedDegrees = totalDegreesToTurn * Math.min(easedProgress, 1);
        const newAngleFromStartingAngle = startingAngle + easedDegrees;

        document.documentElement.style.setProperty(
          "--gradient-angle",
          `${toDegreeableValue(newAngleFromStartingAngle)}deg`
        );

        if (runTime < duration) {
          rafId = requestAnimationFrame(turnGradient);
        }
      };

      (document as any).fonts.status === "loaded" ||
        (await (document as any).fonts.ready);

      rafId = requestAnimationFrame(turnGradient);
    };

    gradientEffect();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  const styledChildren = (
    <span className="gradient-text left-0 top-0 z-30 block p-0 pb-2 font-extrabold text-gray-900">
      {children || defaultLogoText}
    </span>
  );

  const constructedLogo = asLink ? (
    <Link to="/" prefetch="intent" className="outline-none">
      {styledChildren}
    </Link>
  ) : (
    styledChildren
  );

  return <span className="relative block">{constructedLogo}</span>;
};

export default Logo;
