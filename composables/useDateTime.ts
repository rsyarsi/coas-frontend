"use strict";

import type { RuntimeConfig, } from "nuxt/schema";
import pkg from "moment";

export default (datetime: null|number|string = null, format: null|string = null): any =>
{
    const configuration: RuntimeConfig = useRuntimeConfig ();

    const ins: pkg.Moment = datetime ? pkg (datetime) : pkg ();

    pkg.locale (configuration.public.language);
    if (format) ins.format (format);

    return {

        ins,
        pkg,
    };
};
