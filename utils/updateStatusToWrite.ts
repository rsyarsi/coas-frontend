"use strict";

export default async (item: any = {}): Promise<void> =>
{
    const { token: tokenData, getUser, } = await useAuth (), { role, } = await getUser (tokenData);

    await updateStatus (item, "WRITE",
    (success: any) =>
    {
        if (role == "dosen") {

            item.status_penilaian = "WRITE";

        } else if (role == "mahasiswa") {

            item.status_emr = "WRITE";
        }
    },
    (error: any) => {});
};
