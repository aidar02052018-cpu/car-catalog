"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Анимация успеха для форм. Lottie-файл с LottieFiles (бесплатная библиотека).
// Можно заменить на любой другой URL — найти на https://lottiefiles.com и скопировать ссылку.
const SUCCESS_LOTTIE_URL =
  "https://assets1.lottiefiles.com/packages/lf20_s2lryxtd.json";

export function SuccessAnimation({
  size = 96,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ height: size, width: size }}
      aria-hidden="true"
    >
      <DotLottieReact
        src={SUCCESS_LOTTIE_URL}
        autoplay
        loop={false}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
