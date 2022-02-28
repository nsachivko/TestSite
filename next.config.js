module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-hello",
            value: "there",
          },
        ],
      },
      {
        source: "/hello",
        headers: [
          {
            key: "x-hello",
            value: "world",
          },
        ],
      },
    ]
  },
}
