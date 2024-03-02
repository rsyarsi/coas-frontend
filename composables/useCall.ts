"use strict";

import type { RuntimeConfig, } from "nuxt/schema";
import axios from "axios";

export default async (url: string, method: string, contentType: string, content: any = {}, auth: string = ""): Promise<any> =>
{
    const configuration: RuntimeConfig = useRuntimeConfig ();

    const instance = axios.create (
    {
        baseURL: configuration.public.baseURL,

        headers: {

            // "X-Requested-With": "XMLHttpRequest",
            ... (auth ? { "Authorization": "Bearer " + auth, } : {}),
        },
    });

    instance.interceptors.request.use (
        request => request,
        error => Promise.reject (error)
    );

    instance.interceptors.response.use (

        async response => response,

        async (error) => {

            if (error.response.status == 401) {

                await navigateTo ("/auth/login");
            }

            return Promise.reject (error);
        },
    );

    var data = {};
    var error = {};

    var detail = {};

    if (contentType == "multipart/form-data") {

        detail = {

            url,
            method,
            headers: { "Content-Type": contentType, },
            data: content,
        }; 

    } else {

        detail = {
            
            url,
            method,
            headers: { "Content-Type": contentType, },
            ...content,
        };

        
    }

    await instance (detail)
    .then (response => { data = response })
    .catch (throwable => { error = throwable });

    return {

        data,
        error,
    };
};
