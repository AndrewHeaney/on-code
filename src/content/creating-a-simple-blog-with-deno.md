---
title: "Creating a simple blog with Deno"
date: "2021-10-18"
draft: false
path: "/blog/creating-a-simple-blog-with-deno"
---

A couple of months ago I watched this [talk](https://www.youtube.com/watch?v=doug6st5vAs&t=627s) by Ryan Dahl, the creator of Node.js and more recently Deno. In this talk, Ryan details some of the features of Deno and gives a simple code demo to demonstrate its features.

Intrigued by the simplicity of Deno and the seemingly useful improvements over Node.js, I wanted to create a small project to get my hands dirty. I thought the best way to do this was to create a small blog.

## Research

I started out by doing some research. As Deno is still very new, there are not a lot of resources available or projects using Deno in production, so I decided to just follow the official Deno [docs](https://deno.land/manual@v1.14.1/getting_started). I followed the getting started guide to get a feel for the basic commands and it was very easy to get up and running. 

NB: If you are a VS Code user I would recommend installing the Deno extension. It helped a lot.

After getting used to the initial Deno commands I decided to start on the blog. If I was going to create this blog with Node I would probably use Express.js and some sort of static site generator like Next.js. Express does not exist for Deno but there is a very similar library called [Oak](https://github.com/oakserver/oak) which will feel very familiar for Express users. For the static site generation I found a package called [Pagic](https://pagic.org/) which was simple to use and fitted my use case perfectly. 

## Functionality

My blog was going to have very simple functionality. I would write my blog posts in markdown, use Pagic to convert them to static web pages and then use Oak to serve these pages to the user. Simple. 

![Untitled](https://i.imgur.com/EKv4arc.png)

## Code

The code for this project is also very straightforward and consists of only a few files. 

### Dependencies

There are different opinions in the Deno ecosystem around how to manage dependencies. I decided to go with the easy option and go with a `deps.ts` file that would hold any dependencies for the project. This file could then be referenced in any files that need to use the external dependencies. This way the module URLs do not have to be repeated.

 

```tsx
// deps.ts
export { Application, Router } from "https://deno.land/x/oak@v8.0.0/mod.ts";
```



### Server

The main implementation file, my server (`app.ts`), that will serve the files to the user:

 

```tsx
// app.ts
import { Application } from "./deps.ts";

const app = new Application();

// Send static content
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

addEventListener("fetch", app.fetchEventHandler());
```

For any express users this will be self-explanatory, I create a new Oak app that serves the contents of the public directory, containing my static web pages (blog posts). Then I create an event listener that will run the app. 

You can also use `app.listen(":8080");` instead of `addEventListener("fetch", app.fetchEventHandler());` I used the event handler because I intend to deploy it eventually to Deno deploy. 

 

### Pagic

Now time for Pagic. Pagic has some nice documentation that was easy to follow to get started. Pagic relies solely on a `pagic.config.ts` file. This file determines where your markdown files are coming from, where you would like the static files to be output and other details like the Pagic theme. Mine is as follows:

```tsx
// pagic.config.ts
export default {
  srcDir: "blog-posts",
  outDir: "public",
  plugins: ["blog"],
  theme: "blog",
  title: "blog-deno",
  description: "Simple blog using pagic and oak with Deno",
  blog: {
    root: "/",
    social: {
      github: "AndrewHeaney/blog-deno",
    },
  },
};
```

### Bringing it all together

First you will need to turn your markdown files into web pages by running:

```tsx
pagic build
```

Then you can run your server using [deployctl](https://github.com/denoland/deployctl) (since starting this, deployctl has been replaced by Deno run, although I could not get it to run my server locally):

```tsx
deployctl run --no-check app.ts
```

If you used app.listen() you can run the server using:

```tsx
deno run --allow-net --no-check --allow-read ./app.ts
```

That's it! The blog should run on [localhost:8080](http://localhost:8080). 

## Conclusion

I really like Deno. I can use Typescript out of the box without having to install a bundler like Webpack and there are no bulky node_modules. The ability to execute any script from a URL is also great.

I am looking forward to Deno becoming more widely adopted and for the tooling around it to improve. I am specifically interested in using Deno deploy as it is extremely simple but currently it does not support some of the Deno APIs that I require.

I would definitely recommend giving Deno a try. Reach out if you have also started using Deno, I'd be interested to hear other people's experiences. 

All of the code for this post can be found on my [Github](https://github.com/AndrewHeaney/blog-deno)