"use strict";

import useDateTime from "./useDateTime";
import useCall from "./useCall";

export default async (identity: string = "", password: string = ""): Promise<any> =>
{
    const delToken = (): void =>
    {
        localStorage.removeItem ("auth_token");
        localStorage.removeItem ("auth_ttl");
        localStorage.removeItem ("auth_user");
    }

    const setToken = (token: string): void =>
    {
        localStorage.setItem ("auth_token", token);
    }

    const getToken = (): null|string =>
    {
        return localStorage?.getItem ("auth_token");
    }

    const delUser = async (): Promise<void> =>
    {
        delToken ();

        await navigateTo ("/auth/login");
    }

    const getUser = async (token: string): Promise<any> =>
    {
        const { data, error, } = await useCall ("/v1/auth/profile", "post", "application/json", { data: { username: localStorage?.getItem ("auth_user"), }, }, token);

        if (data.status == 200 && data.data.status) {

            return data.data?.data[0];

        } else {

            await delUser ();
        }

        return null;
    }

    if (identity && password) {

        const { data, error, } = await useCall ("/login", "post", "application/json",
        {
            data:
            {
                username: identity,
                password: password,
            },
        });

        if (data.status == 200 && data.data.status) {

            if (! data.data) await delUser ();

            setToken (data.data.data?.access_token);

            localStorage.setItem ("auth_user", identity);
            localStorage.setItem ("auth_ttl", data.data.data.access_token ? useDateTime (useDateTime (Date.now ()).ins.add (data.data.data.expires_in, "seconds")).ins.format ('YYYY-MM-DD hh:mm:ss') : "lifetime");

        } else {

            await navigateTo ("/auth/login");
        }
    }

    return {

        token: getToken (),
        setToken,
        delToken,
        getUser,
        delUser,
    };
};
