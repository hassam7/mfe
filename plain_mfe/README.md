# plain_mfe.

There are three directories named:

- cart
- container
- products

Each of these folder is a separate micro frontend.

## `container`

The `container` project as the name show is a container which will house our `cart` and `products` application.
The intresting part of container application is its `webpack.config.js`. I have pasted the important snippet below.

```new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        products: 'products@http://localhost:8081/remoteEntry.js',
        cart: 'cart@http://localhost:8082/remoteEntry.js',
      },
    }),
```

The important lines are line no 3 and 4.

```
  products: 'products@http://localhost:8081/remoteEntry.js',
  cart: 'cart@http://localhost:8082/remoteEntry.js',
```

In these line, I am telling webpack that whenever I do import an import for `products` or `cart` it should reach out to the address listed in the config file. Before moving forward lets inspect the `product`'s `webpack.config.js`

## `products`

The products `webpack.config.js` has the following content:

```
module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsIndex': './src/bootstrap',
      },
      shared: ['faker'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

The important part is the `exposes` key:

```
name: 'products',
filename: 'remoteEntry.js',
exposes: {
  './ProductsIndex': './src/bootstrap',
  },
```

Here I am telling to webpack that I want to name my products module as products and I want to export file named `remoteEntry.js` this will name will behave as entry point to the `products` module. To access this module from `containers` project. The container project's webpack config needs to add the following config to ModuleFederationPlugin

```
remotes: {
        products: 'products@http://localhost:8081/remoteEntry.js',
}
```
Notice that the `remote`'s products key points towards the following addedd

 `products@http://localhost:8081/remoteEntry.`

 `products` is the value of name key product' webpack.config.js
 `http://localhost:8081/` is the address on which products module is hosted
 `remoteEntry` corresponds to `filename` name property in `webpack.config.js`

```
 exposes: {
  './ProductsIndex': './src/bootstrap',
  },
```
In above code we are telling that whenever some other module imports `ProductsIndex` we should execute and send he contents for `./src/bootstrap`

To pull it all together

From inside `containers` I use the following import statement `import {foo} from products/ProductsIndex'`. The webpack looks inside `webpack.config.js` of the `container` project. There it finds the following entry:
```new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        products: 'products@http://localhost:8081/remoteEntry.js',
      },
    }),
```

Which tells that to load `products` it needs to call `products@http://localhost:8081/remoteEntry.js`.

The string `products@http://localhost:8081/remoteEntry.js`. can be broken down as follows:
`products` refers to value specified by name property inside `ModuleFederationPlugin` located in `webpack.config.js`'s
`localhost:8081` refers to address where the products module is hosted.
`remoteEntry.js` refers to value specified by `filename` property inside `ModuleFederationPlugin` located inside products `webpack.config.js`

Now the next part of the import is `ProductsIndex`. The `ProductsIndex` is specified inside `exposes` property of `ModuleFederation` plugin inside products `webpack.config.js`, so basically `ProductsIndex` is alias to `./src/bootstrap`.