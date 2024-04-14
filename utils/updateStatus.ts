"use strict";

export default async (item: any = {}, status: string = "", fnSuccess: Function, fnError: Function): Promise<void> =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData),
    formTarget =
    {
        idunit: String (item.idunit),
        status,
    };

    await setItem (`/v1/transaction/patient/update_status`, item.noreg ?? item.noregister ?? item.noregistrasi,
    formTarget,
    fnSuccess,
    fnError);
};
