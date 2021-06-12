# packages.

This repo contains four folders each acts as an independent micro frontend:
* `container`
* `auth`
* `marketing`
* `dashboard`
* `stockist`
## `container`
This is container application created in react which contains all the other micro frontend.

## `auth`
This is a simple react application which contains a basic signin and signup form

## `marketing`
This is a simple react displays some card and links to pricing page, signin page and sign up page

## `dashboard`
This is a single vue component without any routing. The purpose of it is to demo that vue can be loaded too into a react microfrontend.

## `stockist`
This is an angular application with routing which uses api to display some data. It uses ant design's component.

## `History` syncronization between `container`, `auth` and `marketing`
In the `container` application I browser history and inside `auth` and `marketing` I use memory history. So container application manipulates the browser's url. `auth` and `marketing` uses memory history and update the browser's url via callbacks from `container`
