"use strict";

import useCall from "./useCall";

export default (token: string) =>
{
    const getItemPostMethod = async (
        url: string,
        item: string = "",
        items: any = {},
        fnSuccess: Function,
        fnError: Function): Promise<void> =>
    {
        const { data, error, } = await useCall (url, "post", "application/json", { data: items, }, token);

        if (! item) {

            if (Object.keys (data).length) {

                let { data: { data: datas = [], } = {}, } = data;

                const { data: items = [], total = 0, per_page = 0, next_page_url = "", prev_page_url = "", first_page_url = "", last_page_url = "", } = datas;

                fnSuccess (items, total, per_page, next_page_url, prev_page_url, first_page_url, last_page_url);

            } else if (Object.keys (error).length) {

                fnError (error.response);
            }

        } else {

            if (Object.keys (data).length) {

                fnSuccess (data.data);

            } else if (Object.keys (error).length) {

                fnError (error.response);
            }
        }
    };

    const getItem = async (
        url: string,
        item: string = "",
        fnSuccess: Function,
        fnError: Function): Promise<void> =>
    {
        if (! item) {

            const { data, error, } = await useCall (url, "get", "application/json", {}, token);

            if (Object.keys (data).length) {

                let { data: { data: datas = [], } = {}, } = data;

                const { data: items = [], total = 0, per_page = 0, next_page_url = "", prev_page_url = "", first_page_url = "", last_page_url = "", } = datas;

                fnSuccess (items, total, per_page, next_page_url, prev_page_url, first_page_url, last_page_url);

            } else if (Object.keys (error).length) {

                fnError (error.response);
            }

        } else {

            const { data, error, } = await useCall (url + "/" + item, "get", "application/json", {}, token);

            if (Object.keys (data).length) {

                fnSuccess (data.data.data[0]);

            } else if (Object.keys (error).length) {

                fnError (error.response);
            }
        }
    };

    const setItem = async (
        url: string,
        item: string = "",
        items: any = {},
        fnSuccess: Function,
        fnError: Function): Promise<void> =>
    {
        if (! item) {

            const { data, error, } = await useCall (url, "post", "application/json", { data: items, }, token);

            if (Object.keys (data).length) {

                // fnSuccess (data.data.data); //

                fnSuccess (data.data);

            } else if (Object.keys (error).length) {

                fnError (error.response);
            }

        } else {

            const { data, error, } = await useCall (url, "post", "application/json", { data: { id: item, ...items, }, }, token);

            if (Object.keys (data).length) {

                fnSuccess (data.data.data);

            } else if (Object.keys (error).length) {

                fnError (error.response);
            }
        }
    };

    return {

        getItemPostMethod,
        getItem,
        setItem,
    };
};
