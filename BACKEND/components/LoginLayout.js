import {useSession} from "next-auth/react";
import {useRouter} from "next/router";


export default function LoginLayout() {

    const {data: session, status} = useSession();

    if (status === 'loading') {
        //loading state
        return <div className='full-h flex flex-center'>
            <div className='loading-bar'>
                loading...
            </div>
            </div>;

    }
    const router = useRouter();

    if (!session) {
        router.push('/auth/login');
        return null
    }

    if (session) {
        return <>
            {children}
        </>
    }


}