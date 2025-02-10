import withPlaiceholder from "@plaiceholder/next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], // 지원할 이미지 형식 설정
    domains: ["i.ibb.co"], // 허용할 외부 도메인 추가
  },
  compiler: {
    styledComponents: true,
  },
};

export default withPlaiceholder(nextConfig);

// import withPlaiceholder from "@plaiceholder/next";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     formats: ["image/avif", "image/webp"], // 지원할 이미지 형식 설정
//     domains: ["i.ibb.co"], // 허용할 외부 도메인 추가
//   },
//   compiler: {
//     styledComponents: true, // styled-components 활성화
//   },
//   webpack(config, { isServer }) {
//     if (!isServer) {
//       config.optimization.splitChunks = {
//         chunks: "all",
//         maxSize: 200000, // 파일 크기를 최대 200KB로 분할
//       };
//     }
//     return config;
//   },
// };

// export default withPlaiceholder(nextConfig); // withPlaiceholder 래핑
