// module.exports = {
//     images: {
//       domains: ['lh3.googleusercontent.com'], // Add your domains here
//     },
//   };
  
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', // Allows all paths from the domain
      },
    ],
  },
};
