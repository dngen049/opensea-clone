import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Collection: NextPage = () => {
    const router = useRouter();
    return (
        <div>
            {router.query.collectionId}
        </div>
    )
}

export default Collection;