import fetch from 'isomorphic-unfetch';
import { NextPageContext } from "next";
import Router from 'next/router';
// export async function myGet(url: string) {
    // const cookie = ctx.req?.headers.cookie;
//     console.log("ran")
//     const resp = await fetch(url, {
//         headers: {
//             cookie: cookie!
//         }
//     });
//     console.log("ran2")


//     if(resp.status === 401 && !ctx.req) {
//         Router.replace('/register');
//         return {};
//     }
//     console.log("ran")
//     if(resp.status === 401 && ctx.req) {
//         ctx.res?.writeHead(302, {
//             Location: 'http://localhost:3000/register'
//         });
//         ctx.res?.end();
//         return { props: {} };
//     }

//     const json = await resp.json();
//     return json;
// }

// export async function myGet(url: string, ctx: NextPageContext) {
//     const cookie = ctx.req?.headers.cookie;
//     console.log("ran")
//     const resp = await fetch(url, {
//         headers: {
//             cookie: cookie!
//         }
//     });
//     console.log("ran2")


//     if(resp.status === 401 && !ctx.req) {
//         Router.replace('/register');
//         return {};
//     }
//     console.log("ran")
//     if(resp.status === 401 && ctx.req) {
//         ctx.res?.writeHead(302, {
//             Location: 'http://localhost:3000/register'
//         });
//         ctx.res?.end();
//         return { props: {} };
//     }

//     const json = await resp.json();
//     return json;
// }


