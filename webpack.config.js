const HTMLWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
      },
    },
    "css-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    },
  ];

  if (isDev) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

const fileName = (ext) => (isDev ? `[name].${ext}` : `[name].[hash:4].${ext}`);

module.exports = {
  context: Path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    app: Path.resolve(__dirname, "src/scripts/index.js"),
    footer: Path.resolve(__dirname, "src/scripts/footer.js"),
    map: Path.resolve(__dirname, "src/scripts/about-map.js"),
    fixed: Path.resolve(__dirname, "src/scripts/fixed.js"),
    tabs: Path.resolve(__dirname, "src/scripts/tabs.js"),
    overlay: Path.resolve(__dirname, "src/scripts/overlay.js"),
  },
  output: {
    filename: fileName("js"),
    path: Path.resolve(__dirname, "dist"),
  },
  optimization: optimization(),
  devServer: {
    hot: isDev,
    writeToDisk: isDev,
  },
  devtool: isDev ? "source-map" : "",
  plugins: [
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["app", "overlay", "footer"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/about.html"),
      filename: "about.html",
      chunks: ["app", "map", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/advertisers.html"),
      filename: "advertisers.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/publishers.html"),
      filename: "publishers.html",
      chunks: ["app", "footer", "overlay", "fixed", "tabs"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/login.html"),
      filename: "login.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/blog.html"),
      filename: "blog.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/sign-up.html"),
      filename: "sign-up.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/self-service.html"),
      filename: "self-service.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/contact.html"),
      filename: "contact.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/privacy-policy.html"),
      filename: "privacy-policy.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/advertisers-terms.html"),
      filename: "advertisers-terms.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/publishers-terms.html"),
      filename: "publishers-terms.html",
      chunks: ["app", "footer", "overlay", "fixed"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: fileName("css"),
    }),
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[Path][name].[ext]",
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
