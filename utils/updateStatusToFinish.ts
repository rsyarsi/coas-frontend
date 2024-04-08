"use strict";

export default async (item: any = {}): Promise<void> =>
{
    const { token: tokenData, getUser, } = await useAuth (), { role, } = await getUser (tokenData);

    await updateStatus (item, "FINISH",
    (success: any) =>
    {
        if (role == "dosen") {

            item.status_penilaian = "FINISH";

        } else if (role == "mahasiswa") {

            item.status_emr = "FINISH";
        }
    },
    (error: any) => {});
};
