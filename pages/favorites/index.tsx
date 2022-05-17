import Head from "next/head";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";

type Props = {}

const Favorites = (props: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>Habitat - {t('Favorites')}</title>
            </Head>
            <Navbar />
        </>
    )
}

export default Favorites