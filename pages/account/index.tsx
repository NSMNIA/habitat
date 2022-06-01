import Head from "next/head";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";

type Props = {}

const Account = (props: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>Habitat - {t('Account')}</title>
            </Head>
            <Navbar />

            <div>
                Update this account
            </div>
        </>
    )
}

export default Account