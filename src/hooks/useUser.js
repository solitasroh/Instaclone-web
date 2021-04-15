import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';

const ME_QUERY = gql`
	query me {
		me {
			userName
			avatar
		}
	}
`;

function useUser() {
	const hasToken = useReactiveVar(isLoggedInVar);
	const { data } = useQuery(ME_QUERY, {
		skip: !hasToken
	});
	console.log('useUser Data'+data);
    useEffect(() => {
		console.log("useEffect")
        if (data?.me === null) {
            console.log('logout!!!');
        	logUserOut();
        }
    }, [data]);
	return {data};
}
export default useUser;
